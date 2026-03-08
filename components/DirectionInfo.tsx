'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Per-direction SEO content data
interface DirectionContent {
  mainTitle: { before: string; highlight: string; after: string };
  intro: string;
  sections: {
    heading: string;
    body?: string;
    list?: string[];
    contentHtml?: string; // HTML from TipTap (new)
  }[];
}

const directionContent: Record<string, { ua: DirectionContent; en: DirectionContent }> = {
  warsaw: {
    ua: {
      mainTitle: {
        before: 'Пропонуємо ',
        highlight: 'міжнародний трансфер Львів–Варшава',
        after: ' для клієнтів, які обирають бізнес, преміум та VIP рівень сервісу.',
      },
      intro:
        'Це індивідуальна поїздка без пересадок, очікувань і компромісів у комфорті. Ви отримуєте професійного водія, подачу авто у зручний час та чітко організований маршрут до Польщі з повним контролем кожного етапу поїздки.',
      sections: [
        {
          heading: 'Індивідуальний формат поїздки',
          body: 'Наш трансфер Львів–Варшава передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях бізнес та преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.\n\nМаршрут планується з урахуванням ситуації на кордоні, що дозволяє оптимізувати час у дорозі та забезпечити стабільне прибуття без зайвих затримок. Пунктуальність і комфорт є пріоритетом на всьому шляху з Львова до Варшави.',
        },
        {
          heading: 'Такий формат поїздки підходить для:',
          list: [
            'ділових зустрічей та переговорів',
            'трансферу до партнерів або офіційних заходів',
            'комфортного доїзду до аеропортів Варшави (Шопен, Модлін)',
          ],
        },
        {
          heading: 'Комфортний міжнародний трансфер до Польщі',
          body: 'Індивідуальний міжнародний трансфер — це можливість подорожувати у спокійній атмосфері, без сторонніх пасажирів і жорстких розкладів. Поїздка за маршрутом Львів–Варшава проходить у комфортних умовах із повною увагою до деталей та високим рівнем безпеки.\n\nОбираючи преміальний трансфер до Варшави, ви отримуєте сервіс, який відповідає вимогам бізнес-сегменту та сучасним стандартам міжнародних перевезень.',
        },
      ],
    },
    en: {
      mainTitle: {
        before: 'We offer ',
        highlight: 'international transfer Lviv–Warsaw',
        after: ' for clients who choose business, premium and VIP level of service.',
      },
      intro:
        'This is an individual trip without transfers, waiting and compromises in comfort. You get a professional driver, car delivery at a convenient time and a clearly organized route to Poland with full control of every stage of the trip.',
      sections: [
        {
          heading: 'Individual trip format',
          body: 'Our Lviv–Warsaw transfer provides a personal approach and high standards of service. The trip is carried out in business and premium class cars with confidentiality and VIP service requirements.\n\nThe route is planned taking into account the situation at the border, which allows optimizing travel time and ensuring stable arrival without unnecessary delays. Punctuality and comfort are a priority on the entire way from Lviv to Warsaw.',
        },
        {
          heading: 'This trip format is suitable for:',
          list: [
            'business meetings and negotiations',
            'transfer to partners or official events',
            'comfortable travel to Warsaw airports (Chopin, Modlin)',
          ],
        },
        {
          heading: 'Comfortable international transfer to Poland',
          body: 'An individual international transfer is an opportunity to travel in a calm atmosphere, without strangers and rigid schedules. A trip along the Lviv–Warsaw route takes place in comfortable conditions with full attention to detail and a high level of safety.\n\nBy choosing a premium transfer to Warsaw, you get a service that meets the requirements of the business segment and modern standards of international transportation.',
        },
      ],
    },
  },
  kyiv: {
    ua: {
      mainTitle: {
        before: 'Пропонуємо ',
        highlight: 'трансфер Львів–Київ',
        after: ' для клієнтів, які обирають бізнес, преміум та VIP рівень сервісу.',
      },
      intro:
        'Це індивідуальна поїздка без пересадок, очікувань і компромісів у комфорті. Ви отримуєте професійного водія, подачу авто у зручний час та чітко організований маршрут з повним контролем кожного етапу поїздки.',
      sections: [
        {
          heading: 'Індивідуальний формат поїздки',
          body: 'Наш трансфер Львів–Київ передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях бізнес та преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.\n\nМаршрут планується з урахуванням дорожньої ситуації, що дозволяє оптимізувати час у дорозі та забезпечити стабільне прибуття без зайвих затримок. Пунктуальність і комфорт є пріоритетом на всьому шляху з Львова до Києва.',
        },
        {
          heading: 'Такий формат поїздки підходить для:',
          list: [
            'ділових зустрічей та переговорів',
            'трансферу до партнерів або офіційних заходів',
            'комфортного доїзду до аеропортів Києва (Бориспіль, Жуляни)',
          ],
        },
        {
          heading: 'Комфортний трансфер до Києва',
          body: 'Індивідуальний трансфер — це можливість подорожувати у спокійній атмосфері, без сторонніх пасажирів і жорстких розкладів. Поїздка за маршрутом Львів–Київ проходить у комфортних умовах із повною увагою до деталей та високим рівнем безпеки.\n\nОбираючи преміальний трансфер до Києва, ви отримуєте сервіс, який відповідає вимогам бізнес-сегменту та сучасним стандартам перевезень.',
        },
      ],
    },
    en: {
      mainTitle: {
        before: 'We offer ',
        highlight: 'transfer Lviv–Kyiv',
        after: ' for clients who choose business, premium and VIP level of service.',
      },
      intro:
        'This is an individual trip without transfers, waiting and compromises in comfort. You get a professional driver, car delivery at a convenient time and a clearly organized route with full control of every stage of the trip.',
      sections: [
        {
          heading: 'Individual trip format',
          body: 'Our Lviv–Kyiv transfer provides a personal approach and high standards of service. The trip is carried out in business and premium class cars with confidentiality and VIP service requirements.\n\nThe route is planned taking into account the road situation, which allows optimizing travel time and ensuring stable arrival without unnecessary delays. Punctuality and comfort are a priority on the entire way from Lviv to Kyiv.',
        },
        {
          heading: 'This trip format is suitable for:',
          list: [
            'business meetings and negotiations',
            'transfer to partners or official events',
            'comfortable travel to Kyiv airports (Boryspil, Zhuliany)',
          ],
        },
        {
          heading: 'Comfortable transfer to Kyiv',
          body: 'An individual transfer is an opportunity to travel in a calm atmosphere, without strangers and rigid schedules. A trip along the Lviv–Kyiv route takes place in comfortable conditions with full attention to detail and a high level of safety.\n\nBy choosing a premium transfer to Kyiv, you get a service that meets the requirements of the business segment and modern standards of transportation.',
        },
      ],
    },
  },
};

