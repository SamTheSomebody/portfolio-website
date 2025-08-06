<script lang="ts">
  import { onMount } from 'svelte';

  let visible = false;

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 300);
  });
</script>

<div class="construction-banner" class:visible>
  <div class="construction-content">
    <div class="construction-icon">🚧</div>
    <div class="construction-text">
      <h3>Site Under Construction</h3>
      <p>Check back soon for updates!</p>
    </div>
    <div class="construction-icon">🚧</div>
  </div>
</div>

<style>
  .construction-banner {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #e2665b;
    border: 2px solid #fff;
    border-radius: 12px;
    padding: 16px 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 999;
    opacity: 0;
    transition: all 0.5s ease;
    backdrop-filter: blur(10px);
  }

  .construction-banner.visible {
    opacity: 1;
  }

  .construction-content {
    display: flex;
    align-items: center;
    gap: 16px;
    color: white;
    font-family: 'Courier New', monospace;
  }

  .construction-icon {
    font-size: 24px;
    animation: bounce 2s infinite;
  }

  .construction-text {
    text-align: center;
  }

  .construction-text h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .construction-text p {
    margin: 0;
    font-size: 12px;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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

  @media (max-width: 768px) {
    .construction-banner {
      bottom: 20px;
      left: 20px;
      right: 20px;
      transform: none;
      padding: 12px 16px;
      max-width: 300px;
      margin: 0 auto;
    }

    .construction-content {
      gap: 12px;
    }

    .construction-icon {
      font-size: 20px;
    }

    .construction-text h3 {
      font-size: 14px;
    }

    .construction-text p {
      font-size: 11px;
    }
  }
</style>
