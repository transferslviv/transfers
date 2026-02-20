'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answerTitle: string;
  answerText: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: 'Чи є трансфер індивідуальним, без попутників?',
    answerTitle: 'ТАК',
    answerText: 'Ми надаємо індивідуальний трансфер без попутників. Автомобіль замовляється виключно для вас, вашої родини або групи.',
  },
  {
    question: 'З яких міст і в які міста можливий трансфер?',
    answerTitle: 'МИ ВИКОНУЄМО ТРАНСФЕРИ ПО УКРАЇНІ, МІЖ УКРАЇНОЮ ТА ЄВРОПОЮ, А ТАКОЖ МІЖ МІСТАМИ ЄВРОПИ',
    answerText: 'Маршрут може починатися або завершуватися у Львові, а також проходити між іншими містами — за індивідуальним запитом.',
  },
  {
    question: 'Чи можна замовити трансфер для сім\u02BCї з дітьми?',
    answerTitle: 'ТАК. НАШ СЕРВІС ПІДХОДИТЬ ДЛЯ ПОЇЗДОК З ДІТЬМИ.',
    answerText: 'За попереднім запитом можливе встановлення дитячого автокрісла. Просимо повідомити вік дитини під час замовлення.',
  },
  {
    question: 'Чи можна подорожувати з домашніми тваринами?',
    answerTitle: 'ТАК.',
    answerText: 'Перевезення домашніх тварин можливе лише в контейнері та за попереднім погодженням. Будь ласка, повідомте про тварину під час оформлення заявки.',
  },
  {
    question: 'Чи можна робити зупинки під час поїздки?',
    answerTitle: 'ТАК.',
    answerText: 'Можливі короткі зупинки або коригування маршруту за домовленістю. Усі деталі узгоджуються перед поїздкою.',
  },
  {
    question: 'Як формується вартість трансферу?',
    answerTitle: 'ЦІНА РОЗРАХОВУЄТЬСЯ ІНДИВІДУАЛЬНО ПІСЛЯ УТОЧНЕННЯ ДЕТАЛЕЙ',
    answerText: (
      <>
        Вартість залежить від:
        <br />— маршруту та відстані
        <br />— тривалості поїздки
        <br />— обраного автомобіля
        <br />— додаткових побажань
      </>
    ),
  },
  {
    question: 'Як заздалегідь забронювати трансфер?',
    answerTitle: 'TELEGRAM ЧИ ДЗВІНОК',
    answerText: (
      <>
        Ви можете залишити заявку в telegram боті або зв&apos;язатися з нами зручним способом.
        <br />Ми узгоджуємо маршрут, деталі поїздки та підтверджуємо замовлення.
      </>
    ),
  },
  {
    question: 'Чи підходить сервіс для бізнес-поїздок?',
    answerTitle: 'ТАК',
    answerText: 'Наш трансфер часто обирають для бізнес-поїздок, зустрічей та подій, де важливі комфорт, пунктуальність і високий рівень сервісу.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
          НАЙЧАСТІШЕ ПИТАЮТЬ
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
