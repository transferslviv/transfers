'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import TransferCard from './TransferCard';
import { Transfer, ukraineTransfers, europeTransfers, lvivTransfers } from '@/data/transfers';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransferSliderProps {
  title: string;
  transfers: Transfer[];
  description: React.ReactNode;
  darkButton?: boolean;
}

function TransferSlider({ title, transfers, description, darkButton = false }: TransferSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const gap = 20;

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    let perView = 4;
    if (containerWidth < 640) perView = 1;
    else if (containerWidth < 900) perView = 2;
    else if (containerWidth < 1200) perView = 3;
    else perView = 4;
    setCardsPerView(perView);
    const totalGaps = (perView - 1) * gap;
    setCardWidth((containerWidth - totalGaps) / perView);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const maxIndex = Math.max(0, transfers.length - cardsPerView);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  // Clamp currentIndex if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [maxIndex, currentIndex]);

  const translateX = -(currentIndex * (cardWidth + gap));

  return (
    <div className="flex flex-col gap-[40px] md:gap-[80px] w-full">
      {/* Title */}
      <h2
        className="text-[30px] md:text-[60px] text-[#F3F3F3] font-black text-center leading-[100%] uppercase"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        {title}
      </h2>

      {/* Slider */}
      <div className="w-full flex items-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="group flex items-center justify-center flex-shrink-0 mr-[10px] md:mr-[30px] lg:mr-[30px] xl:mr-[50px] transition-transform hover:scale-110 disabled:opacity-30 cursor-pointer"
          aria-label="Попередній"
        >
          <svg viewBox="0 0 27 15" fill="none" className="w-[18px] h-[10px] md:w-[27px] md:h-[15px] rotate-90">
            <path d="M13.5 15L0 0L27 0L13.5 15Z" className="fill-[#F3F3F3] group-hover:fill-[#F39E00] transition-colors duration-300" />
          </svg>
        </button>

        {/* Cards Container */}
        <div ref={containerRef} className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${gap}px`,
              transform: `translateX(${translateX}px)`,
              filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.3))'
            }}
          >
            {transfers.map((transfer) => (
              <div key={transfer.id} className="flex-shrink-0" style={{ width: cardWidth > 0 ? `${cardWidth}px` : '100%' }}>
                <TransferCard transfer={transfer} darkButton={darkButton} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={currentIndex >= maxIndex}
          className="group flex items-center justify-center flex-shrink-0 ml-[10px] md:ml-[30px] lg:ml-[30px] xl:ml-[50px] transition-transform hover:scale-110 disabled:opacity-30 cursor-pointer"
          aria-label="Наступний"
        >
          <svg viewBox="0 0 27 15" fill="none" className="w-[18px] h-[10px] md:w-[27px] md:h-[15px] -rotate-90">
            <path d="M13.5 15L0 0L27 0L13.5 15Z" className="fill-[#F3F3F3] group-hover:fill-[#F39E00] transition-colors duration-300" />
          </svg>
        </button>
      </div>

      {/* Description Text */}
      <div className="w-full px-[25px] md:px-[65px] lg:px-[65px]">
        <div className="text-[12px] md:text-[18px] text-[#F3F3F3] leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

export default function TransfersSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-[#1E1D1E] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col gap-[60px] md:gap-[150px] w-full max-w-[1425px] mx-auto">

        {/* Group 1: Ukraine Transfers */}
        <TransferSlider
          title={t('transferUkraineTitle')}
          transfers={ukraineTransfers}
          description={
            <>
              <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                {t('transferUkraineSubtitle')}
              </p>
              <p className="mb-[16px]">
                {t('transferUkraineDesc1')}
              </p>
              <p className="mb-[16px]">
                {t('transferUkraineDesc2')}
              </p>
              <p>
                {t('transferUkraineDesc3')}
              </p>
            </>
          }
        />

        {/* Group 2: Europe Transfers */}
        <TransferSlider
          title={t('transferEuropeTitle')}
          transfers={europeTransfers}
          description={
            <>
              <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                {t('transferEuropeSubtitle')}
              </p>
              <p className="mb-[16px]">
                {t('transferEuropeDesc1')}
              </p>
              <p>
                {t('transferEuropeDesc2')}
              </p>
            </>
          }
        />

        {/* Group 3: Lviv Transfers */}
        <TransferSlider
          title={t('transferLvivTitle')}
          transfers={lvivTransfers}
          darkButton={true}
          description={
            <>
              <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                {t('transferLvivSubtitle')}
              </p>
              <p className="mb-[16px]">
                {t('transferLvivDesc1')}
              </p>
              <p>
                {t('transferLvivDesc2')}
              </p>
            </>
          }
        />

      </div>
    </section>
  );
}
