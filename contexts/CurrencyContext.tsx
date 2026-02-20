'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, defaultCurrency, currencies, fetchExchangeRates } from '@/lib/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrency);

  useEffect(() => {
    // Завантажуємо збережену валюту
    const savedCurrency = localStorage.getItem('currency') as Currency;
    if (savedCurrency && (savedCurrency === 'USD' || savedCurrency === 'EUR')) {
      setCurrencyState(savedCurrency);
    } else {
      // Якщо немає збереженої валюти або вона невалідна, встановлюємо EUR
      setCurrencyState('EUR');
      localStorage.setItem('currency', 'EUR');
    }

    // Завантажуємо актуальні курси валют
    fetchExchangeRates().catch(err => {
      console.error('Failed to load exchange rates:', err);
    });

    // Оновлюємо курси кожну годину
    const interval = setInterval(() => {
      fetchExchangeRates().catch(err => {
        console.error('Failed to refresh exchange rates:', err);
      });
    }, 60 * 60 * 1000); // 1 година

    return () => clearInterval(interval);
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('currency', curr);
  };

  const currencySymbol = currencies[currency];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
