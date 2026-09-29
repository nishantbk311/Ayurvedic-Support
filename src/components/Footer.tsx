import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ShoppingCart } from 'lucide-react';
import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

import logo from '../assets/images/logo.png';


interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang].footer;

  // Dynamically calculate display year based on language (Gregorian for EN, Bikram Sambat for NE)
  const getDisplayYear = (): number => {
    try {
      const now = new Date();
      if (currentLang === 'en') {
        return now.getFullYear();
      }
      // UTC time + 5 hours 45 mins for Nepal
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const nepalTime = new Date(utcTime + 5.75 * 3600000);
      const year = nepalTime.getFullYear();
      const month = nepalTime.getMonth(); // 0-indexed, 3 is April
      const day = nepalTime.getDate();

      // Nepali New Year (Baisakh 1) falls around April 13-14
      const isPastNepaliNewYear = month > 3 || (month === 3 && day >= 14);
      return year + (isPastNepaliNewYear ? 57 : 56);
    } catch {
      return currentLang === 'en' ? 2026 : 2083;
    }
  };

  const displayYear = getDisplayYear();

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <footer className="bg-[#221d19] text-[#9c938a] pt-16 pb-10 select-none">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Columns Top Grid matching Footer.jpg */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start"
        >
          {/* Column 1: Brand Logo + Description + Socials (lg:col-span-4) */}
          <motion.div variants={colVariants} className="lg:col-span-4 space-y-4">
            {/* Logo Badge */}
            <div className="flex items-center gap-2.5">
              <img
              src={logo}
              alt="Ayurvedic Support"
                onContextMenu={(e) => e.preventDefault()}
              className="h-9 sm:h-15 w-auto object-contain"
            />
        
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-[#b8afa5] leading-relaxed max-w-xs">
              {t.brandDesc}
            </p>

            
          </motion.div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <motion.div variants={colVariants} className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-wide">
              {t.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13.5px] text-[#b0a79d]">
              {[
                { id: 'hero', label: t.linkAbout },
                { id: 'benefits', label: t.linkBenefits },
                { id: 'ingredients', label: t.linkIngredients },
                { id: 'how-to-use', label: t.linkHowToUse },
                { id: 'reviews', label: t.linkReviews },
                { id: 'faq', label: t.linkFaq },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-[#b0a79d] hover:text-[#f15a24] hover:translate-x-1 transition-all duration-200 cursor-pointer block py-0.5"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Details (lg:col-span-3) */}
          <motion.div variants={colVariants} className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-wide">
              {t.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#b8afa5]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f15a24] shrink-0" />
                <span>{t.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f15a24] shrink-0" />
                <span>{t.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#f15a24] shrink-0" />
                <span>{t.address}</span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Order CTA (lg:col-span-3) */}
          <motion.div variants={colVariants} className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-wide">
              {t.orderTitle}
            </h4>
            <p className="text-xs sm:text-[13px] text-[#b8afa5] leading-relaxed">
              {t.orderDesc}
            </p>
            <div className="pt-1">
              <motion.button
                onClick={() => scrollToSection('order-form')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#f15a24] hover:bg-[#e04f1a] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#f15a24]/20 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t.orderBtn}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="border-t border-[#352e28] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#a69e96] gap-3">
          <p>© {displayYear} {t.copyrightSuffix}</p>
          <p className="text-center sm:text-right">{t.bottomDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
};
