const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Config
const MONGODB_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';

cloudinary.config({
  cloud_name: 'db73uxuw6',
  api_key: '929151762587489',
  api_secret: 'HcWDCqY6FnAH6_4DIC8H9X63U5k',
});

// TransferCar schema
const TransferCarSchema = new mongoose.Schema({
  name: String,
  nameEn: String,
  description: String,
  descriptionEn: String,
  images: [String],
  mainImage: String,
  passengers: { type: Number, default: 3 },
  luggage: { type: Number, default: 2 },
  child: { type: Boolean, default: true },
  pet: { type: Boolean, default: true },
  showPassengers: { type: Boolean, default: true },
  showLuggage: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
  collection: 'transfercars'
});

const TransferCar = mongoose.model('TransferCar', TransferCarSchema);

// Car data to seed
const carsToSeed = [
  {
    name: 'BMW 7 Series',
    nameEn: 'BMW 7 Series',
    description: 'Для пари або сім\'ї з дітьми',
    descriptionEn: 'For a couple or a family with children',
    localImages: ['bmw1.webp', 'bmw2.webp', 'bmw3.webp', 'bmw4.webp', 'bmw5.webp', 'bmw6.webp'],
    passengers: 3,
    luggage: 2,
    child: true,
    pet: true,
    order: 0,
  },
  {
    name: 'Mercedes-Benz S-Class (W222)',
    nameEn: 'Mercedes-Benz S-Class (W222)',
    description: 'Для комфортної бізнес поїздки',
    descriptionEn: 'For a comfortable business trip',
    localImages: ['merc1.webp', 'merc2.webp', 'merc3.webp', 'merc4.webp', 'merc5.webp', 'merc6.webp'],
    passengers: 3,
    luggage: 2,
    child: true,
    pet: true,
    order: 1,
  },
];

async function uploadImage(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, {
      folder: 'transferlviv',
      resource_type: 'image',
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    });
  });
}

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  // Clear existing transfer cars
  const existing = await TransferCar.countDocuments();
  if (existing > 0) {
    console.log(`Found ${existing} existing cars. Clearing...`);
    await TransferCar.deleteMany({});
  }

  for (const car of carsToSeed) {
    console.log(`\nProcessing: ${car.name}`);
    const uploadedImages = [];

    for (const imgFile of car.localImages) {
      const filePath = path.join(__dirname, '..', 'public', 'images', 'cars', imgFile);
      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠ File not found: ${filePath}`);
        continue;
      }
      console.log(`  Uploading ${imgFile}...`);
      try {
        const url = await uploadImage(filePath);
        uploadedImages.push(url);
        console.log(`  ✓ ${imgFile} → ${url}`);
      } catch (err) {
        console.error(`  ✗ Failed to upload ${imgFile}:`, err.message);
      }
    }

    if (uploadedImages.length === 0) {
      console.log(`  ⚠ No images uploaded for ${car.name}, skipping`);
      continue;
    }

    const newCar = await TransferCar.create({
      name: car.name,
      nameEn: car.nameEn,
      description: car.description,
      descriptionEn: car.descriptionEn,
      images: uploadedImages,
      mainImage: uploadedImages[0],
      passengers: car.passengers,
      luggage: car.luggage,
      child: car.child,
      pet: car.pet,
      showPassengers: true,
      showLuggage: true,
      isActive: true,
      order: car.order,
    });

    console.log(`  ✓ Created: ${newCar.name} (${newCar._id}) with ${uploadedImages.length} images`);
  }

  console.log('\n✅ Seeding complete!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
