<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { GameManager } from "$lib/components/pixi/GameManager";
  import InputDebugger from "$lib/components/ui/InputDebugger.svelte";
  import TitlePanel from "$lib/components/svelte/TitlePanel.svelte";

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
  <div bind:this={gameContainer} class="game" />
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
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 1;
  }
</style>
