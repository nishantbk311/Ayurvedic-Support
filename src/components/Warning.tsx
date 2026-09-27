import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { AlertTriangle } from 'lucide-react';

interface WarningProps {
  currentLang: Language;
}

export const Warning: React.FC<WarningProps> = ({ currentLang }) => {
  const t = translations[currentLang].warning;

  return (
    <section id="warning" className="py-16 sm:py-24 bg-gradient-to-b from-[#fff5ee] via-[#fcf0e5] to-[#f5e6d8] select-none relative overflow-hidden">
      {/* Gentle amber and rose care glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#fcdfd1]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Warning Card matching Warning-Section.jpg */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          whileHover={{
            boxShadow: '0 8px 24px -4px rgba(90, 70, 40, 0.08)',
            borderColor: '#e2d0c5',
            transition: { duration: 0.25 },
          }}
          className="bg-white rounded-[28px] p-6 sm:p-8 md:p-10 border border-[#eedfd6] shadow-[0_2px_12px_rgba(90,70,40,0.03)] flex flex-col sm:flex-row items-start gap-5 sm:gap-6"
        >
          {/* Peach Squircle with Warning Triangle Icon */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
            className="w-14 h-14 rounded-2xl bg-[#fce8e4] flex items-center justify-center shrink-0"
          >
            <AlertTriangle className="w-7 h-7 text-[#d73f1d]" />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-2.5 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-[#1e1b18] font-display tracking-tight">
              {t.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#635a52] leading-relaxed text-justify">
              {t.content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
