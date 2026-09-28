import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, ShieldCheck, ShoppingBag, Sparkles, Sprout, Truck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { scrollToOrder } from '../utils/scroll';

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
       {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5 sm:space-y-6"
      >
        {/* Main Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-display leading-tight text-balance">
          {t.titlePre}
          <span className="relative inline-block mx-1">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="w-5 h-5 text-white absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 opacity-95 flex items-center justify-center pointer-events-none"
            >
              <Sprout className="w-5 h-5 text-white" />
            </motion.div>
            <span className="underline decoration-white/60 decoration-2 underline-offset-6">
              {t.highlightWord}
            </span>
          </span>
          {t.titlePost}
        </h2>

        {/* Short & Sweet Subtitle */}
        <p className="text-xs sm:text-sm md:text-[15px] text-white/95 max-w-xl mx-auto leading-relaxed font-medium">
          {t.subtitle}
        </p>

        {/* Action Button */}
        <div className="pt-2 flex justify-center">
          <motion.button
            onClick={scrollToOrder}
            whileHover={{ scale: 1.04, boxShadow: '0 16px 32px -4px rgba(2, 1, 1, 0.28)' }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full bg-white text-[#f15a24] text-sm sm:text-base md:text-lg font-bold shadow-xl shadow-black/15 hover:bg-[#fff9f5] transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#f15a24] group-hover:rotate-6 transition-transform" />
            <span>{t.orderBtn}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#f15a24] group-hover:translate-x-1 transition-transform" />
          
          </motion.button>
        </div>

        {/* Trust Highlights Strip */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-semibold text-white/95">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>{t.badge1}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>{t.badge2}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 backdrop-blur-xs">
            <Truck className="w-3.5 h-3.5 text-white" />
            <span>{t.badge3}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

