export const currencies = {
  USD: '$',
  EUR: '€',
} as const;

export type Currency = keyof typeof currencies;

export const defaultCurrency: Currency = 'EUR';

// Курси відносно гривні (UAH) - для внутрішніх розрахунків
let exchangeRates: Record<string, number> = {
  UAH: 1,
  USD: 41.50, // 1 USD = 41.50 UAH
  EUR: 45.00, // 1 EUR = 45.00 UAH
};

// Кеш курсів з таймстемпом
let ratesCache: { rates: Record<string, number>; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 година

// Функція для отримання реальних курсів з API
export async function fetchExchangeRates(): Promise<Record<string, number>> {
  // Перевіряємо кеш
  if (ratesCache && Date.now() - ratesCache.timestamp < CACHE_DURATION) {
    return ratesCache.rates;
  }

  try {
    // Використовуємо exchangerate-api.com (безкоштовний API)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/UAH', {
      next: { revalidate: 3600 } // Кешувати на 1 годину
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    
    // Конвертуємо курси з UAH base у формат "скільки UAH за одиницю"
    const newRates: Record<string, number> = {
      UAH: 1,
      USD: 1 / data.rates.USD,
      EUR: 1 / data.rates.EUR
    };

    // Оновлюємо кеш і глобальні курси
    ratesCache = { rates: newRates, timestamp: Date.now() };
    exchangeRates = newRates;
    
    return newRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Повертаємо кешовані або дефолтні курси
    return exchangeRates;
  }
}

// Експортуємо функцію для отримання поточних курсів
export function getExchangeRates(): Record<Currency, number> {
  return exchangeRates;
}

// Конвертація з UAH в вибрану валюту
export const convertFromUAH = (amountInUAH: number, toCurrency: Currency): number => {
  return amountInUAH / exchangeRates[toCurrency];
};

// Конвертація між будь-якими валютами
export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  const amountInUAH = amount * exchangeRates[fromCurrency];
  return amountInUAH / exchangeRates[toCurrency];
};

// Форматування ціни з валютою
export const formatPrice = (amount: number, currency: Currency): string => {
  const rounded = Math.round(amount);
  const symbol = currencies[currency];
  
  return `${symbol}${rounded}`;
};
