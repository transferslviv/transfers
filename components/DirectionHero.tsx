'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { Transfer, ukraineTransfers, europeTransfers, lvivTransfers } from '@/data/transfers';

const allTransfers = [...ukraineTransfers, ...europeTransfers, ...lvivTransfers];

// Direction hero background images mapping
const directionImages: Record<string, { left: string; right: string }> = {
  warsaw: { left: '/images/direction/bg-lviv.png', right: '/images/direction/bg-warshava.png' },
};

// Direction-specific titles
const directionTitles: Record<string, { ua: string; en: string }> = {
  kyiv: { ua: 'Трансфер Львів - Київ', en: 'Transfer Lviv - Kyiv' },
  bukovel: { ua: 'Трансфер Львів - Буковель', en: 'Transfer Lviv - Bukovel' },
  odesa: { ua: 'Трансфер Львів - Одеса', en: 'Transfer Lviv - Odesa' },
  'ivano-frankivsk': { ua: 'Трансфер Львів - Івано-Франківськ', en: 'Transfer Lviv - Ivano-Frankivsk' },
  ujgorod: { ua: 'Трансфер Львів - Ужгород', en: 'Transfer Lviv - Uzhhorod' },
  krakow: { ua: 'Трансфер Львів - Краків', en: 'Transfer Lviv - Krakow' },
  warsaw: { ua: 'Трансфер Львів - Варшава', en: 'Transfer Lviv - Warsaw' },
  budapest: { ua: 'Трансфер Львів - Будапешт', en: 'Transfer Lviv - Budapest' },
  bratislava: { ua: 'Трансфер Львів - Братислава', en: 'Transfer Lviv - Bratislava' },
  vienna: { ua: 'Трансфер Львів - Відень', en: 'Transfer Lviv - Vienna' },
  'emily-resort': { ua: 'Трансфер Львів - Emily Resort', en: 'Transfer Lviv - Emily Resort' },
  'edem-resort': { ua: 'Трансфер Львів - Edem Resort', en: 'Transfer Lviv - Edem Resort' },
  'train-station': { ua: 'Трансфер - Залізничний Вокзал', en: 'Transfer - Train Station' },
  'bus-station': { ua: 'Трансфер - Автовокзал', en: 'Transfer - Bus Station' },
};

interface DirectionHeroProps {
  id: string;
}

export function getTransferById(id: string): Transfer | undefined {
  return allTransfers.find(t => t.id === id);
}

export default function DirectionHero({ id }: DirectionHeroProps) {
  const { language } = useLanguage();
  const { settings } = useSiteSettings();
  const [dbData, setDbData] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/directions/${id}`);
        const data = await res.json();
        if (data.success && data.page) {
          setDbData(data.page);
        }
      } catch {}
      setLoaded(true);
    }
    fetchData();
  }, [id]);

  const transfer = getTransferById(id);

  // For custom directions without static data, wait for DB data
  if (!transfer && !loaded) return null;
  if (!transfer && !dbData) return null;

  const isUa = language === 'uk';

  // Use DB data if available, fallback to static
  const heroTitle = dbData?.heroTitle
    ? (isUa ? dbData.heroTitle : (dbData.heroTitleEn || dbData.heroTitle))
    : directionTitles[id]
      ? (isUa ? directionTitles[id].ua : directionTitles[id].en)
      : transfer
        ? (isUa ? transfer.title.replace('\n', ' ') : transfer.titleEn.replace('\n', ' '))
        : '';

  const heroImages = (dbData?.heroImageLeft && dbData?.heroImageRight)
    ? { left: dbData.heroImageLeft, right: dbData.heroImageRight }
    : directionImages[id] || (transfer
        ? { left: transfer.image, right: transfer.image2 || transfer.image }
        : { left: '/images/direction/bg-lviv.png', right: '/images/direction/bg-lviv.png' });

  // Check if we should use single image or split
  const useSingleImage = dbData?.heroImageLeft && !dbData?.heroImageRight;
  const singleImage = useSingleImage ? dbData.heroImageLeft : null;

  const subtitle = dbData?.heroSubtitle
    ? (isUa ? dbData.heroSubtitle : (dbData.heroSubtitleEn || dbData.heroSubtitle))
    : (isUa ? 'Бізнес та Преміум клас' : 'Business & Premium class');

  const ctaText = dbData?.heroCtaText
    ? (isUa ? dbData.heroCtaText : (dbData.heroCtaTextEn || dbData.heroCtaText))
    : (isUa ? 'розрахувати вартість' : 'calculate price');

  return (
    <section className="relative w-full h-[500px] md:h-[calc(100vh-70px)] flex flex-col justify-center items-center gap-[40px] md:gap-[80px] px-[15px] md:px-[50px] overflow-hidden">
      {/* Background - Single or Split */}
      {useSingleImage && singleImage ? (
        // Single full-width background
        <div className="absolute inset-0">
          <Image
            src={singleImage}
            alt={heroTitle}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          {/* Grain effect overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />
        </div>
      ) : (
        // Split Background (existing logic)
        <div className="absolute inset-0 flex">
          <div className="relative w-1/2 h-full">
            <Image
              src={heroImages.left}
              alt="Львів"
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-black/60" />
            {/* Grain effect overlay */}
            <div 
              className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
              }}
            />
          </div>
          <div className="relative w-1/2 h-full">
            <Image
              src={heroImages.right}
              alt={heroTitle}
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-black/60" />
            {/* Grain effect overlay */}
            <div 
              className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
              }}
            />
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-[10px] md:gap-[20px] w-full max-w-[1615px]">
        <h2
          className="text-[12px] md:text-[24px] xl:text-[20px] 2xl:text-[24px] text-white text-center leading-[120%] uppercase"
          style={{ fontFamily: 'var(--font-unbounded)', letterSpacing: '0.17em' }}
        >
          {subtitle}
        </h2>
        <h1
          className="text-[28px] sm:text-[40px] md:text-[53px] xl:text-[55px] 2xl:text-[70px] text-white text-center font-black leading-[100%] uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {heroTitle}
        </h1>
      </div>

      {/* CTA Button */}
      <a
        href={settings.telegramBot}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-hero-cta relative z-10 w-full sm:w-auto flex items-center justify-center gap-[10px] px-[30px] md:px-[50px] py-[15px] md:py-[20px] rounded-[10px] text-[#070707] transition-all duration-300 hover:scale-105 group"
      >
        <span
          className="absolute inset-[-2px] rounded-[12px] pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.29), rgba(255,255,255,1))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px',
          }}
        />
        <span
          className="relative z-10 text-[12px] sm:text-[16px] md:text-[24px] text-[#070707] font-bold leading-[100%] tracking-wide uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {ctaText}
        </span>
      </a>

      {/* Car SVG at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[200px] md:w-[468px]">
        <Image
          src="/images/direction/block 1 car svg.svg"
          alt="car"
          width={468}
          height={113}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
