import { ArrowLeftRight, Wrench, Truck, Shield, Clock, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

const services = [
  {
    icon: ArrowLeftRight,
    title: "Jual Beli & Tukar Tambah",
    description: "Ingin upgrade? Bawa laptop lama Anda dan pulang dengan unit yang lebih gahar. Proses cepat dengan harga terbaik dan transparan.",
    features: ["Harga Kompetitif", "Proses Cepat", "Bebas Nego"],
    hasSalesCTA: true,
  },
  {
    icon: Wrench,
    title: "Servis Profesional",
    description: "Jangan biarkan laptop lemot menghambat kerjamu! Mulai dari pembersihan rutin, upgrade RAM/SSD, hingga perbaikan mesin yang kompleks.",
    features: ["Teknisi Bersertifikat", "Garansi Servis", "Spare Part Original"],
    hasServiceCTA: true,
  },
  {
    icon: Truck,
    title: "Pengiriman Seluruh Indonesia",
    description: "Tidak di Pontianak? Tenang, kami menjamin pengiriman aman ke seluruh pelosok negeri dengan packing premium dan asuransi.",
    features: ["Packing Aman", "Asuransi Pengiriman", "Tracking Real-time"],
  },
];

const ServicesSection = () => {
  return (
     <section id="services" className="py-20 bg-secondary/30 relative z-0">
       {/* Background accent */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-[600px] h-64 md:h-[600px] bg-primary/5 rounded-full blur-[150px]" />

       <div className="container mx-auto px-4 relative z-10">
         {/* Section header */}
         <div className="text-center mb-10 md:mb-12">
           <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
             Layanan Kami
           </span>
           <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
             Solusi Lengkap untuk Laptop Anda
           </h2>
           <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
             Teknisi profesional kami siap mengembalikan performa terbaik gadget Anda
           </p>
         </div>

         {/* Services grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
           {services.map((service, index) => (
             <div
               key={index}
               className="group glass-card rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
             >
               {/* Icon */}
               <div className="mb-6 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                 <service.icon className="h-6 w-6 md:h-7 md:w-7" />
               </div>

               {/* Content */}
               <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-foreground mb-3">
                 {service.title}
               </h3>
               <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                 {service.description}
               </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Sales CTA */}
                {service.hasSalesCTA && (
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a 
                      href={generateWhatsAppLink("sales")} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick({
                        type: 'sales',
                        location: 'services-section',
                        buttonText: 'Tanya Harga Sekarang'
                      })}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Tanya Harga Sekarang
                    </a>
                  </Button>
                )}

                {/* Service CTA */}
                {service.hasServiceCTA && (
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a 
                      href={generateWhatsAppLink("service")} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick({
                        type: 'service',
                        location: 'services-section',
                        buttonText: 'Konsultasi Servis'
                      })}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Konsultasi Servis
                    </a>
                  </Button>
                )}
             </div>
           ))}
         </div>

         {/* Additional trust badges */}
         <div className="mt-14 sm:mt-16 flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
           {[
             { icon: Shield, label: "Garansi Resmi" },
             { icon: Clock, label: "Fast Response" },
             { icon: ThumbsUp, label: "Terpercaya" },
           ].map((badge, index) => (
             <div key={index} className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
               <badge.icon className="h-5 w-5 text-primary" />
               <span className="text-xs sm:text-sm font-medium">{badge.label}</span>
             </div>
           ))}
         </div>
      </div>
    </section>
  );
};

export default ServicesSection;
