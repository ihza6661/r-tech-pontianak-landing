import { Cpu, HardDrive, MemoryStick, Monitor, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import laptopHp from "@/assets/laptop-hp.jpg";
import laptopAsus from "@/assets/laptop-asus.webp";
import laptopAcer from "@/assets/laptop-acer.webp";
import laptopLenovo from "@/assets/laptop-lenovo.jpg";

const products = [
  {
    name: "HP Laptop 14 EM0014",
    image: laptopHp,
    price: "Rp 5.500.000",
    specs: {
      processor: "Ryzen 3 7320U",
      gpu: "Radeon Graphics",
      storage: "SSD 512 GB",
      ram: "8 GB",
      display: "FHD 14 Inch",
    },
    warranty: "Garansi 3 Bulan",
    badge: "Backlit Keyboard",
  },
  {
    name: "Lenovo Ideapad Slim 3i",
    image: laptopLenovo,
    price: "Rp 5.000.000",
    specs: {
      processor: "Intel Core i3-1215U",
      gpu: "Intel UHD",
      storage: "SSD 256 GB",
      ram: "8 GB",
      display: "FHD 14 Inch",
    },
    warranty: "Garansi Resmi Mar 2027",
    badge: "Backlit",
  },
  {
    name: "Acer Aspire Lite 14",
    image: laptopAcer,
    price: "Rp 4.000.000",
    specs: {
      processor: "Intel N150",
      gpu: "Intel (R) Graphics",
      storage: "SSD 256 GB",
      ram: "8 GB",
      display: "FHD 14 Inch",
    },
    warranty: "Garansi Resmi Apr 2026",
    badge: "Best Value",
  },
  {
    name: "Asus Vivobook E410M",
    image: laptopAsus,
    price: "Rp 3.300.000",
    specs: {
      processor: "Intel Celeron N4020",
      gpu: "Intel UHD",
      storage: "SSD 512 GB",
      ram: "4 GB",
      display: "HD 14 Inch",
    },
    warranty: "Garansi 3 Bulan",
    badge: "Numpad",
  },
];

const InventorySection = () => {
  const whatsappBase = "https://wa.me/6281234567890?text=";

  return (
    <section id="products" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Ready Unit
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Stok Tersedia Hari Ini
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Unit siap pakai dengan garansi. Hubungi kami untuk cek ketersediaan terbaru!
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
                {/* Warranty badge */}
                <span className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded-full border border-border">
                  {product.warranty}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {product.name}
                </h3>

                {/* Specs */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Cpu className="h-4 w-4 text-primary/70" />
                    <span>{product.specs.processor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <HardDrive className="h-4 w-4 text-primary/70" />
                    <span>{product.specs.storage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MemoryStick className="h-4 w-4 text-primary/70" />
                    <span>RAM {product.specs.ram}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Monitor className="h-4 w-4 text-primary/70" />
                    <span>{product.specs.display}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-primary">
                    {product.price}
                  </span>
                  <Button variant="whatsapp" size="sm" asChild>
                    <a
                      href={`${whatsappBase}Halo, saya tertarik dengan ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Tanya
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Lihat lebih banyak unit di Instagram kami
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="https://instagram.com/rtechcomputer" target="_blank" rel="noopener noreferrer">
              Kunjungi Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InventorySection;
