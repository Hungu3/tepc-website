'use client';

import { useLanguage } from '@/lib/LanguageContext';

interface HomepageHeroTextProps {
  title: { value_en: string; value_sw: string };
  subtitle: { value_en: string; value_sw: string };
}

export default function HomepageHeroText({ title, subtitle }: HomepageHeroTextProps) {
  const { language, t } = useLanguage();
  const titleText = language === 'en' ? title.value_en : title.value_sw;
  const subtitleText = language === 'en' ? subtitle.value_en : subtitle.value_sw;

  return (
    <>
      <h1 className="text-3xl font-extrabold text-primary-dark sm:text-4xl">
        {titleText || t('copy.homeTagline')}
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        {subtitleText || t('copy.homeIntro')}
      </p>
    </>
  );
}
