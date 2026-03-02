'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import CarCard from './CarCard';
import { Car } from '@/data/cars';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export default function AutoparkSection() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [carsLoading, setCarsLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('/api/admin/cars');
        const data = await res.json();
        if (data.success && data.cars.length > 0) {
          setCarsData(data.cars.filter((c: any) => c.isActive).map((c: any, i: number) => ({
            id: i + 1,
            name: c.name,
            description: c.description,
            images: c.images,
            mainImage: c.mainImage,
            passengers: c.passengers,
            luggage: c.luggage,
            child: c.child,
            pet: c.pet,
            showPassengers: c.showPassengers !== false,
            showLuggage: c.showLuggage !== false,
          })));
        } else {
          // Fallback to static data
          const { carsData: staticCars } = await import('@/data/cars');
          setCarsData(staticCars);
        }
      } catch {
        const { carsData: staticCars } = await import('@/data/cars');
        setCarsData(staticCars);
      } finally {
        setCarsLoading(false);
      }
    }
    fetchCars();
  }, []);

  // Duplicate cards if fewer than 3 so the slider works properly
  const displayCars = useMemo(() => {
    if (carsData.length === 0) return [];
    let cars = [...carsData];
    while (cars.length < 3) {
      cars = [...cars, ...carsData.map((c, i) => ({ ...c, id: c.id + 1000 * (Math.floor(cars.length / carsData.length) + 1) + i }))];
    }
    return cars;
  }, [carsData]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [carsPerSlide, setCarsPerSlide] = useState(2);
  const [gap, setGap] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    let perSlide = 2;
    let currentGap = 50;
    if (containerW < 900) {
      perSlide = 1;
      currentGap = 30;
    }
    setCarsPerSlide(perSlide);
    setGap(currentGap);
    const totalGaps = (perSlide - 1) * currentGap;
    setCardWidth((containerW - totalGaps) / perSlide);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const totalSlides = Math.ceil(displayCars.length / carsPerSlide);
  const slideWidth = cardWidth > 0 ? (cardWidth * carsPerSlide + gap * (carsPerSlide - 1)) : 0;

  useEffect(() => {
    const maxSlide = Math.max(0, totalSlides - 1);
    if (currentSlide > maxSlide) setCurrentSlide(maxSlide);
  }, [totalSlides, currentSlide]);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalSlides]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalSlides]);

  return (
    <section id="autopark" className="w-full bg-[#BCC4C7] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col items-center gap-[40px] md:gap-[80px] w-full max-w-[1425px] mx-auto">
        
        {/* Title - Mobile/Tablet only */}
        <h2 
          className="xl:hidden text-[30px] md:text-[60px] text-[#070707] font-black leading-[100%]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('autoparkSectionTitle')}
        </h2>

        {/* Header Row - Desktop only (Title + Button) */}
        <div className="hidden xl:flex flex-row items-center justify-between gap-[20px] w-full">
          <h2 
            className="text-[60px] text-[#070707] font-black leading-[100%]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {t('autoparkSectionTitle')}
          </h2>
          <a
            href={settings.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center px-[50px] py-[20px] bg-transparent border-2 border-[#070707] hover:border-white rounded-[10px] transition-all"
          >
            <span 
              className="text-[24px] text-[#070707] group-hover:text-white font-bold leading-[100%] uppercase transition-colors"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {t('availableCarsButton')}
            </span>
          </a>
        </div>

        {/* Slider Row - arrows visible at all sizes */}
        <div className="w-full flex items-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="flex flex-shrink-0 items-center justify-center transition-all hover:scale-110 cursor-pointer group mr-[10px] md:mr-[30px]"
            aria-label="Попередній слайд"
          >
            <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[18px] md:w-[15px] md:h-[27px]">
              <path d="M15 24.9136L15 12.8992V2.08039C15 0.229049 12.7233 -0.696622 11.3886 0.614746L1.22179 10.6043C-0.407263 12.2049 -0.407263 14.8084 1.22179 16.409L5.08832 20.2081L11.3886 26.3985C12.7233 27.6906 15 26.765 15 24.9136Z" className="fill-[#070707] group-hover:fill-white transition-colors"/>
            </svg>
          </button>

          {/* Cards Container */}
          <div 
            ref={containerRef}
            className="flex-1 min-w-0 overflow-hidden"
            style={{
              filter: 'drop-shadow(0px 0px 50px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.3))'
            }}
          >
            <div 
              className="flex items-stretch transition-transform duration-500 ease-in-out"
              style={{
                gap: `${gap}px`,
                transform: `translateX(-${currentSlide * (slideWidth + gap)}px)`,
              }}
            >
              {displayCars.map((car, idx) => (
                <div key={`${car.id}-${idx}`} className="flex-shrink-0 h-auto" style={{ width: cardWidth > 0 ? `${cardWidth}px` : `calc((100% - ${gap}px) / ${carsPerSlide})` }}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="flex flex-shrink-0 items-center justify-center transition-all hover:scale-110 cursor-pointer group ml-[10px] md:ml-[30px]"
            aria-label="Наступний слайд"
          >
            <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[18px] md:w-[15px] md:h-[27px]">
              <path d="M0 24.9136L0 12.8992L0 2.08039C0 0.229049 2.27674 -0.696622 3.61138 0.614746L13.7782 10.6043C15.4073 12.2049 15.4073 14.8084 13.7782 16.409L9.91168 20.2081L3.61138 26.3985C2.27674 27.6906 0 26.765 0 24.9136Z" className="fill-[#070707] group-hover:fill-white transition-colors"/>
            </svg>
          </button>
        </div>

        {/* Button - Mobile/Tablet only */}
        <a
          href={settings.telegramBot}
          target="_blank"
          rel="noopener noreferrer"
          className="xl:hidden group flex items-center justify-center w-full md:w-auto px-[20px] md:px-[50px] py-[14px] md:py-[20px] bg-transparent border-2 border-[#070707] hover:border-white rounded-[8px] md:rounded-[10px] transition-all"
        >
          <span 
            className="text-[14px] md:text-[24px] text-[#070707] group-hover:text-white font-bold leading-[100%] uppercase transition-colors"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {t('availableCarsButton')}
          </span>
        </a>

      </div>
    </section>
  );
}
