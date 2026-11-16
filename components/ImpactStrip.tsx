'use client';

import { useLanguage } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/translations';

const stats = [
  { value: '70', label: 'copy.womenTrained' },
  { value: '140', label: 'copy.youthEmpowered' },
  { value: '45', label: 'copy.cbosSupported' },
  { value: '2022', label: 'copy.yearFounded' },
];

export default function ImpactStrip() {
  const { t } = useLanguage();
  return (
    <section aria-label={t('headings.impact')} className="border-y border-gray-200 bg-green-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-white p-5 text-center shadow-sm"
          >
            <div className="text-4xl font-extrabold text-primary">{s.value}</div>
            <div className="mt-1 text-sm text-gray-600">{t(s.label as TranslationKey)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
