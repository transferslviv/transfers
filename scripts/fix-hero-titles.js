const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0';

const updates = [
  { directionId: 'kyiv', heroTitle: 'Трансфер Львів → Київ', heroTitleEn: 'Transfer Lviv → Kyiv' },
  { directionId: 'bukovel', heroTitle: 'Трансфер Львів → Буковель', heroTitleEn: 'Transfer Lviv → Bukovel' },
  { directionId: 'odesa', heroTitle: 'Трансфер Львів → Одеса', heroTitleEn: 'Transfer Lviv → Odesa' },
  { directionId: 'ivano-frankivsk', heroTitle: 'Трансфер Львів → Івано-Франківськ', heroTitleEn: 'Transfer Lviv → Ivano-Frankivsk' },
  { directionId: 'ujgorod', heroTitle: 'Трансфер Львів → Ужгород', heroTitleEn: 'Transfer Lviv → Uzhhorod' },
  { directionId: 'krakow', heroTitle: 'Трансфер Львів → Краків (Польща)', heroTitleEn: 'Transfer Lviv → Krakow (Poland)' },
  { directionId: 'warsaw', heroTitle: 'Трансфер Львів → Варшава (Польща)', heroTitleEn: 'Transfer Lviv → Warsaw (Poland)' },
  { directionId: 'budapest', heroTitle: 'Трансфер Львів → Будапешт (Угорщина)', heroTitleEn: 'Transfer Lviv → Budapest (Hungary)' },
  { directionId: 'bratislava', heroTitle: 'Трансфер Львів → Братислава (Словаччина)', heroTitleEn: 'Transfer Lviv → Bratislava (Slovakia)' },
  { directionId: 'vienna', heroTitle: 'Трансфер Львів → Відень (Австрія)', heroTitleEn: 'Transfer Lviv → Vienna (Austria)' },
  { directionId: 'emily-resort', heroTitle: 'Трансфер Emily Resort', heroTitleEn: 'Transfer Emily Resort' },
  { directionId: 'edem-resort', heroTitle: 'Трансфер Edem Resort', heroTitleEn: 'Transfer Edem Resort' },
  { directionId: 'train-station', heroTitle: 'Трансфер Залізничний Вокзал', heroTitleEn: 'Transfer Train Station' },
  { directionId: 'bus-station', heroTitle: 'Трансфер Автовокзал', heroTitleEn: 'Transfer Bus Station' },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected\n');

  const col = mongoose.connection.db.collection('directionpages');

  for (const u of updates) {
    await col.updateOne(
      { directionId: u.directionId },
      { $set: { heroTitle: u.heroTitle, heroTitleEn: u.heroTitleEn } }
    );
    console.log(`✅ ${u.directionId}: ${u.heroTitle}`);
  }

  await mongoose.connection.close();
  console.log('\nDone!');
}

main();
