<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

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
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    const keyState = keys.find(k => k.key.toLowerCase() === event.key.toLowerCase());
    if (keyState && keyState.pressed) {
      keyState.pressed = false;
      keys = keys;
    }
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
            <div class="key {keys.find(k => k.key === 'w')?.pressed ? 'pressed' : ''}">
              {keys.find(k => k.key === 'w')?.label}
            </div>
            <div class="key {keys.find(k => k.key === 'ArrowUp')?.pressed ? 'pressed' : ''}">
              {keys.find(k => k.key === 'ArrowUp')?.label}
            </div>
          </div>
        </div>
        <div class="key-row">
          <div class="key-pair">
            <div class="key {keys.find(k => k.key === 'a')?.pressed ? 'pressed' : ''}">
              {keys.find(k => k.key === 'a')?.label}
            </div>
            <div class="key {keys.find(k => k.key === 'ArrowLeft')?.pressed ? 'pressed' : ''}">
              {keys.find(k => k.key === 'ArrowLeft')?.label}
            </div>
          </div>
          <div class="key-pair">
            <div class="key {keys.find(k => k.key === 's')?.pressed ? 'pressed' : ''}">
              {keys.find(k => k.key === 's')?.label}
            </div>
            <div class="key {keys.find(k => k.key === 'ArrowDown')?.pressed ? 'pressed' : ''}">
              {keys.find(k => k.key === 'ArrowDown')?.label}
            </div>
          </div>
          <div class="key-pair">
            <div class="key {keys.find(k => k.key === 'd')?.pressed ? 'pressed' : ''}">
              {keys.find(k => k.key === 'd')?.label}
            </div>
            <div class="key {keys.find(k => k.key === 'ArrowRight')?.pressed ? 'pressed' : ''}">
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
          <div class="key large {keys.find(k => k.key === 'e')?.pressed ? 'pressed' : ''}">
            {keys.find(k => k.key === 'e')?.label}
          </div>
          <span class="label">Attack</span>
        </div>
        <div class="action-key">
          <div class="key large {keys.find(k => k.key === 'q')?.pressed ? 'pressed' : ''}">
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
  }

  .key.large {
    width: 48px;
    height: 48px;
    font-size: 18px;
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
