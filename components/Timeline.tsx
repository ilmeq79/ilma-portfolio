"use client";

import { Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Timeline() {
  const { t } = useLanguage();
  const education = t.experience.education || [];
  const experiences = t.experience.experiences;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeEducationIndex, setActiveEducationIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const educationRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Debounced hover handler
  const handleMouseEnter = useCallback((index: number, isEducation: boolean) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (isEducation) {
      setActiveEducationIndex(index);
    } else {
      setActiveIndex(index);
    }
    
    // Reset animation lock after delay
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const experienceIndex = experienceRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          const educationIndex = educationRefs.current.findIndex(
            (ref) => ref === entry.target
          );

          if (entry.isIntersecting) {
            // Add animation class with delay based on index
            const delay = (experienceIndex !== -1 ? experienceIndex : educationIndex) * 150;
            setTimeout(() => {
              entry.target.classList.add("animate-timeline-appear");
            }, delay);
            
            if (experienceIndex !== -1) {
              const rect = entry.boundingClientRect;
              const viewportCenter = window.innerHeight / 2;
              const cardCenter = rect.top + rect.height / 2;
              const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
              
              if (distanceFromCenter < 200) { // Only set active if close to center
                setActiveIndex(experienceIndex);
              }
            }
            
            if (educationIndex !== -1) {
              const rect = entry.boundingClientRect;
              const viewportCenter = window.innerHeight / 2;
              const cardCenter = rect.top + rect.height / 2;
              const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
              
              if (distanceFromCenter < 200) {
                setActiveEducationIndex(educationIndex);
              }
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    experienceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    educationRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const renderTimelineItem = (
    item: any,
    index: number,
    isActive: boolean,
    refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
    isEducation: boolean = false
  ) => {
  return (
      <div
        key={index}
        ref={(el) => {
          refs.current[index] = el;
        }}
        onMouseEnter={() => handleMouseEnter(index, isEducation)}
        className="relative pl-20 sm:pl-28 group/timeline-item transition-all duration-700"
      >
        {/* REALISTIC DIAMOND Timeline Dot */}
        <div className="absolute left-6 sm:left-8 top-0 z-30">
          <div className="relative">
            {/* Realistic Diamond Shape with Facets */}
            <div className={`relative w-8 h-8 rotate-45 transition-all duration-700 ${
              isActive 
                ? "scale-125" 
                : ""
            }`}>
              {/* Diamond Base Layer */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                isActive 
                  ? "from-white/90 via-pink-100/50 to-rose-100/40" 
                  : "from-white/50 via-pink-50/30 to-white/20"
              } shadow-lg ${
                isActive 
                  ? "shadow-pink-300/40 shadow-rose-300/30" 
                  : "shadow-pink-200/20 shadow-white/10"
              }`}>
                {/* Diamond Facets */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/60 via-pink-100/30 to-transparent" />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/50 via-rose-100/25 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-pink-50/30 via-white/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/40 to-transparent" />
                
                {/* Diamond Center Brilliance */}
                <div className="absolute inset-1.5 bg-gradient-to-r from-transparent via-pink-100/20 via-white/30 to-transparent" />
                
                {/* Diamond Sparkle Effects */}
                {isActive && (
                  <>
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-pink-200 rounded-full blur-[1px] animate-ping" style={{ animationDelay: '0s' }} />
                    <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-rose-200 rounded-full blur-[1px] animate-ping" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-pink-200/60 via-white/50 to-rose-200/40 rounded-full blur-[2px] animate-pulse" />
                  </>
                )}
              </div>
              
              {/* Diamond Prism Effect (Rainbow edges) */}
              <div className={`absolute -inset-px rounded-sm border ${
                isActive 
                  ? "border-gradient-to-r from-pink-200/40 via-white/30 to-rose-200/30" 
                  : "border-pink-100/30 border-white/20"
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/15 via-transparent to-rose-200/15" />
              </div>
              
              {/* Diamond Inner Reflection */}
              <div className="absolute inset-0.5 bg-gradient-to-br from-transparent via-pink-50/10 via-white/15 to-transparent" />
            </div>
            
            {/* Diamond Cast Shadow */}
            <div className={`absolute -inset-0.5 rounded-full ${
              isActive 
                ? "bg-gradient-to-r from-pink-300/25 via-white/20 to-rose-300/20 blur-md" 
                : "bg-pink-100/10 bg-white/5 blur-sm"
            } transition-all duration-500`} />
          </div>
        </div>

        {/* Year Indicator - Larger, greyish, white on hover */}
        <div className={`absolute left-0 -top-8 text-sm font-semibold tracking-wider transition-all duration-500 ${
          isActive 
            ? "text-white font-bold scale-105" 
            : "text-white/40 hover:text-white/60"
        }`}>
          {item.period.split(" - ")[0]}
                </div>

        {/* Content Card with smooth animations */}
                <div
          className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border transition-all duration-500 ease-out group-hover/timeline-item:shadow-2xl group-hover/timeline-item:-translate-y-1 ${
            isActive
              ? "border-white/40 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl shadow-2xl shadow-white/20 translate-y-0"
              : "border-white/15 bg-gradient-to-br from-white/8 to-transparent backdrop-blur-lg shadow-xl shadow-white/10 opacity-90 hover:opacity-100"
          } hover:border-white/50 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10`}
          style={{ maxWidth: 'calc((56rem - 1.25rem) / 2)' }}
                >
          {/* Subtle Glow effect on active */}
          {isActive && (
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-amber-500/5 blur-sm -z-10" />
          )}

          {/* Company & Role Header */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                {item.thumbnail && item.thumbnail.trim() !== "" && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-white/25 to-white/15 p-1 hover:from-white/35 hover:to-white/25 transition-all duration-300 group/logo"
                  >
                    {/* Logo glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-amber-400/20 blur-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full h-full rounded-xl bg-background/90 backdrop-blur-sm overflow-hidden">
                      {item.thumbnail.startsWith('http') ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.company}
                          width={56}
                          height={56}
                          unoptimized
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/logo:scale-110"
                        />
                      ) : (
                        <Image
                          src={item.thumbnail}
                          alt={item.company}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/logo:scale-110"
                        />
                      )}
                      </div>
                  </a>
                )}
                <div className="space-y-0.5 sm:space-y-1">
                  {/* Bigger Title */}
                  <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold transition-all duration-500 ${
                    isActive 
                      ? "text-white bg-gradient-to-r from-white to-amber-200/80 bg-clip-text text-transparent" 
                      : "text-white/95"
                  }`}>
                    {item.title}
                        </h3>
                  {/* Bigger Company Name */}
                  {item.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-white/75 hover:text-white transition-all duration-300 hover:underline decoration-white/40 underline-offset-2"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base font-semibold text-white/75">
                      {item.company}
                    </p>
                  )}
                        </div>
                      </div>
                    </div>

                 {/* Location & Date - Larger */}
                 <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 text-sm sm:text-base text-white/60">
                   <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 transition-all duration-300 hover:text-white/85">
                     <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                     <span>{item.location}</span>
                   </div>
                   <div className={`flex items-center gap-1.5 sm:gap-2 md:gap-2.5 transition-all duration-300 ${
                     isActive ? "text-white/85" : "hover:text-white/85"
                   }`}>
                     <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                     <span>{item.period}</span>
                   </div>
                 </div>
          </div>

               {/* Description */}
               {item.description && (
                 <p className="text-white/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed transition-all duration-500 text-sm sm:text-base">
                   {item.description}
                    </p>
               )}

          {/* Achievements */}
          {item.achievements && item.achievements.length > 0 && (
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="text-sm sm:text-base font-semibold text-white/85 flex items-center gap-2 sm:gap-2.5">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-white/80 to-amber-400/60 animate-pulse" />
                {t.experience.keyAchievements}
                      </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-3.5">
                {item.achievements.map((achievement: string, i: number) => (
                  <li
                            key={i}
                    className="flex items-start gap-2 sm:gap-3 md:gap-3.5 p-2 sm:p-3 md:p-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-white/8 to-transparent border border-white/15 hover:from-white/12 hover:border-white/25 transition-all duration-300 group/achievement"
                  >
                    <div className="relative mt-1 sm:mt-2">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-white/80 to-amber-400/60 animate-pulse" />
                    </div>
                    <span className="text-sm sm:text-base text-white/70 group-hover/achievement:text-white transition-colors duration-300">
                      {achievement}
                    </span>
                  </li>
                        ))}
                      </ul>
                    </div>
          )}

          {/* Skills/Tech Stack - Centered */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="mt-4 sm:mt-6 md:mt-8">
              <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5 justify-center">
                {item.technologies.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 md:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-white/15 to-white/5 text-white border border-white/25 hover:border-white/40 hover:from-white/25 transition-all duration-300 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
            ))}
          </div>
        </div>
          )}

          {/* LinkedIn Post Link - Smaller and Centered */}
          {item.linkedinPost && (
            <div className="mt-4 sm:mt-6 flex justify-center">
              <a
                href={item.linkedinPost}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-white/15 to-amber-500/10 hover:from-white/20 hover:to-amber-500/15 text-white border border-white/30 hover:border-amber-400/30 transition-all duration-300 text-xs sm:text-sm font-medium backdrop-blur-sm group/linkedin"
              >
                <div className="relative">
                  <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-0 group-hover/linkedin:opacity-40 transition-opacity duration-300" />
                </div>
                View LinkedIn Post
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 relative z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Work Experience Section */}
        {experiences.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 sm:mb-8 md:mb-12">
              {(t.experience as any).workTitle}
            </h3>

            <div className="relative">
              {/* Animated Vertical Timeline Line - More subtle */}
              <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-0.5">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/15 to-transparent opacity-50" />
              </div>

              {/* Timeline Cards */}
              <div className="space-y-12 sm:space-y-16 md:space-y-20" ref={containerRef}>
                {[...experiences].reverse().map((exp: any, reversedIndex: number) => {
                  const originalIndex = experiences.length - 1 - reversedIndex;
                  return renderTimelineItem(exp, originalIndex, originalIndex === activeIndex, experienceRefs, false);
                })}
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 sm:mb-8 md:mb-12">
              {(t.experience as any).educationTitle}
            </h3>

            <div className="relative">
              {/* Animated Vertical Timeline Line - More subtle */}
              <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-0.5">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-400/10 via-pink-400/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/15 to-transparent opacity-50" />
              </div>

              {/* Timeline Cards */}
              <div className="space-y-12 sm:space-y-16 md:space-y-20">
                {education.map((edu: any, index: number) =>
                  renderTimelineItem(edu, index, index === activeEducationIndex, educationRefs, true)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
