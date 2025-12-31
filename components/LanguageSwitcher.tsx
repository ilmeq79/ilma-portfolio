'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language, translations } from '@/lib/translations';
import Image from 'next/image';

const languages: { code: Language; labelKey: keyof typeof translations.en.languages; flag: string }[] = [
  { code: 'en', labelKey: 'english', flag: '/english.jpg' },
  { code: 'bs', labelKey: 'bosnian', flag: '/bosnian.jpg' },
  { code: 'tr', labelKey: 'turkish', flag: '/turkish.jpg' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-white/20 hover:bg-white/90 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentLanguage && (
          <div className="w-5 h-5 rounded-full overflow-hidden border border-black/20 flex-shrink-0">
            <Image
              src={currentLanguage.flag}
              alt={t.languages[currentLanguage.labelKey]}
              width={20}
              height={20}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <span className="text-sm font-medium text-black">{currentLanguage ? t.languages[currentLanguage.labelKey] : ''}</span>
        <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 bg-background border border-border/50 rounded-lg shadow-lg overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-3 ${
                    language === lang.code
                      ? 'bg-muted text-foreground'
                      : 'text-foreground/70 hover:bg-muted/50 hover:text-foreground'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                    <Image
                      src={lang.flag}
                      alt={t.languages[lang.labelKey]}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{t.languages[lang.labelKey]}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

