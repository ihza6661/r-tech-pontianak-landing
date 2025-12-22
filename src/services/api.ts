import { APP_CONFIG } from '@/lib/config';

/**
 * Query Keys Factory
 * 
 * Standardized query keys for React Query cache management.
 * Follows hierarchical structure: [entity, scope, ...identifiers]
 * 
 * Benefits:
 * - Type-safe cache key access
 * - Easy cache invalidation
 * - Prevents cache key typos
 * 
 * Usage:
 * const { data } = useQuery({
 *   queryKey: queryKeys.products.list({ per_page: 8 }),
 *   queryFn: () => api.getProducts(...)
 * })
 */
export const queryKeys = {
  /**
   * Product-related query keys
   */
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => 
      [...queryKeys.products.lists(), { filters }] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.products.details(), id] as const,
  },
  
  /**
   * Category-related query keys
   */
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.categories.all, id] as const,
  },
  
  /**
   * Contact form submissions
   * Note: Mutations typically don't need query keys, but included for consistency
   */
  contacts: {
    all: ['contacts'] as const,
  },
};

export interface ProductSpecifications {
  processor?: string
  gpu?: string
  ram?: string
  storage?: string
  display?: string
  keyboard?: string
  battery?: string
  warranty?: string
  condition?: string
  extras?: string
  original_price?: string
  features?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  sku: string
  image_url: string
  image_thumbnail_url?: string
  stock: number
  specifications?: ProductSpecifications
  category_id: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
}

export interface Contact {
  name: string
  email: string
  phone?: string
  category: 'sales_inquiry' | 'tech_support' | 'general'
  message: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = APP_CONFIG.apiUrl) {
    this.baseUrl = baseUrl
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(error.message || `API Error: ${response.status}`)
    }

    return response.json()
  }

  // Products
  async getProducts(page = 1, filters: {
    search?: string
    category_id?: number
    sort_by?: string
    order?: string
  } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: '12',
      ...(filters.search && { search: filters.search }),
      ...(filters.category_id && { category_id: filters.category_id.toString() }),
      ...(filters.sort_by && { sort_by: filters.sort_by }),
      ...(filters.order && { order: filters.order }),
    })

    return this.fetch(`/products?${params.toString()}`) as Promise<PaginatedResponse<Product>>
  }

  async getProduct(id: number) {
    return this.fetch(`/products/${id}`) as Promise<Product>
  }

  // Categories
  async getCategories() {
    return this.fetch('/categories') as Promise<Category[]>
  }

  async getCategory(id: number) {
    return this.fetch(`/categories/${id}`) as Promise<Category>
  }

  // Contacts
  async submitContact(data: Contact) {
    return this.fetch('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const api = new ApiClient()
