import { motion } from 'framer-motion';
import { Droplets, FlaskConical, HeartHandshake, Sprout, Waves } from 'lucide-react';
import React from 'react';
import { FaMortarPestle } from 'react-icons/fa6';
import { translations } from '../data/translations';
import { Language } from '../types';

interface BenefitsProps {
  currentLang: Language;
}

export const Benefits: React.FC<BenefitsProps> = ({ currentLang }) => {
  const t = translations[currentLang].benefits;

  const cardIcons = [
    // 1. Water Drop
    {
      bg: 'bg-[#d2f3e2]',
      icon: <Droplets className="w-5 h-5 text-[#1e6b3b]" />,
    },
    // 2. Wave Lines
    {
      bg: 'bg-[#cfe8f7]',
      icon: <Waves className="w-5 h-5 text-[#2b719b]" />,
    },
    // 3. Sprout / Seedling
    {
      bg: 'bg-[#fde0d2]',
      icon: <Sprout className="w-5 h-5 text-[#eb6424]" />,
    },
    // 4. Chemistry Flask / Beaker
    {
      bg: 'bg-[#d2f3e2]',
      icon: <FlaskConical className="w-5 h-5 text-[#1e6b3b]" />,
    },
    // 5. Mortar and Pestle
    {
      bg: 'bg-[#cfe8f7]',
      icon: <FaMortarPestle className="w-5 h-5 text-[#2b719b]" />,
    },
    // 6. Care Hand with Heart
    {
      bg: 'bg-[#fde0d2]',
      icon: <HeartHandshake className="w-5 h-5 text-[#eb6424]" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="benefits" className="py-20 sm:py-28 bg-gradient-to-b from-[#faf5eb] via-[#f7f0e4] to-[#f2e8dc] relative overflow-hidden">
      {/* Subtle organic warmth glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#eedec8]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#feddc7]/35 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

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

        {/* 6 Structured Cards (2 rows x 3 cols) matching Benefits.jpg */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {t.items.map((item, idx) => {
            const iconConfig = cardIcons[idx] || cardIcons[0];
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
                className="bg-[#ffffff] rounded-[28px] p-7 sm:p-8 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.04)] transition-colors flex flex-col justify-start"
              >
                {/* Squircle Icon Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.2 }}
                  className={`w-12 h-12 rounded-2xl ${iconConfig.bg} flex items-center justify-center shrink-0 mb-6`}
                >
                  {iconConfig.icon}
                </motion.div>

                {/* Card Title */}
                <h3 className="text-base sm:text-[17px] font-bold text-[#1e1b18] tracking-tight leading-snug">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-[13px] text-[#504840] leading-relaxed mt-2.5">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
