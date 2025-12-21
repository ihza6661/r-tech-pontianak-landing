import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 100%)
 * 
 * Usage:
 * useScrollTracking('hero-section')
 */
export function useScrollTracking(sectionName?: string) {
  const milestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Track at 25%, 50%, 75%, 100%
      const thresholds = [25, 50, 75, 100];
      
      thresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !milestones.current.has(threshold)) {
          milestones.current.add(threshold);
          trackScrollDepth({
            depth: threshold,
            section: sectionName,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check immediately in case user is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionName]);
}

/**
 * Hook to track navigation clicks
 */
export function useNavigationTracking() {
  useEffect(() => {
    // This will be used in navigation components
    // Actual tracking is done in the component's onClick handler
  }, []);
}
