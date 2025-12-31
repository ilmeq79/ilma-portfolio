"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PreviousPortfolio() {
  const { t } = useLanguage();
  
  return (
    <section className="pb-8 px-6 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-4xl mx-auto flex justify-center">
        <a
          href="https://ilmakaukovic.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/70 transition-colors duration-300 ml-4"
        >
          <span>{(t as any).previousPortfolio?.text || 'Take a journey through time to explore my previous portfolio website'}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

