'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function LocalizedDate({ value }: { value: string }) {
  const { language } = useLanguage();
  return new Date(`${value}T00:00:00Z`).toLocaleDateString(language === 'sw' ? 'sw-TZ' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
