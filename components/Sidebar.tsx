"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const sidebarItems = [
  { key: "home", href: "#home", numeral: "I" },
  { key: "projects", href: "#projects", numeral: "II" },
  { key: "experience", href: "#experience", numeral: "III" },
  { key: "skills", href: "#skills", numeral: "IV" },
  { key: "contact", href: "#contact", numeral: "V" },
];

export default function Sidebar() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [t]);

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Main Sidebar Content */}
      <motion.aside
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex fixed right-0 top-0 h-screen w-64 z-30 items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col gap-6 px-8 pointer-events-auto pt-20">
          {sidebarItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);
            
            return (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                }}
                className="group relative flex items-center gap-3 py-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ x: -4 }}
              >
                {/* Roman Numeral */}
                <motion.span
                  className={`text-xs font-medium transition-all duration-300 min-w-[24px] tracking-widest text-white ${
                    isActive
                      ? "font-bold scale-110"
                      : "opacity-70 group-hover:opacity-90"
                  }`}
                  whileHover={{ scale: 1.15 }}
                >
                  {item.numeral}
                </motion.span>

                {/* Section Name */}
                <motion.span
                  className={`text-sm font-medium transition-colors duration-300 tracking-tight text-white ${
                    isActive
                      ? "font-semibold"
                      : "opacity-70 group-hover:opacity-90"
                  }`}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </motion.span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -right-8 w-0.5 h-8 bg-white rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.a>
            );
          })}
        </div>

      </motion.aside>
    </>
  );
}