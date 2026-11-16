'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const next = language === 'en' ? 'sw' : 'en';
  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-100"
      aria-label={next === 'en' ? t('copy.switchLanguageEnglish') : t('copy.switchLanguageSwahili')}
    >
      {language.toUpperCase()}
    </button>
  );
}
