const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'db73uxuw6',
  api_key: '929151762587489',
  api_secret: 'HcWDCqY6FnAH6_4DIC8H9X63U5k',
});

const MONGO_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';
const BASE = path.join(__dirname, '..', 'public', 'images', 'міста');

const files = [
  { file: 'warsaw-deckstop.png', field: 'heroImageRight', publicId: 'warsaw-desktop' },
  { file: 'warsaw-tablet.png', field: 'heroImageRightTablet', publicId: 'warsaw-tablet' },
  { file: 'warsaw-mobile.png', field: 'heroImageRightMobile', publicId: 'warsaw-mobile' },
];

async function compressAndUpload(filePath, publicId) {
  const input = fs.readFileSync(filePath);
  const originalSize = (input.length / 1024 / 1024).toFixed(1);
  
  const compressed = await sharp(input)
    .webp({ quality: 80 })
    .toBuffer();
  
  const compressedSize = (compressed.length / 1024 / 1024).toFixed(1);
  console.log(`  ${path.basename(filePath)}: ${originalSize}MB → ${compressedSize}MB (WebP)`);
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'transferlviv/directions',
        public_id: publicId,
        format: 'webp',
        overwrite: true,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    const { Readable } = require('stream');
    Readable.from(compressed).pipe(uploadStream);
  });
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  
  const updates = {};
  
  for (const { file, field, publicId } of files) {
    const filePath = path.join(BASE, file);
    if (!fs.existsSync(filePath)) {
      console.log(`SKIP: ${file} not found`);
      continue;
    }
    
    console.log(`Uploading ${file}...`);
    const result = await compressAndUpload(filePath, publicId);
    console.log(`  → ${result.secure_url}`);
    updates[field] = result.secure_url;
  }
  
  if (Object.keys(updates).length > 0) {
    await db.collection('directionpages').updateOne(
      { directionId: 'warsaw' },
      { $set: updates }
    );
    console.log('\nWarsaw DB updated:', Object.keys(updates).join(', '));
  }
  
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
