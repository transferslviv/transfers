'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSettings(data.data);
        }
      })
      .catch(() => {
        // Use defaults on error
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
