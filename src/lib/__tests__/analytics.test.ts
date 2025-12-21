/**
 * Analytics Cleanup Tests
 * 
 * Tests the privacy-focused retention policy for analytics events.
 * Ensures expired events are properly removed while valid events are retained.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cleanupExpiredEvents, clearStoredEvents } from '../analytics';
import { APP_CONFIG } from '../config';

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('Analytics Cleanup', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('cleanupExpiredEvents', () => {
    it('should remove events older than retention period (24 hours)', () => {
      const storageKey = 'rtech_analytics_events';
      const now = Date.now();
      const retentionMs = APP_CONFIG.analytics.retentionHours * 60 * 60 * 1000;

      // Create events with different ages
      const events = [
        {
          category: 'whatsapp_click',
          action: 'click',
          metadata: {
            timestamp: new Date(now - retentionMs - 1000).toISOString(), // Expired (25 hours ago)
          },
        },
        {
          category: 'navigation',
          action: 'navigate',
          metadata: {
            timestamp: new Date(now - 1000).toISOString(), // Valid (1 second ago)
          },
        },
        {
          category: 'scroll',
          action: 'scroll_depth',
          metadata: {
            timestamp: new Date(now - 12 * 60 * 60 * 1000).toISOString(), // Valid (12 hours ago)
          },
        },
      ];

      localStorage.setItem(storageKey, JSON.stringify(events));

      // Run cleanup
      const removedCount = cleanupExpiredEvents();

      // Verify
      expect(removedCount).toBe(1);
      const remaining = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(remaining).toHaveLength(2);
      expect(remaining[0].category).toBe('navigation');
      expect(remaining[1].category).toBe('scroll');
    });

    it('should keep all events if none are expired', () => {
      const storageKey = 'rtech_analytics_events';
      const now = Date.now();

      const events = [
        {
          category: 'whatsapp_click',
          action: 'click',
          metadata: {
            timestamp: new Date(now - 1000).toISOString(),
          },
        },
        {
          category: 'navigation',
          action: 'navigate',
          metadata: {
            timestamp: new Date(now - 5000).toISOString(),
          },
        },
      ];

      localStorage.setItem(storageKey, JSON.stringify(events));

      const removedCount = cleanupExpiredEvents();

      expect(removedCount).toBe(0);
      const remaining = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(remaining).toHaveLength(2);
    });

    it('should handle empty localStorage gracefully', () => {
      const removedCount = cleanupExpiredEvents();

      expect(removedCount).toBe(0);
      expect(localStorage.getItem('rtech_analytics_events')).toBeNull();
    });

    it('should handle malformed data gracefully', () => {
      const storageKey = 'rtech_analytics_events';
      localStorage.setItem(storageKey, 'invalid json data');

      // Should not throw error
      expect(() => cleanupExpiredEvents()).not.toThrow();
    });

    it('should remove events without timestamps (treated as expired)', () => {
      const storageKey = 'rtech_analytics_events';
      const now = Date.now();

      const events = [
        {
          category: 'whatsapp_click',
          action: 'click',
          metadata: {
            // No timestamp
            location: 'hero',
          },
        },
        {
          category: 'navigation',
          action: 'navigate',
          metadata: {
            timestamp: new Date(now - 1000).toISOString(), // Valid
          },
        },
      ];

      localStorage.setItem(storageKey, JSON.stringify(events));

      const removedCount = cleanupExpiredEvents();

      expect(removedCount).toBe(1);
      const remaining = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(remaining).toHaveLength(1);
      expect(remaining[0].category).toBe('navigation');
    });

    it('should remove storage key entirely if all events are expired', () => {
      const storageKey = 'rtech_analytics_events';
      const now = Date.now();
      const retentionMs = APP_CONFIG.analytics.retentionHours * 60 * 60 * 1000;

      const events = [
        {
          category: 'whatsapp_click',
          action: 'click',
          metadata: {
            timestamp: new Date(now - retentionMs - 1000).toISOString(),
          },
        },
        {
          category: 'navigation',
          action: 'navigate',
          metadata: {
            timestamp: new Date(now - retentionMs - 5000).toISOString(),
          },
        },
      ];

      localStorage.setItem(storageKey, JSON.stringify(events));

      const removedCount = cleanupExpiredEvents();

      expect(removedCount).toBe(2);
      expect(localStorage.getItem(storageKey)).toBeNull();
    });

    it('should return correct count of removed events', () => {
      const storageKey = 'rtech_analytics_events';
      const now = Date.now();
      const retentionMs = APP_CONFIG.analytics.retentionHours * 60 * 60 * 1000;

      const events = [
        { category: 'test', action: 'a', metadata: { timestamp: new Date(now - retentionMs - 1000).toISOString() } },
        { category: 'test', action: 'b', metadata: { timestamp: new Date(now - retentionMs - 2000).toISOString() } },
        { category: 'test', action: 'c', metadata: { timestamp: new Date(now - retentionMs - 3000).toISOString() } },
        { category: 'test', action: 'd', metadata: { timestamp: new Date(now - 1000).toISOString() } },
        { category: 'test', action: 'e', metadata: { timestamp: new Date(now - 2000).toISOString() } },
      ];

      localStorage.setItem(storageKey, JSON.stringify(events));

      const removedCount = cleanupExpiredEvents();

      expect(removedCount).toBe(3);
      const remaining = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(remaining).toHaveLength(2);
    });
  });

  describe('clearStoredEvents', () => {
    it('should clear all analytics data', () => {
      const storageKey = 'rtech_analytics_events';
      localStorage.setItem(storageKey, JSON.stringify([{ category: 'test', action: 'test' }]));

      clearStoredEvents();

      expect(localStorage.getItem(storageKey)).toBeNull();
    });

    it('should handle clearing when no data exists', () => {
      expect(() => clearStoredEvents()).not.toThrow();
    });
  });
});
