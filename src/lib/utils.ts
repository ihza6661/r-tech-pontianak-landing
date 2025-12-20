import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price value to Indonesian Rupiah format
 * @param price - Price as number or string
 * @returns Formatted price string (e.g., "35.000.000")
 */
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'number' ? price : parseFloat(price);
  return numPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 });
}

/**
 * Format a price value with Rupiah currency symbol
 * @param price - Price as number or string
 * @returns Formatted price with currency (e.g., "Rp 35.000.000")
 */
export function formatPriceWithCurrency(price: number | string): string {
  return `Rp ${formatPrice(price)}`;
}
