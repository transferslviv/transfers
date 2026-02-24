import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AutoparkSection from '@/components/AutoparkSection';
import TransfersSection from '@/components/TransfersSection';
import FAQSection from '@/components/FAQSection';
import OtherServicesSection from '@/components/OtherServicesSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070707] pt-[35px] md:pt-[56px] xl:pt-[70px]">
      <HeroSection />
      <AboutSection />
      <AutoparkSection />
      <TransfersSection />
      <FAQSection />
      <OtherServicesSection />
      <Footer />
    </div>
  );
}
