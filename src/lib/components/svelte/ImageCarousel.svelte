<script lang="ts">
  import { onMount } from 'svelte';

  export let images: string[] = [];
  export let autoPlay: boolean = true;
  export let interval: number = 5000;

  let currentIndex = 0;
  let intervalId: number;
  let touchStartX = 0;
  let touchEndX = 0;

  onMount(() => {
    if (autoPlay && images.length > 1) {
      startAutoPlay();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });

  function startAutoPlay() {
    intervalId = setInterval(() => {
      next();
    }, interval);
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function previous() {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  }

  function goTo(index: number) {
    currentIndex = index;
  }

  function handleTouchStart(event: TouchEvent) {
    touchStartX = event.changedTouches[0].screenX;
  }

  function handleTouchEnd(event: TouchEvent) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        next();
      } else {
        previous();
      }
    }
  }

  function handleMouseEnter() {
    if (autoPlay) {
      stopAutoPlay();
    }
  }

  function handleMouseLeave() {
    if (autoPlay) {
      startAutoPlay();
    }
  }
</script>

{#if images.length > 0}
  <div
    class="carousel"
    role="region"
    aria-label="Image carousel"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}
  >
    <div class="carousel-container">
      {#each images as image, index}
        <div class="carousel-slide {index === currentIndex ? 'active' : ''}" style="background-image: url({image})">
          <img src={image} alt="Project image {index + 1}" loading="lazy" />
        </div>
      {/each}
    </div>

    {#if images.length > 1}
      <button class="carousel-button prev" on:click={previous} aria-label="Previous image"> ‹ </button>

      <button class="carousel-button next" on:click={next} aria-label="Next image"> › </button>

      <div class="carousel-dots">
        {#each images as _, index}
          <button
            class="dot {index === currentIndex ? 'active' : ''}"
            on:click={() => goTo(index)}
            aria-label="Go to image {index + 1}"
          />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .carousel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
  }

  .carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .carousel-slide.active {
    opacity: 1;
  }

  .carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel-button:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }

  .carousel-button.prev {
    left: 1rem;
  }

  .carousel-button.next {
    right: 1rem;
  }

  .carousel-dots {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 10;
  }

  .dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: rgba(238, 221, 170, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dot:hover {
    background: rgba(238, 221, 170, 0.6);
  }

  .dot.active {
    background: #ffffff;
  }

  @media (max-width: 768px) {
    .carousel {
      height: 200px;
    }

    .carousel-button {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.25rem;
    }

    .carousel-button.prev {
      left: 0.5rem;
    }

    .carousel-button.next {
      right: 0.5rem;
    }
  }
</style>
