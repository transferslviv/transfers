const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';

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
  heroImageLeftTablet: { type: String, default: '' },
  heroImageLeftMobile: { type: String, default: '' },
  heroImageRight: { type: String, default: '' },
  heroImageRightTablet: { type: String, default: '' },
  heroImageRightMobile: { type: String, default: '' },
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

const DirectionPage = mongoose.models.DirectionPage || mongoose.model('DirectionPage', DirectionPageSchema);

// Directions that should have single full-width image (not split)
const singleImageDirections = [
  'emily-resort',
  'edem-resort',
  'train-station',
  'bus-station'
];

async function fixSingleImageDirections() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let updatedCount = 0;
    let notFound = 0;

    for (const directionId of singleImageDirections) {
      const page = await DirectionPage.findOne({ directionId });
      
      if (!page) {
        console.log(`⚠️  ${directionId} — not found in database`);
        notFound++;
        continue;
      }
      
      // Clear right-side images to make it single image
      page.heroImageRight = '';
      page.heroImageRightTablet = '';
      page.heroImageRightMobile = '';
      
      await page.save();
      updatedCount++;
      console.log(`✅ ${directionId} — cleared right images (now single full-width)`);
    }

    console.log(`\n🎉 Successfully updated ${updatedCount}/${singleImageDirections.length} directions!`);
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

fixSingleImageDirections();
