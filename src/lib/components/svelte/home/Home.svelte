<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { GameManager } from '$lib/components/pixi/GameManager';
  import InputDebugger from '$lib/components/svelte/debug/EventDebugger.svelte';
  import TitlePanel from '$lib/components/svelte/home/TitlePanel.svelte';
  import KeyboardInput from '$lib/components/svelte/keyVisualization/KeyboardInput.svelte';
  import UnderConstruction from '$lib/components/svelte/home/UnderConstruction.svelte';
  import { browser } from '$app/environment';

  let gameManager: GameManager;
  let inputManager: any;
  let gameContainer: HTMLDivElement;

  function handleKeyboardKeydown(event: CustomEvent) {
    if (inputManager) {
      inputManager.handleSyntheticKeyDown(event.detail.key);
    }
  }

  function handleKeyboardKeyup(event: CustomEvent) {
    if (inputManager) {
      inputManager.handleSyntheticKeyUp(event.detail.key);
    }
  }

  onMount(() => {
    if (gameContainer) {
      gameManager = new GameManager(gameContainer);
      inputManager = gameManager.inputManager;
    }
  });

  onDestroy(() => {
    if (gameManager) {
      gameManager.destroy();
    }
  });
</script>

<svelte:head>
  <title>Sam Muller</title>
</svelte:head>

<div class="body">
  <TitlePanel />
  <UnderConstruction />

  <div bind:this={gameContainer} class="game" />
  {#if browser}
    <KeyboardInput on:keydown={handleKeyboardKeydown} on:keyup={handleKeyboardKeyup} />
  {/if}
  {#if inputManager}
    <InputDebugger {inputManager} />
  {/if}
</div>

<style>
  .body {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .game {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 1;
  }
</style>
