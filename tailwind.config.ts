import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        muted: "var(--muted)",
        border: "var(--border)",
        "warm-beige": "var(--warm-beige)",
        "warm-gray": "var(--warm-gray)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        // Custom fonts from Shopify
        'neue-montreal': ['NeueMontreal', 'system-ui', 'sans-serif'],
        'hw-cigars': ['HWCigars', 'Georgia', 'serif'],
        'imperial-script': ['ImperialScript', 'cursive', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'vintage-paper': "url('/images/paper-texture.jpg')",
        'noise-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'gradient-vintage': 'linear-gradient(135deg, #f5f3e9 0%, #e8e0d0 100%)',
        'gradient-vintage-dark': 'linear-gradient(135deg, #2c1f15 0%, #1a130d 100%)',
      },
      boxShadow: {
        'vintage': '0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(139, 69, 19, 0.1)',
        'vintage-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(139, 69, 19, 0.1)',
        'vintage-lg': '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(139, 69, 19, 0.15)',
        'vintage-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(139, 69, 19, 0.2)',
      },
      textShadow: {
        'vintage': '0 1px 2px rgba(139, 69, 19, 0.2)',
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-shadow-vintage': {
          textShadow: '0 1px 2px rgba(139, 69, 19, 0.2)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-default': {
          '-ms-overflow-style': 'auto',
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        },
        '.bg-vintage-pattern': {
          backgroundColor: '#f5f3e9',
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(205, 179, 128, 0.15) 0%, transparent 20%),
            radial-gradient(circle at 85% 30%, rgba(205, 179, 128, 0.1) 0%, transparent 20%),
            linear-gradient(to right, transparent 95%, rgba(120, 63, 4, 0.05) 100%),
            linear-gradient(to bottom, transparent 95%, rgba(120, 63, 4, 0.05) 100%)
          `,
        },
        '.bg-aged-paper': {
          backgroundColor: '#f5f3e9',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E"),
            radial-gradient(ellipse at 20% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 20%, rgba(139, 69, 19, 0.03) 0%, transparent 40%),
            linear-gradient(90deg, transparent 98%, rgba(120, 63, 4, 0.03) 99%, transparent 100%),
            linear-gradient(0deg, transparent 98%, rgba(120, 63, 4, 0.03) 99%, transparent 100%)
          `,
          backgroundSize: '200px 200px, 400px 400px, 300px 300px, 20px 20px, 20px 20px',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  darkMode: 'class',
};

export default config;