<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { GameManager } from '$lib/components/pixi/GameManager';
  import InputDebugger from '$lib/components/svelte/debug/InputDebugger.svelte';
  import CollisionDebugger from '$lib/components/svelte/debug/CollisionDebugger.svelte';
  import TitlePanel from '$lib/components/svelte/TitlePanel.svelte';
  import KeyboardInput from '$lib/components/svelte/KeyboardInput.svelte';
  import UnderConstruction from '$lib/components/svelte/UnderConstruction.svelte';

  let gameManager: GameManager;
  let inputManager: any;
  let gameContainer: HTMLDivElement;

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
  <KeyboardInput />
  {#if inputManager}
    <InputDebugger {inputManager} />
  {/if}
  {#if gameManager}
    <CollisionDebugger {gameManager} />
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
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 1;
  }
</style>
