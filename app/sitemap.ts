import type { MetadataRoute } from 'next';
import { getAllAnnouncements } from '@/lib/announcements-db';
import { SITE_URL } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const announcements = await getAllAnnouncements();
  const staticPaths = [
    '',
    '/about',
    '/our-work',
    '/projects',
    '/impact',
    '/get-involved',
    '/news',
    '/publications',
    '/resources',
    '/wasiliana',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const announcementEntries: MetadataRoute.Sitemap = announcements.map((a) => ({
    url: `${SITE_URL}/matangazo/${a.slug}`,
    lastModified: new Date(`${a.date}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...announcementEntries];
}
