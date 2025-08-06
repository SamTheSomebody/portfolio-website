<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  interface KeyState {
    key: string;
    label: string;
    pressed: boolean;
  }

  let keys: KeyState[] = [
    { key: 'w', label: 'W', pressed: false },
    { key: 'a', label: 'A', pressed: false },
    { key: 's', label: 'S', pressed: false },
    { key: 'd', label: 'D', pressed: false },
    { key: 'ArrowUp', label: '↑', pressed: false },
    { key: 'ArrowLeft', label: '←', pressed: false },
    { key: 'ArrowDown', label: '↓', pressed: false },
    { key: 'ArrowRight', label: '→', pressed: false },
    { key: 'e', label: 'E', pressed: false },
    { key: 'q', label: 'Q', pressed: false },
  ];

  function handleKeyDown(event: KeyboardEvent) {
    const keyState = keys.find(k => k.key.toLowerCase() === event.key.toLowerCase());
    if (keyState && !keyState.pressed) {
      keyState.pressed = true;
      keys = keys;
      dispatch('keydown', { key: keyState.key });
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    const keyState = keys.find(k => k.key.toLowerCase() === event.key.toLowerCase());
    if (keyState && keyState.pressed) {
      keyState.pressed = false;
      keys = keys;
      dispatch('keyup', { key: keyState.key });
    }
  }

  function handleKeyPress(key: string) {
    const keyState = keys.find(k => k.key === key);
    if (keyState && !keyState.pressed) {
      keyState.pressed = true;
      keys = keys;
      dispatch('keydown', { key: keyState.key });
    }
  }

  function handleKeyRelease(key: string) {
    const keyState = keys.find(k => k.key === key);
    if (keyState && keyState.pressed) {
      keyState.pressed = false;
      keys = keys;
      dispatch('keyup', { key: keyState.key });
    }
  }

  function handleMouseDown(event: MouseEvent, key: string) {
    event.preventDefault();
    handleKeyPress(key);
  }

  function handleMouseUp(event: MouseEvent, key: string) {
    event.preventDefault();
    handleKeyRelease(key);
  }

  function handleMouseLeave(event: MouseEvent, key: string) {
    event.preventDefault();
    handleKeyRelease(key);
  }

  function handleTouchStart(event: TouchEvent, key: string) {
    event.preventDefault();
    handleKeyPress(key);
  }

  function handleTouchEnd(event: TouchEvent, key: string) {
    event.preventDefault();
    handleKeyRelease(key);
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  });
</script>

