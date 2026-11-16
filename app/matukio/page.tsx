import type { Metadata } from 'next';
import AnnouncementCard from '@/components/AnnouncementCard';
import { getByCategory } from '@/lib/announcements-db';
import Translation from '@/components/Translation';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming conferences, meetings, and community events organized by TePC – Tanzania.',
};

export const revalidate = 60;

export default async function MatukioPage() {
  const events = await getByCategory('Matukio');

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-extrabold text-primary-dark dark:text-green-300"><Translation translationKey="headings.events" /></h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        <Translation translationKey="copy.eventsIntro" />
      </p>
      {events.length === 0 ? (
        <p className="text-gray-500"><Translation translationKey="copy.noEvents" /></p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((item) => (
            <AnnouncementCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
