<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string;
  export let pressed: boolean = false;
  export let size: 'normal' | 'large' = 'normal';
  export let keyName: string;

  const dispatch = createEventDispatcher();

  function handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    if (!pressed) {
      dispatch('keydown', { key: keyName });
    }
  }

  function handleMouseUp(event: MouseEvent) {
    event.preventDefault();
    if (pressed) {
      dispatch('keyup', { key: keyName });
    }
  }

  function handleMouseLeave(event: MouseEvent) {
    event.preventDefault();
    if (pressed) {
      dispatch('keyup', { key: keyName });
    }
  }

  function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    if (!pressed) {
      dispatch('keydown', { key: keyName });
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    if (pressed) {
      dispatch('keyup', { key: keyName });
    }
  }
</script>

<div
  class="key {pressed ? 'pressed' : ''} {size === 'large' ? 'large' : ''}"
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mouseleave={handleMouseLeave}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
>
  {label}
</div>

<style>
  .key {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #3a3a3a, #2a2a2a);
    border: 2px solid #555;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }

  .key.large {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }

  .key:hover:not(.pressed) {
    background: linear-gradient(145deg, #4a4a4a, #3a3a3a);
    border-color: #666;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }

  .key.pressed {
    background: linear-gradient(145deg, #4caf50, #45a049);
    border-color: #66bb6a;
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    animation: keyPress 0.3s ease;
  }

  @keyframes keyPress {
    0% {
      transform: scale(1) translateY(0);
    }
    50% {
      transform: scale(0.95) translateY(1px);
    }
    100% {
      transform: scale(1) translateY(1px);
    }
  }

  @media (max-width: 768px) {
    .key {
      width: 28px;
      height: 28px;
      font-size: 12px;
    }

    .key.large {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }
  }
</style>
