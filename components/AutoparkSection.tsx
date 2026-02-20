'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import CarCard from './CarCard';
import { carsData } from '@/data/cars';

export default function AutoparkSection() {
  // Duplicate cards if fewer than 3 so the slider works properly
  const displayCars = useMemo(() => {
    if (carsData.length === 0) return [];
    let cars = [...carsData];
    while (cars.length < 3) {
      cars = [...cars, ...carsData.map((c, i) => ({ ...c, id: c.id + 1000 * (Math.floor(cars.length / carsData.length) + 1) + i }))];
    }
    return cars;
  }, []);

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
    <section className="w-full bg-[#BCC4C7] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col items-center gap-[40px] md:gap-[80px] w-full max-w-[1425px] mx-auto">
        
        {/* Title - Mobile/Tablet only */}
        <h2 
          className="lg:hidden text-[30px] md:text-[60px] text-[#070707] font-black leading-[100%]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          АВТОПАРК
        </h2>

        {/* Header Row - Desktop only (Title + Button) */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-[20px] w-full">
          <h2 
            className="text-[60px] text-[#070707] font-black leading-[100%]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            АВТОПАРК
          </h2>
          <a
            href="https://t.me/rentalviv_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center px-[50px] py-[20px] bg-transparent border-2 border-[#070707] hover:border-white rounded-[10px] transition-all"
          >
            <span 
              className="text-[24px] text-[#070707] group-hover:text-white font-bold leading-[100%] uppercase transition-colors"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              ДОСТУПНІ АВТО
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
            <svg viewBox="0 0 27 15" fill="none" className="w-[18px] h-[10px] md:w-[27px] md:h-[15px] rotate-90">
              <path d="M13.5 15L0 0L27 0L13.5 15Z" className="fill-[#070707] lg:fill-white lg:group-hover:fill-[#070707] transition-colors"/>
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
            <svg viewBox="0 0 27 15" fill="none" className="w-[18px] h-[10px] md:w-[27px] md:h-[15px] -rotate-90">
              <path d="M13.5 15L0 0L27 0L13.5 15Z" className="fill-[#070707] lg:fill-white lg:group-hover:fill-[#070707] transition-colors"/>
            </svg>
          </button>
        </div>

        {/* Button - Mobile/Tablet only */}
        <a
          href="https://t.me/rentalviv_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:hidden group flex items-center justify-center w-full md:w-auto px-[20px] md:px-[50px] py-[14px] md:py-[20px] bg-transparent border-2 border-[#070707] hover:border-white rounded-[8px] md:rounded-[10px] transition-all"
        >
          <span 
            className="text-[14px] md:text-[24px] text-[#070707] group-hover:text-white font-bold leading-[100%] uppercase transition-colors"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            ДОСТУПНІ АВТО
          </span>
        </a>

      </div>
    </section>
  );
}
