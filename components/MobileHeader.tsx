'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { Currency, currencies as currencySymbols } from '@/lib/currency';

export default function MobileHeader() {
  const { language: currentLanguage, setLanguage, t } = useLanguage();
  const { currency: currentCurrency, setCurrency, currencySymbol } = useCurrency();
  const { settings } = useSiteSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR'];
  const languages = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' }
  ] as const;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCurrencyOpen(false);
    setIsLanguageOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="xl:hidden fixed top-0 left-0 right-0 z-50 bg-[#070707] h-[35px] md:h-[56px] flex items-center justify-between px-[15px] py-[5px] md:px-[50px] shadow-[0_0_30px_rgba(0,0,0,1)] md:shadow-[0_0_70px_rgba(0,0,0,1)]">
        {/* Left Part - Navigation */}
        <div className="flex items-center gap-[15px]">
          {/* Menu Button */}
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-[5px]"
            aria-label="Відкрити меню навігації"
            aria-expanded={isMenuOpen}
          >
            <span 
              className="text-white text-[10px] md:text-sm font-extrabold leading-none uppercase"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {t('menu')}
            </span>
            <svg className={`w-[6px] h-[4px] md:w-[9px] md:h-[5px] transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 9 5" fill="none">
              <path d="M4.5 5L0 0L9 0L4.5 5Z" fill={isMenuOpen ? '#FFAE00' : 'white'}/>
            </svg>
          </button>

          {/* Currency & Language - Tablet only */}
          <div className="hidden md:flex items-center gap-[15px]">


            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsCurrencyOpen(false);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-[5px]"
                aria-label={`Вибрати мову, поточна: ${languages.find(l => l.code === currentLanguage)?.label}`}
                aria-expanded={isLanguageOpen}
              >
                <span className="text-white text-lg">{languages.find(l => l.code === currentLanguage)?.label}</span>
                <svg width="9" height="30" viewBox="0 0 9 30" fill="none" className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`}>
                  <path d="M4.5 18L0 13L9 13L4.5 18Z" fill={isLanguageOpen ? '#FFAE00' : 'white'}/>
                </svg>
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[20px] p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[120px] z-[60]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-2xl text-center rounded-[10px] transition-all ${
                        currentLanguage === lang.code ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logo - Center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center">
          <svg className="absolute top-5 md:top-8 left-1/2 -translate-x-1/2 w-[180px] md:w-[280px] h-auto" viewBox="0 0 242 39" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.8))' }}>
            <path d="M241.965 19.2554C241.965 19.2554 187.799 38.5107 120.982 38.5107C54.1657 38.5107 0 19.2554 0 19.2554C0 19.2554 54.1657 0 120.982 0C187.799 0 241.965 19.2554 241.965 19.2554Z" fill="#070707" />
          </svg>
          <Link href="/">
            <Image 
              src="/transfers-logo.svg" 
              alt="TransfersLviv" 
              width={140}
              height={40}
              priority
              className="relative z-10 h-[25px] md:h-[45px] w-auto transition-all duration-300 mt-[14px] md:mt-[16px]"
              style={{
                filter: 'brightness(1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter = 'brightness(1.15) drop-shadow(0 0 8px rgba(255,174,0,0.6))';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = 'brightness(1)';
              }}
              onTouchStart={(e) => {
                const target = e.currentTarget;
                target.style.filter = 'brightness(1.15) drop-shadow(0 0 8px rgba(255,174,0,0.6))';
                setTimeout(() => {
                  target.style.filter = 'brightness(1)';
                }, 200);
              }}
            />
          </Link>
        </div>

        {/* Right Part */}
        <div className="flex items-center gap-[15px]">
          {/* Social Icons with dropdown - Tablet only */}
          <div className="hidden md:flex items-center gap-[5px] relative">
            <button
              onClick={() => {
                setIsSocialOpen(!isSocialOpen);
                setIsCurrencyOpen(false);
                setIsLanguageOpen(false);
              }}
              className="w-[35px] h-[35px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
              aria-label="Відкрити меню соціальних мереж"
              aria-expanded={isSocialOpen}
            >
              <Image src="/images/socials/tg-icon.svg" alt="Telegram" width={20} height={20} />
            </button>
            <button onClick={() => {
              setIsSocialOpen(!isSocialOpen);
              setIsCurrencyOpen(false);
              setIsLanguageOpen(false);
            }} aria-label="Розгорнути меню соціальних мереж" aria-expanded={isSocialOpen}>
              <svg width="9" height="30" viewBox="0 0 9 30" fill="none" aria-hidden="true" className={`transition-transform duration-300 ${isSocialOpen ? 'rotate-180' : ''}`}>
                <path d="M4.5 18L0 13L9 13L4.5 18Z" fill={isSocialOpen ? '#FFAE00' : 'white'}/>
              </svg>
            </button>
            {isSocialOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] rounded-[20px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[60] flex gap-2">
                <a 
                  href={settings.telegramProfile} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[35px] h-[35px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-transform"
                  aria-label="Telegram - зв'язатись з нами"
                >
                  <Image src="/images/socials/tg-icon.svg" alt="Telegram" width={20} height={20} />
                </a>
                <a 
                  href={settings.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[35px] h-[35px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-transform"
                  aria-label="WhatsApp - зв'язатись з нами"
                >
                  <Image src="/images/socials/whatsapp-icon.svg" alt="WhatsApp" width={20} height={20} />
                </a>
                <a 
                  href={settings.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[35px] h-[35px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-transform"
                  aria-label="Instagram - наш профіль"
                >
                  <Image src="/images/socials/insta-icon.svg" alt="Instagram" width={20} height={20} />
                </a>
              </div>
            )}
          </div>

          {/* Phone Number - Mobile only */}
          <a 
            href={`tel:${settings.phone}`}
            className="flex md:hidden text-white text-[8px] font-black leading-[120%] hover:text-[#FFAE00] transition-colors"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {settings.phone.replace(/^\+?380/, '').replace(/(\d{3})(\d{3})(\d{3})/, '0 $1 $2 $3')}
          </a>

          {/* Phone Number - Tablet only */}
          <a 
            href={`tel:${settings.phone}`}
            className="hidden md:block text-white text-[16px] font-black leading-[120%] hover:text-[#FFAE00] transition-colors"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {settings.phone.replace(/^\+?380/, '').replace(/(\d{3})(\d{3})(\d{3})/, '0 $1 $2 $3')}
          </a>
        </div>
      </header>

      {/* Menu Dropdown - Tablet version */}
      {isMenuOpen && (
        <div 
          className="hidden md:block xl:hidden fixed top-[56px] left-5 z-40 w-[95px]"
        >
          <nav className="bg-[#070707] rounded-b-[10px] px-[15px] py-[15px] flex flex-col gap-[15px] shadow-[0_0_30px_rgba(0,0,0,1)] ">
            <Link 
              href="/#about" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FFAE00] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('aboutUs')}
            </Link>
            <Link 
              href="/#autopark" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FFAE00] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('autopark')}
            </Link>
            <Link 
              href="/#services" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FFAE00] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('services')}
            </Link>
            <Link 
              href="/#faq" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FFAE00] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('faq')}
            </Link>
            <Link 
              href="/#contacts" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FFAE00] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('contacts')}
            </Link>
          </nav>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed top-[0] left-0 right-0 z-[45] bg-[#070707] overflow-y-visible pt-[55px]"
          style={{ maxHeight: 'calc(100vh )' }}
        >
          <div className="flex flex-col items-center pt-[9px] px-[12.5px]">

            {/* Menu Items */}
            <nav className="bg-[#070707] rounded-[10px] px-[15px] py-[15px] flex flex-col items-center gap-[15px] w-full max-w-[295px] mb-[30px]">
              <Link 
                href="/#about" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('aboutUs')}
              </Link>
              <Link 
                href="/#autopark" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('autopark')}
              </Link>
              <Link 
                href="/#services" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('services')}
              </Link>
              <Link 
                href="/#faq" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('faq')}
              </Link>
              <Link 
                href="/#contacts" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('contacts')}
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-[10px] mb-[30px]">
              <a 
                href={settings.telegramProfile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[30px] h-[30px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
                aria-label="Telegram"
              >
                <Image src="/images/socials/tg-icon.svg" alt="Telegram" width={15} height={15} />
              </a>
              <a 
                href={settings.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[30px] h-[30px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <Image src="/images/socials/whatsapp-icon.svg" alt="WhatsApp" width={15} height={15} />
              </a>
              <a 
                href={settings.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[30px] h-[30px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Image src="/images/socials/insta-icon.svg" alt="Instagram" width={15} height={15} />
              </a>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-[15px] mb-[20px]">
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsLanguageOpen(!isLanguageOpen);
                    setIsCurrencyOpen(false);
                  }}
                  className="flex items-center gap-[5px]"
                  aria-label={`Вибрати мову, поточна: ${languages.find(l => l.code === currentLanguage)?.label}`}
                  aria-expanded={isLanguageOpen}
                >
                  <span className="text-white text-[16px] font-bold leading-tight">{languages.find(l => l.code === currentLanguage)?.label}</span>
                  <svg width="6" height="24" viewBox="0 0 6 24" fill="white" className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`}>
                    <path d="M3 16L0 13L6 13L3 16Z" fill={isLanguageOpen ? '#FFAE00' : 'white'} />
                  </svg>
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[20px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[100px] z-[60]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xl text-center rounded-[10px] transition-all ${
                          currentLanguage === lang.code ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop overlay - Mobile only */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-[35]"
          onClick={toggleMenu}
        />
      )}

      {/* Backdrop overlay - Tablet */}
      {isMenuOpen && (
        <div 
          className="hidden md:block xl:hidden fixed inset-0 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
