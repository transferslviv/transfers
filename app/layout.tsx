import type { Metadata } from "next";
import { Nunito_Sans, Unbounded } from 'next/font/google';
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { getSettings } from "@/lib/getSettings";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "700", "900"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "700", "800", "900"],
});

const BASE_URL = 'https://transferslviv.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'TransfersLviv | Трансфер зі Львова по Україні та Європі',
    template: '%s | TransfersLviv',
  },
  description: 'Преміум трансфер зі Львова до Києва, Будапешта, Відня, Кракова, Варшави та інших міст України і Європи. BMW 7 Series та Mercedes S-Class, без попутників, фіксована ціна.',
  keywords: ['трансфер Львів', 'трансфер зі Львова', 'таксі Львів Київ', 'трансфер Львів Будапешт', 'трансфер Львів Відень', 'трансфер Львів Краків', 'трансфер Львів Варшава', 'трансфер Буковель', 'преміум трансфер', 'transfer Lviv', 'Lviv transfer Europe'],
  authors: [{ name: 'TransfersLviv' }],
  creator: 'TransfersLviv',
  publisher: 'TransfersLviv',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'uk': BASE_URL,
      'en': `${BASE_URL}/en`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'TransfersLviv',
    title: 'TransfersLviv | Трансфер зі Львова по Україні та Європі',
    description: 'Преміум трансфер зі Львова до Києва, Будапешта, Відня, Кракова, Варшави та інших міст. BMW 7 Series та Mercedes S-Class, без попутників, фіксована ціна.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TransfersLviv — Преміум трансфер зі Львова',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TransfersLviv | Трансфер зі Львова по Україні та Європі',
    description: 'Преміум трансфер зі Львова до Києва, Будапешта, Відня, Кракова, Варшави та інших міст. BMW 7 Series та Mercedes S-Class.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="uk">
      <body className={`${nunitoSans.variable} ${unbounded.variable} antialiased`}>
        <LanguageProvider>
          <SiteSettingsProvider initialSettings={settings}>
            <CurrencyProvider>
              <HeaderWrapper />
              {children}
            </CurrencyProvider>
          </SiteSettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
