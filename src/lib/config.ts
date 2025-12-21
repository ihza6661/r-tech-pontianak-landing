/**
 * Application Configuration
 * 
 * Centralized configuration management using environment variables.
 * Provides type-safe access to app settings with sensible defaults.
 * 
 * Usage:
 * import { APP_CONFIG } from '@/lib/config'
 * console.log(APP_CONFIG.baseUrl)
 */

export const APP_CONFIG = {
  /**
   * Application name
   * Used in SEO metadata and schema.org markup
   */
  name: import.meta.env.VITE_APP_NAME || 'R-Tech Computer',

  /**
   * Frontend base URL (without trailing slash)
   * Used for:
   * - Schema.org structured data URLs
   * - Canonical URLs in SEO
   * - Asset URLs (images, logos)
   * 
   * Examples:
   * - Production: https://rtechcomputer.com
   * - Staging: https://r-tech-pontianak-landing.vercel.app
   * - Development: http://localhost:5173
   */
  baseUrl: (import.meta.env.VITE_APP_BASE_URL || 'https://rtechcomputer.com').replace(/\/$/, ''),

  /**
   * Backend API URL (without trailing slash)
   * Used for all API requests to Laravel backend
   * 
   * Examples:
   * - Production: https://r-tech-computer-api-6fc0370b86dc.herokuapp.com/api
   * - Development: http://localhost:8000/api
   */
  apiUrl: (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, ''),

  /**
   * Analytics configuration
   * Controls local event storage for privacy and performance
   * 
   * Privacy-first approach:
   * - Events automatically expire after retention period
   * - Prevents indefinite data storage
   * - GDPR/privacy-compliant by default
   */
  analytics: {
    /**
     * How long to retain analytics events in localStorage (in hours)
     * Default: 24 hours (complies with privacy best practices)
     * Set to 0 to disable local storage entirely
     */
    retentionHours: Number(import.meta.env.VITE_ANALYTICS_RETENTION_HOURS) || 24,

    /**
     * Maximum number of events to store
     * Prevents localStorage quota errors (typically 5-10MB limit)
     * Default: 100 events
     */
    maxEvents: Number(import.meta.env.VITE_ANALYTICS_MAX_EVENTS) || 100,
  },
} as const;

// Type export for TypeScript consumers
export type AppConfig = typeof APP_CONFIG;
