"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Projects() {
  const { t } = useLanguage();
  const projects = (t.projects as any).projects || [];
  
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-3 text-white">
            {t.projects.title}
          </h2>
          {t.projects.subtitle && (
            <p className="text-foreground/60">
              {t.projects.subtitle}
            </p>
          )}
        </div>

        {/* Grid with 2 columns - slightly narrower cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-4xl">
          {projects.map((project: any, index: number) => (
            <motion.div
                key={project.id}
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Glassmorphism Card Container */}
              <div className="bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-xl border border-white/20 dark:border-white/10 overflow-hidden hover:border-white/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-xl hover:shadow-white/10">
                {/* Image Section with glass effect */}
                <div className="h-36 sm:h-40 relative overflow-hidden">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={project.id === 1}
                />
                      {/* Glass overlay for image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      {/* Frosted glass effect at bottom of image */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/20 to-transparent backdrop-blur-sm pointer-events-none" />
                    </>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-white/10 to-amber-500/10 relative">
                      {/* Glass pattern overlay for placeholder */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:20px_20px]"></div>
                    </div>
                  )}
                  
                  {/* Glassmorphism badges */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs font-medium bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-md border border-white/30 dark:border-white/10">
                      {project.category}
                    </span>
                    </div>
                  
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-2 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-md hover:bg-white/30 dark:hover:bg-black/40 border border-white/30 dark:border-white/10 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-2 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-md hover:bg-white/30 dark:hover:bg-black/40 border border-white/30 dark:border-white/10 transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  </div>

                       {/* Content Section with glass effect */}
                       <div className="p-3 sm:p-4 flex-grow bg-gradient-to-b from-transparent to-white/5 dark:to-black/5">
                         <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 text-white group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                         <p className="text-xs sm:text-sm text-white/70 mb-2 sm:mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Skills with glass effect */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 text-xs bg-white/15 dark:bg-black/25 backdrop-blur-sm rounded border border-white/20 dark:border-white/10 text-white/80"
                      >
                        {skill}
                  </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
