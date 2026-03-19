import type { MetadataRoute } from 'next';

const BASE_URL = 'https://transferslviv.com';

const directions = [
  'kyiv', 'bukovel', 'odesa', 'ivano-frankivsk', 'ujgorod',
  'krakow', 'warsaw', 'budapest', 'bratislava', 'vienna',
  'emily-resort', 'edem-resort', 'train-station', 'bus-station',
  'kyiv-lviv', 'ivano-frankivsk-lviv',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const directionPages: MetadataRoute.Sitemap = directions.map((id) => ({
    url: `${BASE_URL}/direction/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...directionPages];
}
