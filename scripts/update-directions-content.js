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

const detailedContent = {
  // Україна
  kyiv: {
    mainTitleBefore: 'ПРОПОНУЄМО',
    mainTitleBeforeEn: 'WE OFFER',
    mainTitleHighlight: 'ТРАНСФЕР ЛЬВІВ–КИЇВ',
    mainTitleHighlightEn: 'LVIV–KYIV TRANSFER',
    mainTitleAfter: 'ДЛЯ КЛІЄНТІВ, ЯКІ ОБИРАЮТЬ БІЗНЕС, ПРЕМІУМ ТА VIP РІВЕНЬ СЕРВІСУ.',
    mainTitleAfterEn: 'FOR CLIENTS WHO CHOOSE BUSINESS, PREMIUM AND VIP LEVEL OF SERVICE.',
    intro: 'Це індивідуальна поїздка без пересадок, очікувань і компромісів у комфорті. Ви отримуєте професійного водія, подачу авто у зручний час та чітко організований маршрут до Києва з повним контролем кожного етапу поїздки.',
    introEn: 'This is an individual trip without transfers, waiting and compromises in comfort. You get a professional driver, car delivery at a convenient time and a clearly organized route to Kyiv with full control of every stage of the trip.',
    sections: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Київ передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях бізнес та преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.</p><p>Маршрут планується з урахуванням ситуації на дорозі, що дозволяє оптимізувати час у дорозі та забезпечити стабільне прибуття без зайвих затримок. Пунктуальність і комфорт є пріоритетом на всьому шляху зі Львова до Київа.</p>',
      contentEn: '<p>Our Lviv–Kyiv transfer provides a personal approach and high service standards. The trip is carried out in business and premium class cars with confidentiality and VIP service requirements.</p><p>The route is planned taking into account the road situation, which allows optimizing travel time and ensuring stable arrival without unnecessary delays. Punctuality and comfort are priorities throughout the journey from Lviv to Kyiv.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових зустрічей та переговорів</li><li>трансферу до партнерів або офіційних заходів</li><li>комфортного доїзду до аеропортів Києва (Бориспіль, Жуляни)</li></ul>',
      contentEn: '<ul><li>business meetings and negotiations</li><li>transfer to partners or official events</li><li>comfortable travel to Kyiv airports (Boryspil, Zhuliany)</li></ul>',
    },
    {
      heading: 'КОМФОРТНИЙ МІЖМІСЬКИЙ ТРАНСФЕР',
      headingEn: 'COMFORTABLE INTERCITY TRANSFER',
      content: '<p>Індивідуальний міжміський трансфер — це можливість подорожувати у спокійній атмосфері, без сторонніх пасажирів і жорстких розкладів. Поїздка за маршрутом Львів–Київ проходить у комфортних умовах із повною увагою до деталей та високим рівнем безпеки.</p><p>Обираючи преміальний трансфер до Києва, ви отримуєте сервіс, який відповідає вимогам бізнес-сегменту та сучасним стандартам міжнародних перевезень.</p>',
      contentEn: '<p>Individual intercity transfer is an opportunity to travel in a calm atmosphere, without other passengers and rigid schedules. The trip along the Lviv–Kyiv route takes place in comfortable conditions with full attention to details and a high level of safety.</p><p>By choosing a premium transfer to Kyiv, you receive a service that meets the requirements of the business segment and modern standards of international transportation.</p>',
    }
  ],
  bukovel: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Буковель передбачає персональний підхід до кожного клієнта. Поїздка здійснюється на автомобілях бізнес та преміум класу з дотриманням високих стандартів сервісу.</p><p>Маршрут через Карпати плануєється з урахуванням погодних умов та ситуації на дорозі, що дозволяє оптимізувати час у дорозі та забезпечити безпечне прибуття до курорту.</p>',
      contentEn: '<p>Our Lviv–Bukovel transfer provides a personal approach to each client. The trip is carried out in business and premium class cars with high service standards.</p><p>The route through the Carpathians is planned taking into account weather conditions and road situation, which allows optimizing travel time and ensuring safe arrival at the resort.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>відпочинку на гірськолижному курорті</li><li>трансферу з лижним спорядженням</li><li>комфортного доїзду до готелів Буковеля</li></ul>',
      contentEn: '<ul><li>vacation at a ski resort</li><li>transfer with ski equipment</li><li>comfortable travel to Bukovel hotels</li></ul>',
    },
    {
      heading: 'КОМФОРТНИЙ ТРАНСФЕР ДО КАРПАТ',
      headingEn: 'COMFORTABLE TRANSFER TO THE CARPATHIANS',
      content: '<p>Індивідуальний трансфер до Буковеля — це можливість подорожувати у спокійній атмосфері, без сторонніх пасажирів. Поїздка проходить мальовничим маршрутом через Карпати з повною увагою до деталей та високим рівнем безпеки.</p><p>Обираючи преміальний трансфер до Буковеля, ви отримуєте сервіс, який відповідає вимогам найвибагливіших клієнтів.</p>',
      contentEn: '<p>Individual transfer to Bukovel is an opportunity to travel in a calm atmosphere, without other passengers. The trip takes place along a scenic route through the Carpathians with full attention to details and a high level of safety.</p><p>By choosing a premium transfer to Bukovel, you receive a service that meets the requirements of the most demanding clients.</p>',
    }
  ],
  odesa: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Одеса передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях преміум класу з дотриманням конфіденційності.</p><p>Довга подорож організовується з регулярними комфортними зупинками для відпочинку. Можлива нічна поїздка для максимального комфорту пасажирів.</p>',
      contentEn: '<p>Our Lviv–Odesa transfer provides a personal approach and high service standards. The trip is carried out in premium class cars with confidentiality.</p><p>The long journey is organized with regular comfortable rest stops. Night trip is possible for maximum passenger comfort.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових поїздок до Одеси</li><li>відпочинку на узбережжі Чорного моря</li><li>комфортного переїзду між містами</li></ul>',
      contentEn: '<ul><li>business trips to Odesa</li><li>vacation on the Black Sea coast</li><li>comfortable travel between cities</li></ul>',
    }
  ],
  'ivano-frankivsk': [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Івано-Франківськ передбачає швидкий та комфортний переїзд між сусідніми містами. Поїздка здійснюється на автомобілях бізнес класу.</p><p>Ідеально підходить для ділових поїздок та трансферу до аеропорту Івано-Франківська.</p>',
      contentEn: '<p>Our Lviv–Ivano-Frankivsk transfer provides fast and comfortable travel between neighboring cities. The trip is carried out in business class cars.</p><p>Ideal for business trips and transfer to Ivano-Frankivsk airport.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових зустрічей</li><li>трансферу до аеропорту</li><li>швидких поїздок між містами</li></ul>',
      contentEn: '<ul><li>business meetings</li><li>airport transfer</li><li>quick trips between cities</li></ul>',
    }
  ],
  ujgorod: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Ужгород передбачає комфортну подорож через Карпати. Поїздка здійснюється на автомобілях преміум класу мальовничим маршрутом.</p><p>Зручне розташування Ужгорода біля кордону з ЄС робить цей трансфер популярним серед міжнародних пасажирів.</p>',
      contentEn: '<p>Our Lviv–Uzhhorod transfer provides a comfortable journey through the Carpathians. The trip is carried out in premium class cars along a scenic route.</p><p>The convenient location of Uzhhorod near the EU border makes this transfer popular among international passengers.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>поїздок до кордону з ЄС</li><li>туристичних подорожей</li><li>комфортного переїзду через Карпати</li></ul>',
      contentEn: '<ul><li>trips to the EU border</li><li>tourist trips</li><li>comfortable travel through the Carpathians</li></ul>',
    }
  ],
  // Європа
  krakow: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Краків передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях бізнес та преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.</p><p>Маршрут плануєється з урахуванням ситуації на кордоні, що дозволяє оптимізувати час у дорозі та забезпечити стабільне прибуття без зайвих затримок. Пунктуальність і комфорт є пріоритетом на всьому шляху зі Львова до Кракова.</p>',
      contentEn: '<p>Our Lviv–Krakow transfer provides a personal approach and high service standards. The trip is carried out in business and premium class cars with confidentiality and VIP service requirements.</p><p>The route is planned taking into account the border situation, which allows optimizing travel time and ensuring stable arrival without unnecessary delays. Punctuality and comfort are priorities throughout the journey from Lviv to Krakow.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових зустрічей та переговорів</li><li>трансферу до партнерів або офіційних заходів</li><li>комфортного доїзду до аеропортів Кракова</li></ul>',
      contentEn: '<ul><li>business meetings and negotiations</li><li>transfer to partners or official events</li><li>comfortable travel to Krakow airports</li></ul>',
    },
    {
      heading: 'КОМФОРТНИЙ МІЖНАРОДНИЙ ТРАНСФЕР ДО ПОЛЬЩІ',
      headingEn: 'COMFORTABLE INTERNATIONAL TRANSFER TO POLAND',
      content: '<p>Індивідуальний міжнародний трансфер — це можливість подорожувати у спокійній атмосфері, без сторонніх пасажирів і жорстких розкладів. Поїздка за маршрутом Львів–Краків проходить у комфортних умовах із повною увагою до деталей та високим рівнем безпеки.</p><p>Обираючи преміальний трансфер до Кракова, ви отримуєте сервіс, який відповідає вимогам бізнес-сегменту та сучасним стандартам міжнародних перевезень.</p>',
      contentEn: '<p>Individual international transfer is an opportunity to travel in a calm atmosphere, without other passengers and rigid schedules. The trip along the Lviv–Krakow route takes place in comfortable conditions with full attention to details and a high level of safety.</p><p>By choosing a premium transfer to Krakow, you receive a service that meets the requirements of the business segment and modern standards of international transportation.</p>',
    }
  ],
  warsaw: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Варшава передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях бізнес та преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.</p><p>Маршрут плануєється з урахуванням ситуації на кордоні, що дозволяє оптимізувати час у дорозі та забезпечити стабільне прибуття без зайвих затримок. Пунктуальність і комфорт є пріоритетом на всьому шляху зі Львова до Варшави.</p>',
      contentEn: '<p>Our Lviv–Warsaw transfer provides a personal approach and high service standards. The trip is carried out in business and premium class cars with confidentiality and VIP service requirements.</p><p>The route is planned taking into account the border situation, which allows optimizing travel time and ensuring stable arrival without unnecessary delays. Punctuality and comfort are priorities throughout the journey from Lviv to Warsaw.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових зустрічей та переговорів</li><li>трансферу до партнерів або офіційних заходів</li><li>комфортного доїзду до аеропортів Варшави (Шопен, Модлін)</li></ul>',
      contentEn: '<ul><li>business meetings and negotiations</li><li>transfer to partners or official events</li><li>comfortable travel to Warsaw airports (Chopin, Modlin)</li></ul>',
    },
    {
      heading: 'КОМФОРТНИЙ МІЖНАРОДНИЙ ТРАНСФЕР ДО ПОЛЬЩІ',
      headingEn: 'COMFORTABLE INTERNATIONAL TRANSFER TO POLAND',
      content: '<p>Індивідуальний міжнародний трансфер — це можливість подорожувати у спокійній атмосфері, без сторонніх пасажирів і жорстких розкладів. Поїздка за маршрутом Львів–Варшава проходить у комфортних умовах із повною увагою до деталей та високим рівнем безпеки.</p><p>Обираючи преміальний трансфер до Варшави, ви отримуєте сервіс, який відповідає вимогам бізнес-сегменту та сучасним стандартам міжнародних перевезень.</p>',
      contentEn: '<p>Individual international transfer is an opportunity to travel in a calm atmosphere, without other passengers and rigid schedules. The trip along the Lviv–Warsaw route takes place in comfortable conditions with full attention to details and a high level of safety.</p><p>By choosing a premium transfer to Warsaw, you receive a service that meets the requirements of the business segment and modern standards of international transportation.</p>',
    }
  ],
  budapest: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Будапешт передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.</p><p>Маршрут через Карпати планується з урахуванням ситуації на кордоні Україна–Угорщина, що дозволяє оптимізувати час у дорозі та забезпечити комфортне прибуття до Будапешта.</p>',
      contentEn: '<p>Our Lviv–Budapest transfer provides a personal approach and high service standards. The trip is carried out in premium class cars with confidentiality and VIP service requirements.</p><p>The route through the Carpathians is planned taking into account the situation at the Ukraine–Hungary border, which allows optimizing travel time and ensuring comfortable arrival in Budapest.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових зустрічей та переговорів</li><li>трансферу до партнерів або офіційних заходів</li><li>комфортного доїзду до аеропортів Будапешта</li></ul>',
      contentEn: '<ul><li>business meetings and negotiations</li><li>transfer to partners or official events</li><li>comfortable travel to Budapest airports</li></ul>',
    },
    {
      heading: 'КОМФОРТНИЙ МІЖНАРОДНИЙ ТРАНСФЕР ДО УГОРЩИНИ',
      headingEn: 'COMFORTABLE INTERNATIONAL TRANSFER TO HUNGARY',
      content: '<p>Індивідуальний міжнародний трансфер — це можливість подорожувати у спокійній атмосфері мальовничим маршрутом через Карпати. Поїздка за маршрутом Львів–Будапешт проходить у комфортних умовах із повною увагою до деталей та високим рівнем безпеки.</p><p>Обираючи преміальний трансфер до Будапешта, ви отримуєте сервіс європейського рівня.</p>',
      contentEn: '<p>Individual international transfer is an opportunity to travel in a calm atmosphere along a scenic route through the Carpathians. The trip along the Lviv–Budapest route takes place in comfortable conditions with full attention to details and a high level of safety.</p><p>By choosing a premium transfer to Budapest, you receive European-level service.</p>',
    }
  ],
  bratislava: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Братислава передбачає персональний підхід і високі стандарти обслуговування. Поїздка здійснюється на автомобілях преміум класу з дотриманням конфіденційності.</p><p>Маршрут планується з урахуванням європейських автобанів, що забезпечує комфортне та швидке прибуття до столиці Словаччини.</p>',
      contentEn: '<p>Our Lviv–Bratislava transfer provides a personal approach and high service standards. The trip is carried out in premium class cars with confidentiality.</p><p>The route is planned taking into account European motorways, which ensures comfortable and fast arrival to the capital of Slovakia.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових поїздок до Словаччини</li><li>трансферу з подальшим виїздом до Відня чи Будапешта</li><li>комфортних подорожей центром Європи</li></ul>',
      contentEn: '<ul><li>business trips to Slovakia</li><li>transfer with further departure to Vienna or Budapest</li><li>comfortable travel in the center of Europe</li></ul>',
    },
    {
      heading: 'КОМФОРТНИЙ МІЖНАРОДНИЙ ТРАНСФЕР ДО СЛОВАЧЧИНИ',
      headingEn: 'COMFORTABLE INTERNATIONAL TRANSFER TO SLOVAKIA',
      content: '<p>Індивідуальний міжнародний трансфер — це можливість подорожувати у спокійній атмосфері європейськими дорогами. Поїздка за маршрутом Львів–Братислава проходить у комфортних умовах із повною увагою до деталей.</p><p>Обираючи преміальний трансфер до Братислави, ви отримуєте зручний доступ до центру Європи.</p>',
      contentEn: '<p>Individual international transfer is an opportunity to travel in a calm atmosphere on European roads. The trip along the Lviv–Bratislava route takes place in comfortable conditions with full attention to details.</p><p>By choosing a premium transfer to Bratislava, you get convenient access to the center of Europe.</p>',
    }
  ],
  vienna: [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер Львів–Відень передбачає персональний підхід і найвищі стандарти обслуговування. Поїздка здійснюється на автомобілях преміум класу з дотриманням конфіденційності та вимог VIP-сервісу.</p><p>Маршрут до імператорської столиці планується з урахуванням європейських автобанів, що забезпечує комфортне та швидке прибуття до Відня.</p>',
      contentEn: '<p>Our Lviv–Vienna transfer provides a personal approach and the highest service standards. The trip is carried out in premium class cars with confidentiality and VIP service requirements.</p><p>The route to the imperial capital is planned taking into account European motorways, which ensures comfortable and fast arrival in Vienna.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>ділових зустрічей та переговорів</li><li>трансферу до культурних заходів та опери</li><li>комфортного доїзду до аеропортів Відня</li></ul>',
      contentEn: '<ul><li>business meetings and negotiations</li><li>transfer to cultural events and opera</li><li>comfortable travel to Vienna airports</li></ul>',
    },
    {
      heading: 'КОМФОРТНИЙ МІЖНАРОДНИЙ ТРАНСФЕР ДО АВСТРІЇ',
      headingEn: 'COMFORTABLE INTERNATIONAL TRANSFER TO AUSTRIA',
      content: '<p>Індивідуальний міжнародний трансфер — це можливість подорожувати у спокійній атмосфері до серця європейської культури. Поїздка за маршрутом Львів–Відень проходить у комфортних умовах європейськими автобанами із повною увагою до деталей та високим рівнем безпеки.</p><p>Обираючи преміальний трансфер до Відня, ви отримуєте сервіс найвищого європейського рівня.</p>',
      contentEn: '<p>Individual international transfer is an opportunity to travel in a calm atmosphere to the heart of European culture. The trip along the Lviv–Vienna route takes place in comfortable conditions on European motorways with full attention to details and a high level of safety.</p><p>By choosing a premium transfer to Vienna, you receive the highest European-level service.</p>',
    }
  ],
  // Львів
  'emily-resort': [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер до готелю Emily Resort передбачає персональний підхід і швидку доставку. Поїздка здійснюється на автомобілях бізнес класу з дотриманням високих стандартів сервісу.</p><p>Ми забезпечуємо трансфер як з центру Львова, так і безпосередньо з аеропорту до готелю. Зустріч з табличкою та допомога з багажем включені.</p>',
      contentEn: '<p>Our transfer to Emily Resort hotel provides a personal approach and fast delivery. The trip is carried out in business class cars with high service standards.</p><p>We provide transfer both from the center of Lviv and directly from the airport to the hotel. Meet and greet with sign and luggage assistance included.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>гостей готелю Emily Resort</li><li>трансферу з аеропорту</li><li>комфортного доїзду до заміських готелів</li></ul>',
      contentEn: '<ul><li>Emily Resort hotel guests</li><li>airport transfer</li><li>comfortable travel to suburban hotels</li></ul>',
    }
  ],
  'edem-resort': [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер до Edem Resort передбачає персональний підхід і швидку доставку. Поїздка здійснюється на автомобілях бізнес класу з дотриманням високих стандартів сервісу.</p><p>Ми забезпечуємо трансфер як з центру Львова, так і з аеропорту безпосередньо до готелю. Гнучкий графік виїзду відповідно до ваших побажань.</p>',
      contentEn: '<p>Our transfer to Edem Resort provides a personal approach and fast delivery. The trip is carried out in business class cars with high service standards.</p><p>We provide transfer both from the center of Lviv and from the airport directly to the hotel. Flexible departure schedule according to your wishes.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>гостей готелю Edem Resort</li><li>трансферу до заміських курортів</li><li>відпочинку на природі біля Львова</li></ul>',
      contentEn: '<ul><li>Edem Resort hotel guests</li><li>transfer to suburban resorts</li><li>outdoor recreation near Lviv</li></ul>',
    }
  ],
  'train-station': [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер на залізничний вокзал Львова передбачає персональний підхід і пунктуальність. Поїздка здійснюється на автомобілях бізнес класу з дотриманням високих стандартів сервісу.</p><p>Ми моніторимо розклад поїздів та забезпечуємо своєчасне прибуття за 40 хвилин до відправлення. Допомога з багажем та знання всіх під\'їздів до вокзалу включені.</p>',
      contentEn: '<p>Our transfer to Lviv railway station provides a personal approach and punctuality. The trip is carried out in business class cars with high service standards.</p><p>We monitor train schedules and ensure timely arrival 40 minutes before departure. Luggage assistance and knowledge of all station entrances included.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>пасажирів залізничного транспорту</li><li>трансферу з багажем</li><li>пунктуальної доставки на вокзал</li></ul>',
      contentEn: '<ul><li>railway passengers</li><li>transfer with luggage</li><li>punctual delivery to the station</li></ul>',
    }
  ],
  'bus-station': [
    {
      heading: 'ІНДИВІДУАЛЬНИЙ ФОРМАТ ПОЇЗДКИ',
      headingEn: 'INDIVIDUAL TRIP FORMAT',
      content: '<p>Наш трансфер на автовокзал Львова передбачає персональний підхід і своєчасність. Поїздка здійснюється на автомобілях бізнес класу з дотриманням високих стандартів сервісу.</p><p>Ми забезпечуємо зручний під\'їзд до автовокзалу та допомагаємо з орієнтуванням. Інформація про рейси та фіксована ціна гарантовані.</p>',
      contentEn: '<p>Our transfer to Lviv bus station provides a personal approach and timeliness. The trip is carried out in business class cars with high service standards.</p><p>We provide convenient access to the bus station and help with navigation. Flight information and fixed price guaranteed.</p>',
    },
    {
      heading: 'ТАКИЙ ФОРМАТ ПОЇЗДКИ ПІДХОДИТЬ ДЛЯ:',
      headingEn: 'THIS TRIP FORMAT IS SUITABLE FOR:',
      content: '<ul><li>пасажирів автобусних рейсів</li><li>міжнародних переїздів</li><li>комфортного трансферу на автовокзал</li></ul>',
      contentEn: '<ul><li>bus passengers</li><li>international trips</li><li>comfortable transfer to the bus station</li></ul>',
    }
  ]
};

async function updateDirectionsContent() {
  try {
    console.log('🔗 Підключення до MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Підключено до MongoDB');

    const DirectionPage = mongoose.models.DirectionPage || mongoose.model('DirectionPage', DirectionPageSchema);

    const directionIds = Object.keys(detailedSections);
    console.log(`\n📝 Оновлюю контент для ${directionIds.length} напрямків\n`);

    let updated = 0;
    let notFound = 0;

    for (const directionId of directionIds) {
      const direction = await DirectionPage.findOne({ directionId });
      
      if (!direction) {
        console.log(`⚠️  ${directionId} — не знайдено в базі`);
        notFound++;
        continue;
      }

      direction.sections = detailedSections[directionId];
      await direction.save();
      
      console.log(`✅ ${directionId} — оновлено (${detailedSections[directionId].length} секцій)`);
      updated++;
    }

    console.log(`\n✨ Завершено!`);
    console.log(`✅ Оновлено: ${updated}`);
    console.log(`⚠️  Не знайдено: ${notFound}`);

  } catch (error) {
    console.error('❌ Помилка:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Зʼєднання закрито');
  }
}

updateDirectionsContent();
