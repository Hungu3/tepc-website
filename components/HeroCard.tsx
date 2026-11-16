import Image from 'next/image';
import Link from 'next/link';
import type { Announcement } from '@/data/announcements';
import { ArrowRightIcon } from './Icons';
import Translation from './Translation';
import LocalizedDate from './LocalizedDate';
import TranslatedCategory from './TranslatedCategory';

export default function HeroCard({ item }: { item: Announcement }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 md:grid md:grid-cols-2">
      <div className="relative h-64 w-full md:h-auto md:min-h-[360px]">
        <Image
          src={item.image?.trim() || '/logo.png'}
          alt={item.title}
          fill
          priority
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900">
            <TranslatedCategory category={item.category} />
          </span>
          <time dateTime={item.date} className="text-gray-500 dark:text-gray-400">
            <LocalizedDate value={item.date} />
          </time>
        </div>
        <h2 className="mb-3 text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
          {item.title}
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{item.excerpt}</p>
        <div>
          <Link
            href={`/matangazo/${item.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Translation translationKey="buttons.readMore" /> <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
