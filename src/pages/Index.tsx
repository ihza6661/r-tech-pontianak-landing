import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import InventorySection from "@/components/InventorySection";
import ServicesSection from "@/components/ServicesSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CategorySection />
      <InventorySection />
      <ServicesSection />
      <LocationSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
