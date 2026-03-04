'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full bg-[#F3F3F3] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col xl:flex-row items-center gap-[40px] md:gap-[80px] xl:gap-[50px] w-full max-w-[1425px] mx-auto">
        
        {/* Title - Mobile/Tablet only */}
        <h2 
          className="order-1 xl:hidden text-[30px] md:text-[60px] text-[#070707] font-black leading-[100%]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('aboutTitle')}
        </h2>

        {/* Map Image */}
        <div className="order-2 xl:order-1 w-full xl:w-[685px]">
          <Image 
            src="/images/map.webp" 
            alt="Карта України - TransferLviv" 
            width={685}
            height={685}
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="order-3 xl:order-2 w-full xl:w-[685px] flex flex-col items-start gap-[80px]">
          
          {/* Title - Desktop only */}
          <h2 
            className="hidden xl:block text-[60px] text-[#070707] font-black leading-[100%]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {t('aboutTitle')}
          </h2>

          {/* Description */}
          <p 
            className="text-[12px] md:text-[18px] text-[#070707] leading-[120%]"
            style={{ fontFamily: 'var(--font-nunito-sans)' }}
          >
            <strong>TRANSFERLVIV</strong> - {t('aboutDescription').replace('TRANSFERLVIV - ', '')}
          </p>
        </div>

      </div>
    </section>
  );
}
