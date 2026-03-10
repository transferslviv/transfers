import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IDirectionSection {
  heading: string;
  headingEn: string;
  body?: string;
  bodyEn?: string;
  list?: string[];
  listEn?: string[];
  content?: string;   // HTML from TipTap (new, replaces body+list)
  contentEn?: string; // HTML from TipTap EN
}

export interface IDirectionPage extends Document {
  directionId: string; // matches transfer id (e.g. 'warsaw', 'kyiv')
  isCustom: boolean;   // true = created from admin, not in static data
  category: 'ukraine' | 'europe' | 'lviv'; // group for display
  // Card fields (for custom directions shown on main page)
  cardTitle: string;
  cardTitleEn: string;
  cardImage: string;
  cardImage2: string;
  cardButtonText: string;
  cardButtonTextEn: string;
  // Hero
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  heroCtaText: string;
  heroCtaTextEn: string;
  heroImageLeft: string;
  heroImageLeftTablet: string;
  heroImageLeftMobile: string;
  heroImageRight: string;
  heroImageRightTablet: string;
  heroImageRightMobile: string;
  // Info block
  mainTitleBefore: string;
  mainTitleBeforeEn: string;
  mainTitleHighlight: string;
  mainTitleHighlightEn: string;
  mainTitleAfter: string;
  mainTitleAfterEn: string;
  intro: string;
  introEn: string;
  sections: IDirectionSection[];
  // Routes block
  routesTitle: string;
  routesTitleEn: string;
  routesIds: string[];
  routesSubtitle: string;
  routesSubtitleEn: string;
  routesDesc: string;
  routesDescEn: string;
  // Meta
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DirectionSectionSchema = new Schema<IDirectionSection>({
  heading: { type: String, required: true, trim: true },
  headingEn: { type: String, trim: true, default: '' },
  body: { type: String, trim: true },
  bodyEn: { type: String, trim: true },
  list: [{ type: String, trim: true }],
  listEn: [{ type: String, trim: true }],
  content: { type: String, trim: true, default: '' },
  contentEn: { type: String, trim: true, default: '' },
}, { _id: false });

const DirectionPageSchema = new Schema<IDirectionPage>({
  directionId: {
    type: String,
    required: [true, 'ID напрямку обов\'язковий'],
    unique: true,
    trim: true,
  },
  isCustom: { type: Boolean, default: false },
  category: { type: String, enum: ['ukraine', 'europe', 'lviv'], default: 'ukraine' },
  // Card fields (for custom directions)
  cardTitle: { type: String, trim: true, default: '' },
  cardTitleEn: { type: String, trim: true, default: '' },
  cardImage: { type: String, trim: true, default: '' },
  cardImage2: { type: String, trim: true, default: '' },
  cardButtonText: { type: String, trim: true, default: 'дізнатися більше' },
  cardButtonTextEn: { type: String, trim: true, default: 'learn more' },
  // Hero
  heroTitle: { type: String, required: true, trim: true },
  heroTitleEn: { type: String, trim: true, default: '' },
  heroSubtitle: { type: String, trim: true, default: 'Бізнес та Преміум клас' },
  heroSubtitleEn: { type: String, trim: true, default: 'Business & Premium class' },
  heroCtaText: { type: String, trim: true, default: 'розрахувати вартість' },
  heroCtaTextEn: { type: String, trim: true, default: 'calculate price' },
  heroImageLeft: { type: String, trim: true, default: '' },
  heroImageLeftTablet: { type: String, trim: true, default: '' },
  heroImageLeftMobile: { type: String, trim: true, default: '' },
  heroImageRight: { type: String, trim: true, default: '' },
  heroImageRightTablet: { type: String, trim: true, default: '' },
  heroImageRightMobile: { type: String, trim: true, default: '' },
  // Info block
  mainTitleBefore: { type: String, trim: true, default: '' },
  mainTitleBeforeEn: { type: String, trim: true, default: '' },
  mainTitleHighlight: { type: String, trim: true, default: '' },
  mainTitleHighlightEn: { type: String, trim: true, default: '' },
  mainTitleAfter: { type: String, trim: true, default: '' },
  mainTitleAfterEn: { type: String, trim: true, default: '' },
  intro: { type: String, trim: true, default: '' },
  introEn: { type: String, trim: true, default: '' },
  sections: { type: [DirectionSectionSchema], default: [] },
  // Routes block
  routesTitle: { type: String, trim: true, default: 'Популярні маршрути' },
  routesTitleEn: { type: String, trim: true, default: 'Popular routes' },
  routesIds: [{ type: String, trim: true }],
  routesSubtitle: { type: String, trim: true, default: '' },
  routesSubtitleEn: { type: String, trim: true, default: '' },
  routesDesc: { type: String, trim: true, default: '' },
  routesDescEn: { type: String, trim: true, default: '' },
  // Meta
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
  collection: 'directionpages',
});

const DirectionPage: Model<IDirectionPage> =
  mongoose.models.DirectionPage || mongoose.model<IDirectionPage>('DirectionPage', DirectionPageSchema);

export default DirectionPage;
