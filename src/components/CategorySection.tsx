import { Laptop, Gamepad2, Apple, DollarSign } from "lucide-react";

const categories = [
  {
    title: "Laptop 1-3 Jutaan",
    description: "Untuk kebutuhan kuliah & kantor",
    icon: DollarSign,
    range: "Budget Friendly",
  },
  {
    title: "Laptop 4-7 Jutaan",
    description: "Performa seimbang untuk produktivitas",
    icon: Laptop,
    range: "Best Seller",
  },
  {
    title: "Laptop 7-10 Jutaan",
    description: "Spesifikasi tinggi untuk profesional",
    icon: Laptop,
    range: "Premium Choice",
  },
  {
    title: "Gaming Laptop",
    description: "GPU dedicated untuk gaming & desain",
    icon: Gamepad2,
    range: "High Performance",
  },
  {
    title: "Macbook Specialist",
    description: "Air, Pro, M1, M2 - Lengkap!",
    icon: Apple,
    range: "Apple Expert",
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
            Semua unit sudah dicek dan dilengkapi garansi. Cek highlight Instagram kami untuk stok terbaru!
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <category.icon className="h-6 w-6" />
              </div>

              {/* Badge */}
              <span className="absolute top-4 right-4 text-xs font-medium text-primary/70">
                {category.range}
              </span>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
