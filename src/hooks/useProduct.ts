import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '@/services/api';
import { toast } from 'sonner';

/**
 * Options for useProduct hook
 */
interface UseProductOptions {
  /**
   * Enable or disable the query
   * @default true
   */
  enabled?: boolean;
}

/**
 * React Query hook for fetching a single product from the API
 * 
 * Features:
 * - Automatic caching (5 minutes stale time)
 * - Error handling with Indonesian toast notifications
 * - Includes category relation data
 * - Request deduplication
 * 
 * @param productId - The ID of the product to fetch
 * @param options - Configuration options for the query
 * 
 * @example
 * ```tsx
 * const { data: product, isLoading, error } = useProduct(1);
 * 
 * if (isLoading) return <div>Loading...</div>
 * if (error) return <div>Error occurred</div>
 * 
 * return <ProductDetail product={product} />
 * ```
 */
export function useProduct(productId: number, options: UseProductOptions = {}) {
  const { enabled = true } = options;

  const query = useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: async () => {
      try {
        const response = await api.getProduct(productId);
        
        // Handle API response structure
        // Backend returns { data: {...} } for single resource
        const product = response.data || response;
        
        return product;
      } catch (error) {
        // Show error toast with Indonesian message
        toast.error('Gagal memuat detail produk', {
          description: error instanceof Error 
            ? error.message 
            : 'Terjadi kesalahan saat memuat data produk. Silakan coba lagi.',
        });
        throw error; // Re-throw to let React Query handle the error state
      }
    },
    enabled: enabled && !!productId, // Only fetch if enabled and productId exists
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Don't refetch when user returns to tab
  });

  return query;
}
