'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  question: string;
  answerTitle: string;
  answerText: string | React.ReactNode;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqData: FAQItem[] = useMemo(() => [
    {
      question: t('faqQ1'),
      answerTitle: t('faqA1Title'),
      answerText: t('faqA1Text'),
    },
    {
      question: t('faqQ2'),
      answerTitle: t('faqA2Title'),
      answerText: t('faqA2Text'),
    },
    {
      question: t('faqQ3'),
      answerTitle: t('faqA3Title'),
      answerText: t('faqA3Text'),
    },
    {
      question: t('faqQ4'),
      answerTitle: t('faqA4Title'),
      answerText: t('faqA4Text'),
    },
    {
      question: t('faqQ5'),
      answerTitle: t('faqA5Title'),
      answerText: t('faqA5Text'),
    },
    {
      question: t('faqQ6'),
      answerTitle: t('faqA6Title'),
      answerText: t('faqA6Text').split('\n').map((line, i) => (
        <span key={i}>{line}{i < t('faqA6Text').split('\n').length - 1 && <br />}</span>
      )),
    },
    {
      question: t('faqQ7'),
      answerTitle: t('faqA7Title'),
      answerText: t('faqA7Text').split('\n').map((line, i) => (
        <span key={i}>{line}{i < t('faqA7Text').split('\n').length - 1 && <br />}</span>
      )),
    },
    {
      question: t('faqQ8'),
      answerTitle: t('faqA8Title'),
      answerText: t('faqA8Text'),
    },
  ], [t]);

  const renderAnswerPanel = (index: number) => {
    if (activeIndex !== index) return null;
    const item = faqData[index];
    return (
      <div className="px-[10px] md:px-[30px] lg:px-0">
        <div 
          className="bg-[#070707] rounded-[8px] md:rounded-[10px] px-[20px] md:px-[50px] lg:px-[50px] py-[14px] md:py-[30px] transition-all duration-300"
          style={{
            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          <h3
            className="text-[#F3F3F3] text-[12px] md:text-[16px] font-black leading-[120%] uppercase mb-[7px] md:mb-[10px]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {item.answerTitle}
          </h3>
          <div
            className="text-[#F3F3F3] text-[12px] md:text-[14px] leading-[120%]"
            style={{ fontFamily: 'var(--font-nunito-sans)' }}
          >
            {item.answerText}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#F3F3F3] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col items-center gap-[40px] md:gap-[80px] w-full max-w-[1425px] mx-auto">
        
        {/* Title */}
        <h2
          className="text-[30px] md:text-[60px] text-[#070707] font-black text-center leading-[100%] uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('faqTitle')}
        </h2>

        {/* Desktop: two-column layout */}
        <div className="hidden lg:flex flex-row gap-[50px] w-full">
          {/* Column 1 - Questions */}
          <div className="flex flex-col gap-[20px] w-1/2">
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`
                    w-full flex items-center justify-between
                    px-[50px] py-[20px]
                    rounded-[10px] transition-all duration-300 cursor-pointer
                    ${isActive
                      ? 'bg-gradient-to-r from-[#FFAE00] to-[#F39E00] border border-white/30'
                      : 'bg-transparent border border-[#070707] hover:border-[#F39E00]'
                    }
                  `}
                  style={isActive ? {
                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
                  } : undefined}
                >
                  <span
                    className="text-[20px] font-black leading-[120%] text-left text-[#070707]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 ml-[15px] transition-transform duration-300 ${isActive ? '-rotate-90' : ''}`}>
                    <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                      <path d="M9 10L0 0L18 0L9 10Z" fill="#070707" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Column 2 - Answer */}
          <div className="w-1/2">
            {activeIndex !== null && (
              <div 
                className="bg-[#070707] rounded-[10px] px-[50px] py-[30px]"
                style={{
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <h3
                  className="text-[#F3F3F3] text-[16px] font-black leading-[120%] uppercase mb-[10px]"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  {faqData[activeIndex].answerTitle}
                </h3>
                <div
                  className="text-[#F3F3F3] text-[14px] leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {faqData[activeIndex].answerText}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet: single-column, answer below active question */}
        <div className="flex lg:hidden flex-col gap-[15px] md:gap-[20px] w-full">
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={index} className="flex flex-col gap-[15px] md:gap-[20px]">
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`
                    w-full flex items-center justify-between
                    px-[20px] md:px-[50px] py-[14px] md:py-[20px]
                    rounded-[8px] md:rounded-[10px] transition-all duration-300 cursor-pointer
                    ${isActive
                      ? 'bg-gradient-to-r from-[#FFAE00] to-[#F39E00] border border-white/30'
                      : 'bg-transparent border border-[#070707] hover:border-[#F39E00]'
                    }
                  `}
                  style={isActive ? {
                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 15px rgba(0, 0, 0, 0.3)'
                  } : undefined}
                >
                  <span
                    className="text-[16px] md:text-[20px] font-black leading-[120%] text-left text-[#070707]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 ml-[7px] md:ml-[50px] transition-transform duration-300 ${isActive ? '-rotate-90' : ''}`}>
                    <svg className="w-[11px] h-[6px] md:w-[18px] md:h-[10px]" viewBox="0 0 18 10" fill="none">
                      <path d="M9 10L0 0L18 0L9 10Z" fill="#070707" />
                    </svg>
                  </div>
                </button>
                {renderAnswerPanel(index)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
