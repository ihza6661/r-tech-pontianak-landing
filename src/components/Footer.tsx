import { Instagram, MessageCircle, Mail } from "lucide-react";
import rtechLogo from "@/assets/rtech-logo.jpg";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={rtechLogo}
                alt="R-Tech Computer Logo"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="font-display text-lg font-bold text-foreground">
                R-Tech <span className="text-primary">Computer</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pusat laptop & Macbook bekas berkualitas di Pontianak. 
              Dipercaya sejak 2014 dengan layanan jual beli, tukar tambah, dan servis profesional.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#products" className="hover:text-primary transition-colors">Laptop Ready Stock</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Jual Beli & Tukar Tambah</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Servis Laptop & Macbook</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Pengiriman Luar Kota</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Hubungi Kami</h4>
            <div className="flex gap-3">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/rtechcomputer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@rtechcomputer.com"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 R-Tech Computer. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Jln. Reformasi Untan, Pontianak, Kalimantan Barat
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
