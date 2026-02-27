'use client';

import { useState } from 'react';
import { Car } from '@/data/cars';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const renderNavDots = (gapClass: string) => (
    <div className={`absolute bottom-[10px] left-1/2 -translate-x-1/2 flex items-center ${gapClass} px-[10px] py-[5px] rounded-[10px]`}>
      <button 
        onClick={prevImage}
        className="w-[9px] h-[5px] flex items-center justify-center cursor-pointer"
        aria-label="Попереднє фото"
      >
        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" className="rotate-90">
          <path d="M4.5 5L0 0L9 0L4.5 5Z" fill="#070707"/>
        </svg>
      </button>
      
      <div className="flex gap-[5px]">
        {car.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-[5px] h-[5px] rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-[#070707]' : 'bg-gray-400'
            }`}
            aria-label={`Фото ${index + 1}`}
          />
        ))}
      </div>

      <button 
        onClick={nextImage}
        className="w-[9px] h-[5px] flex items-center justify-center cursor-pointer"
        aria-label="Наступне фото"
      >
        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" className="-rotate-90">
          <path d="M4.5 5L0 0L9 0L4.5 5Z" fill="#070707"/>
        </svg>
      </button>
    </div>
  );

  return (
    <div className="w-full h-full bg-[#F3F3F3] rounded-[10px] p-[12px] md:p-[20px] flex flex-col gap-[15px] md:gap-[20px]">
      
      {/* Gallery - Desktop/Tablet: main image + 5 thumbnails (no scroll) */}
      <div className="hidden md:flex relative w-full h-[340px] gap-[10px]">
        <div className="relative flex-1 min-w-0 h-full rounded-[10px] overflow-hidden bg-gray-200">
          <img 
            src={car.images[currentImageIndex]} 
            alt={car.name}
            className="w-full h-full object-cover"
          />
          {renderNavDots('gap-[17px]')}
        </div>
        <div className="w-[60px] h-full flex flex-col gap-[10px]">
          {car.images
            .map((image, index) => ({ image, index }))
            .filter(({ index }) => index !== currentImageIndex)
            .slice(0, 5)
            .map(({ image, index }) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="flex-1 min-h-0 rounded-[10px] md:rounded-[8px] overflow-hidden border-2 border-transparent hover:border-[#070707] transition-all"
              >
                <img 
                  src={image} 
                  alt={`${car.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
        </div>
      </div>

      {/* Gallery - Mobile: main image + thumbnail row (no duplicates) */}
      <div className="flex md:hidden flex-col gap-[10px]">
        <div className="relative w-full aspect-[216/169] rounded-[8px] overflow-hidden bg-gray-200">
          <img 
            src={car.images[currentImageIndex]} 
            alt={car.name}
            className="w-full h-full object-cover"
          />
          {renderNavDots('gap-[12px]')}
        </div>
        <div className="w-full flex gap-[5px]">
          {car.images
            .map((image, index) => ({ image, index }))
            .filter(({ index }) => index !== currentImageIndex)
            .slice(0, 5)
            .map(({ image, index }) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="flex-1 aspect-square rounded-[10px] md:rounded-[8px] overflow-hidden border-2 border-transparent transition-all"
              >
                <img 
                  src={image} 
                  alt={`${car.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-[5px] min-w-0 flex-shrink">
        <h3 
          className="text-[20px] md:text-[24px] text-[#070707] font-black leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {car.name}
        </h3>
        <p 
          className="text-[12px] md:text-[14px] text-[#070707] leading-[100%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {car.description}
        </p>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-[10px] md:gap-[20px] flex-shrink-0 mt-auto">
        <div className="relative flex items-center justify-center">
          <img src="/images/cars/people.svg" alt="Пасажири" className="w-[40px] h-[40px]" />
        </div>
        <div className="relative flex items-center justify-center">
          <img src="/images/cars/bag.svg" alt="Багаж" className="w-[40px] h-[40px]" />
        </div>
        {car.child && (
          <div className="flex items-center justify-center">
            <img src="/images/cars/child.svg" alt="Дитяче крісло" className="w-[40px] h-[40px]" />
          </div>
        )}
        {car.pet && (
          <div className="flex items-center justify-center">
            <img src="/images/cars/pet.svg" alt="Тварини" className="w-[40px] h-[40px]" />
          </div>
        )}
      </div>
    </div>
  );
}
