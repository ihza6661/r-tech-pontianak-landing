import { Eye, Apple, Truck, Clock, MapPin, Phone } from "lucide-react";
import { COMPANY_INFO, WHATSAPP_NUMBERS } from "@/lib/constants";
import { formatWhatsAppNumber } from "@/lib/whatsapp";

const trustPoints = [
  {
    icon: Clock,
    title: "Pengalaman 10+ Tahun",
    description: "Kami telah melayani ribuan pelanggan di Pontianak dan seluruh Indonesia sejak tahun 2014.",
  },
  {
    icon: Apple,
    title: "Spesialis Macbook",
    description: "Ahli dalam menangani berbagai kendala Macbook dan menyediakan unit second dengan kondisi prima.",
  },
  {
    icon: Eye,
    title: "Unit Ready di Sorotan",
    description: "Cek stok unit terbaru langsung di highlight Instagram kami. Update setiap hari!",
  },
  {
    icon: Truck,
    title: "Siap Kirim Se-Indonesia",
    description: "Tidak di Pontianak? Tenang, kami menjamin pengiriman aman ke seluruh pelosok negeri.",
  },
];

const LocationSection = () => {
  const formattedPhoneOwner = formatWhatsAppNumber(WHATSAPP_NUMBERS.owner);
  const formattedPhoneSales = formatWhatsAppNumber(WHATSAPP_NUMBERS.sales);
  const formattedPhoneService = formatWhatsAppNumber(WHATSAPP_NUMBERS.service);

  return (
    <section id="contact" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Kenapa R-Tech?
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Toko Laptop Terpercaya di Pontianak
          </h2>
        </div>

        {/* Trust points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
               <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary mb-4">
                 <point.icon className="h-6 w-6 md:h-7 md:w-7" />
               </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Map and contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="glass-card rounded-2xl overflow-hidden h-[400px]">
            <iframe
              src={COMPANY_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="R-Tech Computer Location"
            />
          </div>

          {/* Contact info */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-center">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              Kunjungi Toko Kami
            </h3>

            <div className="space-y-6">
               <div className="flex items-start gap-3 md:gap-4">
                 <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                   <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Alamat</h4>
                  <p className="text-muted-foreground">
                    {COMPANY_INFO.address}<br />
                    Kalimantan Barat, Indonesia
                  </p>
                </div>
              </div>

               <div className="flex items-start gap-3 md:gap-4">
                 <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                   <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Owner:</span> {formattedPhoneOwner}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Jual-Beli:</span> {formattedPhoneSales}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Service:</span> {formattedPhoneService}
                    </p>
                  </div>
                </div>
              </div>

               <div className="flex items-start gap-3 md:gap-4">
                 <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                   <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Jam Operasional</h4>
                  <p className="text-muted-foreground">
                    {COMPANY_INFO.operatingHours.weekdays}<br />
                    {COMPANY_INFO.operatingHours.weekend}
                  </p>
                </div>
              </div>
            </div>

            {/* Coverage area */}
            <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-primary">📦 Area Pengiriman:</span>{" "}
                Seluruh Kalimantan Barat & Indonesia. Packing aman dengan asuransi!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
