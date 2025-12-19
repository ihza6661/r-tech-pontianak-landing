import { ArrowLeftRight, Wrench, Truck, Shield, Clock, ThumbsUp } from "lucide-react";

const services = [
  {
    icon: ArrowLeftRight,
    title: "Jual Beli & Tukar Tambah",
    description: "Tukar laptop lama Anda dengan unit baru. Proses cepat dengan harga terbaik dan transparan.",
    features: ["Harga Kompetitif", "Proses Cepat", "Bebas Nego"],
  },
  {
    icon: Wrench,
    title: "Servis Profesional",
    description: "Teknisi berpengalaman untuk perbaikan laptop & Macbook. Garansi servis hingga 3 bulan.",
    features: ["Teknisi Bersertifikat", "Garansi Servis", "Spare Part Original"],
  },
  {
    icon: Truck,
    title: "Pengiriman Seluruh Indonesia",
    description: "Packing aman dengan asuransi. Siap kirim ke seluruh Kalimantan Barat dan Indonesia.",
    features: ["Packing Aman", "Asuransi Pengiriman", "Tracking Real-time"],
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-secondary/30 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Layanan Kami
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Solusi Lengkap untuk Laptop Anda
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                <service.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Shield, label: "Garansi Resmi" },
            { icon: Clock, label: "Fast Response" },
            { icon: ThumbsUp, label: "Terpercaya" },
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-3 text-muted-foreground">
              <badge.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
