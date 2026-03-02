import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  phone: string;
  telegramBot: string;
  telegramProfile: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  address: string;
  googleMapsLink: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  phone: { type: String, default: '+380777877087' },
  telegramBot: { type: String, default: 'https://t.me/rentalviv_bot' },
  telegramProfile: { type: String, default: 'https://t.me/rentalviv1' },
  whatsapp: { type: String, default: 'https://wa.me/380777877087' },
  instagram: { type: String, default: 'https://instagram.com/rentalviv' },
  tiktok: { type: String, default: 'https://tiktok.com/@rentalviv' },
  address: { type: String, default: 'м. Львів вул. Стрийська 200а' },
  googleMapsLink: { type: String, default: '' },
}, { timestamps: true });

const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
export default SiteSettings;
