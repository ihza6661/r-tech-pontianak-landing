/**
 * Analytics Tracking Utility for R-Tech Computer
 * 
 * This utility provides client-side event tracking for conversion optimization.
 * Integrates with Google Analytics 4 and Facebook Pixel for comprehensive tracking.
 * 
 * Privacy & Data Retention:
 * - Events stored in localStorage are automatically cleaned up after 24 hours (configurable)
 * - Cleanup runs automatically on app initialization via cleanupExpiredEvents()
 * - Respects GDPR and privacy regulations by not storing data indefinitely
 * - Maximum 100 events stored to prevent localStorage quota issues
 * 
 * Configuration:
 * - VITE_ANALYTICS_RETENTION_HOURS: How long to keep events (default: 24 hours)
 * - VITE_ANALYTICS_MAX_EVENTS: Maximum events to store (default: 100)
 * 
 * Usage:
 * import { trackEvent, trackWhatsAppClick, trackNavigation } from '@/lib/analytics'
 * 
 * trackEvent('button_click', { section: 'hero', button: 'cta-primary' })
 * 
 * Maintenance:
 * - cleanupExpiredEvents() is called automatically on app initialization
 * - Manual cleanup available via clearStoredEvents()
 */

import { 
  trackGA4WhatsAppClick, 
  trackGA4ProductView, 
  trackGA4ScrollDepth,
  trackGA4Navigation,
  trackGA4FormInteraction,
  sendGA4Event 
} from './gtag';
import {
  trackFBPixelWhatsAppClick,
  trackFBPixelProductView,
  trackFBPixelScrollDepth,
  trackFBPixelNavigation,
  trackFBPixelFormInteraction,
  sendFBPixelCustomEvent
} from './fbpixel';
import { APP_CONFIG } from './config';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
    rtechAnalytics?: {
      openDashboard?: () => void;
      getEvents: () => EventData[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getSummary: () => any;
      clear: () => void;
      download: () => void;
    };
  }
}



type EventCategory = 
  | 'whatsapp_click'
  | 'navigation'
  | 'scroll'
  | 'form_interaction'
  | 'product_view'
  | 'button_click'
  | 'link_click';

type EventData = {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
};

type WhatsAppClickData = {
  type: 'general' | 'sales' | 'service' | 'product' | 'sold_out' | string;
  location: string; // Which section/component triggered the click
  productName?: string;
  buttonText?: string;
};

type NavigationData = {
  from: string;
  to: string;
  method: 'click' | 'scroll';
};

type ScrollData = {
  depth: number; // Percentage (0-100)
  section?: string;
};

/**
 * Main event tracking function
 * Logs to console in dev, sends to analytics platforms in production
 */
export function trackEvent(
  category: EventCategory,
  action: string,
  label?: string,
  value?: number,
  metadata?: Record<string, unknown>
): void {
  const eventData: EventData = {
    category,
    action,
    label,
    value,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    },
  };

  // Console logging for development
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventData);
  }

  // Send to Google Analytics 4 (handled by gtag.ts)
  if (typeof window !== 'undefined' && window.gtag) {
    sendGA4Event(action, {
      event_category: category,
      event_label: label,
      value: value,
      ...metadata,
    });
  }

  // Send to Facebook Pixel (handled by fbpixel.ts)
  if (typeof window !== 'undefined' && window.fbq) {
    sendFBPixelCustomEvent(`${category}_${action}`, metadata);
  }

  // Store in localStorage for manual analysis
  storeEventLocally(eventData);
}

/**
 * Track WhatsApp button clicks (PRIMARY CONVERSION EVENT)
 */
export function trackWhatsAppClick(data: WhatsAppClickData): void {
  // Send to GA4 with proper conversion event mapping
  trackGA4WhatsAppClick(data);
  
  // Send to Facebook Pixel with Lead event
  trackFBPixelWhatsAppClick(data);

  // Track locally for analytics dashboard
  trackEvent(
    'whatsapp_click',
    'click_whatsapp_button',
    data.type,
    1,
    {
      location: data.location,
      type: data.type,
      productName: data.productName,
      buttonText: data.buttonText,
      conversion: true, // Mark as conversion event
    }
  );

  // Also log to console for immediate visibility
  console.log('💬 WhatsApp Click:', {
    type: data.type,
    location: data.location,
    product: data.productName,
  });
}

/**
 * Track navigation link clicks
 */
