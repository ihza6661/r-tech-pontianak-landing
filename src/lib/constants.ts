// R-Tech Computer Contact Configuration
// Multiple WhatsApp numbers for smart routing
export const WHATSAPP_NUMBERS = {
  owner: "6282157000466",           // Primary/Owner
  sales: "62895323258495",          // Jual-Beli (Sales inquiries)
  service: "6285167554866",         // Service & Konsultasi
  general: "6282157000466",         // Default to owner
};

// Backward compatibility - defaults to owner/general contact
export const WHATSAPP_NUMBER = WHATSAPP_NUMBERS.general;

export const COMPANY_INFO = {
  name: "R-Tech Computer",
  tagline: "Sale & Service | Since 2014",
  foundedYear: 2014,
  yearsInBusiness: new Date().getFullYear() - 2014,
  address: "Jln. Reformasi Untan, Pontianak",
  fullAddress: "Jln. Reformasi Untan, Pontianak, Kalimantan Barat, Indonesia",
  coordinates: {
    lat: -0.0666142,
    lng: 109.3453223,
  },
  instagram: "https://instagram.com/rtechlaptop_pontianak",
  instagramHandle: "@rtechlaptop_pontianak",
  googleMapsUrl: "https://www.google.co.id/maps/place/R-Tech+Computer+Pontianak/@-0.0665053,109.345321,21z/data=!4m6!3m5!1s0x2e1d5988d764777d:0xd129d6a9aecf9af8!8m2!3d-0.0666142!4d109.3453223!16s%2Fg%2F11f4qd7rc7",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8176691486845!2d109.34313!3d-0.0666142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d5988d764777d%3A0xd129d6a9aecf9af8!2sR-Tech%20Computer%20Pontianak!5e0!3m2!1sen!2sid!4v1735000000000!5m2!1sen!2sid",
  operatingHours: {
    weekdays: "Senin - Sabtu: 09:00 - 21:00",
    weekend: "Minggu: 10:00 - 18:00",
  },
};
