'use client';

import { publications, publicationsPageCopy } from '@/data/publications';
import { useLanguage } from '@/lib/LanguageContext';
import { DownloadIcon } from './Icons';

export default function PublicationsGrid() {
  const { language } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-9 max-w-3xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">TePC – Tanzania</p>
        <h1 className="text-4xl font-extrabold text-primary-dark dark:text-green-300">
          {language === 'sw' ? 'Machapisho' : 'Publications'}
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          {publicationsPageCopy[language]}
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((publication) => (
          <article
            key={publication.slug}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-dark dark:bg-gray-800 dark:text-green-300">
                {publication.category[language]}
              </span>
              <span className="text-sm font-semibold text-gray-500">{publication.year}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {publication.title[language]}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {publication.description[language]}
            </p>
            <a
              href={publication.pdfUrl}
              download
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <DownloadIcon className="h-4 w-4" />
              {language === 'sw' ? 'Pakua PDF' : 'Download PDF'}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
