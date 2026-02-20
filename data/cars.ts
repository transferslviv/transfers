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
      '/images/cars/bmw1.png',
      '/images/cars/bmw2.png',
      '/images/cars/bmw3.png',
      '/images/cars/bmw4.png',
      '/images/cars/bmw5.png',
      '/images/cars/bmw6.png',
    ],
    mainImage: '/images/cars/bmw1.png',
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
      '/images/cars/merc1.png',
      '/images/cars/merc2.png',
      '/images/cars/merc3.png',
      '/images/cars/merc4.png',
      '/images/cars/merc5.png',
      '/images/cars/merc6.png',
    ],
    mainImage: '/images/cars/merc1.png',
    passengers: 3,
    luggage: 2,
    child: true,
    pet: true,
  },
];
