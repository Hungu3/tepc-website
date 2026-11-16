'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Announcement, NewsCategory } from '@/data/announcements';
import { toNewsCategory } from '@/data/announcements';
import { portalPages } from '@/data/portal';
import { useLanguage } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/translations';
import AnnouncementCard from './AnnouncementCard';
import { SearchIcon } from './Icons';

type Filter = 'All' | NewsCategory;

const filters: { value: Filter; key: TranslationKey }[] = [
  { value: 'All', key: 'buttons.categoryAll' },
  { value: 'News', key: 'buttons.categoryNews' },
  { value: 'Event', key: 'headings.events' },
  { value: 'Announcement', key: 'buttons.categoryAnnouncements' },
];

export default function NewsFeed({
  items,
  initialCategory = 'All',
}: {
  items: Announcement[];
  initialCategory?: Filter;
}) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Filter>(initialCategory);
  const page = portalPages[language].news;

  useEffect(() => {
    setActive(initialCategory);
  }, [initialCategory]);

  const results = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      const matchesCategory = active === 'All' || toNewsCategory(item.category) === active;
      const matchesQuery =
        search.length === 0 ||
        item.title.toLocaleLowerCase().includes(search) ||
        item.excerpt.toLocaleLowerCase().includes(search);
      return matchesCategory && matchesQuery;
    });
  }, [active, items, query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">TePC – Tanzania</p>
        <h1 className="text-4xl font-extrabold text-primary-dark dark:text-green-300">{page.title}</h1>
        <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">{page.intro}</p>
      </header>

      <div className="mb-6 space-y-4">
        <div className="relative max-w-xl">
          <label htmlFor="news-search" className="sr-only">{t('forms.searchNews')}</label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('forms.searchNews')}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 focus:border-primary dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('copy.filterCategory')}>
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={active === filter.value}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active === filter.value
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200'
              }`}
            >
              {t(filter.key)}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500" aria-live="polite">
        {results.length} {t(results.length === 1 ? 'copy.result' : 'copy.results')}
      </p>
      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          {t('copy.noNews')}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => <AnnouncementCard key={item.slug} item={item} />)}
        </div>
      )}
    </section>
  );
}
