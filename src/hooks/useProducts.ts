import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '@/services/api';
import { toast } from 'sonner';

/**
 * Options for useProducts hook
 */
interface UseProductsOptions {
  /**
   * Number of products to fetch per page
   * @default 8
   */
  perPage?: number;
  
  /**
   * Enable or disable the query
   * @default true
   */
  enabled?: boolean;
}

/**
 * React Query hook for fetching products from the API
 * 
 * Features:
 * - Automatic caching (5 minutes stale time)
 * - Error handling with Indonesian toast notifications
 * - Handles paginated API responses
 * - Request deduplication
 * - Background refetching
 * 
 * @example
 * ```tsx
 * const { data: products = [], isLoading, error } = useProducts({ perPage: 8 });
 * 
 * if (isLoading) return <div>Loading...</div>
 * if (error) return <div>Error occurred</div>
 * 
 * return products.map(product => <ProductCard key={product.id} {...product} />)
 * ```
 */
export function useProducts(options: UseProductsOptions = {}) {
  const { perPage = 8, enabled = true } = options;

  const query = useQuery({
    queryKey: queryKeys.products.list({ per_page: perPage }),
    queryFn: async () => {
      try {
        const response = await api.getProducts(1, {});
        
        // Handle paginated response structure
        // Backend returns either { data: [...] } or [...]
        const productList = response.data || response;
        
        return Array.isArray(productList) ? productList : [];
      } catch (error) {
        // Show error toast with Indonesian message
        toast.error('Gagal memuat produk', {
          description: error instanceof Error 
            ? error.message 
            : 'Terjadi kesalahan saat memuat data produk. Silakan coba lagi.',
        });
        throw error; // Re-throw to let React Query handle the error state
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Don't refetch when user returns to tab
  });

  return query;
}
