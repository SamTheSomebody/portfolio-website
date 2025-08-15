<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { ImageLoadState } from '../types/images';
  import { imagePerformanceStore } from './ImagePerformanceStore';

  export let src: string;
  export let alt: string;
  export let thumbnail: string | undefined = undefined;
  export let onLoad: () => void = () => {};
  export let onError: (error: string) => void = () => {};

  let imageElement: HTMLImageElement;
  let loadState: ImageLoadState = {
    isLoading: false,
    isLoaded: false,
    hasError: false,
  };

  let observer: IntersectionObserver;

  onMount(() => {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !loadState.isLoaded && !loadState.isLoading) {
            loadImage();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imageElement) {
      observer.observe(imageElement);
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  function loadImage() {
    loadState.isLoading = true;
    loadState.hasError = false;

    const startTime = performance.now();

    const img = new Image();
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      loadState.isLoading = false;
      loadState.isLoaded = true;

      imagePerformanceStore.addMetric({
        src,
        loadTime,
        size: img.naturalWidth * img.naturalHeight * 4, // Approximate size in bytes
        timestamp: Date.now(),
      });

      onLoad();
    };
    img.onerror = () => {
      loadState.isLoading = false;
      loadState.hasError = true;
      loadState.errorMessage = 'Failed to load image';

      imagePerformanceStore.addMetric({
        src,
        loadTime: -1,
        size: 0,
        timestamp: Date.now(),
      });

      onError('Failed to load image');
    };
    img.src = src;
  }
</script>

<div class="lazy-image-container">
  {#if thumbnail && !loadState.isLoaded}
    <img src={thumbnail} alt="Loading..." class="thumbnail" style="width: 100%; height: 100%; object-fit: cover;" />
  {/if}

  {#if loadState.isLoaded}
    <img {src} alt="" class="background-image" style="width: 100%; height: 100%; object-fit: cover;" />
  {/if}

  {#if loadState.isLoading}
    <div class="loading-placeholder">
      <div class="loading-spinner" />
    </div>
  {/if}

  {#if loadState.hasError}
    <div class="error-placeholder">
      <span class="error-icon">⚠️</span>
      <span class="error-text">Image failed to load</span>
    </div>
  {/if}

  <img
    bind:this={imageElement}
    {src}
    {alt}
    class="main-image"
    class:loaded={loadState.isLoaded}
    style="width: 100%; height: 100%; object-fit: contain;"
  />
</div>

<style>
  .lazy-image-container {
    position: relative;
    overflow: hidden;
    background: #1a1a1a;
    width: 100%;
    height: 100%;
  }

  .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(2px);
    opacity: 0.7;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(8px);
    opacity: 0.3;
    z-index: 1;
  }

  .main-image {
    position: relative;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .main-image.loaded {
    opacity: 1;
  }

  .loading-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2a2a2a;
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid #444;
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .error-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #2a2a2a;
    color: #ff6b6b;
    gap: 0.5rem;
  }

  .error-icon {
    font-size: 1.5rem;
  }

  .error-text {
    font-size: 0.875rem;
    font-family: 'JetBrains Mono', monospace;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
