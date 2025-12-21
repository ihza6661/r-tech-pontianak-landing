import {
  Wrench,
  Laptop,
  HardDrive,
  Cpu,
  Battery,
  Monitor,
  Zap,
  MessageCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

const repairServices = [
  {
    icon: Monitor,
    title: "Ganti LCD / Layar",
    laptopPrice: "Mulai Rp 800rb",
    macbookPrice: "Mulai Rp 1.5jt",
    description: "Layar pecah, bergaris, atau mati total",
    popular: true,
  },
  {
    icon: Battery,
    title: "Ganti Baterai",
    laptopPrice: "Mulai Rp 400rb",
    macbookPrice: "Mulai Rp 600rb",
    description: "Baterai cepat habis atau tidak mengisi",
  },
  {
    icon: HardDrive,
    title: "Upgrade SSD",
    laptopPrice: "Mulai Rp 350rb",
    macbookPrice: "Mulai Rp 500rb",
    description: "Laptop lemot? Upgrade ke SSD untuk speed maksimal",
    popular: true,
  },
  {
    icon: Cpu,
    title: "Upgrade RAM",
    laptopPrice: "Mulai Rp 300rb",
    macbookPrice: "Mulai Rp 800rb",
    description: "Tambah RAM untuk multitasking lebih lancar",
  },
  {
    icon: Wrench,
    title: "Service Mati Total",
    laptopPrice: "Mulai Rp 300rb",
    macbookPrice: "Mulai Rp 500rb",
    description: "Tidak bisa nyala, kena air, atau kerusakan mesin",
  },
  {
    icon: Zap,
    title: "Cleaning & Maintenance",
    laptopPrice: "Mulai Rp 150rb",
    macbookPrice: "Mulai Rp 200rb",
    description: "Pembersihan rutin, ganti thermal paste",
  },
];

const includedFeatures = [
  "Diagnostik gratis",
  "Garansi servis 1-3 bulan",
  "Spare part berkualitas",
  "Pengerjaan oleh teknisi bersertifikat",
  "Estimasi waktu pengerjaan jelas",
];

const ServicePricingSection = () => {
  return (
    <section className="py-20 bg-background relative z-0">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-64 md:w-[500px] h-64 md:h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Harga Transparan
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Daftar Harga Servis Laptop & Macbook
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Harga bisa bervariasi tergantung tipe dan kondisi unit. <br />
            <span className="text-primary font-medium">
              Hubungi kami untuk estimasi harga lebih akurat!
            </span>
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {repairServices.map((service, index) => (
            <div
              key={index}
              className={`group glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 relative ${
                service.popular ? "border-primary/30" : ""
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Populer
                </span>
              )}

              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Pricing */}
              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    <Laptop className="h-4 w-4 inline mr-1" />
                    Laptop Reguler
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {service.laptopPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    <svg
                      className="h-4 w-4 inline mr-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.8 2.8C20.5 2.4 20.1 2 19.6 2H4.4C3.9 2 3.5 2.4 3.2 2.8L2 5.5V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V5.5L20.8 2.8M20 18H4V6.7L4.8 5H19.2L20 6.7V18M12 9C10.3 9 9 10.3 9 12S10.3 15 12 15 15 13.7 15 12 13.7 9 12 9Z" />
                    </svg>
                    Macbook
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {service.macbookPrice}
                  </span>
                </div>
              </div>

              {/* Info note */}
              <p className="text-xs text-muted-foreground italic">
                *Harga final setelah pengecekan unit
              </p>
            </div>
          ))}
        </div>

        {/* What's Included Section */}
        <div className="glass-card rounded-2xl p-6 md:p-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            <div>
              <h3 className="font-display text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                Yang Anda Dapatkan
              </h3>
              <p className="text-muted-foreground mb-6">
                Semua servis kami sudah termasuk jaminan kualitas dan garansi
                resmi untuk ketenangan Anda.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {includedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="bg-primary/5 rounded-xl p-6 md:p-8 text-center border border-primary/20 md:sticky md:top-24">
              {/* <Wrench className="h-12 w-12 text-primary mx-auto mb-4" /> */}
              <Wrench className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />

              <h4 className="font-display text-xl font-bold text-foreground mb-2">
                Butuh Estimasi Harga?
              </h4>
              <p className="text-sm text-muted-foreground mb-6">
                Chat langsung dengan teknisi kami untuk mendapatkan perkiraan
                biaya yang lebih detail dan akurat.
              </p>
              <Button
                variant="default"
                size="lg"
                asChild
                className="w-full h-11 md:h-12"
              >
                <a
                  href={generateWhatsAppLink("service")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      type: "service",
                      location: "service-pricing-section",
                      buttonText: "Konsultasi Servis Gratis",
                    })
                  }
                >
                  <MessageCircle className="h-5 w-5" />
                  Konsultasi Servis Gratis
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Biasanya respon dalam 5 menit
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Trust Signals */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            <span className="text-primary font-semibold">💡 Tips:</span> Semakin
            cepat Anda servis, semakin kecil kerusakan yang terjadi. Jangan
            tunda perbaikan laptop Anda!
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Pembayaran setelah selesai
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Bisa COD untuk area Pontianak
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Jemput & antar tersedia
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePricingSection;
