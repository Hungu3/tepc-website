import type { Metadata } from 'next';
import AnnouncementCard from '@/components/AnnouncementCard';
import { getByCategory } from '@/lib/announcements-db';
import Translation from '@/components/Translation';

export const metadata: Metadata = {
  title: 'Opportunities',
  description:
    'Partnership, program, and livelihood opportunities offered by TePC – Tanzania.',
};

export const revalidate = 60;

export default async function FursaPage() {
  const opportunities = await getByCategory('Fursa');

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-extrabold text-primary-dark dark:text-green-300"><Translation translationKey="headings.opportunities" /></h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        <Translation translationKey="copy.opportunitiesIntro" />
      </p>
      {opportunities.length === 0 ? (
        <p className="text-gray-500"><Translation translationKey="copy.noOpportunities" /></p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((item) => (
            <AnnouncementCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
