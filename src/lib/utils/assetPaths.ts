// Get the base path for assets
function getBasePath(): string {
  // Check if we're in a preview environment with base path
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/portfolio-website')) {
      return '/portfolio-website';
    }
  }

  // In development, no base path
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return '';
  }

  // In production, use the base path from environment or default
  return import.meta.env.VITE_BASE_PATH || '/portfolio-website';
}

// Get the correct asset path
export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  return `${basePath}${path}`;
}
