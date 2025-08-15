import { writable, derived, get } from 'svelte/store';

export interface ImageLoadMetric {
  src: string;
  loadTime: number;
  size: number;
  timestamp: number;
}

export interface PerformanceStats {
  totalImages: number;
  loadedImages: number;
  failedImages: number;
  averageLoadTime: number;
  totalSize: number;
  cacheHitRate: number;
}

function createImagePerformanceStore() {
  const { subscribe, set, update } = writable<{
    metrics: ImageLoadMetric[];
    cacheHits: number;
    cacheMisses: number;
  }>({
    metrics: [],
    cacheHits: 0,
    cacheMisses: 0,
  });

  const performanceStats = derived({ subscribe }, $store => {
    const { metrics, cacheHits, cacheMisses } = $store;

    if (metrics.length === 0) {
      return {
        totalImages: 0,
        loadedImages: 0,
        failedImages: 0,
        averageLoadTime: 0,
        totalSize: 0,
        cacheHitRate: 0,
      };
    }

    const loadedImages = metrics.filter(m => m.loadTime > 0).length;
    const failedImages = metrics.filter(m => m.loadTime === -1).length;
    const successfulLoads = metrics.filter(m => m.loadTime > 0);

    const averageLoadTime =
      successfulLoads.length > 0 ? successfulLoads.reduce((sum, m) => sum + m.loadTime, 0) / successfulLoads.length : 0;

    const totalSize = metrics.reduce((sum, m) => sum + m.size, 0);
    const totalRequests = cacheHits + cacheMisses;
    const cacheHitRate = totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;

    return {
      totalImages: metrics.length,
      loadedImages,
      failedImages,
      averageLoadTime,
      totalSize,
      cacheHitRate,
    };
  });

  return {
    subscribe,
    addMetric: (metric: ImageLoadMetric) => {
      update(store => ({
        ...store,
        metrics: [...store.metrics, metric],
      }));
    },
    recordCacheHit: () => {
      update(store => ({
        ...store,
        cacheHits: store.cacheHits + 1,
      }));
    },
    recordCacheMiss: () => {
      update(store => ({
        ...store,
        cacheMisses: store.cacheMisses + 1,
      }));
    },
    clear: () => {
      set({
        metrics: [],
        cacheHits: 0,
        cacheMisses: 0,
      });
    },
  };
}

export const imagePerformanceStore = createImagePerformanceStore();

export const performanceStats = derived(imagePerformanceStore, $store => {
  const { metrics, cacheHits, cacheMisses } = $store;

  if (metrics.length === 0) {
    return {
      totalImages: 0,
      loadedImages: 0,
      failedImages: 0,
      averageLoadTime: 0,
      totalSize: 0,
      cacheHitRate: 0,
    };
  }

  const loadedImages = metrics.filter(m => m.loadTime > 0).length;
  const failedImages = metrics.filter(m => m.loadTime === -1).length;
  const successfulLoads = metrics.filter(m => m.loadTime > 0);

  const averageLoadTime =
    successfulLoads.length > 0 ? successfulLoads.reduce((sum, m) => sum + m.loadTime, 0) / successfulLoads.length : 0;

  const totalSize = metrics.reduce((sum, m) => sum + m.size, 0);
  const totalRequests = cacheHits + cacheMisses;
  const cacheHitRate = totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;

  return {
    totalImages: metrics.length,
    loadedImages,
    failedImages,
    averageLoadTime,
    totalSize,
    cacheHitRate,
  };
});
