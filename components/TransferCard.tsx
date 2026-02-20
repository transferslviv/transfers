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
    <div className="flex flex-col items-center justify-between bg-[#BCC4C7] rounded-[8px] md:rounded-[10px] p-[20px] w-full">
      {/* Image */}
      <div className="w-full h-[149px] md:h-[200px] rounded-[6px] overflow-hidden relative bg-[#999]">
        <Image
          src={transfer.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, 307px"
        />
      </div>

      {/* Title */}
      <p
        className="text-[16px] text-[#070707] font-black text-center leading-[120%] whitespace-pre-line mt-[15px] md:mt-[20px]"
        style={{ fontFamily: 'var(--font-nunito)' }}
      >
        {title}
      </p>

      {/* Button */}
      <button
        className="w-full mt-[15px] md:mt-[20px] py-[12px] md:py-[15px] px-[15px] md:px-[30px] rounded-[8px] md:rounded-[10px] text-[10px] md:text-[12px] font-bold text-center uppercase leading-[100%] transition-all bg-[#070707] text-[#F3F3F3] hover:bg-[#F3F3F3] hover:text-[#070707] cursor-pointer"
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
