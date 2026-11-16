import Link from 'next/link';
import HeroCard from '@/components/HeroCard';
import AnnouncementCard from '@/components/AnnouncementCard';
import SubscribeSidebar from '@/components/SubscribeSidebar';
import ImpactStrip from '@/components/ImpactStrip';
import VideoGrid from '@/components/VideoGrid';
import Gallery from '@/components/Gallery';
import {
  announcements as staticAnnouncements,
  getFeaturedAnnouncement as getStaticFeaturedAnnouncement,
  getLatestAnnouncements as getStaticLatestAnnouncements,
} from '@/data/announcements';
import {
  getFeaturedAnnouncement as getDatabaseFeaturedAnnouncement,
  getLatestAnnouncements as getDatabaseLatestAnnouncements,
} from '@/lib/announcements-db';
import Translation from '@/components/Translation';
import HomepageHeroText from '@/components/HomepageHeroText';
import { getSiteSettings } from '@/lib/site-settings';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const siteSettings = await getSiteSettings();
  let featured = getStaticFeaturedAnnouncement();
  let latest = getStaticLatestAnnouncements(6);

  try {
    const [databaseFeatured, databaseLatest] = await Promise.all([
      getDatabaseFeaturedAnnouncement(),
      getDatabaseLatestAnnouncements(6),
    ]);
    if (databaseLatest.length > 0) {
      featured = databaseFeatured;
      latest = databaseLatest;
    }
  } catch (error) {
    console.error('Unable to fetch homepage announcements from Supabase; using static announcements.', error);
    if (staticAnnouncements.length === 0) {
      throw new Error('No homepage announcements are available.');
    }
  }

  return (
    <>
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <HomepageHeroText
              title={siteSettings.hero_title ?? { value_en: '', value_sw: '' }}
              subtitle={siteSettings.hero_subtitle ?? { value_en: '', value_sw: '' }}
            />
          </div>
          <HeroCard item={featured} />
        </div>
      </section>

      <ImpactStrip />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100"><Translation translationKey="headings.latest" /></h2>
          <Link href="/news" className="text-sm font-semibold text-primary hover:underline">
            <Translation translationKey="buttons.viewAll" /> →
          </Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {latest.map((item) => (
              <AnnouncementCard key={item.slug} item={item} />
            ))}
          </div>
          <SubscribeSidebar />
        </div>
      </section>

      <section className="bg-green-50 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100"><Translation translationKey="headings.watch" /></h2>
          <VideoGrid />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100"><Translation translationKey="headings.gallery" /></h2>
        <Gallery />
      </section>
    </>
  );
}
