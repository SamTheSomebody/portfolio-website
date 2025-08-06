<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { InputManager } from '../../pixi/InputManager';

  export let inputManager: InputManager;

  let events: Array<{ type: string; data?: any; timestamp: number }> = [];
  let maxEvents = 20;
  let isVisible = false;

  function addEvent(type: string, data?: any) {
    events = [
      {
        type,
        data: data ? JSON.parse(JSON.stringify(data)) : undefined,
        timestamp: Date.now(),
      },
      ...events.slice(0, maxEvents - 1),
    ];
  }

  function toggleVisibility() {
    isVisible = !isVisible;
  }

  onMount(() => {
    const events = inputManager.events;

    inputManager.setEvents({
      onMovementInput: direction => {
        addEvent('Movement Input', direction);
        events.onMovementInput?.(direction);
      },
      onAttack: () => {
        addEvent('Attack');
        events.onAttack?.();
      },
      onBlockStart: () => {
        addEvent('Block Start');
        events.onBlockStart?.();
      },
      onBlockEnd: () => {
        addEvent('Block End');
        events.onBlockEnd?.();
      },
      onSubmit: () => {
        addEvent('Submit');
        events.onSubmit?.();
      },
      onCancel: () => {
        addEvent('Cancel');
        events.onCancel?.();
      },
    });
  });
</script>

<button class="toggle-button" on:click={toggleVisibility}>
  {isVisible ? 'Hide' : 'Show'} Debug
</button>

{#if isVisible}
  <div class="input-debugger">
    <p>Input Events</p>
    <div class="events-list">
      {#each events as event}
        <div class="event">
          <span class="event-type">{event.type}</span>
          <span class="event-data">({JSON.stringify(event.data)})</span>
          <span class="event-time">{new Date(event.timestamp).toLocaleTimeString()}</span>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .toggle-button {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 4px 8px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 10px;
    cursor: pointer;
    z-index: 1001;
  }

  .toggle-button:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .input-debugger {
    position: fixed;
    top: 40px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    max-width: 350px;
    z-index: 1000;
  }

  .events-list {
    max-height: 200px;
    overflow-y: auto;
  }

  .event {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .event-type {
    color: #4caf50;
    font-weight: bold;
  }

  .event-data {
    color: #ffc107;
    margin: 5px;
  }

  .event-time {
    color: #9e9e9e;
    float: right;
  }
</style>
