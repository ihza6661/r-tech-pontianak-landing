import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ServicesSection from "@/components/ServicesSection";
import InventorySection from "@/components/InventorySection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CategorySection />
      <ServicesSection />
      <InventorySection />
      <LocationSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
