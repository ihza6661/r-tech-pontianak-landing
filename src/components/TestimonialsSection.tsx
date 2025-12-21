import { Star, Quote, User } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Mahasiswa Untan",
    rating: 5,
    text: "Beli laptop untuk kuliah di R-Tech, pelayanannya ramah banget dan sabar jelasin spek-speknya. Harga pas di kantong mahasiswa, kondisi laptop juga seperti baru. Garansi 3 bulan bikin tenang. Recommended!",
    date: "2 minggu lalu",
  },
  {
    name: "Siti Rahma",
    role: "Pegawai Swasta",
    rating: 5,
    text: "Tukar tambah laptop lama ke yang baru disini prosesnya cepat dan harga trade-in nya fair. Ga nyesal upgrade di R-Tech, unitnya berkualitas dan sudah include Windows ori. Worth it banget!",
    date: "1 bulan lalu",
  },
  {
    name: "Andi Pratama",
    role: "Content Creator",
    rating: 5,
    text: "Beli Macbook M1 disini kondisi mulus banget, batre health masih 95%. Harganya lebih murah dari toko lain tapi kualitas terjamin. Owner nya expert banget soal Macbook, bisa konsultasi panjang lebar. Top!",
    date: "3 minggu lalu",
  },
  {
    name: "Linda Wijaya",
    role: "Ibu Rumah Tangga",
    rating: 5,
    text: "Servis laptop anak yang mati total, ternyata kena air. Dikira sudah ga bisa diselamatkan, tapi teknisi R-Tech berhasil benerin! Biaya servisnya juga masuk akal. Terima kasih banyak, sangat membantu!",
    date: "1 minggu lalu",
  },
  {
    name: "Rizky Fauzan",
    role: "Gamer",
    rating: 5,
    text: "Nyari gaming laptop di budget pas, dikasih rekomendasi yang tepat sama ownernya. Laptop sudah dicek dan di-benchmark dulu sebelum dibawa pulang. Main game lancar jaya, pengiriman juga aman sampai Sambas. Mantap!",
    date: "2 bulan lalu",
  },
  {
    name: "Devi Kusuma",
    role: "Guru",
    rating: 5,
    text: "Pertama kali beli laptop second, awalnya ragu. Tapi setelah liat unit langsung dan dijelasin detail, jadi yakin. Unit yang dibeli awet dan lancar untuk ngajar online. Pelayanan after sales nya juga oke, fast respon!",
    date: "3 minggu lalu",
  },
];

const TestimonialsSection = () => {
  const averageRating = 4.9;
  const totalReviews = 500;

  return (
     <section id="testimonials" className="py-14 md:py-20 bg-secondary/30 relative overflow-hidden z-0">
       {/* Background effects */}
       <div className="absolute top-0 right-0 w-48 md:w-[600px] h-48 md:h-[600px] bg-primary/5 rounded-full blur-[150px]" />
       <div className="absolute bottom-0 left-0 w-40 md:w-[500px] h-40 md:h-[500px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary fill-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              Testimoni Pelanggan
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Apa Kata Mereka?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Kepercayaan pelanggan adalah prioritas kami. Lihat pengalaman nyata dari ribuan pelanggan yang puas!
          </p>

           {/* Google Rating Badge */}
           <div className="mt-6 inline-flex items-center gap-2 md:gap-4 glass-card px-4 sm:px-6 py-3 rounded-full">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground text-base sm:text-lg">{averageRating}/5.0</div>
              <div className="text-[11px] sm:text-xs text-muted-foreground">
                {totalReviews.toLocaleString()}+ Google Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-card p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

               {/* Author info */}
               <div className="flex items-center gap-2 md:gap-3 pt-4 border-t border-border">
                 <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-xs sm:text-sm truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground truncate">
                    {testimonial.role} • {testimonial.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA to Google Reviews */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Lihat lebih banyak review dari pelanggan kami
          </p>
          <a
            href="https://www.google.com/search?q=r-tech+computer+pontianak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm sm:text-base"
          >
            <Star className="h-4 w-4 fill-primary" />
            Baca Semua Review di Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
