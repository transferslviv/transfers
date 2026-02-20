export const languages = {
  uk: 'Українська',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'uk';
