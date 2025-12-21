import { HelpCircle, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apakah unit laptop bekas aman dibeli?",
    answer: "Sangat aman! Semua unit sudah melalui pengecekan menyeluruh oleh teknisi berpengalaman. Kami pastikan performa optimal dan berikan garansi resmi untuk setiap pembelian. Fisik dan fungsi sudah diuji dengan standar tinggi.",
  },
  {
    question: "Berapa lama garansi yang diberikan?",
    answer: "Untuk unit dengan garansi resmi, kami berikan sesuai sisa garansi dari pabrikan (bisa dilihat di spesifikasi produk). Untuk unit tanpa garansi resmi, kami memberikan garansi toko 3 bulan untuk software dan hardware. Garansi mencakup kerusakan non-fisik.",
  },
  {
    question: "Apakah bisa tukar tambah laptop lama?",
    answer: "Tentu bisa! Bawa laptop lama Anda ke toko, kami akan cek kondisi dan berikan harga terbaik. Proses cepat dan transparan. Laptop lama Anda akan kami nilai fair sesuai kondisi pasar, lalu bisa langsung upgrade ke unit yang lebih baik.",
  },
  {
    question: "Apa saja metode pembayaran yang tersedia?",
    answer: "Kami menerima pembayaran tunai, transfer bank (BCA, Mandiri, BRI, BNI), QRIS, dan cicilan melalui berbagai platform. Untuk cicilan, bisa melalui kartu kredit atau platform fintech terpercaya. Hubungi kami untuk info detail cicilan.",
  },
  {
    question: "Apakah pengiriman ke luar Pontianak tersedia?",
    answer: "Ya! Kami melayani pengiriman ke seluruh Indonesia dengan packing premium dan asuransi. Pengiriman menggunakan JNE/J&T dengan tracking real-time. Unit akan dikemas dengan bubble wrap berlapis dan kardus tebal untuk memastikan keamanan maksimal.",
  },
  {
    question: "Berapa lama servis laptop biasanya?",
    answer: "Tergantung jenis kerusakan. Servis ringan seperti instal ulang/upgrade bisa selesai 1-2 jam. Untuk perbaikan hardware kompleks bisa 3-7 hari kerja. Kami akan berikan estimasi waktu yang jelas setelah pengecekan awal oleh teknisi.",
  },
  {
    question: "Apakah menerima servis laptop/Macbook dari brand lain?",
    answer: "Ya, kami melayani servis untuk semua brand laptop (HP, Lenovo, Asus, Acer, Dell, MSI, dll) dan spesialis Macbook. Teknisi kami berpengalaman menangani berbagai kasus dari ringan hingga kompleks seperti motherboard, GPU, dan sistem liquid cooling.",
  },
  {
    question: "Bagaimana cara cek stok unit terbaru?",
    answer: "Stok unit update setiap hari di Instagram Stories kami @rtechlaptop_pontianak. Anda juga bisa langsung hubungi via WhatsApp untuk info stok real-time. Kami update highlight Instagram dengan kategori lengkap untuk memudahkan Anda browsing.",
  },
];

const FAQSection = () => {
  return (
     <section className="py-14 md:py-20 bg-background relative z-0">
       {/* Background accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-[800px] h-64 md:h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Punya pertanyaan? Kami punya jawabannya! Temukan informasi lengkap seputar produk dan layanan kami.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-4 sm:px-6 border-border"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4 sm:py-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                 <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4 sm:pb-5 pl-6 sm:pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            Masih ada pertanyaan lain?
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Hubungi kami langsung via{" "}
            <a
              href="#contact"
              className="text-primary hover:underline font-medium"
            >
              WhatsApp
            </a>{" "}
            untuk konsultasi gratis!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
