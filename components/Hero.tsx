"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 relative overflow-hidden"
    >
      {/* Content - Moves with parallax over fixed Spline background */}
        <motion.div
        style={{ y: textY, opacity }}
        className="max-w-4xl w-full relative z-10"
      >
        <div className="space-y-8">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white"
          >
            {t.hero.name}
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-white font-semibold font-sans tracking-wide italic lowercase"
          >
            {t.hero.title}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
          >
            {t.hero.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 pt-6"
          >
            <a
              href="https://github.com/Ilmeq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5 text-black" />
            </a>
            <a
              href="https://www.linkedin.com/in/ilma-kaukovi%C4%87-4aa515209/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5 text-black" />
            </a>
            <a
              href="mailto:ilmeq@icloud.com"
              className="p-3 rounded-lg bg-white border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5 text-black" />
            </a>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}
