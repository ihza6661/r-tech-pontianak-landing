import { WHATSAPP_NUMBERS } from "./constants";

export type WhatsAppMessageType = 
  | "general"
  | "budget_1_3"
  | "budget_4_7"
  | "budget_7_10"
  | "gaming"
  | "macbook"
  | "service"
  | "product"
  | "sales"
  | "owner";

export type WhatsAppContactType = "owner" | "sales" | "service";

const WHATSAPP_MESSAGES: Record<Exclude<WhatsAppMessageType, "product" | "sales" | "owner">, string> = {
  general: "Halo Admin R-Tech Computer! Saya lihat dari website dan ingin tanya-tanya seputar stok laptop/Macbook yang ready hari ini. Bisa dibantu?",
  budget_1_3: "Halo R-Tech Pontianak! Saya tertarik dengan kategori laptop di budget 1 - 3 Juta. Ada rekomendasi unit yang paling oke untuk kebutuhan sehari-hari?",
  budget_4_7: "Halo R-Tech Pontianak! Saya tertarik dengan kategori laptop di budget 4 - 7 Juta. Ada rekomendasi unit yang paling oke untuk kebutuhan kuliah/kerja?",
  budget_7_10: "Halo R-Tech Pontianak! Saya tertarik dengan kategori laptop di budget 7 - 10 Juta. Ada rekomendasi unit untuk desain grafis atau gaming?",
  gaming: "Halo R-Tech Pontianak! Saya tertarik dengan kategori Gaming Laptop. Ada rekomendasi unit dengan GPU dedicated yang paling oke?",
  macbook: "Halo R-Tech Pontianak! Saya tertarik dengan Macbook. Ada unit Air/Pro/M1/M2 yang ready stock?",
  service: "Halo, saya mau konsultasi servis. Laptop/Macbook saya ada kendala dan butuh bantuan pengecekan. Kira-kira bisa dibantu?",
};

// Smart routing: determine which WhatsApp number to use based on message type
function getWhatsAppNumberForType(type: WhatsAppMessageType): string {
  // Service-related inquiries go to service admin
  if (type === "service") {
    return WHATSAPP_NUMBERS.service;
  }
  
  // Sales/product inquiries go to sales admin
  if (
    type === "product" || 
    type === "budget_1_3" || 
    type === "budget_4_7" || 
    type === "budget_7_10" || 
    type === "gaming" || 
    type === "macbook" ||
    type === "sales"
  ) {
    return WHATSAPP_NUMBERS.sales;
  }
  
  // Owner direct contact
  if (type === "owner") {
    return WHATSAPP_NUMBERS.owner;
  }
  
  // General inquiries default to owner
  return WHATSAPP_NUMBERS.general;
}

export function generateWhatsAppLink(type: WhatsAppMessageType, productName?: string): string {
  const whatsappNumber = getWhatsAppNumberForType(type);
  let message: string;
  
  if (type === "product" && productName) {
    message = `Halo R-Tech Pontianak! Saya tertarik dengan unit ${productName} yang ada di website. Apakah masih tersedia? Bisa info lebih lanjut?`;
  } else if (type === "sales") {
    message = "Halo Admin Jual-Beli R-Tech! Saya mau tanya-tanya tentang pembelian laptop. Bisa dibantu?";
  } else if (type === "owner") {
    message = "Halo Owner R-Tech Computer! Saya ingin berkonsultasi langsung.";
  } else {
    message = WHATSAPP_MESSAGES[type as Exclude<WhatsAppMessageType, "product" | "sales" | "owner">] || WHATSAPP_MESSAGES.general;
  }
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

// Generate direct WhatsApp link by contact type
export function generateWhatsAppLinkByContact(contactType: WhatsAppContactType, customMessage?: string): string {
  const whatsappNumber = WHATSAPP_NUMBERS[contactType];
  const defaultMessages = {
    owner: "Halo Owner R-Tech Computer! Saya ingin berkonsultasi langsung.",
    sales: "Halo Admin Jual-Beli R-Tech! Saya mau tanya-tanya tentang pembelian laptop. Bisa dibantu?",
    service: "Halo Admin Service R-Tech! Saya mau konsultasi tentang servis laptop/Macbook. Bisa dibantu?",
  };
  
  const message = customMessage || defaultMessages[contactType];
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

export function getWhatsAppNumber(): string {
  return WHATSAPP_NUMBERS.general;
}

// Get formatted phone number for display
export function formatWhatsAppNumber(number: string): string {
  // Format: +62 821-5700-0466
  if (number.startsWith("62")) {
    return `+${number.slice(0, 2)} ${number.slice(2, 5)}-${number.slice(5, 9)}-${number.slice(9)}`;
  }
  return number;
}
