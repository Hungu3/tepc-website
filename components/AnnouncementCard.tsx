import Image from 'next/image';
import Link from 'next/link';
import type { Announcement } from '@/data/announcements';
import Translation from './Translation';
import LocalizedDate from './LocalizedDate';
import TranslatedCategory from './TranslatedCategory';

export default function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="relative h-48 w-full">
        <Image
          src={item.image?.trim() || '/logo.png'}
          alt={item.title}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900">
          <TranslatedCategory category={item.category} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={item.date} className="mb-2 text-xs text-gray-500 dark:text-gray-400">
          <LocalizedDate value={item.date} />
        </time>
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-gray-100">
          <Link href={`/matangazo/${item.slug}`} className="hover:text-primary">
            {item.title}
          </Link>
        </h3>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{item.excerpt}</p>
        <Link
          href={`/matangazo/${item.slug}`}
          className="mt-auto text-sm font-semibold text-primary hover:text-primary-dark hover:underline"
          aria-label={`${item.title} — ${item.category}`}
        >
          <Translation translationKey="buttons.readMore" /> →
        </Link>
      </div>
    </article>
  );
}
