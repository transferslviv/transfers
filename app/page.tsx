import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';

const AutoparkSection = dynamic(() => import('@/components/AutoparkSection'));
const TransfersSection = dynamic(() => import('@/components/TransfersSection'));
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const OtherServicesSection = dynamic(() => import('@/components/OtherServicesSection'));
const Footer = dynamic(() => import('@/components/Footer'));

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
