import { ShoppingBag, Wrench, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLinkByContact } from "@/lib/whatsapp";

const ContactSelector = () => {
  return (
    <section className="py-10 md:py-12 bg-primary/5 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Mau Konsultasi Langsung?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Pilih kontak yang sesuai dengan kebutuhan Anda untuk respon lebih cepat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Contact */}
            <div className="glass-card rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 group">
             <div className="flex items-start gap-3 md:gap-4">
                 <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                   <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-foreground text-sm mb-1">
                    Jual-Beli & Trade-In
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    Info stok, harga, tukar tambah laptop lama
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-blue-500/30 hover:bg-blue-500 hover:text-white hover:border-blue-500 text-xs sm:text-sm"
                    asChild
                  >
                    <a
                      href={generateWhatsAppLinkByContact("sales")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat Jual-Beli
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Service Contact */}
            <div className="glass-card rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 group">
             <div className="flex items-start gap-3 md:gap-4">
                 <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                   <Wrench className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-foreground text-sm mb-1">
                    Service & Konsultasi
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    Servis laptop, upgrade, perbaikan teknis
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-orange-500/30 hover:bg-orange-500 hover:text-white hover:border-orange-500 text-xs sm:text-sm"
                    asChild
                  >
                    <a
                      href={generateWhatsAppLinkByContact("service")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat Service
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Owner contact - small button below */}
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Ingin konsultasi langsung dengan owner?
            </p>
            <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm">
              <a
                href={generateWhatsAppLinkByContact("owner")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                Chat dengan Owner
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSelector;
