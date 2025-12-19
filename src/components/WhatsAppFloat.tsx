import { MessageCircle, ShoppingBag, Wrench, User, X } from "lucide-react";
import { generateWhatsAppLinkByContact } from "@/lib/whatsapp";
import { useState } from "react";

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      type: "sales" as const,
      icon: ShoppingBag,
      label: "Jual-Beli",
      description: "Beli atau Trade-In",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      type: "service" as const,
      icon: Wrench,
      label: "Service",
      description: "Servis & Konsultasi",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      type: "owner" as const,
      icon: User,
      label: "Owner",
      description: "Langsung ke Owner",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact options menu */}
      {isOpen && (
        <div className="mb-4 flex flex-col gap-2 animate-slide-up">
          {contacts.map((contact) => (
            <a
              key={contact.type}
              href={generateWhatsAppLinkByContact(contact.type)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 ${contact.color} text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
                <contact.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm">{contact.label}</div>
                <div className="text-xs opacity-90">{contact.description}</div>
              </div>
              <MessageCircle className="h-4 w-4 opacity-75" />
            </a>
          ))}
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center"
        aria-label="WhatsApp Contact Menu"
      >
        {/* Label - only show when closed */}
        {!isOpen && (
          <span className="mr-3 bg-card text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-border whitespace-nowrap">
            Chat dengan Kami
          </span>
        )}

        {/* Button */}
        <div className="relative">
          {/* Pulse animation - only when closed */}
          {!isOpen && (
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-25" />
          )}
          
          {/* Main button */}
          <div
            className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
              isOpen
                ? "bg-red-500 hover:bg-red-600 rotate-90"
                : "bg-primary hover:scale-110 glow-primary-sm hover:glow-primary"
            } text-white`}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </div>
        </div>
      </button>

      {/* Backdrop overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default WhatsAppFloat;
