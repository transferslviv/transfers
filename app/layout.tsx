import type { Metadata } from "next";
import { Nunito_Sans, Unbounded } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TransferLviv - Трансфер та оренда авто Львів",
  description: "Трансфер та оренда автомобілів у Львові. Комфортний сервіс, сучасні авто, професійні водії.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${nunitoSans.variable} ${unbounded.variable} antialiased`}>
        <LanguageProvider>
          <CurrencyProvider>
            <div className="hidden xl:block">
              <Header />
            </div>
            <MobileHeader />
            {children}
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