// Fallback generator for directions without custom content
function generateFallbackContent(directionName: string, language: 'uk' | 'en'): DirectionContent {
  if (language === 'uk') {
    return {
      mainTitle: {
        before: 'Пропонуємо ',
        highlight: `трансфер Львів–${directionName}`,
        after: ' для клієнтів, які обирають бізнес, преміум та VIP рівень сервісу.',
      },
      intro:
        'Це індивідуальна поїздка без пересадок, очікувань і компромісів у комфорті. Ви отримуєте професійного водія, подачу авто у зручний час та чітко організований маршрут з повним контролем кожного етапу поїздки.',
      sections: [
        {
          heading: 'Індивідуальний формат поїздки',
          body: `Наш трансфер передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях бізнес та преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.\n\nПунктуальність і комфорт є пріоритетом на всьому шляху.`,
        },
        {
          heading: 'Такий формат поїздки підходить для:',
          list: [
            'ділових зустрічей та переговорів',
            'трансферу до партнерів або офіційних заходів',
            'комфортного та безпечного подорожування',
          ],
        },
        {
          heading: `Комфортний трансфер`,
          body: `Індивідуальний трансфер — це можливість подорожувати у спокійній атмосфері, без сторонніх пасажирів і жорстких розкладів. Поїздка проходить у комфортних умовах із повною увагою до деталей та високим рівнем безпеки.\n\nОбираючи преміальний трансфер, ви отримуєте сервіс, який відповідає вимогам бізнес-сегменту та сучасним стандартам перевезень.`,
        },
      ],
    };
  }
  return {
    mainTitle: {
      before: 'We offer ',
      highlight: `transfer Lviv–${directionName}`,
      after: ' for clients who choose business, premium and VIP level of service.',
    },
    intro:
      'This is an individual trip without transfers, waiting and compromises in comfort. You get a professional driver, car delivery at a convenient time and a clearly organized route with full control of every stage of the trip.',
    sections: [
      {
        heading: 'Individual trip format',
        body: `Our transfer provides a personal approach and high standards of service. The trip is carried out in business and premium class cars with confidentiality and VIP service requirements.\n\nPunctuality and comfort are a priority on the entire way.`,
      },
      {
        heading: 'This trip format is suitable for:',
        list: [
          'business meetings and negotiations',
          'transfer to partners or official events',
          'comfortable and safe travel',
        ],
      },
      {
        heading: 'Comfortable transfer',
        body: `An individual transfer is an opportunity to travel in a calm atmosphere, without strangers and rigid schedules. The trip takes place in comfortable conditions with full attention to detail and a high level of safety.\n\nBy choosing a premium transfer, you get a service that meets the requirements of the business segment and modern standards of transportation.`,
      },
    ],
  };
}

