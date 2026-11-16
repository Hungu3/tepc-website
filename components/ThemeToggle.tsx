'use client';

import { useTheme } from '@/lib/ThemeContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
      aria-label={theme === 'dark' ? t('copy.switchToLight') : t('copy.switchToDark')}
      title={theme === 'dark' ? t('copy.lightMode') : t('copy.darkMode')}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  );
}
