import type { Metadata } from 'next';
import SearchFilter from '@/components/SearchFilter';
import { getLatestAnnouncements } from '@/lib/announcements-db';
import Translation from '@/components/Translation';

export const metadata: Metadata = {
  title: 'Announcements',
  description:
    'Latest announcements, trainings, grants, events, and opportunities from TePC – Tanzania.',
};

export const revalidate = 60;

export default async function MatangazoPage() {
  const items = await getLatestAnnouncements(1000);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-extrabold text-primary-dark dark:text-green-300"><Translation translationKey="nav.announcements" /></h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        <Translation translationKey="copy.announcementsIntro" />
      </p>
      <SearchFilter items={items} />
    </div>
  );
}
