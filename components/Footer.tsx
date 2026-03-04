'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export default function Footer() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();
  
  return (
    <footer id="contacts" className="bg-[#070707] px-[15px] md:px-[50px] py-[60px] md:py-[100px]">
      <div className="flex flex-col gap-[40px] md:gap-[80px] max-w-[1425px] mx-auto">

        {/* Desktop Layout */}
        <div className="hidden xl:flex justify-between items-center">
          {/* Column 1 - Logo and Description */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="group">
              <Image src="/images/logo.svg" alt="TransferLviv" width={273} height={50} loading="lazy" className="w-[200px] xl:w-[240px] 2xl:w-[273px] h-auto group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:saturate-[5000%] group-hover:hue-rotate-[-10deg] transition-all" />
            </Link>
            <div className="flex flex-col gap-[10px]">
              <p 
                className="text-white text-xs xl:text-sm 2xl:text-base leading-[120%] uppercase"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                <span className="font-black">TransferLviv</span>
                <span className="font-light"> —</span><br />
                <span className="font-light">{t('comfortableRentalLine1')}</span><br />
                <span className="font-light">{t('comfortableRentalLine2')}</span>
              </p>
              <p 
                className="text-white text-[10px] xl:text-xs 2xl:text-sm leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('footerRights')}
              </p>
            </div>
          </div>

          {/* Contact info in horizontal layout */}
          <div className="flex gap-[30px] xl:gap-[50px] 2xl:gap-20 items-center">
            {/* Column 2 - Phone, Email and Address */}
            <div className="flex flex-col gap-[30px] xl:gap-[40px] 2xl:gap-[50px]">
              {/* Phone and Email row */}
              <div className="flex gap-[30px] xl:gap-[50px]">
                {/* Телефон */}
                <div className="flex flex-col justify-center gap-[10px]">
                  <span 
                    className="text-white text-xs xl:text-sm 2xl:text-base leading-[120%]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    {t('phoneNumber')}
                  </span>
                  <Link 
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-[10px] group transition-colors"
                  >
                    <div className="w-[35px] h-[35px] xl:w-[38px] 2xl:w-[40px] xl:h-[38px] 2xl:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all">
                      <Image src="/images/socials/phone.svg" alt="Phone" width={18} height={18} loading="lazy" />
                    </div>
                    <span 
                      className="text-white text-xs xl:text-sm 2xl:text-base font-black leading-[120%] group-hover:text-[#FFAE00] transition-colors text-nowrap"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      {settings.phone.replace(/^\+?(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4')}
                    </span>
                  </Link>
                </div>

                {/* Email */}
                <div className="flex flex-col justify-center gap-[10px]">
                  <span 
                    className="text-white text-xs xl:text-sm 2xl:text-base leading-[120%]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    {t('email')}
                  </span>
                  <Link 
                  href="mailto:rentalviv@gmail.com"
                  className="flex items-center gap-[10px] group transition-colors"
                  >
                    <div className="w-[35px] h-[35px] xl:w-[38px] 2xl:w-[40px] xl:h-[38px] 2xl:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all">
                      <Image src="/images/socials/mail.svg" alt="Email" width={18} height={18} loading="lazy" />
                    </div>
                    <span 
                      className="text-white text-xs xl:text-sm 2xl:text-base font-black leading-[120%] group-hover:text-[#FFAE00] transition-colors"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      rentalviv@gmail.com
                    </span>
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col justify-center gap-[8px] xl:gap-[10px]">
                <span 
                  className="text-white text-xs xl:text-sm 2xl:text-base leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {t('ourAddress')}
                </span>
                <a 
                  href={settings.googleMapsLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[10px] group transition-opacity duration-300 hover:opacity-80"
                >
                  <div className="w-[35px] h-[35px] xl:w-[38px] 2xl:w-[40px] xl:h-[38px] 2xl:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] group-hover:bg-[#2a292a] transition-colors duration-300">
                    <Image src="/images/socials/geo.svg" alt="Location" width={18} height={18} loading="lazy" />
                  </div>
                  <span 
                    className="text-white text-xs xl:text-sm 2xl:text-base font-black leading-[120%]"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    {t('lvivAddress')}
                  </span>
                </a>
              </div>
            </div>

            {/* Column 3 - Social networks and Messengers */}
            <div className="flex flex-col justify-center gap-[30px] xl:gap-[40px] 2xl:gap-[50px]">
              {/* Social networks */}
              <div className="flex flex-col justify-center gap-[10px]">
                <span 
                  className="text-white text-xs xl:text-sm 2xl:text-base leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {t('followUs')}
                </span>
                <div className="flex gap-[10px]">
                  <Link 
                    href={settings.instagram} 
                    target="_blank"
                    className="w-[35px] h-[35px] xl:w-[38px] 2xl:w-[40px] xl:h-[38px] 2xl:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                  >
                    <Image src="/images/socials/insta-icon.svg" alt="Instagram" width={18} height={18} loading="lazy" />
                  </Link>
                  <Link 
                    href={settings.tiktok} 
                    target="_blank"
                    className="w-[35px] h-[35px] xl:w-[38px] 2xl:w-[40px] xl:h-[38px] 2xl:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                  >
                    <Image src="/images/socials/tik-tok.svg" alt="TikTok" width={18} height={18} loading="lazy" />
                  </Link>
                </div>
              </div>

              {/* Messengers */}
              <div className="flex flex-col justify-center gap-[8px] xl:gap-[10px]">
                <span 
                  className="text-white text-xs xl:text-sm 2xl:text-base leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {t('writeToManagers')}
                </span>
                <div className="flex gap-[10px] items-center">
                  <Link 
                    href={settings.telegramProfile} 
                    target="_blank"
                    className="w-[35px] h-[35px] xl:w-[38px] 2xl:w-[40px] xl:h-[38px] 2xl:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                  >
                    <Image src="/images/socials/tg-icon.svg" alt="Telegram" width={18} height={18} loading="lazy" />
                  </Link>
                  <Link 
                    href={settings.whatsapp} 
                    target="_blank"
                    className="w-[35px] h-[35px] xl:w-[38px] 2xl:w-[40px] xl:h-[38px] 2xl:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                  >
                    <Image src="/images/socials/whatsapp-icon.svg" alt="WhatsApp" width={18} height={18} loading="lazy" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo and Description - at top on mobile/tablet */}
        <div className="xl:hidden flex flex-col md:flex-row md:items-center gap-[15px] md:gap-[50px]">
          {/* Логотип */}
          <Image src="/images/logo.svg" alt="TransferLviv" width={309} height={50} loading="lazy" className="w-[205px] md:w-[309px] h-auto" />
          
          {/* Текст */}
          <p 
            className="text-white text-[10px] md:text-base leading-[120%] uppercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            <span className="font-black">TransferLviv</span>
            <span className="font-light"> —</span><br />
            <span className="font-light">{t('comfortableRentalLine1')}</span><br />
            <span className="font-light">{t('comfortableRentalLine2')}</span>
          </p>
        </div>

        {/* Контакти - Mobile/Tablet */}
        <div className="xl:hidden flex flex-col gap-[25px] md:gap-[50px] w-full">
          {/* Phone and Email - Row on tablet */}
          <div className="flex flex-col md:flex-row gap-[25px] md:gap-[50px]">
            {/* Телефон */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('phoneNumber')}
              </span>
              <Link 
                href={`tel:${settings.phone}`}
                className="flex items-center gap-[10px]"
              >
                <div className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all">
                  <Image src="/images/socials/phone.svg" alt="Phone" width={20} height={20} loading="lazy" />
                </div>
                <span 
                  className="text-white text-[12px] md:text-base font-black leading-[120%]"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  {settings.phone.replace(/^\+?(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4')}
                </span>
              </Link>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('email')}
              </span>
              <Link 
                href="mailto:rentalviv@gmail.com"
                className="flex items-center gap-[10px]"
              >
                <div className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all">
                  <Image src="/images/socials/mail.svg" alt="Email" width={20} height={20} loading="lazy" />
                </div>
                <span 
                  className="text-white text-[12px] md:text-base font-black leading-[120%]"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  rentalviv@gmail.com
                </span>
              </Link>
            </div>
          </div>

          {/* Адреса */}
          <div className="flex flex-col gap-[10px]">
            <span 
              className="text-white text-[12px] md:text-base leading-[120%]"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('ourAddress')}
            </span>
            <a 
              href={settings.googleMapsLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[10px] group transition-opacity duration-300 hover:opacity-80"
            >
              <div className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] group-hover:bg-[#2a292a] transition-colors duration-300">
                <Image src="/images/socials/geo.svg" alt="Location" width={20} height={20} loading="lazy" />
              </div>
              <span 
                className="text-white text-[12px] md:text-base font-black leading-[120%]"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                {t('lvivAddress')}
              </span>
            </a>
          </div>

          {/* Social and Messengers - Row on tablet */}
          <div className="flex flex-col md:flex-row gap-[25px] md:gap-[50px]">
            {/* Соцмережі */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('followUs')}
              </span>
              <div className="flex gap-[10px]">
                <Link 
                  href={settings.instagram} 
                  target="_blank"
                  className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                >
                  <Image src="/images/socials/insta-icon.svg" alt="Instagram" width={20} height={20} loading="lazy" />
                </Link>
                <Link 
                  href={settings.tiktok} 
                  target="_blank"
                  className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                >
                  <Image src="/images/socials/tik-tok.svg" alt="TikTok" width={20} height={20} loading="lazy" />
                </Link>
              </div>
            </div>

            {/* Месенджери */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('writeToManagers')}
              </span>
              <div className="flex gap-[10px]">
                <Link 
                  href={settings.telegramProfile} 
                  target="_blank"
                  className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                >
                  <Image src="/images/socials/tg-icon.svg" alt="Telegram" width={20} height={20} loading="lazy" />
                </Link>
                <Link 
                  href={settings.whatsapp} 
                  target="_blank"
                  className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center bg-[#1E1D1E] p-2 rounded-[10px] hover:scale-110 hover:bg-[#FFAE00] transition-all"
                >
                  <Image src="/images/socials/whatsapp-icon.svg" alt="WhatsApp" width={20} height={20} loading="lazy" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - only on mobile/tablet */}
        <div className="xl:hidden w-full text-center">
          <p 
            className="text-white text-[12px] md:text-sm leading-[120%]"
            style={{ fontFamily: 'var(--font-nunito-sans)' }}
          >
            {t('footerRights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
