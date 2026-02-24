'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function OtherServicesSection() {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-[#BCC4C7] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col items-center gap-[40px] md:gap-[80px] w-full max-w-[1425px] mx-auto">
        
        {/* Title */}
        <h2
          className="text-[30px] md:text-[60px] text-[#070707] font-black text-center leading-[100%] uppercase w-full"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('otherServicesTitle')}
        </h2>

        {/* Row 1: Image Left + Content Right */}
        <div 
          className="w-full rounded-[10px] overflow-hidden flex flex-col xl:flex-row"
          style={{
            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Image */}
          <div className="w-full xl:w-1/2 h-[166px] md:h-[366px]">
            <img 
              src="/images/services/rent-no-driver.webp" 
              alt={t('rentNoDriverTitle')} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full xl:w-1/2 bg-[#F3F3F3] p-[20px] md:p-[50px] flex flex-col gap-[15px] md:gap-[50px]">
            {/* Title with icon */}
            <div className="flex flex-col gap-[15px] md:gap-[20px]">
              <div className="flex items-center gap-[15px]">
                {/* Car icon */}
                <div className="w-[30px] h-[30px] flex-shrink-0">
                   <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="10" fill="#F39E00" />
                    <path d="M24.9276 15.8423C24.7776 14.1583 24.5304 13.8303 24.4371 13.707C24.2225 13.4219 23.8791 13.2357 23.5157 13.0402C23.4952 13.0294 23.4774 13.0139 23.4639 12.995C23.4503 12.9761 23.4414 12.9543 23.4377 12.9313C23.434 12.9084 23.4357 12.8849 23.4427 12.8627C23.4496 12.8405 23.4617 12.8203 23.4778 12.8035C23.5451 12.7353 23.5968 12.6533 23.6294 12.5631C23.662 12.473 23.6747 12.3769 23.6666 12.2814C23.6509 12.112 23.5721 11.9547 23.4459 11.8407C23.3197 11.7267 23.1553 11.6643 22.9852 11.6659H22.3351C22.3073 11.666 22.2794 11.6678 22.2518 11.6713C22.2328 11.663 22.2131 11.6565 22.193 11.6517C21.808 10.8378 21.2808 9.72349 20.1881 9.17966C18.5675 8.3737 15.582 8.33203 14.9986 8.33203C14.4152 8.33203 11.4298 8.3737 9.81119 9.17841C8.71853 9.72224 8.19137 10.8366 7.80631 11.6504L7.80298 11.6571C7.78377 11.6598 7.76491 11.6646 7.74672 11.6713C7.71907 11.6678 7.69124 11.666 7.66337 11.6659H7.01203C6.84196 11.6643 6.67751 11.7267 6.55131 11.8407C6.4251 11.9547 6.34635 12.112 6.33068 12.2814C6.32327 12.3766 6.33653 12.4724 6.36955 12.5621C6.40256 12.6518 6.45455 12.7333 6.52196 12.801C6.53808 12.8178 6.5501 12.838 6.55705 12.8602C6.56401 12.8824 6.56572 12.9059 6.56204 12.9288C6.55836 12.9518 6.5494 12.9736 6.53586 12.9925C6.52233 13.0114 6.50458 13.0269 6.48403 13.0377C6.12065 13.2344 5.7756 13.4207 5.56265 13.7045C5.4693 13.8295 5.2226 14.1558 5.07216 15.8398C4.98881 16.7874 4.97631 17.7684 5.04174 18.4002C5.17884 19.7129 5.43596 20.5063 5.4468 20.5392C5.48625 20.659 5.55888 20.7652 5.65625 20.8454C5.75362 20.9256 5.87173 20.9765 5.99688 20.9922V21.0006C5.99688 21.1774 6.06713 21.347 6.19217 21.472C6.31721 21.5971 6.48681 21.6673 6.66364 21.6673H8.99732C9.17416 21.6673 9.34375 21.5971 9.46879 21.472C9.59384 21.347 9.66408 21.1774 9.66408 21.0006C10.0229 21.0006 10.2725 20.9364 10.5371 20.868C10.9192 20.7651 11.3097 20.6966 11.704 20.6634C12.9754 20.5422 14.2398 20.5005 14.9986 20.5005C15.7421 20.5005 17.0623 20.5422 18.3358 20.6634C18.7316 20.6967 19.1237 20.7655 19.5072 20.8689C19.7606 20.9339 20.001 20.9939 20.334 21.0001C20.334 21.177 20.4042 21.3466 20.5293 21.4716C20.6543 21.5967 20.8239 21.6669 21.0008 21.6669H23.3344C23.5113 21.6669 23.6809 21.5967 23.8059 21.4716C23.9309 21.3466 24.0012 21.177 24.0012 21.0001V20.9951C24.1266 20.9797 24.2451 20.9289 24.3428 20.8487C24.4405 20.7685 24.5134 20.6622 24.5529 20.5422C24.5638 20.5092 24.8209 19.7158 24.958 18.4031C25.0234 17.7709 25.0118 16.7916 24.9276 15.8423ZM9.01149 12.2205C9.34487 11.5121 9.72618 10.7103 10.405 10.3723C11.386 9.88393 13.4192 9.66389 14.9986 9.66389C16.578 9.66389 18.6112 9.88226 19.5922 10.3723C20.2711 10.7103 20.6507 11.5125 20.9858 12.2205L21.0274 12.311C21.0518 12.3624 21.0626 12.4193 21.0587 12.4761C21.0549 12.533 21.0365 12.5878 21.0054 12.6356C20.9743 12.6833 20.9315 12.7223 20.8811 12.7487C20.8307 12.7752 20.7743 12.7883 20.7174 12.7869C19.3326 12.7493 16.4155 12.6293 14.9986 12.6293C13.5817 12.6293 10.6646 12.7523 9.27778 12.7898C9.22084 12.7913 9.16447 12.7781 9.11404 12.7517C9.06362 12.7252 9.02082 12.6862 8.98973 12.6385C8.95864 12.5908 8.94029 12.5359 8.93644 12.479C8.93259 12.4222 8.94336 12.3653 8.96773 12.3139C8.98232 12.283 8.99774 12.2518 9.01149 12.2205ZM9.50865 15.5389C8.79179 15.6252 8.07035 15.6678 7.34833 15.6664C6.90659 15.6664 6.45111 15.5414 6.36652 15.148C6.30859 14.8834 6.31484 14.7346 6.3461 14.585C6.37235 14.4579 6.41402 14.3654 6.62239 14.3329C7.16413 14.2496 7.46709 14.3542 8.35389 14.6155C8.94189 14.7884 9.36612 15.0188 9.60783 15.2014C9.72909 15.2914 9.6645 15.5264 9.50865 15.5389ZM18.7342 18.9561C18.1858 19.0186 17.0889 18.9957 15.0111 18.9957C12.9333 18.9957 11.8369 19.0186 11.2885 18.9561C10.7226 18.8932 10.0012 18.3581 10.4938 17.8814C10.8218 17.5671 11.5869 17.3321 12.6058 17.2C13.6247 17.0679 14.056 17 15.007 17C15.9579 17 16.3455 17.0416 17.4081 17.2004C18.4708 17.3592 19.2738 17.5971 19.5201 17.8818C19.9694 18.3918 19.2997 18.8898 18.7342 18.9586V18.9561ZM23.6307 15.1476C23.5474 15.5427 23.089 15.666 22.6489 15.666C21.9131 15.6662 21.1778 15.6236 20.4469 15.5385C20.3194 15.5264 20.2602 15.3026 20.3894 15.201C20.6274 15.0138 21.0562 14.788 21.6433 14.615C22.5301 14.3538 23.0415 14.2492 23.4807 14.3362C23.5878 14.3575 23.6445 14.4725 23.6511 14.5446C23.6805 14.7454 23.6736 14.9497 23.6307 15.148V15.1476Z" fill="#070707" />
                    </svg>
                </div>
                <h3
                  className="text-[18px] md:text-[24px] text-[#070707] font-black leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {t('rentNoDriverTitle')}
                </h3>
              </div>

              {/* Description */}
              <p
                className="text-[12px] md:text-[14px] text-[#070707] leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('rentNoDriverDesc1')}
                <br /><br />
                {t('rentNoDriverDesc2')}
              </p>
            </div>

            {/* Button */}
            <Link
              href="https://t.me/rentalviv_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-[10px] md:gap-[14px] px-[20px] md:px-[50px] py-[14px] md:py-[20px] rounded-[8px] md:rounded-[10px] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="absolute inset-0 transition-opacity duration-300" style={{ background: 'radial-gradient(circle, #FFAE00 55%, #F39E00 100%)' }} />
              <div className="absolute inset-0 bg-[#070707] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Telegram icon */}
              <svg viewBox="0 0 24 20" fill="none" className="relative z-10 flex-shrink-0 w-[17px] h-[14px] md:w-[29px] md:h-[24px]">
                <path d="M22.3 0.1L0.8 8.3C-0.2 8.7-0.2 9.4 0.6 9.7L5.9 11.3L19.2 3.3C19.8 2.9 20.4 3.1 19.9 3.6L8.6 13.8L8.2 19.2C8.7 19.2 8.9 19 9.2 18.7L11.7 16.3L17.1 20.2C18 20.7 18.7 20.4 18.9 19.4L22.8 1.6C23.1 0.4 22.3-0.2 22.3 0.1Z" className="fill-[#070707] group-hover:fill-white transition-colors duration-300"/>
              </svg>
              <span
                className="relative z-10 text-[12px] md:text-[22px] text-[#070707] group-hover:text-white font-bold leading-[100%] uppercase transition-colors duration-300"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                <span className="hidden md:inline">{t('rentNoDriverButton')}</span>
                <span className="md:hidden">{t('rentNoDriverButtonMobile')}</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Row 2: Content Left + Image Right */}
        <div 
          className="w-full rounded-[10px] overflow-hidden flex flex-col-reverse xl:flex-row"
          style={{
            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Content */}
          <div className="w-full xl:w-1/2 bg-[#F3F3F3] p-[20px] md:p-[50px] flex flex-col gap-[15px] md:gap-[50px]">
            {/* Title with icon */}
            <div className="flex flex-col gap-[15px] md:gap-[20px]">
              <div className="flex items-center gap-[15px]">
                {/* Car with driver icon */}
                <div className="w-[30px] h-[30px] flex-shrink-0">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="30" height="30" rx="10" fill="#F39E00" />
  <path d="M15 5.00049C13.0222 5.00049 11.0888 5.58698 9.4443 6.68579C7.79981 7.78461 6.51809 9.34639 5.76121 11.1737C5.00433 13.0009 4.8063 15.0116 5.19215 16.9514C5.578 18.8912 6.53041 20.673 7.92894 22.0716C9.32746 23.4701 11.1093 24.4225 13.0491 24.8083C14.9889 25.1942 16.9996 24.9962 18.8268 24.2393C20.6541 23.4824 22.2159 22.2007 23.3147 20.5562C24.4135 18.9117 25 16.9783 25 15.0005C25 13.6873 24.7413 12.3869 24.2388 11.1737C23.7362 9.9604 22.9997 8.85801 22.0711 7.92942C21.1425 7.00083 20.0401 6.26424 18.8268 5.76169C17.6136 5.25915 16.3132 5.00049 15 5.00049ZM15 7.00049C16.5783 7.00115 18.1211 7.46862 19.4343 8.34408C20.7475 9.21955 21.7724 10.4639 22.38 11.9205C19.9678 11.3082 17.4887 10.9991 15 11.0005C12.5036 11.0008 10.0172 11.3167 7.6 11.9405C8.20586 10.477 9.23252 9.22628 10.5499 8.34685C11.8673 7.46741 13.4161 6.99883 15 7.00049ZM7 15.6705L8.11 15.5405C8.72401 15.4685 9.3463 15.5273 9.93596 15.7131C10.5256 15.8988 11.0693 16.2073 11.5312 16.6181C11.9931 17.029 12.3628 17.5331 12.6159 18.0971C12.8691 18.6611 13 19.2723 13 19.8905V22.7405C11.3895 22.3311 9.94642 21.4304 8.8712 20.1635C7.79598 18.8965 7.14197 17.3261 7 15.6705ZM17 22.7405V19.8905C17.0005 19.2751 17.1307 18.6667 17.3821 18.105C17.6334 17.5433 18.0003 17.0409 18.4588 16.6305C18.9174 16.2201 19.4573 15.9109 20.0433 15.7231C20.6293 15.5353 21.2483 15.473 21.86 15.5405L22.97 15.6705C22.83 17.3222 22.1804 18.8897 21.1109 20.1562C20.0414 21.4227 18.605 22.3258 17 22.7405Z" fill="#070707" />
</svg>
                </div>
                <h3
                  className="text-[18px] md:text-[24px] text-[#070707] font-black leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {t('rentWithDriverTitle')}
                </h3>
              </div>

              {/* Description */}
              <p
                className="text-[12px] md:text-[14px] text-[#070707] leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('rentWithDriverDesc1')}
                <br /><br />
                {t('rentWithDriverDesc2')}
              </p>
            </div>

            {/* Button */}
            <Link
              href="https://t.me/rentalviv_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-[10px] md:gap-[14px] px-[20px] md:px-[50px] py-[14px] md:py-[20px] rounded-[8px] md:rounded-[10px] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="absolute inset-0 transition-opacity duration-300" style={{ background: 'radial-gradient(circle, #FFAE00 55%, #F39E00 100%)' }} />
              <div className="absolute inset-0 bg-[#070707] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Telegram icon */}
              <svg viewBox="0 0 24 20" fill="none" className="relative z-10 flex-shrink-0 w-[17px] h-[14px] md:w-[29px] md:h-[24px]">
                <path d="M22.3 0.1L0.8 8.3C-0.2 8.7-0.2 9.4 0.6 9.7L5.9 11.3L19.2 3.3C19.8 2.9 20.4 3.1 19.9 3.6L8.6 13.8L8.2 19.2C8.7 19.2 8.9 19 9.2 18.7L11.7 16.3L17.1 20.2C18 20.7 18.7 20.4 18.9 19.4L22.8 1.6C23.1 0.4 22.3-0.2 22.3 0.1Z" className="fill-[#070707] group-hover:fill-white transition-colors duration-300"/>
              </svg>
              <span
                className="relative z-10 text-[12px] md:text-[22px] text-[#070707] group-hover:text-white font-bold leading-[100%] uppercase transition-colors duration-300"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                <span className="hidden md:inline">{t('rentWithDriverButton')}</span>
                <span className="md:hidden">{t('rentWithDriverButtonMobile')}</span>
              </span>
            </Link>
          </div>

          {/* Image */}
          <div className="w-full xl:w-1/2 h-[166px] md:h-[366px]">
            <img 
              src="/images/services/rent-with-driver.webp" 
              alt={t('rentWithDriverTitle')} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
