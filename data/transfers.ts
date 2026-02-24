export interface Transfer {
  id: string;
  title: string;
  titleEn: string;
  image: string;
  image2?: string;
  buttonText: string;
  buttonTextEn: string;
}

export const ukraineTransfers: Transfer[] = [
  {
    id: 'kyiv',
    title: 'Львів → Київ',
    titleEn: 'Lviv → Kyiv',
    image: '/images/transfers/ukraine/kyiv-lviv1.webp',
    image2: '/images/transfers/ukraine/kyiv-lviv.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more'
  },
  {
    id: 'bukovel',
    title: 'Львів → Буковель',
    titleEn: 'Lviv → Bukovel',
    image: '/images/transfers/ukraine/lviv-bukovel1.webp',
    image2: '/images/transfers/ukraine/lviv-bukovel.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more'
  },
  {
    id: 'odesa',
    title: 'Львів → Одеса',
    titleEn: 'Lviv → Odesa',
    image: '/images/transfers/ukraine/lviv-oddesa1.webp',
    image2: '/images/transfers/ukraine/lviv-oddesa.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more'
  },
  {
    id: 'ivano-frankivsk',
    title: 'Львів → Івано-Франківськ',
    titleEn: 'Lviv → Ivano-Frankivsk',
    image: '/images/transfers/ukraine/lviv-frankivsc1.webp',
    image2: '/images/transfers/ukraine/lviv-frankivsc.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more'
  },
  {
    id: 'ujgorod',
    title: 'Львів → Ужгород',
    titleEn: 'Lviv → Uzhhorod',
    image: '/images/transfers/ukraine/lviv-ujgorod1.webp',
    image2: '/images/transfers/ukraine/lviv-ujgorod.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more'
  }
];

export const europeTransfers: Transfer[] = [
  {
    id: 'krakow',
    title: 'Львів → Краків\n(Польща)',
    titleEn: 'Lviv → Krakow\n(Poland)',
    image: '/images/transfers/europe/lviv-krakiv1.webp',
    image2: '/images/transfers/europe/lviv-krakiv.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  },
  {
    id: 'warsaw',
    title: 'Львів → Варшава\n(Польща)',
    titleEn: 'Lviv → Warsaw\n(Poland)',
    image: '/images/transfers/europe/lviv-warshawa1.webp',
    image2: '/images/transfers/europe/lviv-warshawa.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  },
  {
    id: 'budapest',
    title: 'Львів → Будапешт\n(Угорщина)',
    titleEn: 'Lviv → Budapest\n(Hungary)',
    image: '/images/transfers/europe/lviv-budapesht1.webp',
    image2: '/images/transfers/europe/lviv-budapesht.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  },
  {
    id: 'bratislava',
    title: 'Львів → Братислава\n(Словаччина)',
    titleEn: 'Lviv → Bratislava\n(Slovakia)',
    image: '/images/transfers/europe/lviv-bratyslava1.webp',
    image2: '/images/transfers/europe/lviv-bratyslava.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  },
  {
    id: 'vienna',
    title: 'Львів → Відень\n(Австрія)',
    titleEn: 'Lviv → Vienna\n(Austria)',
    image: '/images/transfers/europe/lviv-viden1.webp',
    image2: '/images/transfers/europe/lviv-viden.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  }
];

export const lvivTransfers: Transfer[] = [
  {
    id: 'emily-resort',
    title: 'Emily Resort',
    titleEn: 'Emily Resort',
    image: '/images/transfers/lviv/emily-resort.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  },
  {
    id: 'edem-resort',
    title: 'Edem Resort',
    titleEn: 'Edem Resort',
    image: '/images/transfers/lviv/edem-resort.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  },
  {
    id: 'train-station',
    title: 'залізничний Вокзал',
    titleEn: 'Train Station',
    image: '/images/transfers/lviv/zalyznych-vokzal.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  },
  {
    id: 'bus-station',
    title: 'автовокзал',
    titleEn: 'Bus Station',
    image: '/images/transfers/lviv/avtovokzal.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details'
  }
];
