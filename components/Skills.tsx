"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();
  
  const skills = [
    // Frontend
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
    // 3D & Design
    "Three.js", "Spline", "UI/UX Design", "Figma",
    // Backend & Database
    "Node.js", "Python", "PostgreSQL", "Laravel",
    // Mobile & Tools
    "React Native", "Git", "GitHub", "Jira"
  ];

  return (
    <section id="skills" className="py-20 px-6 sm:px-8 lg:px-12 relative z-10 pb-8">
      <div className="max-w-4xl">
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-2 text-white">
            {t.skills.title}
          </h2>
        </div>

        {/* Minimal Card */}
        <div className="bg-background rounded-xl border border-border p-6">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}