export function trackNavigation(data: NavigationData): void {
  // Send to GA4
  trackGA4Navigation(data);
  
  // Send to Facebook Pixel
  trackFBPixelNavigation(data);
  
  // Track locally
  trackEvent(
    'navigation',
    'navigate',
    `${data.from}_to_${data.to}`,
    undefined,
    {
      from: data.from,
      to: data.to,
      method: data.method,
    }
  );
}

/**
 * Track scroll depth (fire at 25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(data: ScrollData): void {
  // Send to GA4
  trackGA4ScrollDepth(data.depth, data.section);
  
  // Send to Facebook Pixel (only significant milestones)
  trackFBPixelScrollDepth(data.depth, data.section);
  
  // Track locally
  trackEvent(
    'scroll',
    'scroll_depth',
    `${data.depth}%`,
    data.depth,
    {
      section: data.section,
    }
  );
}

/**
 * Track form interactions
 */
export function trackFormInteraction(
  formName: string,
  action: 'start' | 'submit' | 'error',
  fieldName?: string
): void {
  // Send to GA4
  trackGA4FormInteraction(formName, action, fieldName);
  
  // Send to Facebook Pixel
  trackFBPixelFormInteraction(formName, action, fieldName);
  
  // Track locally
  trackEvent(
    'form_interaction',
    action,
    formName,
    undefined,
    {
      formName,
      fieldName,
    }
  );
}

/**
 * Track product views
 */
export function trackProductView(productName: string, price: string | number): void {
  const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : price;
  
  // Send to GA4
  trackGA4ProductView({
    productName,
    price: numericPrice,
  });
  
  // Send to Facebook Pixel
  trackFBPixelProductView({
    productName,
    price: numericPrice,
  });
  
  // Track locally
  trackEvent(
    'product_view',
    'view_product',
    productName,
    numericPrice,
    {
      productName,
      price,
    }
  );
}

/**
 * Store event data locally for manual analysis
 * Implements time-based retention policy for privacy compliance
 */
function storeEventLocally(eventData: EventData): void {
  try {
    const storageKey = 'rtech_analytics_events';
    const existingData = localStorage.getItem(storageKey);
    let events = existingData ? JSON.parse(existingData) : [];
    
    // Filter out expired events based on retention policy
    const retentionMs = APP_CONFIG.analytics.retentionHours * 60 * 60 * 1000;
    const now = Date.now();
    events = events.filter((event: EventData) => {
      const eventTimestamp = event.metadata?.timestamp 
        ? new Date(event.metadata.timestamp as string).getTime()
        : 0;
      return eventTimestamp && (now - eventTimestamp) < retentionMs;
    });
    
    // Add new event and keep only last N events to avoid storage bloat
    const updatedEvents = [...events, eventData].slice(-APP_CONFIG.analytics.maxEvents);
    
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
  } catch (error) {
    // Silent fail if localStorage is not available
    console.warn('Could not store analytics event:', error);
  }
}

/**
 * Get stored analytics data (for debugging/reporting)
 */
