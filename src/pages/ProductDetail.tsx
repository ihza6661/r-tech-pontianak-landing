import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, MessageCircle, Cpu, HardDrive, MemoryStick, Monitor, Sparkles, Shield, Gift, BadgePercent, Share2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTop from "@/components/BackToTop";
import Breadcrumb from "@/components/Breadcrumb";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { formatPriceWithCurrency } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { translateCondition, getConditionBadgeColor } from "@/lib/translations";
import placeholderImg from "@/assets/placeholder.svg";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || "0");

  // Fetch product data
  const { data: product, isLoading, error } = useProduct(productId);

  // Fetch related products (same category)
  const { data: relatedProducts = [] } = useProducts({ 
    perPage: 4,
  });

  // Filter related products (same category, exclude current product)
  const filteredRelatedProducts = product?.category_id 
    ? relatedProducts.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4)
    : [];

  // Calculate discount if original price exists
  const getDiscount = () => {
    if (!product?.specifications?.original_price) return null;
    const originalPrice = parseFloat(product.specifications.original_price);
    const currentPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price));
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return discount > 0 ? { discount, savings: originalPrice - currentPrice, originalPrice } : null;
  };

  const discountInfo = product ? getDiscount() : null;

  // Share function
  const handleShare = async () => {
    const shareData = {
      title: product?.name || "R-Tech Computer",
      text: `${product?.name} - ${formatPriceWithCurrency(product?.price || 0)}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-lg text-muted-foreground">Memuat detail produk...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state / Product not found
  if (error || !product) {
    return (
      <>
        <Helmet>
          <title>Produk Tidak Ditemukan - R-Tech Computer Pontianak</title>
          <meta name="description" content="Produk yang Anda cari tidak tersedia. Jelajahi koleksi laptop bekas berkualitas kami di R-Tech Computer Pontianak." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="text-center max-w-md">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Produk Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">
              Produk yang Anda cari tidak tersedia atau sudah terjual.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={generateWhatsAppLink("general")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const whatsappLink = product.stock > 0 
    ? generateWhatsAppLink("product", product.name)
    : generateWhatsAppLink("sold_out", product.name);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{product.name} - R-Tech Computer Pontianak</title>
        <meta name="description" content={product.description || `${product.name} - Laptop bekas berkualitas dari R-Tech Computer`} />
        <meta name="keywords" content={`${product.name}, laptop bekas, ${product.specifications?.processor || ''}, pontianak, r-tech computer`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} - R-Tech Computer`} />
        <meta property="og:description" content={product.description || ''} />
        <meta property="og:image" content={product.image_url || placeholderImg} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - R-Tech Computer`} />
        <meta name="twitter:description" content={product.description || ''} />
        <meta name="twitter:image" content={product.image_url || placeholderImg} />
        
        {/* Canonical */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb & Back Button */}
        <div className="container mx-auto px-4 pb-6 pt-20 sm:32">
          <div className="flex items-center justify-between mb-4">
            <Breadcrumb 
              items={[
                { label: 'Produk', href: '/#products' },
                { label: product.name }
              ]} 
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="hidden sm:flex"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>

          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-secondary/50 rounded-2xl overflow-hidden">
                <img
                  src={product.image_url || placeholderImg}
                  alt={product.name}
                  className={`w-full h-full object-cover ${product.stock === 0 ? 'grayscale' : ''}`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = placeholderImg;
                  }}
                />
                
                {/* Sold Out Overlay */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-red-500 text-white text-2xl font-bold px-8 py-4 rounded-lg rotate-[-12deg] shadow-lg">
                      TERJUAL
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {discountInfo && product.stock > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                    {discountInfo.discount}% OFF
                  </div>
                )}
              </div>

              {/* Share Button */}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan Produk Ini
              </Button>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Product Name & Condition */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {product.name}
                  </h1>
                  {product.specifications?.condition && (
                    <Badge className={getConditionBadgeColor(product.specifications.condition)}>
                      {translateCondition(product.specifications.condition)}
                    </Badge>
                  )}
                </div>

                {/* Stock Status */}
                {product.stock > 0 ? (
                  <p className="text-green-600 dark:text-green-500 font-medium flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Stok Tersedia ({product.stock} unit)
                  </p>
                ) : (
                  <p className="text-red-600 dark:text-red-500 font-medium">
                    Stok Habis
                  </p>
                )}
              </div>

              <Separator />

              {/* Price Section */}
              <div className="space-y-2">
                {discountInfo && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPriceWithCurrency(discountInfo.originalPrice)}
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      <BadgePercent className="h-3 w-3 mr-1" />
                      Hemat {formatPriceWithCurrency(discountInfo.savings)}
                    </Badge>
                  </div>
                )}
                <p className="text-4xl font-bold text-primary">
                  {formatPriceWithCurrency(product.price)}
                </p>
              </div>

              <Separator />

              {/* Description */}
              {product.description && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Deskripsi</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Spesifikasi</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.specifications.processor && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <Cpu className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Processor</p>
                          <p className="font-medium">{product.specifications.processor}</p>
                        </div>
                      </div>
                    )}

                    {product.specifications.gpu && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <Sparkles className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">GPU</p>
                          <p className="font-medium">{product.specifications.gpu}</p>
                        </div>
                      </div>
                    )}

                    {product.specifications.ram && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <MemoryStick className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">RAM</p>
                          <p className="font-medium">{product.specifications.ram}</p>
                        </div>
                      </div>
                    )}

                    {product.specifications.storage && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <HardDrive className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Storage</p>
                          <p className="font-medium">{product.specifications.storage}</p>
                        </div>
                      </div>
                    )}

                    {product.specifications.display && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <Monitor className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Display</p>
                          <p className="font-medium">{product.specifications.display}</p>
                        </div>
                      </div>
                    )}

                    {product.specifications.keyboard && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <div className="h-5 w-5 text-primary flex-shrink-0 mt-0.5">⌨️</div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Keyboard</p>
                          <p className="font-medium">{product.specifications.keyboard}</p>
                        </div>
                      </div>
                    )}

                    {product.specifications.battery && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <div className="h-5 w-5 text-primary flex-shrink-0 mt-0.5">🔋</div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Battery</p>
                          <p className="font-medium">{product.specifications.battery}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Warranty & Extras */}
              {(product.specifications?.warranty || product.specifications?.extras) && (
                <div className="space-y-4">
                  {product.specifications.warranty && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-600 dark:text-green-500 mb-1">
                            Garansi
                          </p>
                          <p className="text-sm">{product.specifications.warranty}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {product.specifications.extras && (
                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <div className="flex items-start gap-3">
                        <Gift className="h-5 w-5 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-orange-600 dark:text-orange-500 mb-1">
                            Bonus & Kelengkapan
                          </p>
                          <p className="text-sm">{product.specifications.extras}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CTA Buttons - Desktop */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  variant={product.stock > 0 ? "default" : "outline"} 
                  size="lg" 
                  className="flex-1"
                  asChild
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {product.stock > 0 ? "Hubungi via WhatsApp" : "Cari Produk Serupa"}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {filteredRelatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Produk Terkait
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredRelatedProducts.map((relatedProduct) => (
                  <Link 
                    key={relatedProduct.id} 
                    to={`/products/${relatedProduct.id}`}
                    className="group glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                  >
                    {/* Compact Product Card */}
                    <div className="relative aspect-square bg-secondary/50">
                      <img
                        src={relatedProduct.image_url || placeholderImg}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = placeholderImg;
                        }}
                      />
                      {relatedProduct.stock > 0 && (
                        <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                          {relatedProduct.stock} Stok
                        </span>
                      )}
                      {relatedProduct.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                            TERJUAL
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary font-bold">
                        {formatPriceWithCurrency(relatedProduct.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t z-50">
          <Button 
            variant={product.stock > 0 ? "default" : "outline"} 
            size="lg" 
            className="w-full"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              {product.stock > 0 ? "Hubungi via WhatsApp" : "Cari Produk Serupa"}
            </a>
          </Button>
        </div>

        {/* Add bottom padding on mobile to prevent content from being hidden by sticky CTA */}
        <div className="lg:hidden h-24" />
      </main>

      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
};

export default ProductDetail;
