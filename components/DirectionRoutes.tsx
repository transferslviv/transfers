'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import TransferCard from './TransferCard';
import { Transfer, ukraineTransfers, europeTransfers, lvivTransfers } from '@/data/transfers';
import { useLanguage } from '@/contexts/LanguageContext';

const allTransfers = [...ukraineTransfers, ...europeTransfers, ...lvivTransfers];

interface DirectionRoutesProps {
  directionId?: string;
}

export default function DirectionRoutes({ directionId }: DirectionRoutesProps) {
  const { language } = useLanguage();
  const [dbData, setDbData] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!directionId) { setLoaded(true); return; }
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/directions/${directionId}`);
        const data = await res.json();
        if (data.success && data.page) setDbData(data.page);
      } catch {}
      setLoaded(true);
    }
    fetchData();
  }, [directionId]);

  // Determine which transfers to show
  const displayTransfers: Transfer[] = (dbData?.routesIds && dbData.routesIds.length > 0)
    ? dbData.routesIds.map((id: string) => allTransfers.find(t => t.id === id)).filter(Boolean)
    : europeTransfers;
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

  const maxIndex = Math.max(0, displayTransfers.length - cardsPerView);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [maxIndex, currentIndex]);

  const translateX = -(currentIndex * (cardWidth + gap));

  const title = dbData?.routesTitle
    ? (language === 'uk' ? dbData.routesTitle : (dbData.routesTitleEn || dbData.routesTitle))
    : (language === 'uk' ? 'Популярні маршрути' : 'Popular routes');

  const subtitle = dbData?.routesSubtitle
    ? (language === 'uk' ? dbData.routesSubtitle : (dbData.routesSubtitleEn || dbData.routesSubtitle))
    : (language === 'uk' ? 'Індивідуальні трансфери між Україною та Європою' : 'Individual transfers between Ukraine and Europe');

  const desc = dbData?.routesDesc
    ? (language === 'uk' ? dbData.routesDesc : (dbData.routesDescEn || dbData.routesDesc))
    : null;

  return (
    <section className="w-full bg-[#1E1D1E] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col gap-[40px] md:gap-[80px] w-full max-w-[1425px] mx-auto">
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
                filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.3))',
              }}
            >
              {displayTransfers.map((transfer) => (
                <div key={transfer.id} className="flex-shrink-0" style={{ width: cardWidth > 0 ? `${cardWidth}px` : '100%' }}>
                  <TransferCard transfer={transfer} />
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

        {/* Description */}
        <div className="w-full px-[25px] md:px-[65px] xl:px-[65px]">
          <div
            className="text-[12px] md:text-[18px] text-[#F3F3F3] leading-[120%]"
            style={{ fontFamily: 'var(--font-nunito-sans)' }}
          >
            <>
              <p className="font-black uppercase text-[12px] md:text-[18px] mb-[16px]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {subtitle}
              </p>
              {desc ? (
                desc.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className={i < desc.split('\n\n').length - 1 ? 'mb-[16px]' : ''}>{p}</p>
                ))
              ) : language === 'uk' ? (
                <>
                  <p className="mb-[16px]">
                    Ми організовуємо <b>індивідуальні преміальні трансфери між містами України та Європи</b>, а також між європейськими містами. Поїздки здійснюються на <b>BMW 7 Series</b> та <b>Mercedes-Benz S-Class (W222)</b> з професійним водієм, <b>без попутників</b>, з максимальним комфортом та приватністю.
                  </p>
                  <p>
                    Сервіс підходить для бізнес-поїздок, сімейних подорожей, зустрічей на подіях або приватних трансферів до будь-яких європейських міст. Маршрут, час виїзду та всі деталі поїздки узгоджуються індивідуально, з урахуванням безпеки та актуальної дорожньо-прикордонної ситуації.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-[16px]">
                    We organize <b>individual premium transfers between cities of Ukraine and Europe</b>, as well as between European cities. Trips are made on <b>BMW 7 Series</b> and <b>Mercedes-Benz S-Class (W222)</b> with a professional driver, <b>without fellow passengers</b>, with maximum comfort and privacy.
                  </p>
                  <p>
                    The service is suitable for business trips, family travel, event meetings or private transfers to any European city. Route, departure time and all trip details are agreed individually, taking into account safety and the current road-border situation.
                  </p>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  );
}
