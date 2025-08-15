<script lang="ts">
  let isVisible = true;

  function handleClose() {
    isVisible = false;
  }
</script>

{#if isVisible}
  <div class="construction-banner">
    <button class="close-button" on:click={handleClose} aria-label="Close"> × </button>
    <div class="construction-content">
      <div class="construction-icon">🚧</div>
      <div class="construction-text">
        <h3>SITE UNDER CONSTRUCTION</h3>
        <p>Check back soon for updates!</p>
      </div>
      <div class="construction-icon">🚧</div>
    </div>
  </div>
{/if}

<style>
  .construction-banner {
    position: fixed;
    top: 72px;
    left: 20px;
    background: #e2665b;
    border: 2px solid #eeddaa;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 999;
  }

  .close-button {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    background: #e2665b;
    border: 2px solid #eeddaa;
    border-radius: 50%;
    color: #eeddaa;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 1000;
  }

  .close-button:hover {
    background: #eeddaa;
    color: #e2665b;
    transform: scale(1.1);
  }

  .close-button:active {
    transform: scale(0.95);
  }

  .construction-content {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #eeddaa;
    font-family: 'JetBrains Mono', monospace;
  }

  .construction-icon {
    font-size: 24px;
    animation: bounce 2s infinite;
  }

  .construction-text {
    text-align: center;
  }

  .construction-text h3 {
    font-size: 16px;
    font-weight: bold;
  }

  .construction-text p {
    font-size: 12px;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }
</style>
