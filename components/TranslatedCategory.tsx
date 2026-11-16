'use client';

import { useLanguage } from '@/lib/LanguageContext';
import type { Category } from '@/data/announcements';
import type { TranslationKey } from '@/lib/translations';

const categoryKeys: Record<Category, TranslationKey> = {
  News: 'buttons.categoryNews',
  Event: 'buttons.categoryEvent',
  Announcement: 'buttons.categoryAnnouncement',
  Matangazo: 'buttons.categoryAnnouncements',
  Mafunzo: 'buttons.categoryTraining',
  Mikopo: 'buttons.categoryLoans',
  Matukio: 'buttons.categoryEvents',
  Fursa: 'buttons.categoryOpportunities',
};

export default function TranslatedCategory({ category }: { category: Category }) {
  const { t } = useLanguage();
  return t(categoryKeys[category]);
}
