export interface ProjectImage {
  src: string;
  alt: string;
  thumbnail?: string;
}

export interface ImageLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  errorMessage?: string;
}

export interface CarouselState {
  currentIndex: number;
  totalImages: number;
  isTransitioning: boolean;
}

export interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  thumbnail?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}
