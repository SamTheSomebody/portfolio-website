<script lang="ts">
  import { imagePerformanceStore, performanceStats } from './ImagePerformanceStore';
  import { ImageService } from './ImageService';

  let isVisible = false;
  let imageService = ImageService.getInstance();

  function toggleVisibility() {
    isVisible = !isVisible;
  }

  function clearMetrics() {
    imagePerformanceStore.clear();
  }

  function clearCache() {
    imageService.clearCache();
  }

  $: stats = $performanceStats;
  $: cacheStats = imageService.getCacheStats();
</script>

<div class="performance-dashboard">
  <button class="toggle-button" on:click={toggleVisibility} aria-label="Toggle performance dashboard">
    📊 Performance
  </button>

  {#if isVisible}
    <div class="dashboard-content">
      <h3>Image Performance Metrics</h3>

      <div class="metrics-grid">
        <div class="metric">
          <span class="metric-label">Total Images:</span>
          <span class="metric-value">{stats.totalImages}</span>
        </div>

        <div class="metric">
          <span class="metric-label">Loaded:</span>
          <span class="metric-value success">{stats.loadedImages}</span>
        </div>

        <div class="metric">
          <span class="metric-label">Failed:</span>
          <span class="metric-value error">{stats.failedImages}</span>
        </div>

        <div class="metric">
          <span class="metric-label">Avg Load Time:</span>
          <span class="metric-value">{stats.averageLoadTime.toFixed(2)}ms</span>
        </div>

        <div class="metric">
          <span class="metric-label">Total Size:</span>
          <span class="metric-value">{(stats.totalSize / 1024 / 1024).toFixed(2)}MB</span>
        </div>

        <div class="metric">
          <span class="metric-label">Cache Hit Rate:</span>
          <span class="metric-value">{stats.cacheHitRate.toFixed(1)}%</span>
        </div>
      </div>

      <div class="cache-stats">
        <h4>Cache Statistics</h4>
        <div class="metric">
          <span class="metric-label">Cached Images:</span>
          <span class="metric-value">{cacheStats.cached}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Loading:</span>
          <span class="metric-value">{cacheStats.loading}</span>
        </div>
      </div>

      <div class="actions">
        <button class="action-button" on:click={clearMetrics}> Clear Metrics </button>
        <button class="action-button" on:click={clearCache}> Clear Cache </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .performance-dashboard {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    font-family: 'JetBrains Mono', monospace;
  }

  .toggle-button {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border: 1px solid #333;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .toggle-button:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: #555;
  }

  .dashboard-content {
    position: absolute;
    top: 100%;
    right: 0;
    width: 300px;
    background: rgba(0, 0, 0, 0.95);
    border: 1px solid #333;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 0.5rem;
    color: white;
    font-size: 0.875rem;
  }

  .dashboard-content h3 {
    margin: 0 0 1rem 0;
    color: #eeddaa;
    font-size: 1rem;
  }

  .dashboard-content h4 {
    margin: 1rem 0 0.5rem 0;
    color: #eeddaa;
    font-size: 0.875rem;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
  }

  .metric-label {
    color: #ccc;
  }

  .metric-value {
    font-weight: bold;
    color: #fff;
  }

  .metric-value.success {
    color: #4ecdc4;
  }

  .metric-value.error {
    color: #ff6b6b;
  }

  .cache-stats {
    border-top: 1px solid #333;
    padding-top: 1rem;
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .action-button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid #555;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.75rem;
    transition: all 0.2s ease;
  }

  .action-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
