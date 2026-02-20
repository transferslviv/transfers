'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section 
      className="relative w-full h-[500px] md:h-[600px] lg:h-[calc(100vh-70px)] flex flex-col justify-between items-center px-[15px] md:px-[50px] py-[50px] md:py-[80px] lg:py-[100px]"
      style={{
        backgroundImage: 'url(/images/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay для затемнення */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Title Section */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-[10px] md:gap-[15px] lg:gap-[20px] w-full max-w-[1425px]">
        {/* Subtitle */}
        <h2 
          className="text-[12px] md:text-[18px] lg:text-[20px] xl:text-[24px] text-white text-center leading-[120%]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('heroSubtitle')}
        </h2>

        {/* Main Title */}
        <h1 
          className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[55px] xl:text-[70px] text-white text-center leading-[105%] lg:leading-[100%] font-black lg:text-nowrap"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          <span className="hidden lg:inline">{t('heroMainTitleDesktop')}<br />{t('heroMainTitleDesktopLine2')}</span>
          <span className="hidden md:inline lg:hidden">{t('heroMainTitle')}</span>
          <span className="md:hidden">{t('heroMainTitleMobile')}<br className="md:hidden" />{t('heroMainTitleMobileLine2')}</span>
        </h1>
      </div>

      {/* CTA Button */}
      <a
        href="https://t.me/rentalviv_bot"
        target="_blank"
        rel="noopener noreferrer" 
        className="relative z-10 w-full sm:w-auto flex items-center justify-center gap-[10px] px-[30px] md:px-[40px] lg:px-[50px] py-[15px] md:py-[18px] lg:py-[20px] rounded-[10px] text-[#070707] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(255,174,0,0.6),0_0_30px_rgba(243,158,0,0.8)] overflow-hidden group"
        style={{
          background: 'radial-gradient(circle, #FFAE00 55%, #F39E00 100%)',
          boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
        }}
      >
        <svg className="w-[20px] h-[18px] sm:hidden flex-shrink-0" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 1.5L3.5 7.5L7 9.5L14 4.5L9 11L14.5 13.5L16.5 1.5Z" fill="#070707"/>
        </svg>
        <span 
          className="relative z-10 text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] text-[#070707] font-bold leading-[100%] tracking-wide uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('heroCTA')}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
      </a>
    </section>
  );
}
