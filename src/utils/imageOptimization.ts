/**
 * Image optimization utilities for better performance
 */

export interface ImageSrcSet {
  src: string;
  srcSet?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Generate optimized image attributes for responsive images
 * @param src - Original image source
 * @param alt - Image alt text
 * @param priority - Whether image should be prioritized for loading
 * @returns Optimized image attributes
 */
export const getOptimizedImageProps = (
  src: string,
  alt: string,
  priority: boolean = false
): ImageSrcSet => {
  // For WebP support, we would generate different formats
  // This is a simplified version - in production, you'd use a service like Cloudinary
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return {
    src,
    srcSet: `${src} 1x, ${webpSrc} 1x`,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto'
  };
};

/**
 * Preload critical images
 * @param imageSrcs - Array of image URLs to preload
 */
export const preloadImages = (imageSrcs: string[]) => {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Check if WebP is supported
 * @returns Promise<boolean>
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Generate blur placeholder for lazy loaded images
 * @param width - Image width
 * @param height - Image height
 * @returns Base64 encoded blur placeholder
 */
export const generateBlurPlaceholder = (width: number = 400, height: number = 300): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};