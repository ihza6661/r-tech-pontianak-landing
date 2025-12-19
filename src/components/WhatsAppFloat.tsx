import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const whatsappLink = "https://wa.me/6281234567890?text=Halo%20R-Tech,%20saya%20ingin%20tanya%20stok%20laptop%20hari%20ini";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="flex items-center">
        {/* Label */}
        <span className="mr-3 bg-card text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-border whitespace-nowrap">
          Tanya Stok Hari Ini
        </span>

        {/* Button */}
        <div className="relative">
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-25" />
          
          {/* Main button */}
          <div className="relative flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg glow-primary-sm hover:glow-primary transition-all duration-300 hover:scale-110">
            <MessageCircle className="h-6 w-6" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppFloat;
