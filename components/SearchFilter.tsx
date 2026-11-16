'use client';

import { useMemo, useState } from 'react';
import { categories, type Announcement, type Category } from '@/data/announcements';
import AnnouncementCard from './AnnouncementCard';
import { SearchIcon } from './Icons';
import { useLanguage } from '@/lib/LanguageContext';

type Filter = 'All' | Category;

export default function SearchFilter({ items }: { items: Announcement[] }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Filter>('All');

  const pills: Filter[] = ['All', ...categories];
  const categoryKeys = {
    All: 'buttons.categoryAll',
    News: 'buttons.categoryNews',
    Event: 'buttons.categoryEvent',
    Announcement: 'buttons.categoryAnnouncement',
    Matangazo: 'buttons.categoryAnnouncements',
    Mafunzo: 'buttons.categoryTraining',
    Mikopo: 'buttons.categoryLoans',
    Matukio: 'buttons.categoryEvents',
    Fursa: 'buttons.categoryOpportunities',
  } as const;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((a) => {
      const matchesCategory = active === 'All' || a.category === active;
      const matchesQuery =
        q === '' ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, active]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <label htmlFor="announcement-search" className="sr-only">
            {t('forms.search')}
          </label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            id="announcement-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('forms.search')}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 focus:border-primary dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        <div
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label={t('copy.filterCategory')}
        >
          {pills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setActive(pill)}
              aria-pressed={active === pill}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active === pill
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200'
              }`}
            >
              {t(categoryKeys[pill])}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500" aria-live="polite">
        {results.length} {t(results.length === 1 ? 'copy.result' : 'copy.results')}
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          {t('copy.noAnnouncements')}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <AnnouncementCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
