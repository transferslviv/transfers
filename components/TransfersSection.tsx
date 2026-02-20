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
  const { language } = useLanguage();

  return (
    <section className="w-full bg-[#1E1D1E] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col gap-[60px] md:gap-[150px] w-full max-w-[1425px] mx-auto">

        {/* Group 1: Ukraine Transfers */}
        <TransferSlider
          title={language === 'uk' ? 'Трансфер по україні' : 'Transfer across Ukraine'}
          transfers={ukraineTransfers}
          description={
            language === 'uk' ? (
              <>
                <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Індивідуальні міжміські трансфери по Україні
                </p>
                <p className="mb-[16px]">
                  Ми надаємо <strong>індивідуальні міжміські трансфери по Україні</strong> на преміальних автомобілях <strong>BMW 7 Series</strong> та <strong>Mercedes-Benz S-Class (W222)</strong> з професійним водієм. Поїздки виконуються <strong>без попутників</strong>, з повною приватністю та максимальним комфортом.
                </p>
                <p className="mb-[16px]">
                  Найчастіше трансфери здійснюються <strong>зі Львова або у Львів</strong>, однак ми також виконуємо <strong>попутні трансфери між іншими містами України</strong>. Маршрут, час виїзду та всі деталі поїздки узгоджуються індивідуально, з урахуванням поточної дорожньої ситуації та вимог безпеки.
                </p>
                <p>
                  Сервіс підходить для бізнес-поїздок, сімейних подорожей, міжміських переїздів, поїздок до курортів або у напрямку кордону для подальших міжнародних маршрутів.
                </p>
              </>
            ) : (
              <>
                <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Individual intercity transfers across Ukraine
                </p>
                <p className="mb-[16px]">
                  We provide <strong>individual intercity transfers across Ukraine</strong> in premium <strong>BMW 7 Series</strong> and <strong>Mercedes-Benz S-Class (W222)</strong> vehicles with a professional driver. All rides are <strong>without fellow passengers</strong>, ensuring complete privacy and maximum comfort.
                </p>
                <p className="mb-[16px]">
                  Most transfers are <strong>from or to Lviv</strong>, but we also operate <strong>connecting transfers between other Ukrainian cities</strong>. Route, departure time, and all trip details are arranged individually, taking into account current road conditions and safety requirements.
                </p>
                <p>
                  The service is suitable for business trips, family vacations, intercity relocations, resort trips, or trips toward the border for further international routes.
                </p>
              </>
            )
          }
        />

        {/* Group 2: Europe Transfers */}
        <TransferSlider
          title={language === 'uk' ? 'Трансфер по Європі' : 'Transfer across Europe'}
          transfers={europeTransfers}
          description={
            language === 'uk' ? (
              <>
                <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Індивідуальні трансфери між Україною та Європою
                </p>
                <p className="mb-[16px]">
                  Ми організовуємо <strong>індивідуальні преміальні трансфери між містами України та Європи</strong>, а також між європейськими містами. Поїздки здійснюються на <strong>BMW 7 Series</strong> та <strong>Mercedes-Benz S-Class (W222)</strong> з професійним водієм, <strong>без попутників</strong>, з максимальним комфортом та приватністю.
                </p>
                <p>
                  Сервіс підходить для бізнес-поїздок, сімейних подорожей, зустрічей на подіях або приватних трансферів до будь-яких європейських міст. Маршрут, час виїзду та всі деталі поїздки узгоджуються індивідуально, з урахуванням безпеки та актуальної дорожньо-прикордонної ситуації.
                </p>
              </>
            ) : (
              <>
                <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Individual transfers between Ukraine and Europe
                </p>
                <p className="mb-[16px]">
                  We organize <strong>individual premium transfers between cities in Ukraine and Europe</strong>, as well as between European cities. Rides are in <strong>BMW 7 Series</strong> and <strong>Mercedes-Benz S-Class (W222)</strong> with a professional driver, <strong>no fellow passengers</strong>, with maximum comfort and privacy.
                </p>
                <p>
                  The service is suitable for business trips, family vacations, event meetings, or private transfers to any European city. Route, departure time, and all trip details are arranged individually, considering safety and current border-road conditions.
                </p>
              </>
            )
          }
        />

        {/* Group 3: Lviv Transfers */}
        <TransferSlider
          title={language === 'uk' ? 'Трансфер по львову' : 'Transfer around Lviv'}
          transfers={lvivTransfers}
          darkButton={true}
          description={
            language === 'uk' ? (
              <>
                <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Індивідуальні трансфери по львову
                </p>
                <p>
                  Надаємо комфортний трансфер <strong>по місту Львів</strong> за попередньою домовленістю до популярних локацій, зокрема Emily Resort, Edem Resort, залізничного вокзалу та автовокзалу. Водночас <strong>маршрут не обмежується фіксованими напрямками</strong> — ми організуємо індивідуальний трансфер відповідно до вашого запиту, з урахуванням часу, місця та побажань до поїздки.
                </p>
              </>
            ) : (
              <>
                <p className="font-bold uppercase text-[16px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Individual transfers around Lviv
                </p>
                <p>
                  We provide comfortable transfers <strong>around the city of Lviv</strong> by prior arrangement to popular locations, including Emily Resort, Edem Resort, the train station, and the bus station. At the same time, <strong>the route is not limited to fixed destinations</strong> — we arrange individual transfers according to your request, taking into account time, location, and trip preferences.
                </p>
              </>
            )
          }
        />

      </div>
    </section>
  );
}
