<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Key from './Key.svelte';

  const dispatch = createEventDispatcher();

  interface KeyState {
    key: string;
    label: string;
    pressed: boolean;
    aliases: string[];
  }

  let keys: KeyState[] = [
    { key: 'up', label: 'W/↑', pressed: false, aliases: ['w', 'W', 'ArrowUp'] },
    { key: 'left', label: 'A/←', pressed: false, aliases: ['a', 'A', 'ArrowLeft'] },
    { key: 'down', label: 'S/↓', pressed: false, aliases: ['s', 'S', 'ArrowDown'] },
    { key: 'right', label: 'D/→', pressed: false, aliases: ['d', 'D', 'ArrowRight'] },
    { key: 'e', label: 'E', pressed: false, aliases: ['e', 'E'] },
    { key: 'q', label: 'Q', pressed: false, aliases: ['q', 'Q'] },
  ];

  function handleKeyDown(event: KeyboardEvent) {
    const keyState = keys.find(k => k.aliases.includes(event.key));
    if (keyState && !keyState.pressed) {
      keyState.pressed = true;
      keys = keys;
      dispatch('keydown', { key: event.key });
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    const keyState = keys.find(k => k.aliases.includes(event.key));
    if (keyState && keyState.pressed) {
      keyState.pressed = false;
      keys = keys;
      dispatch('keyup', { key: event.key });
    }
  }

  function handleVirtualKeyDown(event: CustomEvent) {
    const keyName = event.detail.key;
    const keyState = keys.find(k => k.aliases.includes(keyName));
    if (keyState && !keyState.pressed) {
      keyState.pressed = true;
      keys = keys;
      dispatch('keydown', { key: keyName });
    }
  }

  function handleVirtualKeyUp(event: CustomEvent) {
    const keyName = event.detail.key;
    const keyState = keys.find(k => k.aliases.includes(keyName));
    if (keyState && keyState.pressed) {
      keyState.pressed = false;
      keys = keys;
      dispatch('keyup', { key: keyName });
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
          <Key
            label="W/↑"
            keyName="w"
            pressed={keys.find(k => k.key === 'up')?.pressed || false}
            on:keydown={handleVirtualKeyDown}
            on:keyup={handleVirtualKeyUp}
          />
        </div>
        <div class="key-row">
          <Key
            label="A/←"
            keyName="a"
            pressed={keys.find(k => k.key === 'left')?.pressed || false}
            on:keydown={handleVirtualKeyDown}
            on:keyup={handleVirtualKeyUp}
          />
          <Key
            label="S/↓"
            keyName="s"
            pressed={keys.find(k => k.key === 'down')?.pressed || false}
            on:keydown={handleVirtualKeyDown}
            on:keyup={handleVirtualKeyUp}
          />
          <Key
            label="D/→"
            keyName="d"
            pressed={keys.find(k => k.key === 'right')?.pressed || false}
            on:keydown={handleVirtualKeyDown}
            on:keyup={handleVirtualKeyUp}
          />
        </div>
      </div>
    </div>
    <div class="action-section">
      <h3>Block</h3>
      <div class="action-keys">
        <Key
          label="Q"
          keyName="q"
          pressed={keys.find(k => k.key === 'q')?.pressed || false}
          on:keydown={handleVirtualKeyDown}
          on:keyup={handleVirtualKeyUp}
        />
      </div>
    </div>
    <div class="action-section">
      <h3>Attack</h3>
      <div class="action-keys">
        <Key
          label="E"
          keyName="e"
          pressed={keys.find(k => k.key === 'e')?.pressed || false}
          on:keydown={handleVirtualKeyDown}
          on:keyup={handleVirtualKeyUp}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .keyboard-overlay {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 12px;
    color: white;
    font-family: 'JetBrains Mono', monospace;
    font-weight: bold;
    z-index: 100;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .controls-grid {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }

  .movement-section,
  .action-section {
    text-align: center;
  }

  h3 {
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
    align-items: center;
  }

  .action-keys {
    display: flex;
    gap: 6px;
    justify-content: center;
  }
</style>
