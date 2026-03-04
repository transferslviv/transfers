import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export interface SiteSettingsData {
  phone: string;
  telegramBot: string;
  telegramProfile: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  address: string;
  googleMapsLink: string;
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  phone: '+380777877087',
  telegramBot: 'https://t.me/rentalviv_bot',
  telegramProfile: 'https://t.me/rentalviv1',
  whatsapp: 'https://wa.me/380777877087',
  instagram: 'https://instagram.com/rentalviv',
  tiktok: 'https://tiktok.com/@rentalviv',
  address: 'м. Львів вул. Стрийська 200а',
  googleMapsLink: '',
};

export async function getSettings(): Promise<SiteSettingsData> {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    if (settings) {
      return {
        phone: settings.phone || DEFAULT_SETTINGS.phone,
        telegramBot: settings.telegramBot || DEFAULT_SETTINGS.telegramBot,
        telegramProfile: settings.telegramProfile || DEFAULT_SETTINGS.telegramProfile,
        whatsapp: settings.whatsapp || DEFAULT_SETTINGS.whatsapp,
        instagram: settings.instagram || DEFAULT_SETTINGS.instagram,
        tiktok: settings.tiktok || DEFAULT_SETTINGS.tiktok,
        address: settings.address || DEFAULT_SETTINGS.address,
        googleMapsLink: settings.googleMapsLink || DEFAULT_SETTINGS.googleMapsLink,
      };
    }
    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
