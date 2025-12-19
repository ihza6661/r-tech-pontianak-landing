import { Shield, Eye, Users, Clock, MapPin, Phone } from "lucide-react";

const trustPoints = [
  {
    icon: Clock,
    title: "Dipercaya Sejak 2014",
    description: "Lebih dari 10 tahun melayani kebutuhan laptop di Pontianak dengan dedikasi penuh.",
  },
  {
    icon: Eye,
    title: "Unit Ready di Sorotan",
    description: "Cek stok unit terbaru langsung di highlight Instagram kami. Update setiap hari!",
  },
  {
    icon: Users,
    title: "Teknisi Profesional",
    description: "Tim teknisi berpengalaman dan bersertifikat untuk servis laptop & Macbook.",
  },
  {
    icon: Shield,
    title: "Garansi Resmi",
    description: "Setiap unit dilengkapi garansi. Kami jamin kualitas setiap produk yang kami jual.",
  },
];

const LocationSection = () => {
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
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <point.icon className="h-7 w-7" />
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.818!2d109.3445!3d-0.0467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJln.%20Reformasi%20Untan%2C%20Pontianak!5e0!3m2!1sen!2sid!4v1234567890"
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
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Alamat</h4>
                  <p className="text-muted-foreground">
                    Jln. Reformasi Untan, Pontianak<br />
                    Kalimantan Barat, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                  <p className="text-muted-foreground">
                    +62 812-3456-7890
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Jam Operasional</h4>
                  <p className="text-muted-foreground">
                    Senin - Sabtu: 09:00 - 21:00<br />
                    Minggu: 10:00 - 18:00
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
