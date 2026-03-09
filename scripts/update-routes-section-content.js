const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';

// DirectionPage Schema
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

// Routes section content for all directions
const routesContent = {
  routesSubtitle: 'ІНДИВІДУАЛЬНІ ТРАНСФЕРИ МІЖ УКРАЇНОЮ ТА ЄВРОПОЮ',
  routesSubtitleEn: 'INDIVIDUAL TRANSFERS BETWEEN UKRAINE AND EUROPE',
  routesDesc: `Ми організовуємо індивідуальні преміальні трансфери між містами України та Європи, а також між європейськими містами. Поїздки здійснюються на BMW 7 Series та Mercedes-Benz S-Class (W222) з професійним водієм, без попутників, з максимальним комфортом та приватністю.

Сервіс підходить для бізнес-поїздок, сімейних подорожей, зустрічей на подіях або приватних трансферів до будь-яких європейських міст. Маршрут, час виїзду та всі деталі поїздки узгоджуються індивідуально, з урахуванням безпеки та актуальної дорожньо-прикордонної ситуації.`,
  routesDescEn: `We organize individual premium transfers between cities of Ukraine and Europe, as well as between European cities. Trips are made on BMW 7 Series and Mercedes-Benz S-Class (W222) with a professional driver, without fellow passengers, with maximum comfort and privacy.

The service is suitable for business trips, family travel, event meetings or private transfers to any European city. Route, departure time and all trip details are agreed individually, taking into account safety and the current road-border situation.`
};

const DirectionPage = mongoose.models.DirectionPage || mongoose.model('DirectionPage', DirectionPageSchema);

// All direction IDs
const directionIds = [
  'kyiv', 'bukovel', 'odesa', 'ivano-frankivsk', 'ujgorod',
  'krakow', 'warsaw', 'budapest', 'bratislava', 'vienna',
  'emily-resort', 'edem-resort', 'train-station', 'bus-station'
];

async function updateRoutesContent() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let updatedCount = 0;
    let notFound = 0;

    for (const directionId of directionIds) {
      const page = await DirectionPage.findOne({ directionId });
      
      if (!page) {
        console.log(`⚠️  ${directionId} — not found in database`);
        notFound++;
        continue;
      }
      
      // Update routes section content
      page.routesSubtitle = routesContent.routesSubtitle;
      page.routesSubtitleEn = routesContent.routesSubtitleEn;
      page.routesDesc = routesContent.routesDesc;
      page.routesDescEn = routesContent.routesDescEn;
      
      await page.save();
      updatedCount++;
      console.log(`✅ ${directionId} — routes content updated`);
    }

    console.log(`\n🎉 Successfully updated ${updatedCount}/${directionIds.length} direction pages!`);
    if (notFound > 0) {
      console.log(`⚠️  Not found: ${notFound}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

updateRoutesContent();
