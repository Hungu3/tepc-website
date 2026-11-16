import type { Metadata } from 'next';
import Link from 'next/link';
import { getLatestAnnouncements } from '@/lib/announcements-db';
import { DownloadIcon } from '@/components/Icons';
import Translation from '@/components/Translation';
import LocalizedDate from '@/components/LocalizedDate';
import TranslatedCategory from '@/components/TranslatedCategory';

export const metadata: Metadata = {
  title: 'Downloads',
  description:
    'Download application guidelines, program briefs, and other documents from TePC – Tanzania.',
};

export const revalidate = 60;

export default async function PakuaPage() {
  const withPdf = (await getLatestAnnouncements(1000)).filter((a) => a.pdfUrl);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-extrabold text-primary-dark dark:text-green-300"><Translation translationKey="headings.downloads" /></h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        <Translation translationKey="copy.downloadsIntro" />
      </p>

      {withPdf.length === 0 ? (
        <p className="text-gray-500"><Translation translationKey="copy.noDocuments" /></p>
      ) : (
        <ul className="space-y-4">
          {withPdf.map((item) => (
            <li
              key={item.slug}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-gold-dark">
                  <TranslatedCategory category={item.category} />
                </span>
                <h2 className="font-bold text-gray-900 dark:text-gray-100">
                  <Link href={`/matangazo/${item.slug}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                </h2>
                <time dateTime={item.date} className="text-sm text-gray-500">
                  <LocalizedDate value={item.date} />
                </time>
              </div>
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                <DownloadIcon className="h-4 w-4" /> <Translation translationKey="buttons.download" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