<div class="keyboard-overlay">
  <div class="controls-grid">
    <div class="movement-section">
      <h3>Move</h3>
      <div class="movement-grid">
        <div class="key-row">
          <div class="key-pair">
            <div
              class="key {keys.find(k => k.key === 'w')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 'w')}
              on:mouseup={e => handleMouseUp(e, 'w')}
              on:mouseleave={e => handleMouseLeave(e, 'w')}
              on:touchstart={e => handleTouchStart(e, 'w')}
              on:touchend={e => handleTouchEnd(e, 'w')}
            >
              {keys.find(k => k.key === 'w')?.label}
            </div>
            <div
              class="key {keys.find(k => k.key === 'ArrowUp')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 'ArrowUp')}
              on:mouseup={e => handleMouseUp(e, 'ArrowUp')}
              on:mouseleave={e => handleMouseLeave(e, 'ArrowUp')}
              on:touchstart={e => handleTouchStart(e, 'ArrowUp')}
              on:touchend={e => handleTouchEnd(e, 'ArrowUp')}
            >
              {keys.find(k => k.key === 'ArrowUp')?.label}
            </div>
          </div>
        </div>
        <div class="key-row">
          <div class="key-pair">
            <div
              class="key {keys.find(k => k.key === 'a')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 'a')}
              on:mouseup={e => handleMouseUp(e, 'a')}
              on:mouseleave={e => handleMouseLeave(e, 'a')}
              on:touchstart={e => handleTouchStart(e, 'a')}
              on:touchend={e => handleTouchEnd(e, 'a')}
            >
              {keys.find(k => k.key === 'a')?.label}
            </div>
            <div
              class="key {keys.find(k => k.key === 'ArrowLeft')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 'ArrowLeft')}
              on:mouseup={e => handleMouseUp(e, 'ArrowLeft')}
              on:mouseleave={e => handleMouseLeave(e, 'ArrowLeft')}
              on:touchstart={e => handleTouchStart(e, 'ArrowLeft')}
              on:touchend={e => handleTouchEnd(e, 'ArrowLeft')}
            >
              {keys.find(k => k.key === 'ArrowLeft')?.label}
            </div>
          </div>
          <div class="key-pair">
            <div
              class="key {keys.find(k => k.key === 's')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 's')}
              on:mouseup={e => handleMouseUp(e, 's')}
              on:mouseleave={e => handleMouseLeave(e, 's')}
              on:touchstart={e => handleTouchStart(e, 's')}
              on:touchend={e => handleTouchEnd(e, 's')}
            >
              {keys.find(k => k.key === 's')?.label}
            </div>
            <div
              class="key {keys.find(k => k.key === 'ArrowDown')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 'ArrowDown')}
              on:mouseup={e => handleMouseUp(e, 'ArrowDown')}
              on:mouseleave={e => handleMouseLeave(e, 'ArrowDown')}
              on:touchstart={e => handleTouchStart(e, 'ArrowDown')}
              on:touchend={e => handleTouchEnd(e, 'ArrowDown')}
            >
              {keys.find(k => k.key === 'ArrowDown')?.label}
            </div>
          </div>
          <div class="key-pair">
            <div
              class="key {keys.find(k => k.key === 'd')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 'd')}
              on:mouseup={e => handleMouseUp(e, 'd')}
              on:mouseleave={e => handleMouseLeave(e, 'd')}
              on:touchstart={e => handleTouchStart(e, 'd')}
              on:touchend={e => handleTouchEnd(e, 'd')}
            >
              {keys.find(k => k.key === 'd')?.label}
            </div>
            <div
              class="key {keys.find(k => k.key === 'ArrowRight')?.pressed ? 'pressed' : ''}"
              on:mousedown={e => handleMouseDown(e, 'ArrowRight')}
              on:mouseup={e => handleMouseUp(e, 'ArrowRight')}
              on:mouseleave={e => handleMouseLeave(e, 'ArrowRight')}
              on:touchstart={e => handleTouchStart(e, 'ArrowRight')}
              on:touchend={e => handleTouchEnd(e, 'ArrowRight')}
            >
              {keys.find(k => k.key === 'ArrowRight')?.label}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="action-section">
      <h3>Actions</h3>
      <div class="action-keys">
        <div class="action-key">
          <div
            class="key large {keys.find(k => k.key === 'e')?.pressed ? 'pressed' : ''}"
            on:mousedown={e => handleMouseDown(e, 'e')}
            on:mouseup={e => handleMouseUp(e, 'e')}
            on:mouseleave={e => handleMouseLeave(e, 'e')}
            on:touchstart={e => handleTouchStart(e, 'e')}
            on:touchend={e => handleTouchEnd(e, 'e')}
          >
            {keys.find(k => k.key === 'e')?.label}
          </div>
          <span class="label">Attack</span>
        </div>
        <div class="action-key">
          <div
            class="key large {keys.find(k => k.key === 'q')?.pressed ? 'pressed' : ''}"
            on:mousedown={e => handleMouseDown(e, 'q')}
            on:mouseup={e => handleMouseUp(e, 'q')}
            on:mouseleave={e => handleMouseLeave(e, 'q')}
            on:touchstart={e => handleTouchStart(e, 'q')}
            on:touchend={e => handleTouchEnd(e, 'q')}
          >
            {keys.find(k => k.key === 'q')?.label}
          </div>
          <span class="label">Block</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .keyboard-overlay {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 32px;
    color: white;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    z-index: 1000;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .controls-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }

  .movement-section,
  .action-section {
    text-align: center;
  }

  h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .movement-grid {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
  }

  .key-row {
    display: flex;
    gap: 6px;
    justify-content: center;
  }

  .key-pair {
    display: flex;
    gap: 2px;
    padding: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

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

  .action-keys {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .action-key {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .label {
    font-size: 10px;
    color: #bbb;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    .keyboard-overlay {
      padding: 20px;
      scale: 0.85;
    }

    .key-pair {
      gap: 1px;
      padding: 2px;
    }

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
