import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import InventorySection from "@/components/InventorySection";
import ServicesSection from "@/components/ServicesSection";
import ServicePricingSection from "@/components/ServicePricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PaymentMethodsSection from "@/components/PaymentMethodsSection";
import FAQSection from "@/components/FAQSection";
import ContactFormSection from "@/components/ContactFormSection";
import ContactSelector from "@/components/ContactSelector";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTop from "@/components/BackToTop";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import AnalyticsFloatButton from "@/components/AnalyticsFloatButton";
import { useScrollTracking } from "@/hooks/useAnalytics";
import { useState, useEffect } from "react";

const Index = () => {
  // Track scroll depth for conversion optimization
  useScrollTracking('landing-page');
  
  // Analytics dashboard state
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Check URL parameter on mount (?analytics=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('analytics') === 'true') {
      setShowAnalytics(true);
    }
  }, []);

  // Expose toggle function to window for console access
  useEffect(() => {
    if (typeof window !== 'undefined' && import.meta.env.DEV) {
      window.rtechAnalytics = {
        ...window.rtechAnalytics,
        openDashboard: () => setShowAnalytics(true),
        closeDashboard: () => setShowAnalytics(false),
        toggleDashboard: () => setShowAnalytics(prev => !prev),
      };
    }
  }, []);

  return (
    <>
      <main className="min-h-screen bg-background">
        <HeroSection />
        <CategorySection />
        <InventorySection />
        <ServicesSection />
        <ServicePricingSection />
        <TestimonialsSection />
        <PaymentMethodsSection />
        <FAQSection />
        <ContactFormSection />
        <ContactSelector />
        <LocationSection />
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
      </main>
      
      {/* Analytics Dashboard */}
      {showAnalytics && <AnalyticsDashboard onClose={() => setShowAnalytics(false)} />}
      
      {/* Floating Analytics Button (Dev Mode Only) */}
      {import.meta.env.DEV && !showAnalytics && (
        <AnalyticsFloatButton onClick={() => setShowAnalytics(true)} />
      )}
    </>
  );
};

export default Index;
