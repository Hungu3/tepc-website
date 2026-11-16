import type { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import NewsFeed from '@/components/NewsFeed';
import Translation from '@/components/Translation';
import VideoGrid from '@/components/VideoGrid';
import { getLatestAnnouncements } from '@/lib/announcements-db';

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Latest news, events, and announcements from TePC – Tanzania.',
};

export const dynamic = 'force-dynamic';

type PageProps = { searchParams: { type?: string } };

export default async function NewsPage({ searchParams }: PageProps) {
  const items = await getLatestAnnouncements(1000);
  const initialCategory =
    searchParams.type === 'News' ||
    searchParams.type === 'Event' ||
    searchParams.type === 'Announcement'
      ? searchParams.type
      : 'All';

  return (
    <>
      <NewsFeed items={items} initialCategory={initialCategory} />
      <section id="photo-gallery" className="scroll-mt-24 bg-green-50 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-primary-dark dark:text-green-300">
            <Translation translationKey="headings.gallery" />
          </h2>
          <Gallery />
        </div>
      </section>
      <section id="videos" className="scroll-mt-24 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-primary-dark dark:text-green-300">
            <Translation translationKey="headings.watch" />
          </h2>
          <VideoGrid />
        </div>
      </section>
    </>
  );
}