// Direction name mapping for fallback
const directionNames: Record<string, { ua: string; en: string }> = {
  kyiv: { ua: 'Київ', en: 'Kyiv' },
  bukovel: { ua: 'Буковель', en: 'Bukovel' },
  odesa: { ua: 'Одеса', en: 'Odesa' },
  'ivano-frankivsk': { ua: 'Івано-Франківськ', en: 'Ivano-Frankivsk' },
  ujgorod: { ua: 'Ужгород', en: 'Uzhhorod' },
  krakow: { ua: 'Краків', en: 'Krakow' },
  warsaw: { ua: 'Варшава', en: 'Warsaw' },
  budapest: { ua: 'Будапешт', en: 'Budapest' },
  bratislava: { ua: 'Братислава', en: 'Bratislava' },
  vienna: { ua: 'Відень', en: 'Vienna' },
  'emily-resort': { ua: 'Emily Resort', en: 'Emily Resort' },
  'edem-resort': { ua: 'Edem Resort', en: 'Edem Resort' },
  'train-station': { ua: 'Залізничний Вокзал', en: 'Train Station' },
  'bus-station': { ua: 'Автовокзал', en: 'Bus Station' },
};

interface DirectionInfoProps {
  id: string;
}

export default function DirectionInfo({ id }: DirectionInfoProps) {
  const { language } = useLanguage();
  const lang = language === 'uk' ? 'ua' : 'en';
  const [dbData, setDbData] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/directions/${id}`);
        const data = await res.json();
        if (data.success && data.page) {
          setDbData(data.page);
        }
      } catch {}
      setLoaded(true);
    }
    fetchData();
  }, [id]);

  // Build content from DB data if available, otherwise fallback to static
  let content: DirectionContent;

  if (dbData && dbData.mainTitleHighlight) {
    const isUa = language === 'uk';
    content = {
      mainTitle: {
        before: (isUa ? dbData.mainTitleBefore : dbData.mainTitleBeforeEn) || '',
        highlight: (isUa ? dbData.mainTitleHighlight : dbData.mainTitleHighlightEn) || '',
        after: (isUa ? dbData.mainTitleAfter : dbData.mainTitleAfterEn) || '',
      },
      intro: (isUa ? dbData.intro : dbData.introEn) || '',
      sections: (dbData.sections || []).map((s: any) => ({
        heading: (isUa ? s.heading : s.headingEn) || s.heading || '',
        body: (isUa ? s.body : s.bodyEn) || s.body || undefined,
        list: (isUa ? s.list : s.listEn) || s.list || undefined,
        contentHtml: (isUa ? s.content : s.contentEn) || undefined,
      })),
    };
  } else {
    content =
      directionContent[id]?.[lang] ??
      generateFallbackContent(
        directionNames[id]?.[lang === 'ua' ? 'ua' : 'en'] ?? id,
        language === 'uk' ? 'uk' : 'en'
      );
  }

  return (
    <section className="w-full bg-[#F4F4F4]">
      <div className="w-full max-w-[1920px] mx-auto px-[15px] md:px-[60px] xl:px-[250px] py-[60px] md:py-[100px] xl:py-[150px] flex flex-col gap-[30px] md:gap-[40px] xl:gap-[50px]">
        {/* Main title with highlight */}
        <h2
          className="text-[18px] md:text-[20px] xl:text-[24px] font-black leading-[100%] text-[#070707]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {content.mainTitle.before}{' '}
          <span className="text-[#FFAE00]">{content.mainTitle.highlight}</span>{' '}
          {content.mainTitle.after}
        </h2>

        {/* Intro paragraph */}
        <p
          className="text-[14px] md:text-[16px] xl:text-[18px] text-[#070707] leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {content.intro}
        </p>

        {/* Content sections */}
        {content.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-[15px] md:gap-[20px] xl:gap-[25px]">
            <h3
              className="text-[18px] md:text-[20px] xl:text-[24px] font-black leading-[130%] text-[#070707]"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {section.heading}
            </h3>

            {/* New: HTML content from TipTap */}
            {section.contentHtml && section.contentHtml !== '<p></p>' ? (
              <div
                className="direction-info-content text-[14px] md:text-[16px] xl:text-[18px] text-[#070707] leading-[140%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
                dangerouslySetInnerHTML={{ __html: section.contentHtml }}
              />
            ) : (
              <>
                {/* Legacy: plain text body */}
                {section.body && (
                  <div
                    className="text-[14px] md:text-[16px] xl:text-[18px] text-[#070707] leading-[120%] flex flex-col gap-[16px]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    {section.body.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Legacy: separate list */}
                {section.list && section.list.length > 0 && (
                  <ul
                    className="text-[14px] md:text-[16px] xl:text-[18px] text-[#070707] leading-[120%] flex flex-col gap-[4px]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx}>• {item}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
