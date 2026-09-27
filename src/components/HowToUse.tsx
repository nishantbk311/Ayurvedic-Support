import { motion } from 'framer-motion';
import { CalendarCheck, Clock, GlassWater, Utensils } from 'lucide-react';
import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface HowToUseProps {
  currentLang: Language;
}

export const HowToUse: React.FC<HowToUseProps> = ({ currentLang }) => {
  const t = translations[currentLang].howToUse;

  const stepConfigs = [
    // Step 1: Spoon / Dosage
    {
      badgeBg: 'bg-[#d9381e]',
      icon: <Utensils className="w-8 h-8 text-[#ea6927]" />,
    },
    // Step 2: Glass of water
    {
      badgeBg: 'bg-[#f2711c]',
      icon: <GlassWater className="w-8 h-8 text-[#4d69c4]" />,
    },
    // Step 3: Clock
    {
      badgeBg: 'bg-[#0e8a8a]',
      icon: <Clock className="w-8 h-8 text-[#0e8a8a]" />,
    },
    // Step 4: Calendar with Checkmark
    {
      badgeBg: 'bg-[#235828]',
      icon: <CalendarCheck className="w-8 h-8 text-[#235828]" />,
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
    hidden: { opacity: 0, y: 28 },
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
    <section id="how-to-use" className="py-20 sm:py-28 bg-gradient-to-b from-[#fff8f2] via-[#fef3e7] to-[#faebe0] relative overflow-hidden">
      {/* Subtle ambient sunrise & terracotta highlights */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#fbdac8]/50 rounded-full blur-3xl pointer-events-none -ml-20" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#fde9d4]/60 rounded-full blur-3xl pointer-events-none -mr-20" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center max-w-3xl mx-auto space-y-2 mb-14 sm:mb-16"
        >
          <p className="text-xs sm:text-[13px] font-bold text-[#c83f28] tracking-wide">
            {t.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e1b18] font-display tracking-tight">
            {t.title}
          </h2>
        </motion.div>

        {/* 4 Step Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4"
        >
          {t.steps.map((step, idx) => {
            const config = stepConfigs[idx] || stepConfigs[0];
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
                className="relative bg-[#ffffff] rounded-[26px] p-6 pt-7 pb-6 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.04)] transition-colors flex flex-col items-start gap-3.5"
              >
                {/* Overlapping Step Number Badge at the Edge */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`absolute -top-3.5 -left-2.5 sm:-left-3 w-8 h-8 rounded-full ${config.badgeBg} text-white font-bold text-sm flex items-center justify-center shadow-md shadow-black/15 z-10`}
                >
                  <span>{step.num}</span>
                </motion.div>

                {/* Step Icon */}
                <div className="flex items-center justify-center">
                  {config.icon}
                </div>

                {/* Step Instruction Text */}
                <p className="text-xs sm:text-[13px] text-[#333a2d] leading-relaxed font-normal">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Advisory / Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-12 max-w-4xl mx-auto rounded-2xl bg-[#fff5ee] border border-[#fbd6c0] px-5 sm:px-6 py-3.5 sm:py-4 flex items-center gap-3.5 shadow-[0_2px_6px_rgba(217,56,30,0.04)]"
        >
          <div className="w-5 h-5 rounded-full bg-[#d9381e] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
            i
          </div>
          <p className="text-xs sm:text-[13px] text-[#5c4a3d] leading-relaxed">
            {t.advisory}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
