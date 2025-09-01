import { useState, useEffect } from 'react';
import type { Language } from '@/lib/i18n';

const LANGUAGE_STORAGE_KEY = 'pipeline-manager-language';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (stored === 'ru' || stored === 'en') ? stored : 'en';
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  return { language, setLanguage };
}