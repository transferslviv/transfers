const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';

async function main() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const col = db.collection('directionpages');

  // Get Cloudinary URLs from existing kyiv/ivano-frankivsk for reuse
  const kyivDoc = await col.findOne({ directionId: 'kyiv' });
  const ifDoc = await col.findOne({ directionId: 'ivano-frankivsk' });

  const newDirections = [
    {
      directionId: 'kyiv-lviv',
      isCustom: false,
      category: 'ukraine',
      cardTitle: 'Київ → Львів',
      cardTitleEn: 'Kyiv → Lviv',
      cardImage: '/images/transfers/ukraine/kyiv-lviv1.webp',
      cardImage2: '/images/transfers/ukraine/kyiv-lviv.webp',
      cardButtonText: 'дізнатися більше',
      cardButtonTextEn: 'learn more',
      heroTitle: 'Трансфер Київ → Львів',
      heroTitleEn: 'Transfer Kyiv → Lviv',
      heroSubtitle: 'Бізнес та Преміум клас',
      heroSubtitleEn: 'Business & Premium class',
      heroCtaText: 'розрахувати вартість',
      heroCtaTextEn: 'calculate price',
      // Left = Kyiv (right side of kyiv direction), Right = Lviv (left side of kyiv direction)
      heroImageLeft: kyivDoc.heroImageRight,
      heroImageLeftTablet: kyivDoc.heroImageRightTablet,
      heroImageLeftMobile: kyivDoc.heroImageRightMobile,
      heroImageRight: kyivDoc.heroImageLeft,
      heroImageRightTablet: kyivDoc.heroImageLeftTablet,
      heroImageRightMobile: kyivDoc.heroImageLeftMobile,
      mainTitleBefore: 'ПРОПОНУЄМО',
      mainTitleBeforeEn: 'WE OFFER',
      mainTitleHighlight: 'ТРАНСФЕР КИЇВ–ЛЬВІВ',
      mainTitleHighlightEn: 'KYIV–LVIV TRANSFER',
      mainTitleAfter: 'ДЛЯ КЛІЄНТІВ, ЯКІ ОБИРАЮТЬ БІЗНЕС, ПРЕМІУМ ТА VIP РІВЕНЬ СЕРВІСУ.',
      mainTitleAfterEn: 'FOR CLIENTS WHO CHOOSE BUSINESS, PREMIUM AND VIP LEVEL OF SERVICE.',
      intro: 'Комфортний індивідуальний трансфер Київ–Львів на преміальних автомобілях BMW 7 Series та Mercedes-Benz S-Class (W222) з професійним водієм. Поїздка без попутників, з максимальною приватністю та комфортом. Відстань між містами — близько 540 км, час у дорозі — від 5,5 до 7 годин залежно від маршруту та дорожніх умов.',
      introEn: 'Comfortable private transfer Kyiv–Lviv in premium BMW 7 Series and Mercedes-Benz S-Class (W222) with a professional driver. No fellow passengers, maximum privacy and comfort. Distance between cities is about 540 km, travel time — 5.5 to 7 hours depending on route and road conditions.',
      sections: kyivDoc.sections || [],
      routesTitle: 'Популярні маршрути',
      routesTitleEn: 'Popular routes',
      routesSubtitle: 'ІНДИВІДУАЛЬНІ ТРАНСФЕРИ МІЖ УКРАЇНОЮ ТА ЄВРОПОЮ',
      routesSubtitleEn: 'INDIVIDUAL TRANSFERS BETWEEN UKRAINE AND EUROPE',
      routesDesc: 'Ми організовуємо індивідуальні преміальні трансфери між містами України та Європи, а також між європейськими містами. Поїздки здійснюються на BMW 7 Series та Mercedes-Benz S-Class (W222) з професійним водієм, без попутників, з максимальним комфортом та приватністю.\n\nСервіс підходить для бізнес-поїздок, сімейних подорожей, зустрічей на подіях або приватних трансферів до будь-яких європейських міст. Маршрут, час виїзду та всі деталі поїздки узгоджуються індивідуально, з урахуванням безпеки та актуальної дорожньо-прикордонної ситуації.',
      routesDescEn: 'We organize individual premium transfers between cities in Ukraine and Europe, as well as between European cities. Trips are carried out in BMW 7 Series and Mercedes-Benz S-Class (W222) with a professional driver, no fellow passengers, with maximum comfort and privacy.\n\nThe service is suitable for business trips, family travel, event meetings or private transfers to any European city. The route, departure time and all details are coordinated individually, taking into account safety and the current road and border situation.',
      routesIds: ['kyiv', 'bukovel', 'odesa', 'ivano-frankivsk', 'ujgorod'],
      isActive: true,
    },
    {
      directionId: 'ivano-frankivsk-lviv',
      isCustom: false,
      category: 'ukraine',
      cardTitle: 'Івано-Франківськ → Львів',
      cardTitleEn: 'Ivano-Frankivsk → Lviv',
      cardImage: '/images/transfers/ukraine/lviv-frankivsc1.webp',
      cardImage2: '/images/transfers/ukraine/lviv-frankivsc.webp',
      cardButtonText: 'дізнатися більше',
      cardButtonTextEn: 'learn more',
      heroTitle: 'Трансфер Івано-Франківськ → Львів',
      heroTitleEn: 'Transfer Ivano-Frankivsk → Lviv',
      heroSubtitle: 'Бізнес та Преміум клас',
      heroSubtitleEn: 'Business & Premium class',
      heroCtaText: 'розрахувати вартість',
      heroCtaTextEn: 'calculate price',
      // Left = IF (right side of ivano-frankivsk direction), Right = Lviv (left side)
      heroImageLeft: ifDoc.heroImageRight,
      heroImageLeftTablet: ifDoc.heroImageRightTablet,
      heroImageLeftMobile: ifDoc.heroImageRightMobile,
      heroImageRight: ifDoc.heroImageLeft,
      heroImageRightTablet: ifDoc.heroImageLeftTablet,
      heroImageRightMobile: ifDoc.heroImageLeftMobile,
      mainTitleBefore: 'ПРОПОНУЄМО',
      mainTitleBeforeEn: 'WE OFFER',
      mainTitleHighlight: 'ТРАНСФЕР ІВАНО-ФРАНКІВСЬК–ЛЬВІВ',
      mainTitleHighlightEn: 'IVANO-FRANKIVSK–LVIV TRANSFER',
      mainTitleAfter: 'ДЛЯ КЛІЄНТІВ, ЯКІ ОБИРАЮТЬ БІЗНЕС, ПРЕМІУМ ТА VIP РІВЕНЬ СЕРВІСУ.',
      mainTitleAfterEn: 'FOR CLIENTS WHO CHOOSE BUSINESS, PREMIUM AND VIP LEVEL OF SERVICE.',
      intro: 'Комфортний індивідуальний трансфер Івано-Франківськ–Львів на преміальних автомобілях BMW 7 Series та Mercedes-Benz S-Class (W222) з професійним водієм. Поїздка без попутників, з максимальною приватністю та комфортом. Відстань між містами — близько 200 км, час у дорозі — від 2,5 до 3,5 годин залежно від маршруту.',
      introEn: 'Comfortable private transfer Ivano-Frankivsk–Lviv in premium BMW 7 Series and Mercedes-Benz S-Class (W222) with a professional driver. No fellow passengers, maximum privacy and comfort. Distance between cities is about 200 km, travel time — 2.5 to 3.5 hours depending on route.',
      sections: ifDoc.sections || [],
      routesTitle: 'Популярні маршрути',
      routesTitleEn: 'Popular routes',
      routesSubtitle: 'ІНДИВІДУАЛЬНІ ТРАНСФЕРИ МІЖ УКРАЇНОЮ ТА ЄВРОПОЮ',
      routesSubtitleEn: 'INDIVIDUAL TRANSFERS BETWEEN UKRAINE AND EUROPE',
      routesDesc: 'Ми організовуємо індивідуальні преміальні трансфери між містами України та Європи, а також між європейськими містами. Поїздки здійснюються на BMW 7 Series та Mercedes-Benz S-Class (W222) з професійним водієм, без попутників, з максимальним комфортом та приватністю.\n\nСервіс підходить для бізнес-поїздок, сімейних подорожей, зустрічей на подіях або приватних трансферів до будь-яких європейських міст. Маршрут, час виїзду та всі деталі поїздки узгоджуються індивідуально, з урахуванням безпеки та актуальної дорожньо-прикордонної ситуації.',
      routesDescEn: 'We organize individual premium transfers between cities in Ukraine and Europe, as well as between European cities. Trips are carried out in BMW 7 Series and Mercedes-Benz S-Class (W222) with a professional driver, no fellow passengers, with maximum comfort and privacy.\n\nThe service is suitable for business trips, family travel, event meetings or private transfers to any European city. The route, departure time and all details are coordinated individually, taking into account safety and the current road and border situation.',
      routesIds: ['kyiv', 'bukovel', 'odesa', 'ivano-frankivsk', 'ujgorod'],
      isActive: true,
    },
  ];

  for (const dir of newDirections) {
    const existing = await col.findOne({ directionId: dir.directionId });
    if (existing) {
      console.log('Already exists:', dir.directionId, '- skipping');
      continue;
    }
    await col.insertOne({ ...dir, createdAt: new Date(), updatedAt: new Date() });
    console.log('Created:', dir.directionId);
  }

  console.log('Done!');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
