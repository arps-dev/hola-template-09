/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to limit function calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if element is in viewport for lazy loading
 * @param element - Element to check
 * @param rootMargin - Root margin for intersection observer
 * @returns Promise that resolves when element is in viewport
 */
export const isInViewport = (
  element: Element,
  rootMargin: string = '50px'
): Promise<void> => {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            resolve();
          }
        });
      },
      { rootMargin }
    );
    
    observer.observe(element);
  });
};

/**
 * Measure and log performance metrics
 * @param name - Performance mark name
 * @param fn - Function to measure
 * @returns Function result
 */
export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T> | T
): Promise<T> => {
  performance.mark(`${name}-start`);
  
  try {
    const result = await fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
    
    return result;
  } finally {
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
  }
};

/**
 * Preload route component for faster navigation
 * @param routeLoader - Dynamic import function
 */
export const preloadRoute = (routeLoader: () => Promise<any>) => {
  // Preload on mouse enter or focus for faster perceived performance
  const link = document.createElement('link');
  link.rel = 'prefetch';
  // This would work with a proper bundler that supports prefetch
  routeLoader().catch(() => {
    // Ignore errors for prefetch
  });
};

/**
 * Get Core Web Vitals metrics
 * @returns Promise with performance metrics
 */
export const getCoreWebVitals = (): Promise<{
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
}> => {
  return new Promise((resolve) => {
    const metrics: any = {};
    
    // First Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
      });
    }).observe({ entryTypes: ['paint'] });
    
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
    }).observe({ entryTypes: ['layout-shift'] });
    
    // Return metrics after a delay to collect data
    setTimeout(() => resolve(metrics), 3000);
  });
};