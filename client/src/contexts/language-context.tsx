import { createContext, useContext, ReactNode } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { getTranslation, type Language } from '@/lib/i18n';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage();
  
  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = getTranslation(language, key);
    
    // Simple template replacement for parameters like {current}, {total}
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation.replace(`{${key}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}