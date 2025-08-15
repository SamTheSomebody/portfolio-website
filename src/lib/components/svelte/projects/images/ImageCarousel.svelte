<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import LazyImage from './LazyImage.svelte';
  import type { ProjectImage, CarouselState } from '../types/images';

  export let images: ProjectImage[] = [];
  export let autoPlay: boolean = false;
  export let autoPlayInterval: number = 5000;
  export let showNavigation: boolean = true;
  export let showIndicators: boolean = true;

  const dispatch = createEventDispatcher<{
    imageChange: { index: number; image: ProjectImage };
    imageLoad: { index: number; image: ProjectImage };
    imageError: { index: number; image: ProjectImage; error: string };
  }>();

  let carouselState: CarouselState = {
    currentIndex: 0,
    totalImages: images.length,
    isTransitioning: false,
  };

  $: carouselState.totalImages = images.length;

  function goToImage(index: number) {
    if (index < 0 || index >= images.length || carouselState.isTransitioning) return;

    carouselState.isTransitioning = true;
    carouselState.currentIndex = index;

    dispatch('imageChange', { index, image: images[index] });

    setTimeout(() => {
      carouselState.isTransitioning = false;
    }, 300);
  }

  function nextImage() {
    const nextIndex = (carouselState.currentIndex + 1) % images.length;
    goToImage(nextIndex);
  }

  function previousImage() {
    const prevIndex = carouselState.currentIndex === 0 ? images.length - 1 : carouselState.currentIndex - 1;
    goToImage(prevIndex);
  }

  function handleImageLoad(index: number) {
    dispatch('imageLoad', { index, image: images[index] });
  }

  function handleImageError(index: number, error: string) {
    dispatch('imageError', { index, image: images[index], error });
  }
</script>

<div class="image-carousel" role="button" tabindex="0" aria-label="Project images carousel">
  {#if images.length > 0}
    <div class="carousel-container">
      <LazyImage
        src={images[carouselState.currentIndex].src}
        alt={images[carouselState.currentIndex].alt}
        thumbnail={images[carouselState.currentIndex].thumbnail}
        onLoad={() => handleImageLoad(carouselState.currentIndex)}
        onError={error => handleImageError(carouselState.currentIndex, error)}
      />
    </div>

    {#if showIndicators && images.length > 1}
      <div class="carousel-controls">
        {#if showNavigation}
          <button class="button prev-button" on:click={previousImage} aria-label="Previous image"> ‹ </button>
        {/if}
        {#each images as _, index}
          <button
            class="button"
            class:active={index === carouselState.currentIndex}
            on:click={() => goToImage(index)}
            aria-label="Go to image {index + 1}"
          />
        {/each}
        {#if showNavigation}
          <button class="button next-button" on:click={nextImage} aria-label="Next image"> › </button>
        {/if}
      </div>
    {/if}
  {:else}
    <div class="no-images">
      <span>No images available</span>
    </div>
  {/if}
</div>

<style>
  .image-carousel {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .button {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: 1px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    width: 20px;
    height: 20px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .button:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }

  .button.active {
    background: white;
  }

  .prev-button {
    left: 1rem;
  }

  .next-button {
    right: 1rem;
  }

  .carousel-controls {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    z-index: 10;
  }

  .no-images {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #666;
    font-family: 'JetBrains Mono', monospace;
  }
</style>
