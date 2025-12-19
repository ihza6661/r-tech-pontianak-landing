import { Laptop, Gamepad2, Apple, DollarSign } from "lucide-react";
import { generateWhatsAppLink, WhatsAppMessageType } from "@/lib/whatsapp";

const categories = [
  {
    title: "Budget Friendly",
    priceRange: "1 - 3 Jutaan",
    description: "Pilihan terbaik untuk tugas sekolah dan administrasi.",
    icon: DollarSign,
    badge: "Hemat",
    waType: "budget_1_3" as WhatsAppMessageType,
  },
  {
    title: "Work & Student",
    priceRange: "4 - 7 Jutaan",
    description: "Performa lancar untuk mahasiswa dan pekerja kantoran.",
    icon: Laptop,
    badge: "Best Seller",
    waType: "budget_4_7" as WhatsAppMessageType,
  },
  {
    title: "Pro & Gaming",
    priceRange: "7 - 10 Jutaan",
    description: "Spek tinggi untuk desain grafis, editing, dan gaming.",
    icon: Laptop,
    badge: "Premium",
    waType: "budget_7_10" as WhatsAppMessageType,
  },
  {
    title: "Gaming Laptop",
    priceRange: "GPU Dedicated",
    description: "Performa maksimal untuk gaming AAA dan rendering.",
    icon: Gamepad2,
    badge: "High Performance",
    waType: "gaming" as WhatsAppMessageType,
  },
  {
    title: "Macbook Specialist",
    priceRange: "Air • Pro • M1 • M2",
    description: "Kualitas premium, desain elegan, harga tetap masuk akal.",
    icon: Apple,
    badge: "Apple Expert",
    waType: "macbook" as WhatsAppMessageType,
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Kategori Produk
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Pilih Sesuai Budget Anda
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Semua unit sudah dicek dan dilengkapi garansi. Klik kategori untuk langsung tanya stok via WhatsApp!
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href={generateWhatsAppLink(category.waType)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <category.icon className="h-6 w-6" />
              </div>

              {/* Badge */}
              <span className="absolute top-4 right-4 text-xs font-medium text-primary/70">
                {category.badge}
              </span>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {category.title}
              </h3>
              <p className="text-sm font-medium text-primary mb-2">
                {category.priceRange}
              </p>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
