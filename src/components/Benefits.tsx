import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Droplets, Waves, Sprout, FlaskConical, HeartHandshake, Sparkles } from 'lucide-react';
import { FaMortarPestle } from 'react-icons/fa6';
import benefitsVisual from '../assets/images/doctor.png';

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
    hidden: { opacity: 0, y: 24 },
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
    <section id="benefits" className="py-20 sm:py-28 bg-gradient-to-b from-[#faf5eb] via-[#f7f0e4] to-[#f2e8dc] relative overflow-hidden">
      {/* Subtle organic warmth glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#eedec8]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#feddc7]/35 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center max-w-3xl mx-auto space-y-2.5 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-[#e6dcce] text-xs sm:text-[13px] font-bold text-[#c83f28] tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c83f28]" />
            <span>{t.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e1b18] font-display tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#635a52] max-w-xl mx-auto leading-relaxed pt-0.5">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 2-Part Layout: Left Image + Right Benefit Cards perfectly aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Visual Showcase Image (Pure Image, perfectly matching cards height) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className="relative rounded-[28px] overflow-hidden border border-[#e6dcce] shadow-[0_4px_24px_rgba(90,70,40,0.07)] bg-[#f8f4ec] w-full flex-1 min-h-[340px] sm:min-h-[420px] lg:min-h-0">
              <img
                src={benefitsVisual}
                alt="Ayurvedic Kidney Herbal Churna Benefits"
                width="600"
                height="750"
                  onContextMenu={(e) => e.preventDefault()}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center block absolute inset-0"
              />
            </div>
          </motion.div>

          {/* Right Column: Benefit Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {t.items.map((item, idx) => {
              const iconConfig = cardIcons[idx] || cardIcons[0];
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{
                    y: -4,
                    borderColor: '#cfc0ad',
                    boxShadow: '0 10px 24px -4px rgba(90, 70, 40, 0.1)',
                    transition: { duration: 0.2 },
                  }}
                  className="bg-[#ffffff] rounded-[24px] p-5 sm:p-6 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.03)] transition-colors flex flex-col justify-start"
                >
                  {/* Squircle Icon Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.2 }}
                    className={`w-11 h-11 rounded-2xl ${iconConfig.bg} flex items-center justify-center shrink-0 mb-4`}
                  >
                    {iconConfig.icon}
                  </motion.div>

                  {/* Card Title */}
                  <h3 className="text-sm sm:text-base font-bold text-[#1e1b18] tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-[13px] text-[#504840] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
