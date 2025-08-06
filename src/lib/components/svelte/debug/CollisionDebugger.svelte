<script lang="ts">
  import { GameManager } from "$lib/components/pixi/GameManager";

  export let gameManager: GameManager;

  function toggleCollisionDebug() {
    if (gameManager) {
      gameManager.toggleDebug();
    }
  }
</script>

<div class="collision-debug-container">
  <button class="collision-debug-button" on:click={toggleCollisionDebug}>
    Toggle Collision Debug
  </button>
</div>

<style>
  .collision-debug-button {
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 12px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 12px;
    cursor: pointer;
    z-index: 1001;
  }

  .collision-debug-button:hover {
    background: rgba(0, 0, 0, 0.9);
  }
</style>
