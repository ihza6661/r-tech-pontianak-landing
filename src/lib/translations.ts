/**
 * Translation utilities for R-Tech Computer
 * 
 * Provides translation functions for product conditions and other UI text
 * from English to Indonesian.
 */

/**
 * Product condition translations (English to Indonesian)
 */
export const conditionTranslations = {
  'Used': 'Bekas',
  'Used - Excellent': 'Bekas - Sangat Baik',
  'Like New': 'Seperti Baru',
  'Excellent': 'Sangat Baik',
  'Good': 'Baik',
  'Fair': 'Cukup Baik',
  'New': 'Baru',
} as const;

/**
 * Translate product condition from English to Indonesian
 * 
 * @param condition - The condition string in English
 * @returns Translated condition in Indonesian
 * 
 * @example
 * translateCondition('Used') // Returns: 'Bekas'
 * translateCondition('Like New') // Returns: 'Seperti Baru'
 * translateCondition('Used - Excellent') // Returns: 'Bekas - Sangat Baik'
 */
export function translateCondition(condition: string): string {
  // Try exact match first
  if (condition in conditionTranslations) {
    return conditionTranslations[condition as keyof typeof conditionTranslations];
  }
  
  // Fallback: handle case-insensitive partial matches
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('excellent') || lowerCondition.includes('like new')) {
    return 'Seperti Baru';
  }
  
  if (lowerCondition.includes('good')) {
    return 'Baik';
  }
  
  if (lowerCondition.includes('fair')) {
    return 'Cukup Baik';
  }
  
  if (lowerCondition.includes('used') || lowerCondition.includes('bekas')) {
    return 'Bekas';
  }
  
  if (lowerCondition.includes('new') || lowerCondition.includes('baru')) {
    return 'Baru';
  }
  
  // Return original if no translation found
  return condition;
}

/**
 * Get color class for condition badge based on condition type
 * 
 * @param condition - The condition string (in any language)
 * @returns Tailwind CSS classes for the badge
 */
export function getConditionBadgeColor(condition: string): string {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('excellent') || lowerCondition.includes('like new') || 
      lowerCondition.includes('sangat baik') || lowerCondition.includes('seperti baru')) {
    return 'bg-green-500/90 text-white';
  }
  
  if (lowerCondition.includes('good') || lowerCondition.includes('baik')) {
    return 'bg-blue-500/90 text-white';
  }
  
  if (lowerCondition.includes('fair') || lowerCondition.includes('cukup')) {
    return 'bg-yellow-500/90 text-white';
  }
  
  if (lowerCondition.includes('used') || lowerCondition.includes('bekas')) {
    return 'bg-blue-500/90 text-white';
  }
  
  if (lowerCondition.includes('new') || lowerCondition.includes('baru')) {
    return 'bg-green-600/90 text-white';
  }
  
  // Default
  return 'bg-gray-500/90 text-white';
}
