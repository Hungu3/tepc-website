'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { translate, type Language, type TranslationKey } from './translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('tepc_language');
    if (saved === 'en' || saved === 'sw') setCurrentLanguage(saved);
    document.documentElement.lang = saved === 'sw' ? 'sw' : 'en';
  }, []);

  const setLanguage = useCallback((next: Language) => {
    window.localStorage.setItem('tepc_language', next);
    document.documentElement.lang = next;
    setCurrentLanguage(next);
  }, []);
  const t = useCallback((key: TranslationKey) => translate(language, key), [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within LanguageProvider');
  return value;
}
