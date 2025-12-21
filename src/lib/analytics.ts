/**
 * Analytics Tracking Utility for R-Tech Computer
 * 
 * This utility provides client-side event tracking for conversion optimization.
 * Data is logged to console in development and can be integrated with analytics platforms.
 * 
 * Usage:
 * import { trackEvent, trackWhatsAppClick, trackNavigation } from '@/lib/analytics'
 * 
 * trackEvent('button_click', { section: 'hero', button: 'cta-primary' })
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
    rtechAnalytics?: {
      openDashboard?: () => void; // Assuming this exists somewhere as indicated by the comment
      getEvents: () => EventData[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getSummary: () => any; // Keep any for now, could be made more specific
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
 * Logs to console in dev, sends to analytics in production
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

  // Send to Google Analytics (if available)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...metadata,
    });
  }

  // Send to Facebook Pixel (if available)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', `${category}_${action}`, metadata);
  }

  // Store in localStorage for manual analysis
  storeEventLocally(eventData);
}

/**
 * Track WhatsApp button clicks (PRIMARY CONVERSION EVENT)
 */
export function trackWhatsAppClick(data: WhatsAppClickData): void {
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
  trackEvent(
    'product_view',
    'view_product',
    productName,
    typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : price,
    {
      productName,
      price,
    }
  );
}

/**
 * Store event data locally for manual analysis
 */
function storeEventLocally(eventData: EventData): void {
  try {
    const storageKey = 'rtech_analytics_events';
    const existingData = localStorage.getItem(storageKey);
    const events = existingData ? JSON.parse(existingData) : [];
    
    // Keep only last 100 events to avoid storage bloat
    const updatedEvents = [...events, eventData].slice(-100);
    
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
