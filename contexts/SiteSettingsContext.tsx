'use client';

import React, { createContext, useContext } from 'react';

export interface SiteSettings {
  phone: string;
  telegramBot: string;
  telegramProfile: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  address: string;
  googleMapsLink: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  phone: '+380777877087',
  telegramBot: 'https://t.me/rentalviv_bot',
  telegramProfile: 'https://t.me/rentalviv1',
  whatsapp: 'https://wa.me/380777877087',
  instagram: 'https://instagram.com/rentalviv',
  tiktok: 'https://tiktok.com/@rentalviv',
  address: 'м. Львів вул. Стрийська 200а',
  googleMapsLink: '',
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  loading: true,
});

export function SiteSettingsProvider({ children, initialSettings }: { children: React.ReactNode; initialSettings?: SiteSettings }) {
  // Use server-fetched settings directly — no client-side fetch needed
  const settings = initialSettings || DEFAULT_SETTINGS;

  return (
    <SiteSettingsContext.Provider value={{ settings, loading: false }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
