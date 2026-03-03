'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import DirectionHero, { getTransferById } from '@/components/DirectionHero';
import DirectionInfo from '@/components/DirectionInfo';
import AutoparkSection from '@/components/AutoparkSection';
import DirectionRoutes from '@/components/DirectionRoutes';
import FAQSection from '@/components/FAQSection';
import OtherServicesSection from '@/components/OtherServicesSection';
import Footer from '@/components/Footer';

export default function DirectionPage() {
  const params = useParams();
  const id = params.id as string;
  const transfer = getTransferById(id);
  const [exists, setExists] = useState<boolean | null>(transfer ? true : null);

  // For custom directions (not in static data), check if they exist in DB
  useEffect(() => {
    if (transfer) return; // Static transfer found, no need to check DB
    async function checkDirection() {
      try {
        const res = await fetch(`/api/admin/directions/${id}`);
        const data = await res.json();
        setExists(data.success && data.page?.isActive !== false);
      } catch {
        setExists(false);
      }
    }
    checkDirection();
  }, [id, transfer]);

  // Still loading for custom directions
  if (exists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070707]">
        <div className="text-white/50 text-lg">Завантаження...</div>
      </div>
    );
  }

  if (!exists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F3F3]">
        <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-unbounded)' }}>
          Напрямок не знайдено
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] pt-[35px] md:pt-[56px] xl:pt-[70px]">
      <DirectionHero id={id} />
      <DirectionInfo id={id} />
      <AutoparkSection />
      <DirectionRoutes directionId={id} />
      <FAQSection />
      <OtherServicesSection />
      <Footer />
    </div>
  );
}
