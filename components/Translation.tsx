'use client';

import { useLanguage } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/translations';

export default function Translation({
  translationKey,
  values,
}: {
  translationKey: TranslationKey;
  values?: Record<string, string>;
}) {
  const { t } = useLanguage();
  const text = t(translationKey);
  return values
    ? Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), text)
    : text;
}
