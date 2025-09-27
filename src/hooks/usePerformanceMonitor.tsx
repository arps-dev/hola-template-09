import { useEffect } from 'react';
import { getCoreWebVitals } from '@/utils/performance';

/**
 * Hook to monitor Core Web Vitals and performance metrics
 */
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Only monitor in production
    if (process.env.NODE_ENV !== 'production') return;

    const monitorPerformance = async () => {
      try {
        const metrics = await getCoreWebVitals();
        
        // Log metrics (in production, you'd send these to your analytics service)
        console.group('Core Web Vitals');
        console.log('First Contentful Paint (FCP):', metrics.fcp?.toFixed(2), 'ms');
        console.log('Largest Contentful Paint (LCP):', metrics.lcp?.toFixed(2), 'ms');
        console.log('First Input Delay (FID):', metrics.fid?.toFixed(2), 'ms');
        console.log('Cumulative Layout Shift (CLS):', metrics.cls?.toFixed(4));
        console.groupEnd();

        // Send to analytics service (example)
        // analytics.track('core_web_vitals', metrics);
      } catch (error) {
        console.error('Performance monitoring error:', error);
      }
    };

    // Monitor after page load
    const timeoutId = setTimeout(monitorPerformance, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Monitor page visibility changes for better UX
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Page became visible - could prefetch or refresh data
        console.log('Page visible - opportunity for optimization');
      } else {
        // Page hidden - could pause non-critical operations
        console.log('Page hidden - pausing non-critical operations');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};