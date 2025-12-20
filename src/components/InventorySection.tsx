import { Cpu, HardDrive, MemoryStick, Monitor, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { COMPANY_INFO } from "@/lib/constants";
import { useEffect, useState } from "react";
import { formatPriceWithCurrency } from "@/lib/utils";

interface Product {
  id: number
  name: string
  price: number | string
  description: string
  specifications: Record<string, string>
  image_url: string
  stock: number
}

const InventorySection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api"
    
    // Add cache-busting timestamp and fetch with no-cache
    fetch(`${apiUrl}/products?per_page=8&_=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
      .then((res) => {
        console.log('✅ Products API Response Status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('✅ Products API Data:', data)
        // Handle paginated response
        const productList = data.data || data
        console.log('✅ Product List:', productList)
        setProducts(Array.isArray(productList) ? productList : [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("❌ Failed to fetch products:", error)
        setLoading(false)
      })
  }, [])
  return (
    <section id="products" className="py-20 bg-background relative">
       <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-10 md:mb-12">
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              Ready Unit
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Stok Tersedia Hari Ini
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Unit siap pakai dengan garansi. Hubungi kami untuk cek ketersediaan terbaru!
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
           {loading ? (
             <div className="col-span-full text-center py-12">
               <p className="text-muted-foreground">Loading products...</p>
             </div>
           ) : products.length === 0 ? (
             <div className="col-span-full text-center py-12">
               <p className="text-muted-foreground">No products available at the moment.</p>
             </div>
           ) : (
             products.map((product) => (
              <div
                key={product.id}
                className={`group glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 ${
                  product.stock === 0 ? 'opacity-75' : ''
                }`}
              >
                {/* Image */}
                <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null; // Prevent infinite loop
                        target.src = `https://via.placeholder.com/500x500/e5e7eb/6b7280?text=${encodeURIComponent(product.name.substring(0, 20))}`;
                      }}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        product.stock === 0 ? 'grayscale' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {/* Sold Out Overlay */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-red-500 text-white text-base sm:text-lg font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg rotate-[-12deg] shadow-lg">
                        TERJUAL
                      </span>
                    </div>
                  )}
                  {/* Badge */}
                  {product.stock > 0 && (
                    <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary/90 text-primary-foreground text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                      {product.stock} Stok
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">
                    {product.name}
                  </h3>

                  {/* Specs */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {product.specifications && (
                      <>
                        {product.specifications.processor && (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary/70" />
                            <span>{product.specifications.processor}</span>
                          </div>
                        )}
                        {product.specifications.storage && (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <HardDrive className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary/70" />
                            <span>{product.specifications.storage}</span>
                          </div>
                        )}
                        {product.specifications.ram && (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <MemoryStick className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary/70" />
                            <span>RAM {product.specifications.ram}</span>
                          </div>
                        )}
                        {product.specifications.display && (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Monitor className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary/70" />
                            <span>{product.specifications.display}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-display text-base sm:text-lg font-bold ${
                      product.stock > 0 ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {formatPriceWithCurrency(product.price)}
                    </span>
                    <Button 
                      variant={product.stock > 0 ? "whatsapp" : "outline"} 
                      size="sm" 
                      asChild
                    >
                      <a
                        href={
                          product.stock > 0 
                            ? generateWhatsAppLink("product", product.name)
                            : generateWhatsAppLink("sold_out", product.name)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {product.stock > 0 ? "Tanya" : "Cari Serupa"}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))
           )}
         </div>

         {/* Instagram CTA - Enhanced */}
         <div className="mt-12 sm:mt-16">
           <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-12 text-center">
             <div className="max-w-2xl mx-auto">
               <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 mb-4 sm:mb-6">
                 <svg
                   className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                   fill="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                 </svg>
               </div>
               
               <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                 Update Stok Setiap Hari di Instagram
               </h3>
               <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                 Lihat ratusan unit laptop & Macbook ready stock lainnya. Update terbaru ada di{" "}
                 <span className="text-primary font-semibold">{COMPANY_INFO.instagramHandle}</span>
                 {" "}dengan highlight terpisah per kategori budget!
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6">
                 <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 w-full sm:w-auto">
                   <a href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer">
                     <svg
                       className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                       fill="currentColor"
                       viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                     </svg>
                     Follow Instagram Kami
                   </a>
                 </Button>
                 <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                   <a
                     href={generateWhatsAppLink("general")}
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                     Tanya Stok via WhatsApp
                   </a>
                 </Button>
               </div>
               
               <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                 <span className="inline-flex items-center gap-1">
                   <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   Stories Update Harian
                 </span>
                 <span>•</span>
                 <span>Highlight Per Kategori</span>
                 <span>•</span>
                 <span>Promo Eksklusif</span>
               </div>
             </div>
           </div>
         </div>
      </div>
    </section>
  );
};

export default InventorySection;
