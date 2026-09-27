import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sprout } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface FinalCTAProps {
  currentLang: Language;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ currentLang }) => {
  const t = translations[currentLang].finalCta;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 text-white select-none">
      {/* Background Gradient & Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff4d00] via-[#f75b22] to-[#6961e8]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

      {/* Subtle radial light bloom */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 sm:space-y-7"
      >
        {/* Main Headline with leaf sprout indicator */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white font-display text-balance leading-snug">
          {t.titlePre}
          <span className="relative inline-block">
            {/* Sprout icon from lucide-react */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-5 h-5 sm:w-6 sm:h-6 text-white absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 drop-shadow-sm opacity-95 flex items-center justify-center"
            >
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            {t.highlightWord}
          </span>
          {t.titlePost}
        </h2>

        {/* Subtitle tailored to WhatsApp consultation */}
        <p className="text-xs sm:text-sm md:text-[15px] text-white/90 max-w-xl mx-auto leading-relaxed font-normal">
          {t.subtitle}
        </p>

        {/* Extracted WhatsApp Button - Icon and Number only with smooth hover */}
        <div className="pt-2 sm:pt-4 flex justify-center">
          <motion.a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 12px 28px -4px rgba(0, 215, 87, 0.45)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#00D757] hover:bg-[#00c851] text-white text-base sm:text-lg font-bold shadow-lg shadow-black/15 cursor-pointer whitespace-nowrap select-none"
            aria-label={`WhatsApp: ${t.whatsappNumber}`}
          >
            {/* WhatsApp icon from react-icons */}
            <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white" />
            <span className="tracking-wide font-bold">WhatsApp: {t.whatsappNumber}</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

