const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Config
const MONGODB_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';

cloudinary.config({
  cloud_name: 'db73uxuw6',
  api_key: '929151762587489',
  api_secret: 'HcWDCqY6FnAH6_4DIC8H9X63U5k',
});

const imagesDir = path.join(__dirname, '..', 'public', 'images', 'міста');
const tmpDir = path.join(os.tmpdir(), 'direction-images');

// Schema
const DirectionPageSchema = new mongoose.Schema({
  directionId: { type: String, required: true, unique: true },
  heroImageLeft: { type: String, default: '' },
  heroImageLeftTablet: { type: String, default: '' },
  heroImageLeftMobile: { type: String, default: '' },
  heroImageRight: { type: String, default: '' },
  heroImageRightTablet: { type: String, default: '' },
  heroImageRightMobile: { type: String, default: '' },
}, {
  timestamps: true,
  collection: 'directionpages',
  strict: false,
});

const DirectionPage = mongoose.models.DirectionPage || mongoose.model('DirectionPage', DirectionPageSchema);

// Mapping
const directionMapping = {
  'kyiv': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'kyiv' },
  'bukovel': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'bukhovel' },
  'odesa': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'odesa' },
  'ivano-frankivsk': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'ivano-frankivsk' },
  'ujgorod': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'uzhgorod' },
  'krakow': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'krakiv' },
  'warsaw': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'varshava' },
  'budapest': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'budapesht' },
  'bratislava': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'bratislava' },
  'vienna': { type: 'split', leftPrefix: 'lviv', rightPrefix: 'viden' },
  'emily-resort': { type: 'single', prefix: 'Emily-Resort' },
  'edem-resort': { type: 'single', prefix: 'Edem-Resort' },
  'train-station': { type: 'single', prefix: 'vokzal' },
  'bus-station': { type: 'single', prefix: 'avtovokzal' },
};

function findFile(prefix, suffix) {
  const files = fs.readdirSync(imagesDir);
  if (suffix === 'desktop') {
    const variations = ['deckstop', 'decstop', 'dckstop', 'desktop'];
    for (const v of variations) {
      const match = files.find(f => f.toLowerCase().startsWith(prefix.toLowerCase() + '-' + v));
      if (match) return match;
    }
  }
  return files.find(f => f.toLowerCase().startsWith(prefix.toLowerCase() + '-' + suffix.toLowerCase())) || null;
}

// Compress with sharp before uploading
async function compressImage(inputPath, outputPath) {
  const stats = fs.statSync(inputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1);
  
  await sharp(inputPath)
    .webp({ quality: 82 })
    .toFile(outputPath);
  
  const newStats = fs.statSync(outputPath);
  const newSizeMB = (newStats.size / 1024 / 1024).toFixed(1);
  console.log(`    🗜️  ${sizeMB}MB → ${newSizeMB}MB (webp)`);
  return outputPath;
}

async function uploadToCloudinary(filePath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, {
      folder: 'transferlviv/directions',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

// Cache for lviv images (same for all split directions)
const lvivCache = {};

async function main() {
  // Create temp dir
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const files = fs.readdirSync(imagesDir);
    console.log(`📁 Found ${files.length} files in міста folder\n`);

    // Pre-upload Lviv images (shared across all split directions)
    console.log('🏙️  Pre-uploading Lviv images (shared for all split directions)...');
    for (const [size, suffix] of [['desktop', 'desktop'], ['tablet', 'tablet'], ['mobile', 'mobile']]) {
      const fileName = findFile('lviv', suffix);
      if (fileName) {
        const inputPath = path.join(imagesDir, fileName);
        const outputPath = path.join(tmpDir, `lviv-${size}.webp`);
        console.log(`  📤 ${fileName} → lviv-${size}`);
        await compressImage(inputPath, outputPath);
        const result = await uploadToCloudinary(outputPath, `lviv-${size}`);
        lvivCache[size] = result.secure_url;
        console.log(`  ✅ Uploaded: ${result.secure_url}\n`);
      }
    }

    let uploadedCount = 0;
    let errorCount = 0;

    for (const [directionId, config] of Object.entries(directionMapping)) {
      console.log(`\n📍 Processing: ${directionId}`);

      const page = await DirectionPage.findOne({ directionId });
      if (!page) {
        console.log(`  ⚠️  Not found in database, skipping`);
        errorCount++;
        continue;
      }

      const updateData = {};

      if (config.type === 'split') {
        // Left side - use cached Lviv URLs
        if (lvivCache.desktop) updateData.heroImageLeft = lvivCache.desktop;
        if (lvivCache.tablet) updateData.heroImageLeftTablet = lvivCache.tablet;
        if (lvivCache.mobile) updateData.heroImageLeftMobile = lvivCache.mobile;

        // Right side - city-specific
        for (const [size, suffix] of [['desktop', 'desktop'], ['tablet', 'tablet'], ['mobile', 'mobile']]) {
          const fileName = findFile(config.rightPrefix, suffix);
          if (fileName) {
            const inputPath = path.join(imagesDir, fileName);
            const outputPath = path.join(tmpDir, `${directionId}-right-${size}.webp`);
            try {
              console.log(`  📤 ${fileName} → right-${size}`);
              await compressImage(inputPath, outputPath);
              const result = await uploadToCloudinary(outputPath, `${directionId}-right-${size}`);
              if (size === 'desktop') updateData.heroImageRight = result.secure_url;
              else if (size === 'tablet') updateData.heroImageRightTablet = result.secure_url;
              else updateData.heroImageRightMobile = result.secure_url;
              uploadedCount++;
            } catch (err) {
              console.log(`  ❌ Error: ${err.message}`);
              errorCount++;
            }
          } else {
            console.log(`  ⚠️  No file for right-${size} (prefix: ${config.rightPrefix})`);
          }
        }
      } else {
        // Single image directions
        for (const [size, suffix] of [['desktop', 'desktop'], ['tablet', 'tablet'], ['mobile', 'mobile']]) {
          const fileName = findFile(config.prefix, suffix);
          if (fileName) {
            const inputPath = path.join(imagesDir, fileName);
            const outputPath = path.join(tmpDir, `${directionId}-${size}.webp`);
            try {
              console.log(`  📤 ${fileName} → ${size}`);
              await compressImage(inputPath, outputPath);
              const result = await uploadToCloudinary(outputPath, `${directionId}-${size}`);
              if (size === 'desktop') updateData.heroImageLeft = result.secure_url;
              else if (size === 'tablet') updateData.heroImageLeftTablet = result.secure_url;
              else updateData.heroImageLeftMobile = result.secure_url;
              uploadedCount++;
            } catch (err) {
              console.log(`  ❌ Error: ${err.message}`);
              errorCount++;
            }
          } else {
            console.log(`  ⚠️  No file for ${size} (prefix: ${config.prefix})`);
          }
        }
        // Clear right side for single image
        updateData.heroImageRight = '';
        updateData.heroImageRightTablet = '';
        updateData.heroImageRightMobile = '';
      }

      // Save to DB
      if (Object.keys(updateData).length > 0) {
        await DirectionPage.updateOne(
          { directionId },
          { $set: updateData }
        );
        console.log(`  ✅ DB updated (${Object.keys(updateData).length} fields)`);
      }
    }

    console.log(`\n\n🎉 Done!`);
    console.log(`📤 Uploaded: ${uploadedCount} images (+ 3 Lviv shared)`);
    console.log(`❌ Errors: ${errorCount}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    // Cleanup temp
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
    console.log('\n🔌 Database connection closed');
  }
}

main();
