const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

function findPngFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findPngFiles(fullPath));
    } else if (item.endsWith('.png')) {
      results.push(fullPath);
    }
  }
  return results;
}

async function convert() {
  const pngFiles = findPngFiles(imagesDir);
  console.log(`Found ${pngFiles.length} PNG files to convert\n`);
  
  let totalOriginal = 0;
  let totalWebp = 0;
  
  for (const pngFile of pngFiles) {
    const webpFile = pngFile.replace(/\.png$/, '.webp');
    const originalSize = fs.statSync(pngFile).size;
    totalOriginal += originalSize;
    
    try {
      await sharp(pngFile)
        .webp({ quality: 80 })
        .toFile(webpFile);
      
      const webpSize = fs.statSync(webpFile).size;
      totalWebp += webpSize;
      const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
      const rel = path.relative(imagesDir, pngFile);
      console.log(`✓ ${rel}: ${(originalSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB (${savings}% smaller)`);
    } catch (err) {
      console.error(`✗ ${path.relative(imagesDir, pngFile)}: ${err.message}`);
    }
  }
  
  console.log(`\n--- Summary ---`);
  console.log(`Total PNG:  ${(totalOriginal/1024/1024).toFixed(2)} MB`);
  console.log(`Total WebP: ${(totalWebp/1024/1024).toFixed(2)} MB`);
  console.log(`Saved: ${((totalOriginal - totalWebp)/1024/1024).toFixed(2)} MB (${((1 - totalWebp/totalOriginal)*100).toFixed(1)}%)`);
}

convert();
