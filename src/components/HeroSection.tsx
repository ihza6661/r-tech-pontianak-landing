import {
  MessageCircle,
  Apple,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import rtechLogo from "@/assets/rtech-logo.jpg";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { COMPANY_INFO, WHATSAPP_NUMBERS } from "@/lib/constants";
import { useState, useEffect } from "react";
import { trackWhatsAppClick, trackNavigation } from "@/lib/analytics";

const HeroSection = () => {
  const whatsappLink = generateWhatsAppLink("general");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Beranda" },
    { href: "#products", label: "Laptop & Macbook" },
    { href: "#services", label: "Servis" },
    { href: "#testimonials", label: "Testimoni" },
    { href: "#location", label: "Lokasi" },
    { href: "#contact", label: "Kontak" },
  ];

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 md:w-72 h-32 md:h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-10 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 pt-8">
        {/* Navigation - Sticky Header */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
              : "bg-background/95 backdrop-blur-md border-b border-border/50 md:bg-transparent md:border-transparent"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2 md:py-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img
                  src={rtechLogo}
                  alt="R-Tech Computer Logo"
                  className="h-9 w-9 md:h-12 md:w-12 rounded-lg object-cover"
                />
                <div>
                  <span className="font-display text-base md:text-xl font-bold text-foreground">
                    R-Tech <br />
                    <span className="text-primary">Computer</span>
                  </span>
                </div>
              </div>

              {/* Right side content */}
              <div className="flex items-center">
                {/* Desktop NAP Info */}
                <div className="hidden lg:flex items-center gap-6 text-sm">
                  <a
                    href={`tel:+${WHATSAPP_NUMBERS.owner}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">0821-5700-0466</span>
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Sen-Sab: 09:00-21:00</span>
                  </div>
                </div>
                {/* Divider */}
                <div className="hidden md:block mx-4 h-6 w-px bg-border" />
                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() =>
                        trackNavigation({
                          from: "header-nav",
                          to: link.label,
                          method: "click",
                        })
                      }
                      className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Mobile - Phone + Menu Toggle */}
                <div className="flex md:hidden items-center gap-2">
                  <a
                    href={`tel:+${WHATSAPP_NUMBERS.owner}`}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Telepon"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-border animate-fade-in">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        trackNavigation({
                          from: "mobile-nav",
                          to: link.label,
                          method: "click",
                        });
                      }}
                      className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero content */}
        <div className="flex flex-col items-center justify-center text-center pt-32 pb-32 lg:pt-40 lg:pb-40">
          {/* Badges */}
          <div className="mb-8 animate-fade-in flex flex-wrap justify-center gap-2 md:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Dipercaya Sejak {COMPANY_INFO.foundedYear}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Apple className="h-4 w-4" />
              Spesialis Macbook
            </span>
          </div>

          {/* Main headline */}
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-slide-up">
            Solusi Laptop & Macbook{" "}
            <span className="text-gradient">Terpercaya</span> di Pontianak
          </h1>

          {/* Sub-headline */}
          <p
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Cari unit berkualitas dengan harga terjangkau? Kami menyediakan{" "}
            <span className="text-foreground font-medium">
              laptop bekas rasa baru
            </span>
            , layanan tukar tambah, dan servis profesional untuk semua brand.
          </p>

          {/* CTA buttons */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    type: "general",
                    location: "hero-section",
                    buttonText: "Chat Sekarang - Respon 5 Menit",
                  })
                }
              >
                <MessageCircle className="h-5 w-5" />
                Chat Sekarang - Respon 5 Menit
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a
                href="#products"
                onClick={() =>
                  trackNavigation({
                    from: "hero",
                    to: "products",
                    method: "click",
                  })
                }
              >
                Lihat Stok Unit
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              {
                value: `${COMPANY_INFO.yearsInBusiness}+`,
                label: "Tahun Pengalaman",
              },
              { value: "5000+", label: "Unit Terjual" },
              { value: "4.9★", label: "Rating Google" },
              { value: "100%", label: "Garansi Resmi" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
