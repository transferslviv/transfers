'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section 
      className="relative w-full h-[500px] md:h-[calc(100vh-70px)] flex flex-col justify-between items-center px-[15px] md:px-[50px] py-[50px] md:py-[170px] xl:py-[100px] bg-[url('/images/hero-bg.webp')] md:bg-[url('/images/hero-bg-tablet.webp')] xl:bg-[url('/images/hero-bg.webp')] bg-cover bg-center bg-no-repeat"
    >
     
      {/* Title Section */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-[10px] md:gap-[20px] w-full max-w-[1425px]">
        {/* Subtitle */}
        <h2 
          className="text-[12px] md:text-[24px] xl:text-[20px] 2xl:text-[24px] text-white text-center leading-[120%]"
          style={{ fontFamily: 'var(--font-unbounded)', letterSpacing: '0.17em' }}
        >
          {t('heroSubtitle')}
        </h2>

        {/* Main Title */}
        <h1 
          className="text-[32px] sm:text-[40px] md:text-[53px] xl:text-[55px] 2xl:text-[70px] text-white text-center md:leading-[100%] leading-[105%] font-black xl:text-nowrap"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          <span className="hidden xl:inline">{t('heroMainTitleDesktop')}<br />{t('heroMainTitleDesktopLine2')}</span>
          <span className="hidden md:inline xl:hidden">{t('heroMainTitle')}</span>
          <span className="md:hidden">{t('heroMainTitleMobile')}<br className="md:hidden" />{t('heroMainTitleMobileLine2')}</span>
        </h1>
      </div>

      {/* CTA Button */}
      <a
        href="https://t.me/rentalviv_bot"
        target="_blank"
        rel="noopener noreferrer" 
        className="relative z-10 w-full sm:w-auto flex items-center justify-center gap-[10px] px-[30px] md:px-[50px] py-[15px] md:py-[20px] rounded-[10px] text-[#070707] transition-all duration-300 hover:scale-105 overflow-hidden group bg-transparent sm:bg-[#F3F3F3] sm:hover:bg-transparent"
        style={{
          boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Orange gradient background - always visible on mobile, on hover for desktop */}
        <span className="absolute inset-0 rounded-[10px] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{ background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)' }}
        />
        {/* Gradient border */}
        <span className="absolute inset-0 rounded-[10px] pointer-events-none z-20"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.29), rgba(255,255,255,1))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        <span 
          className="relative z-10 text-[14px] sm:text-[16px] md:text-[24px] text-[#070707] font-bold leading-[100%] tracking-wide uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('heroCTA')}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-10"></span>
      </a>
    </section>
  );
}
