'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Currency, currencies as currencySymbols } from '@/lib/currency';

export default function MobileHeader() {
  const { language: currentLanguage, setLanguage, t } = useLanguage();
  const { currency: currentCurrency, setCurrency, currencySymbol } = useCurrency();
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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#070707] h-[35px] md:h-[56px] flex items-center justify-between px-[15px] py-[5px] md:px-[50px] shadow-[0_0_30px_rgba(0,0,0,1)] md:shadow-[0_0_70px_rgba(0,0,0,1)]">
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
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen);
                  setIsLanguageOpen(false);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-[5px]"
                aria-label={`Вибрати валюту, поточна: ${currencySymbol}`}
                aria-expanded={isCurrencyOpen}
              >
                <span className="text-white text-lg">{currencySymbol}</span>
                <svg width="9" height="30" viewBox="0 0 9 30" fill="none" className={`transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`}>
                  <path d="M4.5 18L0 13L9 13L4.5 18Z" fill={isCurrencyOpen ? '#FFAE00' : 'white'}/>
                </svg>
              </button>
              {isCurrencyOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 bg-[#1a1a1a] rounded-[20px] p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[100px] z-[60]">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-2xl text-center rounded-[10px] transition-all ${
                        currentCurrency === curr ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {currencySymbols[curr]}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
        <div className="absolute left-1/2 -translate-x-1/2 bg-[#070707] px-8 py-2 rounded-full shadow-[0_0_30px_rgba(0,0,0,1)] top-2">
          <Link href="/">
            <img 
              src="/images/logo.svg" 
              alt="TransferLviv" 
              className="h-[30px] md:h-[45px] transition-all duration-300"
              style={{
                filter: 'brightness(1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(65%) sepia(99%) saturate(1000%) hue-rotate(5deg) brightness(105%) contrast(106%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
              }}
              onTouchStart={(e) => {
                const target = e.currentTarget;
                target.style.filter = 'brightness(0) saturate(100%) invert(65%) sepia(99%) saturate(1000%) hue-rotate(5deg) brightness(105%) contrast(106%)';
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
              <img src="/images/socials/tg-icon.svg" alt="Telegram" className="w-[20px] h-[20px]" />
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
                  href="https://t.me/rentalviv1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[35px] h-[35px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-transform"
                  aria-label="Telegram - зв'язатись з нами"
                >
                  <img src="/images/socials/tg-icon.svg" alt="Telegram" className="w-[20px] h-[20px]" />
                </a>
                <a 
                  href="https://wa.me/380777877087" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[35px] h-[35px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-transform"
                  aria-label="WhatsApp - зв'язатись з нами"
                >
                  <img src="/images/socials/whatsapp-icon.svg" alt="WhatsApp" className="w-[20px] h-[20px]" />
                </a>
                <a 
                  href="https://instagram.com/rentalviv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[35px] h-[35px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-transform"
                  aria-label="Instagram - наш профіль"
                >
                  <img src="/images/socials/insta-icon.svg" alt="Instagram" className="w-[20px] h-[20px]" />
                </a>
              </div>
            )}
          </div>

          {/* Social Icons - Mobile only */}
          <div className="flex md:hidden items-center gap-[5px] relative">
            <button
              onClick={() => {
                setIsSocialOpen(!isSocialOpen);
                setIsCurrencyOpen(false);
                setIsLanguageOpen(false);
              }}
              className="w-[30px] h-[30px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
              aria-label="Відкрити меню соціальних мереж"
              aria-expanded={isSocialOpen}
            >
              <img src="/images/socials/tg-icon.svg" alt="Telegram" className="w-[13px] h-[13px]" />
            </button>
            <button onClick={() => {
              setIsSocialOpen(!isSocialOpen);
              setIsCurrencyOpen(false);
              setIsLanguageOpen(false);
            }} aria-label="Розгорнути меню соціальних мереж" aria-expanded={isSocialOpen}>
              <svg width="6" height="20" viewBox="0 0 6 20" fill="white" aria-hidden="true" className={`transition-transform duration-300 ${isSocialOpen ? 'rotate-180' : ''}`}>
                <path d="M3 13.3333L0 10.3333L6 10.3333L3 13.3333Z" fill={isSocialOpen ? '#FFAE00' : 'white'} />
              </svg>
            </button>
            {isSocialOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] rounded-[20px] p-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[60] flex gap-2">
                <a 
                  href="https://t.me/rentalviv1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
                  aria-label="Telegram - зв'язатись з нами"
                >
                  <img src="/images/socials/tg-icon.svg" alt="Telegram" className="w-[15px] h-[15px]" />
                </a>
                <a 
                  href="https://wa.me/380777877087" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
                  aria-label="WhatsApp - зв'язатись з нами"
                >
                  <img src="/images/socials/whatsapp-icon.svg" alt="WhatsApp" className="w-[15px] h-[15px]" />
                </a>
                <a 
                  href="https://instagram.com/rentalviv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 transition-transform"
                  aria-label="Instagram - наш профіль"
                >
                  <img src="/images/socials/insta-icon.svg" alt="Instagram" className="w-[15px] h-[15px]" />
                </a>
              </div>
            )}
          </div>

          {/* Phone Number - Tablet only */}
          <a 
            href="tel:+380777877087"
            className="hidden md:block text-[#FFAE00] text-[16px] font-black leading-[120%] hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            +380 777 877 087
          </a>
        </div>
      </header>

      {/* Menu Dropdown - Tablet version */}
      {isMenuOpen && (
        <div 
          className="hidden md:block lg:hidden fixed top-[56px] left-5 z-40 w-[95px]"
        >
          <nav className="bg-[#070707] rounded-b-[10px] px-[15px] py-[15px] flex flex-col gap-[15px] shadow-[0_0_30px_rgba(0,0,0,1)] ">
            <Link 
              href="/#autopark" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FFAE00] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('autopark')}
            </Link>
            <Link 
              href="/#rental-conditions" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FFAE00] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('rentalConditions')}
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
                href="/#autopark" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('autopark')}
              </Link>
              <Link 
                href="/#rental-conditions" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('rentalConditions')}
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
                href="/#contacts" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('contacts')}
              </Link>
            </nav>

            {/* Phone Number */}
            <a
              href="tel:+380777877087"
              className="text-[#FFAE00] text-[10px] font-black leading-[120%] mb-[30px]"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              +380 777 877 087
            </a>

            {/* Currency & Language */}
            <div className="flex items-center gap-[15px] mb-[20px]">
              {/* Currency Selector */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsCurrencyOpen(!isCurrencyOpen);
                    setIsLanguageOpen(false);
                  }}
                  className="flex items-center gap-[5px]"
                  aria-label={`Вибрати валюту, поточна: ${currencySymbol}`}
                  aria-expanded={isCurrencyOpen}
                >
                  <span className="text-white text-[16px] font-bold">{currencySymbol}</span>
                  <svg width="6" height="24" viewBox="0 0 6 24" fill="white" className={`transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`}>
                    <path d="M3 16L0 13L6 13L3 16Z" fill={isCurrencyOpen ? '#FFAE00' : 'white'} />
                  </svg>
                </button>
                {isCurrencyOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[20px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[80px] z-[60]">
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xl text-center rounded-[10px] transition-all ${
                          currentCurrency === curr ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                        }`}
                      >
                        {currencySymbols[curr]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
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
          className="hidden md:block lg:hidden fixed inset-0 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
