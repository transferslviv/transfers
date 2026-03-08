const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';

// Копія даних з transfers.ts
const ukraineTransfers = [
  {
    id: 'kyiv',
    title: 'Львів → Київ',
    titleEn: 'Lviv → Kyiv',
    image: '/images/transfers/ukraine/kyiv-lviv1.webp',
    image2: '/images/transfers/ukraine/kyiv-lviv.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more',
    category: 'ukraine'
  },
  {
    id: 'bukovel',
    title: 'Львів → Буковель',
    titleEn: 'Lviv → Bukovel',
    image: '/images/transfers/ukraine/lviv-bukovel1.webp',
    image2: '/images/transfers/ukraine/lviv-bukovel.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more',
    category: 'ukraine'
  },
  {
    id: 'odesa',
    title: 'Львів → Одеса',
    titleEn: 'Lviv → Odesa',
    image: '/images/transfers/ukraine/lviv-oddesa1.webp',
    image2: '/images/transfers/ukraine/lviv-oddesa.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more',
    category: 'ukraine'
  },
  {
    id: 'ivano-frankivsk',
    title: 'Львів → Івано-Франківськ',
    titleEn: 'Lviv → Ivano-Frankivsk',
    image: '/images/transfers/ukraine/lviv-frankivsc1.webp',
    image2: '/images/transfers/ukraine/lviv-frankivsc.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more',
    category: 'ukraine'
  },
  {
    id: 'ujgorod',
    title: 'Львів → Ужгород',
    titleEn: 'Lviv → Uzhhorod',
    image: '/images/transfers/ukraine/lviv-ujgorod1.webp',
    image2: '/images/transfers/ukraine/lviv-ujgorod.webp',
    buttonText: 'дізнатися більше',
    buttonTextEn: 'learn more',
    category: 'ukraine'
  }
];

const europeTransfers = [
  {
    id: 'krakow',
    title: 'Львів → Краків\n(Польща)',
    titleEn: 'Lviv → Krakow\n(Poland)',
    image: '/images/transfers/europe/lviv-krakiv1.webp',
    image2: '/images/transfers/europe/lviv-krakiv.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'europe'
  },
  {
    id: 'warsaw',
    title: 'Львів → Варшава\n(Польща)',
    titleEn: 'Lviv → Warsaw\n(Poland)',
    image: '/images/transfers/europe/lviv-warshawa1.webp',
    image2: '/images/transfers/europe/lviv-warshawa.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'europe'
  },
  {
    id: 'budapest',
    title: 'Львів → Будапешт\n(Угорщина)',
    titleEn: 'Lviv → Budapest\n(Hungary)',
    image: '/images/transfers/europe/lviv-budapesht1.webp',
    image2: '/images/transfers/europe/lviv-budapesht.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'europe'
  },
  {
    id: 'bratislava',
    title: 'Львів → Братислава\n(Словаччина)',
    titleEn: 'Lviv → Bratislava\n(Slovakia)',
    image: '/images/transfers/europe/lviv-bratyslava1.webp',
    image2: '/images/transfers/europe/lviv-bratyslava.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'europe'
  },
  {
    id: 'vienna',
    title: 'Львів → Відень\n(Австрія)',
    titleEn: 'Lviv → Vienna\n(Austria)',
    image: '/images/transfers/europe/lviv-viden1.webp',
    image2: '/images/transfers/europe/lviv-viden.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'europe'
  }
];

const lvivTransfers = [
  {
    id: 'emily-resort',
    title: 'Emily Resort',
    titleEn: 'Emily Resort',
    image: '/images/transfers/lviv/emily-resort.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'lviv'
  },
  {
    id: 'edem-resort',
    title: 'Edem Resort',
    titleEn: 'Edem Resort',
    image: '/images/transfers/lviv/edem-resort.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'lviv'
  },
  {
    id: 'train-station',
    title: 'залізничний Вокзал',
    titleEn: 'Train Station',
    image: '/images/transfers/lviv/zalyznych-vokzal.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'lviv'
  },
  {
    id: 'bus-station',
    title: 'автовокзал',
    titleEn: 'Bus Station',
    image: '/images/transfers/lviv/avtovokzal.webp',
    buttonText: 'детальніше',
    buttonTextEn: 'details',
    category: 'lviv'
  }
];

const allTransfers = [...ukraineTransfers, ...europeTransfers, ...lvivTransfers];

