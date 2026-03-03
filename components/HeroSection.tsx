'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  return (
    <section 
      className="relative w-full h-[500px] md:h-[calc(100vh-70px)] flex flex-col justify-between items-center px-[15px] md:px-[50px] py-[50px] md:py-[120px] xl:py-[100px] bg-[url('/images/hero-bg.webp')] md:bg-[url('/images/hero-bg-tablet.webp')] xl:bg-[url('/images/hero-bg.webp')] bg-cover bg-center bg-no-repeat"
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
        href={settings.telegramBot}
        target="_blank"
        rel="noopener noreferrer" 
        className="btn-hero-cta relative z-10 w-full sm:w-auto flex items-center justify-center gap-[10px] px-[30px] md:px-[50px] py-[15px] md:py-[20px] rounded-[10px] text-[#070707] transition-all duration-300 hover:scale-105 group"
      >
        {/* Gradient border */}
        <span className="absolute inset-[-2px] rounded-[12px] pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.29), rgba(255,255,255,1))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px',
          }}
        />
        <span 
          className="relative z-10 text-[12px] sm:text-[16px] md:text-[24px] text-[#070707] font-bold leading-[100%] tracking-wide uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('heroCTA')}
        </span>
      </a>
    </section>
  );
}
