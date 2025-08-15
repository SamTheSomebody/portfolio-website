export class ImageService {
  private static instance: ImageService;
  private imageCache = new Map<string, HTMLImageElement>();
  private loadPromises = new Map<string, Promise<HTMLImageElement>>();

  private constructor() {}

  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  async preloadImage(src: string): Promise<HTMLImageElement> {
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src)!;
    }

    if (this.loadPromises.has(src)) {
      return this.loadPromises.get(src)!;
    }

    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(src, img);
        this.loadPromises.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        this.loadPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });

    this.loadPromises.set(src, loadPromise);
    return loadPromise;
  }

  async preloadImages(images: string[]): Promise<void> {
    const promises = images.map(src => this.preloadImage(src).catch(() => null));
    await Promise.all(promises);
  }

  getImageDimensions(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        reject(new Error(`Failed to get dimensions for: ${src}`));
      };
      img.src = src;
    });
  }

  createThumbnail(src: string, maxWidth: number, maxHeight: number): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return src;

    const img = this.imageCache.get(src);
    if (!img) return src;

    const { width, height } = this.calculateThumbnailDimensions(
      img.naturalWidth,
      img.naturalHeight,
      maxWidth,
      maxHeight
    );

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.8);
  }

  private calculateThumbnailDimensions(
    naturalWidth: number,
    naturalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const ratio = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
    return {
      width: Math.round(naturalWidth * ratio),
      height: Math.round(naturalHeight * ratio),
    };
  }

  clearCache(): void {
    this.imageCache.clear();
    this.loadPromises.clear();
  }

  getCacheStats(): { cached: number; loading: number } {
    return {
      cached: this.imageCache.size,
      loading: this.loadPromises.size,
    };
  }
}