// Схема DirectionPage
const DirectionPageSchema = new mongoose.Schema({
  directionId: { type: String, required: true, unique: true },
  isCustom: { type: Boolean, default: false },
  category: { type: String, enum: ['ukraine', 'europe', 'lviv'], default: 'ukraine' },
  cardTitle: { type: String, default: '' },
  cardTitleEn: { type: String, default: '' },
  cardImage: { type: String, default: '' },
  cardImage2: { type: String, default: '' },
  cardButtonText: { type: String, default: 'дізнатися більше' },
  cardButtonTextEn: { type: String, default: 'learn more' },
  heroTitle: { type: String, required: true },
  heroTitleEn: { type: String, default: '' },
  heroSubtitle: { type: String, default: 'Бізнес та Преміум клас' },
  heroSubtitleEn: { type: String, default: 'Business & Premium class' },
  heroCtaText: { type: String, default: 'розрахувати вартість' },
  heroCtaTextEn: { type: String, default: 'calculate price' },
  heroImageLeft: { type: String, default: '' },
  heroImageRight: { type: String, default: '' },
  mainTitleBefore: { type: String, default: '' },
  mainTitleBeforeEn: { type: String, default: '' },
  mainTitleHighlight: { type: String, default: '' },
  mainTitleHighlightEn: { type: String, default: '' },
  mainTitleAfter: { type: String, default: '' },
  mainTitleAfterEn: { type: String, default: '' },
  intro: { type: String, default: '' },
  introEn: { type: String, default: '' },
  sections: { type: Array, default: [] },
  routesTitle: { type: String, default: 'Популярні маршрути' },
  routesTitleEn: { type: String, default: 'Popular routes' },
  routesIds: { type: [String], default: [] },
  routesSubtitle: { type: String, default: '' },
  routesSubtitleEn: { type: String, default: '' },
  routesDesc: { type: String, default: '' },
  routesDescEn: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
  collection: 'directionpages',
});

async function seedDirections() {
  try {
    console.log('🔗 Підключення до MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Підключено до MongoDB');

    const DirectionPage = mongoose.models.DirectionPage || mongoose.model('DirectionPage', DirectionPageSchema);

    console.log(`\n📦 Знайдено ${allTransfers.length} напрямків для додавання\n`);

    let created = 0;
    let skipped = 0;

    for (const transfer of allTransfers) {
      const existing = await DirectionPage.findOne({ directionId: transfer.id });
      
      if (existing) {
        console.log(`⏭️  ${transfer.id} — вже існує, пропускаю`);
        skipped++;
        continue;
      }

      const direction = {
        directionId: transfer.id,
        isCustom: false,
        category: transfer.category,
        cardTitle: transfer.title,
        cardTitleEn: transfer.titleEn,
        cardImage: transfer.image,
        cardImage2: transfer.image2 || transfer.image,
        cardButtonText: transfer.buttonText,
        cardButtonTextEn: transfer.buttonTextEn,
        heroTitle: transfer.title.replace(/\n/g, ' '),
        heroTitleEn: transfer.titleEn.replace(/\n/g, ' '),
        heroSubtitle: 'Бізнес та Преміум клас',
        heroSubtitleEn: 'Business & Premium class',
        heroCtaText: 'розрахувати вартість',
        heroCtaTextEn: 'calculate price',
        heroImageLeft: transfer.image,
        heroImageRight: transfer.image2 || transfer.image,
        mainTitleBefore: 'Трансфер',
        mainTitleBeforeEn: 'Transfer',
        mainTitleHighlight: transfer.title.replace(/\n/g, ' '),
        mainTitleHighlightEn: transfer.titleEn.replace(/\n/g, ' '),
        mainTitleAfter: '',
        mainTitleAfterEn: '',
        intro: `Комфортний трансфер ${transfer.title.replace(/\n/g, ' ')} від TransferLviv. Професійні водії, сучасні автомобілі бізнес та преміум класу.`,
        introEn: `Comfortable transfer ${transfer.titleEn.replace(/\n/g, ' ')} from TransferLviv. Professional drivers, modern business and premium class cars.`,
        sections: [
          {
            heading: 'Чому обирають нас',
            headingEn: 'Why choose us',
            content: '<p>Ми пропонуємо найкращий сервіс трансферів з професійними водіями та комфортними автомобілями.</p><ul><li><p>Професійні водії з досвідом</p></li><li><p>Сучасні автомобілі бізнес класу</p></li><li><p>Фіксована ціна без прихованих платежів</p></li><li><p>Підтримка 24/7</p></li></ul>',
            contentEn: '<p>We offer the best transfer service with professional drivers and comfortable cars.</p><ul><li><p>Professional experienced drivers</p></li><li><p>Modern business class cars</p></li><li><p>Fixed price without hidden fees</p></li><li><p>24/7 support</p></li></ul>',
          }
        ],
        routesTitle: 'Популярні маршрути',
        routesTitleEn: 'Popular routes',
        routesIds: transfer.category === 'ukraine' 
          ? ['kyiv', 'bukovel', 'odesa', 'ivano-frankivsk']
          : transfer.category === 'europe'
          ? ['krakow', 'warsaw', 'budapest', 'bratislava', 'vienna']
          : ['emily-resort', 'edem-resort', 'train-station', 'bus-station'],
        routesSubtitle: 'також можете замовити',
        routesSubtitleEn: 'you can also book',
        routesDesc: 'Інші популярні напрямки з Львова',
        routesDescEn: 'Other popular directions from Lviv',
        isActive: true,
      };

      await DirectionPage.create(direction);
      console.log(`✅ ${transfer.id} — створено`);
      created++;
    }

    console.log(`\n✨ Завершено!`);
    console.log(`✅ Створено: ${created}`);
    console.log(`⏭️  Пропущено (вже існують): ${skipped}`);

  } catch (error) {
    console.error('❌ Помилка:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Зʼєднання закрито');
  }
}

seedDirections();
