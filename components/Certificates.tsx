"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Certificates() {
  const { t } = useLanguage();
  
  // Get certificates from TechWave entry
  const techWaveEntry = t.experience.experiences.find(
    (exp: any) => exp.company?.includes('TechWave') || exp.company === 'TechWave d.o.o.'
  );
  
  let certificates = techWaveEntry?.certificates || [];

  // Sort certificates by date (2025 to past, left to right)
  certificates = [...certificates].sort((a: any, b: any) => {
    const getYear = (dateStr: string) => {
      if (dateStr.includes('2025')) return 2025;
      if (dateStr.includes('2024')) return 2024;
      if (dateStr.includes('2023')) return 2023;
      return 0;
    };
    const getMonth = (dateStr: string) => {
      if (dateStr.includes('December') || dateStr.includes('Decembar') || dateStr.includes('Aralık')) return 12;
      if (dateStr.includes('November') || dateStr.includes('Novembar') || dateStr.includes('Kasım')) return 11;
      if (dateStr.includes('October') || dateStr.includes('Oktobar') || dateStr.includes('Ekim')) return 10;
      return 0;
    };
    const yearA = getYear(a.date);
    const yearB = getYear(b.date);
    if (yearA !== yearB) return yearB - yearA; // Descending year
    const monthA = getMonth(a.date);
    const monthB = getMonth(b.date);
    return monthB - monthA; // Descending month
  });

  if (certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="pt-8 pb-24 px-6 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white">
            {t.certificates.title}
          </h2>
        </div>

        {/* Certificates - Single Row */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {certificates.map((cert: any, i: number) => (
            <a
              key={i}
              href={cert.link || '#'}
              target={cert.link ? "_blank" : undefined}
              rel={cert.link ? "noopener noreferrer" : undefined}
              className={`group/cert relative rounded-xl overflow-hidden border transition-all duration-500 flex-shrink-0 ${
                cert.link 
                  ? 'cursor-pointer hover:scale-105 hover:shadow-xl hover:-translate-y-1' 
                  : 'cursor-default'
              } border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-white/40 hover:from-white/15 hover:to-white/10 w-48 h-[200px] flex flex-col`}
            >
              {/* Glow effect on hover */}
              {cert.link && (
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-pink-500/30 via-purple-500/25 to-pink-500/20 blur-lg opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500 -z-10" />
              )}

              {cert.image && (
                <div className="relative h-32 flex-shrink-0 overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover/cert:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              )}
              
              <div className="p-3 flex-1 flex flex-col justify-between min-h-0">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2 group-hover/cert:text-amber-200/80 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  {cert.issuer && (
                    <p className="text-xs text-white/70 mb-1 line-clamp-1">{cert.issuer}</p>
                  )}
                  {cert.date && (
                    <p className="text-xs text-white/50">{cert.date}</p>
                  )}
                </div>
                
                {/* Link indicator */}
                {cert.link && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-300/80 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300">
                    <span>{(t as any).certificates?.view || 'View'}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}
              </div>
            </a>
          ))}
          
          {/* See More Link */}
          <a
            href="https://www.linkedin.com/in/ilma-kaukovi%C4%87-4aa515209/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 group/link hover:opacity-80 transition-opacity duration-300"
          >
            <svg 
              className="w-4 h-4 text-white/60 group-hover/link:text-white transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-xs text-white/60 group-hover/link:text-white transition-colors duration-300">
              {(t as any).certificates?.seeMore || 'see more'}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

