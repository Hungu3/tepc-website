'use client';

import { portalFooter, portalPages } from '@/data/portal';
import { useLanguage } from '@/lib/LanguageContext';

interface LocalizedContent {
  en: string;
  sw: string;
}

export default function PortalContentPage({
  page,
  cmsContent,
}: {
  page: string;
  cmsContent: Record<string, LocalizedContent>;
}) {
  const { language } = useLanguage();
  const content = portalPages[language][page];
  const tagline = portalFooter[language].tagline;

  if (!content) return null;
  const usedKeys = new Set(['title', 'intro']);
  const getText = (key: string, fallback: string) => {
    usedKeys.add(key);
    return cmsContent[key]?.[language] ?? fallback;
  };
  const title = getText('title', content.title);
  const intro = getText('intro', content.intro);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-dark via-primary to-green-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gold">TePC – Tanzania</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-green-50">{intro}</p>
          <p className="mt-6 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-gold">
            {tagline}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-5 px-4 py-12 sm:px-6 lg:px-8">
        {content.sections.map((section, index) => {
          const heading = getText(`${section.id}.heading`, section.heading);
          const body = getText(`${section.id}.body`, section.body);
          const bulletKeys = Object.keys(cmsContent)
            .map((key) => {
              const match = key.match(new RegExp(`^${section.id}\\.bullet\\.(\\d+)$`));
              return match ? { key, index: Number(match[1]) } : null;
            })
            .filter((item): item is { key: string; index: number } => item !== null)
            .sort((a, b) => a.index - b.index);
          const bulletCount = Math.max(section.bullets?.length ?? 0, ...bulletKeys.map((item) => item.index));
          const bullets = Array.from({ length: bulletCount }, (_, bulletIndex) => {
            const key = `${section.id}.bullet.${bulletIndex + 1}`;
            usedKeys.add(key);
            return cmsContent[key]?.[language] ?? section.bullets?.[bulletIndex];
          }).filter((bullet): bullet is string => Boolean(bullet));

          return (
          <section
            id={section.id}
            key={section.id}
            className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold font-extrabold text-primary-dark">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-primary-dark dark:text-green-300">
                  {heading}
                </h2>
                <p className="mt-3 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200">
                  {body}
                </p>
                {bullets.length > 0 && (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${section.id}-bullet-${bulletIndex}`}
                        className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm leading-relaxed text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
          );
        })}
        {Object.entries(cmsContent)
          .filter(([key, value]) => !usedKeys.has(key) && Boolean(value[language]))
          .map(([key, value], index) => (
            <section
              id={key.replace(/[^a-zA-Z0-9_-]+/g, '-')}
              key={key}
              className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold font-extrabold text-primary-dark">
                  {String(content.sections.length + index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold capitalize text-primary-dark dark:text-green-300">
                    {key.replace(/[._-]+/g, ' ')}
                  </h2>
                  <p className="mt-3 max-w-4xl whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-200">
                    {value[language]}
                  </p>
                </div>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
