export interface Car {
  id: number;
  name: string;
  description: string;
  images: string[];
  mainImage: string;
  passengers: number;
  luggage: number;
  child: boolean;
  pet: boolean;
}

export const carsData: Car[] = [
  {
    id: 1,
    name: 'BMW 7 Series',
    description: 'Для пари або сім\'ї з дітьми',
    images: [
      '/images/cars/bmw1.webp',
      '/images/cars/bmw2.webp',
      '/images/cars/bmw3.webp',
      '/images/cars/bmw4.webp',
      '/images/cars/bmw5.webp',
      '/images/cars/bmw6.webp',
    ],
    mainImage: '/images/cars/bmw1.webp',
    passengers: 3,
    luggage: 2,
    child: true,
    pet: true,
  },
  {
    id: 2,
    name: 'Mercedes-Benz S-Class (W222)',
    description: 'Для комфортної бізнес поїздки',
    images: [
      '/images/cars/merc1.webp',
      '/images/cars/merc2.webp',
      '/images/cars/merc3.webp',
      '/images/cars/merc4.webp',
      '/images/cars/merc5.webp',
      '/images/cars/merc6.webp',
    ],
    mainImage: '/images/cars/merc1.webp',
    passengers: 3,
    luggage: 2,
    child: true,
    pet: true,
  },
];
