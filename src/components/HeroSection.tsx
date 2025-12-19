import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import rtechLogo from "@/assets/rtech-logo.jpg";

const HeroSection = () => {
  const whatsappLink = "https://wa.me/6281234567890?text=Halo%20R-Tech,%20saya%20ingin%20konsultasi%20laptop";

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 pt-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img 
              src={rtechLogo} 
              alt="R-Tech Computer Logo" 
              className="h-12 w-12 rounded-lg object-cover"
            />
            <span className="font-display text-xl font-bold text-foreground">
              R-Tech <span className="text-primary">Computer</span>
            </span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="#contact">Hubungi Kami</a>
          </Button>
        </nav>

        {/* Hero content */}
        <div className="flex flex-col items-center justify-center text-center pt-20 pb-32 lg:pt-32 lg:pb-40">
          {/* Badge */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Dipercaya Sejak 2014
            </span>
          </div>

          {/* Main headline */}
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-slide-up">
            Pusat Laptop & Macbook{" "}
            <span className="text-gradient">Bekas Berkualitas</span>{" "}
            di Pontianak
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Jual Beli, Tukar Tambah, dan Servis Profesional.{" "}
            <span className="text-foreground font-medium">Siap kirim ke seluruh Kalbar & Indonesia!</span>
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="xl" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Konsultasi WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#products">Lihat Stok Unit</a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { value: "10+", label: "Tahun Pengalaman" },
              { value: "5000+", label: "Unit Terjual" },
              { value: "4.9★", label: "Rating Google" },
              { value: "100%", label: "Garansi Resmi" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
