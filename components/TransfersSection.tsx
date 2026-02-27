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
    const vw = window.innerWidth;
    let perView = 4;
    if (vw < 768) perView = 1;
    else if (vw < 1280) perView = 2;
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
          className="group flex items-center justify-center flex-shrink-0 mr-[10px] md:mr-[30px] xl:mr-[50px] transition-transform hover:scale-110 disabled:opacity-30 cursor-pointer"
          aria-label="Попередній"
        >
          <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[18px] md:w-[15px] md:h-[27px]">
            <path d="M15 2.08639L15 14.1008V24.9196C15 26.771 12.7233 27.6966 11.3886 26.3853L1.22179 16.3957C-0.407263 14.7951 -0.407263 12.1916 1.22179 10.591L5.08832 6.79188L11.3886 0.601456C12.7233 -0.690628 15 0.235044 15 2.08639Z" className="fill-[#F3F3F3] group-hover:fill-[#F39E00] transition-colors duration-300" />
          </svg>
        </button>

        {/* Cards Container */}
        <div ref={containerRef} className="flex-1 overflow-hidden py-[20px] -my-[20px]">
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
          className="group flex items-center justify-center flex-shrink-0 ml-[10px] md:ml-[30px] xl:ml-[50px] transition-transform hover:scale-110 disabled:opacity-30 cursor-pointer"
          aria-label="Наступний"
        >
          <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[18px] md:w-[15px] md:h-[27px]">
            <path d="M0 2.08639L0 14.1008L0 24.9196C0 26.771 2.27674 27.6966 3.61138 26.3853L13.7782 16.3957C15.4073 14.7951 15.4073 12.1916 13.7782 10.591L9.91168 6.79188L3.61138 0.601456C2.27674 -0.690628 0 0.235044 0 2.08639Z" className="fill-[#F3F3F3] group-hover:fill-[#F39E00] transition-colors duration-300" />
          </svg>
        </button>
      </div>

      {/* Description Text */}
      <div className="w-full px-[25px] md:px-[65px] xl:px-[65px]">
        <div className="text-[12px] md:text-[18px] text-[#F3F3F3] leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
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
    <section id="services" className="w-full bg-[#1E1D1E] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col gap-[60px] md:gap-[150px] w-full max-w-[1425px] mx-auto">

        {/* Group 1: Ukraine Transfers */}
        <TransferSlider
          title={t('transferUkraineTitle')}
          transfers={ukraineTransfers}
          description={
            <>
              <p className="font-bold uppercase text-[12px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {t('transferUkraineSubtitle')}
              </p>
              <p className="mb-[16px]">
                Ми надаємо <b>індивідуальні міжміські трансфери по Україні</b> на преміальних автомобілях <b>BMW 7 Series</b> та <b>Mercedes-Benz S-Class (W222)</b> з професійним водієм. Поїздки виконуються <b>без попутників</b>, з повною приватністю та максимальним комфортом.
              </p>
              <p className="mb-[16px]">
                Найчастіше трансфери здійснюються <b>зі Львова або у Львів</b>, однак ми також виконуємо <b>попутні трансфери між іншими містами України</b>. Маршрут, час виїзду та всі деталі поїздки узгоджуються індивідуально, з урахуванням поточної дорожньої ситуації та вимог безпеки.
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
              <p className="font-bold uppercase text-[12px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {t('transferEuropeSubtitle')}
              </p>
              <p className="mb-[16px]">
                Ми організовуємо <b>індивідуальні преміальні трансфери</b> між містами України та Європи, а також між європейськими містами. Поїздки здійснюються на <b>BMW 7 Series</b> та <b>Mercedes-Benz S-Class (W222)</b> з професійним водієм, <b>без попутників</b>, з максимальним комфортом та приватністю.
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
              <p className="font-bold uppercase text-[12px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {t('transferLvivSubtitle')}
              </p>
              <p>
                Надаємо комфортний трансфер по місту Львів за попередньою домовленістю до популярних локацій, зокрема <b>Emily Resort</b>, <b>Edem Resort</b>, <b>залізничного вокзалу</b> та <b>автовокзалу</b>. Водночас маршрут не обмежується фіксованими напрямками — ми організуємо <b>індивідуальний трансфер</b> відповідно до вашого запиту, з урахуванням часу, місця та побажань до поїздки.
              </p>
            </>
          }
        />

      </div>
    </section>
  );
}
