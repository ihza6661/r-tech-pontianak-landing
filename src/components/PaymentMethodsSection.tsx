import { CreditCard, Smartphone, Landmark, Wallet, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";

const paymentMethods = [
  {
    icon: Landmark,
    title: "Transfer Bank",
    description: "BCA, Mandiri, BRI, BNI",
    badge: "Paling Populer",
  },
  {
    icon: Smartphone,
    title: "QRIS & E-Wallet",
    description: "Scan & bayar dengan mudah",
    badge: "Praktis",
  },
  {
    icon: CreditCard,
    title: "Kartu Kredit",
    description: "Cicilan 0% tersedia",
    badge: "Cicilan",
  },
  {
    icon: Wallet,
    title: "Tunai",
    description: "Bayar langsung di toko",
    badge: "COD",
  },
];

const financingOptions = [
  {
    provider: "Kredivo",
    terms: "Cicilan 3-12 bulan",
    benefit: "Proses cepat, approval instan",
  },
  {
    provider: "Akulaku",
    terms: "Cicilan 3-12 bulan",
    benefit: "Tanpa kartu kredit",
  },
  {
    provider: "Home Credit",
    terms: "Cicilan 6-12 bulan",
    benefit: "Bunga kompetitif",
  },
];

const PaymentMethodsSection = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Metode Pembayaran
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Bayar dengan Cara Anda
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Kami menerima berbagai metode pembayaran untuk kemudahan transaksi Anda. Aman, cepat, dan terpercaya.
          </p>
        </div>

        {/* Payment methods grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Badge */}
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                {method.badge}
              </span>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                <method.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {method.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {method.description}
              </p>
            </div>
          ))}
        </div>

        {/* Financing options */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Opsi Cicilan Tersedia
              </h3>
              <p className="text-muted-foreground">
                Upgrade laptop impian tanpa beban! Cicilan mudah dengan bunga kompetitif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {financingOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      {option.provider}
                    </h4>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">
                    {option.terms}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {option.benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="bg-secondary/50 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Proses Cepat
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Approval cicilan bisa dalam hitungan menit. Syarat mudah, proses simple.
                  </p>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Syarat Ringan
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Cukup KTP dan bukti penghasilan. Tanpa jaminan atau kartu kredit.
                  </p>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Bunga Kompetitif
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Rate bunga terbaik di kelasnya. Promo cicilan 0% untuk tenor tertentu.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ingin tahu lebih lanjut tentang cicilan atau metode pembayaran lainnya?
              </p>
              <Button size="lg" asChild>
                <a
                  href={generateWhatsAppLink("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Konsultasi Pembayaran
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">100% Aman & Terpercaya</span> • Semua transaksi dilindungi
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;
