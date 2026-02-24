'use client';

import Image from 'next/image';
import { Transfer } from '@/data/transfers';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransferCardProps {
  transfer: Transfer;
  darkButton?: boolean;
}

export default function TransferCard({ transfer, darkButton = false }: TransferCardProps) {
  const { language } = useLanguage();
  const title = language === 'uk' ? transfer.title : transfer.titleEn;
  const buttonText = language === 'uk' ? transfer.buttonText : transfer.buttonTextEn;

  return (
    <div className="flex flex-col items-center bg-[#BCC4C7] rounded-[8px] md:rounded-[10px] p-[20px] w-full gap-[15px] md:gap-[20px] overflow-hidden">
      {/* Image */}
      {transfer.image2 ? (
        <div className="w-full aspect-[200/149] md:aspect-[267/200] rounded-[6px] overflow-hidden flex gap-[5px] flex-shrink-0">
          <div className="relative w-1/2 h-full">
            <Image
              src={transfer.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 150px, (max-width: 768px) 130px, 200px"
            />
          </div>
          <div className="relative w-1/2 h-full">
            <Image
              src={transfer.image2}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 150px, (max-width: 768px) 130px, 200px"
            />
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[200/149] md:aspect-[267/200] rounded-[6px] overflow-hidden relative bg-[#999] flex-shrink-0">
          <Image
            src={transfer.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, 307px"
          />
        </div>
      )}

      {/* Title */}
      <p
        className="text-[16px] text-[#070707] font-black text-center leading-[120%] whitespace-pre-line uppercase"
        style={{ fontFamily: 'var(--font-nunito)' }}
      >
        {title}
      </p>

      {/* Button */}
      <button
        className="w-full py-[12px] px-[15px] md:py-[15px] md:px-[30px] rounded-[8px] md:rounded-[10px] text-[10px] md:text-[12px] font-bold text-center uppercase leading-[100%] transition-all bg-[#070707] text-[#F3F3F3] hover:bg-[#F3F3F3] hover:text-[#070707] cursor-pointer"
        style={{
          fontFamily: 'var(--font-unbounded)',
          boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