export function getStoredEvents(): EventData[] {
  try {
    const storageKey = 'rtech_analytics_events';
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Get analytics summary report
 */
export function getAnalyticsSummary(): {
  totalEvents: number;
  whatsappClicks: number;
  whatsappClicksByType: Record<string, number>;
  whatsappClicksByLocation: Record<string, number>;
  navigationClicks: number;
  topScrollDepth: number;
  mostViewedProducts: string[];
} {
  const events = getStoredEvents();
  
  const whatsappEvents = events.filter(e => e.category === 'whatsapp_click');
  const navigationEvents = events.filter(e => e.category === 'navigation');
  const scrollEvents = events.filter(e => e.category === 'scroll');
  const productEvents = events.filter(e => e.category === 'product_view');
  
  // Group WhatsApp clicks by type
  const clicksByType: Record<string, number> = {};
  whatsappEvents.forEach(e => {
    const type = e.metadata?.type || 'unknown';
    clicksByType[type] = (clicksByType[type] || 0) + 1;
  });
  
  // Group WhatsApp clicks by location
  const clicksByLocation: Record<string, number> = {};
  whatsappEvents.forEach(e => {
    const location = e.metadata?.location || 'unknown';
    clicksByLocation[location] = (clicksByLocation[location] || 0) + 1;
  });
  
  // Find top scroll depth
  const topScrollDepth = scrollEvents.length > 0
    ? Math.max(...scrollEvents.map(e => e.value || 0))
    : 0;
  
  // Most viewed products
  const productViews: Record<string, number> = {};
  productEvents.forEach(e => {
    const product = e.label || 'unknown';
    productViews[product] = (productViews[product] || 0) + 1;
  });
  const mostViewedProducts = Object.entries(productViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([product]) => product);
  
  return {
    totalEvents: events.length,
    whatsappClicks: whatsappEvents.length,
    whatsappClicksByType: clicksByType,
    whatsappClicksByLocation: clicksByLocation,
    navigationClicks: navigationEvents.length,
    topScrollDepth,
    mostViewedProducts,
  };
}

/**
 * Clear stored analytics data
 */
export function clearStoredEvents(): void {
  try {
    localStorage.removeItem('rtech_analytics_events');
    console.log('✅ Analytics data cleared');
  } catch (error) {
    console.warn('Could not clear analytics data:', error);
  }
}

/**
 * Clean up expired analytics events from localStorage
 * Automatically removes events older than the configured retention period
 * 
 * Privacy-first approach:
 * - Respects GDPR/privacy guidelines by not storing data indefinitely
 * - Prevents localStorage bloat
 * - Should be called on app initialization
 * 
 * @returns Number of events removed (for logging/debugging)
 */
export function cleanupExpiredEvents(): number {
  try {
    const storageKey = 'rtech_analytics_events';
    const existingData = localStorage.getItem(storageKey);
    
    if (!existingData) {
      return 0; // No data to clean up
    }
    
    const events: EventData[] = JSON.parse(existingData);
    const originalCount = events.length;
    
    // Filter out expired events
    const retentionMs = APP_CONFIG.analytics.retentionHours * 60 * 60 * 1000;
    const now = Date.now();
    
    const validEvents = events.filter((event) => {
      // Events without timestamps are considered expired (safety measure)
      if (!event.metadata?.timestamp) {
        return false;
      }
      
      const eventTimestamp = new Date(event.metadata.timestamp as string).getTime();
      const age = now - eventTimestamp;
      
      return age < retentionMs;
    });
    
    const removedCount = originalCount - validEvents.length;
    
    // Only update localStorage if events were removed
    if (removedCount > 0) {
      if (validEvents.length === 0) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(validEvents));
      }
      
      // Log cleanup activity in development mode
      if (import.meta.env.DEV) {
        console.log(
          `🧹 Analytics cleanup: Removed ${removedCount} expired event(s), ` +
          `${validEvents.length} event(s) retained (retention: ${APP_CONFIG.analytics.retentionHours}h)`
        );
      }
    }
    
    return removedCount;
  } catch (error) {
    console.warn('Could not cleanup expired analytics events:', error);
    return 0;
  }
}

/**
 * Export analytics data as CSV
 */
export function exportAnalyticsCSV(): string {
  const events = getStoredEvents();
  
  if (events.length === 0) {
    return 'No data available';
  }
  
  // CSV Header
  const headers = ['Timestamp', 'Category', 'Action', 'Label', 'Value', 'Metadata'];
  
  // CSV Rows
  const rows = events.map(event => [
    event.metadata?.timestamp || '',
    event.category,
    event.action,
    event.label || '',
    event.value?.toString() || '',
    JSON.stringify(event.metadata || {}),
  ]);
  
  // Combine
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  
  return csvContent;
}

/**
 * Download analytics data as CSV file
 */
export function downloadAnalyticsCSV(): void {
  const csv = exportAnalyticsCSV();
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `rtech-analytics-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// Expose analytics functions to window for console access
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.rtechAnalytics = {
    ...window.rtechAnalytics, // Preserve any existing functions (like openDashboard)
    getEvents: getStoredEvents,
    getSummary: getAnalyticsSummary,
    clear: clearStoredEvents,
    download: downloadAnalyticsCSV,
  };
  
  console.log('📊 Analytics Debug Tools Available:');
  console.log('  window.rtechAnalytics.openDashboard() - Open analytics dashboard');
  console.log('  window.rtechAnalytics.getEvents() - View all events');
  console.log('  window.rtechAnalytics.getSummary() - View summary report');
  console.log('  window.rtechAnalytics.clear() - Clear stored data');
  console.log('  window.rtechAnalytics.download() - Download as CSV');
  console.log('');
  console.log('💡 Other ways to access dashboard:');
  console.log('  • Click floating button (bottom-left)');
  console.log('  • Add ?analytics=true to URL');
}
