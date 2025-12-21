import { Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useContactMutation } from "@/hooks/useContactMutation";

interface FormData {
  name: string
  email: string
  phone: string
  category: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const ContactFormSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    category: "general",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  
  // Use React Query mutation for form submission
  const mutation = useContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    mutation.mutate(formData, {
      onSuccess: () => {
        // Show success message (as per requirements)
        setSubmitted(true)
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "general",
          message: "",
        })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      },
      onError: (error: Error & { response?: { data?: { errors?: FormErrors } } }) => {
        // Handle validation errors from backend
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors)
        } else {
          setErrors({ general: "Gagal menghubungi server. Silakan coba lagi." })
        }
      }
    })
  }

  return (
    <section id="contact" className="py-20 bg-background relative" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Hubungi Kami
            </span>
            <h2 id="contact-heading" className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
              Kirim Pesan Langsung
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Ada pertanyaan? Isi formulir di bawah dan kami akan merespon sesegera mungkin.
              Atau hubungi kami langsung via WhatsApp untuk respon lebih cepat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Contact Info Cards */}
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">
                Chat langsung untuk respon tercepat
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">
                Respons dalam 1x24 jam kerja
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Telepon</h3>
              <p className="text-sm text-muted-foreground">
                Hubungi kami di jam kerja
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-8">
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✓ Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.
              </div>
            )}

            {errors.general && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="contact-heading">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Contoh: John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    placeholder="+62 812 3456 7890"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-category" className="block text-sm font-medium text-foreground mb-2">
                    Kategori Pertanyaan *
                  </label>
                  <select
                    id="contact-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.category}
                    aria-describedby={errors.category ? "category-error" : undefined}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="general">Pertanyaan Umum</option>
                    <option value="sales_inquiry">Pertanyaan Penjualan</option>
                    <option value="tech_support">Dukungan Teknis</option>
                  </select>
                  {errors.category && (
                    <p id="category-error" role="alert" className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                  Pesan *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Tuliskan pesan Anda di sini..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {mutation.isPending ? "Mengirim..." : "Kirim Pesan"}
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                  Untuk respon lebih cepat, hubungi kami via WhatsApp
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection
