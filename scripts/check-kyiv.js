const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://artemruben95_db_user:1111@cluster0.c5avoit.mongodb.net/?appName=Cluster0').then(async () => {
  const db = mongoose.connection.db;
  const doc = await db.collection('directionpages').findOne({ directionId: 'kyiv' });
  const fields = ['directionId','isCustom','category','heroTitle','heroTitleEn','heroImageLeft','heroImageLeftTablet','heroImageLeftMobile','heroImageRight','heroImageRightTablet','heroImageRightMobile','mainTitleBefore','mainTitleHighlight','mainTitleAfter','routesTitle','routesSubtitle','routesDesc','routesIds','isActive'];
  for (const f of fields) {
    const v = doc[f];
    if (Array.isArray(v)) console.log(f + ': ' + JSON.stringify(v));
    else console.log(f + ': ' + v);
  }
  process.exit(0);
});
