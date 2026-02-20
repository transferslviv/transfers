'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Currency, currencies as currencySymbols } from '@/lib/currency';

export default function Header() {
  const { language: currentLanguage, setLanguage, t } = useLanguage();
  const { currency: currentCurrency, setCurrency, currencySymbol } = useCurrency();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR'];
  const languages = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' }
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070707] h-[70px] shadow-[0_0_70px_rgba(0,0,0,1)]">
      <div className="w-full mx-auto px-[15px] md:px-[50px] lg:px-[50px] xl:px-[60px] 2xl:px-[150px] h-full flex items-center justify-between">
        {/* Left Part - Navigation */}
        <nav className="flex items-center gap-[20px] xl:gap-[35px] 2xl:gap-[50px]">
          <Link 
            href="/#autopark" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FFAE00] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            {t('autopark')}
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FFAE00] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/#rental-conditions" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FFAE00] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            {t('rentalConditions')}
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FFAE00] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/#services" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FFAE00] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            {t('services')}
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FFAE00] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/#contacts" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FFAE00] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            {t('contacts')}
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FFAE00] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* Center - Logo */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center px-8 xl:px-12 2xl:px-14 py-3 xl:py-3.5 2xl:py-4 bg-[#070707] rounded-full top-2 shadow-[0_0_70px_rgba(0,0,0,1)] group">
         <img 
           src="/images/logo.svg" 
           alt="TransferLviv" 
           className="h-8 xl:h-10 2xl:h-12 transition-all duration-300"
           style={{
             filter: 'brightness(1)',
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(65%) sepia(99%) saturate(1000%) hue-rotate(5deg) brightness(105%) contrast(106%)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.filter = 'brightness(1)';
           }}
         />
        </Link>

        {/* Right Part */}
        <div className="flex items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
          {/* Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLanguageOpen(false);
              }}
              className="flex items-center gap-[5px] cursor-pointer hover:text-[#FFAE00] transition-colors"
              aria-label={`Вибрати валюту, поточна: ${currencySymbol}`}
              aria-expanded={isCurrencyOpen}
            >
              <span className="text-white text-sm xl:text-base 2xl:text-lg">{currencySymbol}</span>
              <svg width="9" height="26" viewBox="0 0 9 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`}>
                <path d="M4.5 18L0 13L9 13L4.5 18Z" fill={isCurrencyOpen ? '#FFAE00' : 'white'}/>
              </svg>
            </button>
            {isCurrencyOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[15px] lg:rounded-[20px] p-2 lg:p-3 xl:p-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[60px] lg:min-w-[60px] xl:min-w-[60px] z-[60]">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={`w-full px-2 lg:px-1 xl:px-1 py-1.5 lg:py-1 xl:py-1 text-lg lg:text-lg xl:text-lg text-center rounded-[8px] lg:rounded-[10px] transition-all ${
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
              className="flex items-center gap-[5px] cursor-pointer hover:text-[#FFAE00] transition-colors"
              aria-label={`Вибрати мову, поточна: ${languages.find(l => l.code === currentLanguage)?.label}`}
              aria-expanded={isLanguageOpen}
            >
              <span className="text-white text-sm xl:text-base 2xl:text-lg">{languages.find(l => l.code === currentLanguage)?.label}</span>
              <svg width="9" height="26" viewBox="0 0 9 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`}>
                <path d="M4.5 18L0 13L9 13L4.5 18Z" fill={isLanguageOpen ? '#FFAE00' : 'white'}/>
              </svg>
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[15px] lg:rounded-[20px] p-2 lg:p-3 xl:p-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[80px] lg:min-w-[100px] xl:min-w-[100px] z-[60]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full px-2 lg:px-1 xl:px-1 py-1.5 lg:py-1 xl:py-1 text-lg lg:text-lg xl:text-lg text-center rounded-[8px] lg:rounded-[10px] transition-all ${
                      currentLanguage === lang.code ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messengers */}
          <div className="flex items-center gap-[5px] ">
            {/* Telegram */}
            <a 
              href="https://t.me/rentalviv1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] flex items-center justify-center transition-all hover:scale-110 hover:bg-[#FFAE00] bg-[#1E1D1E] p-2 rounded-[10px]"
              aria-label="Telegram - зв'язатись з нами"
            >
              <img src="/images/socials/tg-icon.svg" alt="Telegram" className="w-[20px] h-[20px]" />
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/380777877087" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] flex items-center justify-center transition-all hover:scale-110 hover:bg-[#FFAE00] bg-[#1E1D1E] p-2 rounded-[10px]"
              aria-label="WhatsApp - зв'язатись з нами"
            >
              <img src="/images/socials/whatsapp-icon.svg" alt="WhatsApp" className="w-[20px] h-[20px]" />
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/rentalviv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] flex items-center justify-center transition-all hover:scale-110 hover:bg-[#FFAE00] bg-[#1E1D1E] rounded-[10px] p-2"
              aria-label="Instagram - наш профіль"
            >
              <img src="/images/socials/insta-icon.svg" alt="Instagram" className="w-[20px] h-[20px]" />
            </a>
          </div>

          {/* Phone Number */}
          <a 
            href="tel:+380777877087"
            className="text-white text-[16px] font-black leading-[120%] hover:text-[#FFAE00] transition-colors"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            +380 777 877 087
          </a>
        </div>
      </div>
    </header>
  );
}
