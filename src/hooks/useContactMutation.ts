import { useMutation } from '@tanstack/react-query';
import { api, Contact } from '@/services/api';
import { toast } from 'sonner';

/**
 * React Query mutation hook for submitting contact form
 * 
 * Features:
 * - Handles form submission to backend API
 * - Indonesian error messages via toast notifications
 * - Success handling managed by component (as per requirements)
 * - Type-safe form data validation
 * 
 * @example
 * ```tsx
 * const mutation = useContactMutation();
 * 
 * const handleSubmit = (e) => {
 *   e.preventDefault();
 *   
 *   mutation.mutate(formData, {
 *     onSuccess: () => {
 *       setSubmitted(true);
 *       setFormData({ ... }); // reset form
 *     },
 *     onError: (error) => {
 *       if (error.response?.data?.errors) {
 *         setErrors(error.response.data.errors);
 *       }
 *     }
 *   });
 * };
 * 
 * // In JSX
 * <Button disabled={mutation.isPending}>
 *   {mutation.isPending ? 'Mengirim...' : 'Kirim Pesan'}
 * </Button>
 * ```
 */
export function useContactMutation() {
  return useMutation({
    mutationFn: async (data: Contact) => {
      try {
        return await api.submitContact(data);
      } catch (error) {
        // Show generic error toast in Indonesian
        toast.error('Gagal mengirim pesan', {
          description: error instanceof Error 
            ? error.message 
            : 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.',
        });
        throw error; // Re-throw for component-level error handling
      }
    },
    retry: 0, // Don't retry form submissions
  });
}
