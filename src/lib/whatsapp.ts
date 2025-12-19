import { WHATSAPP_NUMBER } from "./constants";

export type WhatsAppMessageType = 
  | "general"
  | "budget_1_3"
  | "budget_4_7"
  | "budget_7_10"
  | "gaming"
  | "macbook"
  | "service"
  | "product";

const WHATSAPP_MESSAGES: Record<Exclude<WhatsAppMessageType, "product">, string> = {
  general: "Halo Admin R-Tech Computer! Saya lihat dari website dan ingin tanya-tanya seputar stok laptop/Macbook yang ready hari ini. Bisa dibantu?",
  budget_1_3: "Halo R-Tech Pontianak! Saya tertarik dengan kategori laptop di budget 1 - 3 Juta. Ada rekomendasi unit yang paling oke untuk kebutuhan sehari-hari?",
  budget_4_7: "Halo R-Tech Pontianak! Saya tertarik dengan kategori laptop di budget 4 - 7 Juta. Ada rekomendasi unit yang paling oke untuk kebutuhan kuliah/kerja?",
  budget_7_10: "Halo R-Tech Pontianak! Saya tertarik dengan kategori laptop di budget 7 - 10 Juta. Ada rekomendasi unit untuk desain grafis atau gaming?",
  gaming: "Halo R-Tech Pontianak! Saya tertarik dengan kategori Gaming Laptop. Ada rekomendasi unit dengan GPU dedicated yang paling oke?",
  macbook: "Halo R-Tech Pontianak! Saya tertarik dengan Macbook. Ada unit Air/Pro/M1/M2 yang ready stock?",
  service: "Halo, saya mau konsultasi servis. Laptop/Macbook saya ada kendala dan butuh bantuan pengecekan. Kira-kira bisa dibantu?",
};

export function generateWhatsAppLink(type: WhatsAppMessageType, productName?: string): string {
  let message: string;
  
  if (type === "product" && productName) {
    message = `Halo R-Tech Pontianak! Saya tertarik dengan unit ${productName} yang ada di website. Apakah masih tersedia? Bisa info lebih lanjut?`;
  } else {
    message = WHATSAPP_MESSAGES[type as Exclude<WhatsAppMessageType, "product">] || WHATSAPP_MESSAGES.general;
  }
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function getWhatsAppNumber(): string {
  return WHATSAPP_NUMBER;
}
