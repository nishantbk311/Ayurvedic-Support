import { motion } from 'framer-motion';
import { Flower2, Leaf, Sprout, Wheat } from 'lucide-react';
import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

import gokshuraImg from '../assets/images/gokshura.png';
import punarnavaImg from '../assets/images/punarnava.png';
import pashanbhedImg from '../assets/images/pashanabheda.png';
import varunaImg from '../assets/images/varuna.png';

interface IngredientsProps {
  currentLang: Language;
}

export const Ingredients: React.FC<IngredientsProps> = ({ currentLang }) => {
  const t = translations[currentLang].ingredients;

  const herbVisuals = [
  // 1. गोखरु (Gokshura)
  {
    bg: "bg-[#f4be9b]",
    render: () => (
      <img
        src={gokshuraImg}
        alt="गोखरु"
        className="w-12 h-12 object-contain drop-shadow-xs"
      />
    ),
  },

  // 2. पुनर्नवा (Punarnava)
  {
    bg: "bg-[#f4be9b]",
    render: () => (
      <img
        src={punarnavaImg}
        alt="पुनर्नवा"
        className="w-12 h-12 object-contain drop-shadow-xs"
      />
    ),
  },

  // 3. वरुण (Varun Bark)
  {
    bg: "bg-[#f4be9b]",
    render: () => (
      <img
        src={varunaImg}
        alt="वरुण"
        className="w-12 h-12 object-contain drop-shadow-xs"
      />
    ),
  },

  // 4. पाषाणभेद (Pashanbhed Root & Leaf)
  {
   bg: "bg-[#f4be9b]",
    render: () => (
      <img
        src={pashanbhedImg}
        alt="पाषाणभेद"
        className="w-12 h-12 object-contain drop-shadow-xs"
      />
    ),
  },
];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="ingredients" className="py-20 sm:py-28 bg-gradient-to-b from-[#fff5eb] via-[#feede0] to-[#fff3e6] relative overflow-hidden">
      {/* Light orange-shade ambient glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#ffd8b8]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#fecba1]/35 rounded-full blur-2xl pointer-events-none -mr-16 -mb-16" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center max-w-3xl mx-auto space-y-2.5 mb-14 sm:mb-16"
        >
          <p className="text-xs sm:text-[13px] font-bold text-[#c83f28] tracking-wide">
            {t.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e1b18] font-display tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#635a52] max-w-xl mx-auto leading-relaxed pt-0.5">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 4 Clean Herb Cards matching Ingredients-Used.jpg */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6"
        >
          {t.items.map((item, idx) => {
            const visual = herbVisuals[idx] || herbVisuals[0];
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  borderColor: '#cfc0ad',
                  boxShadow: '0 12px 28px -6px rgba(90, 70, 40, 0.12)',
                  transition: { duration: 0.25 },
                }}
                className="bg-[#ffffff] rounded-[26px] p-6 sm:p-6.5 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.04)] transition-colors flex flex-col items-center text-center gap-3.5"
              >
                {/* Botanical Illustration Container */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  transition={{ duration: 0.2 }}
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl ${visual.bg} flex items-center justify-center shrink-0`}
                >
                  {visual.render()}
                </motion.div>

                {/* Content */}
                <div className="space-y-1 w-full">
                  {/* Herb Name in Deep Forest Green */}
                  <h3 className="text-base sm:text-lg font-bold text-[#1f5329] tracking-tight">
                    {item.name}
                  </h3>

                  {/* Weight Specification */}
                  <p className="text-[11px] sm:text-xs text-[#756d64] font-medium font-mono">
                    {item.weight}
                  </p>

                  {/* Role / Description */}
                  <p className="text-xs sm:text-[13px] text-[#504840] leading-relaxed pt-1.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
