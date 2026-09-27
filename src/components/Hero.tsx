import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Truck, Star, Leaf, ShieldCheck } from 'lucide-react';
import { FaMortarPestle } from 'react-icons/fa6';

// =========================================================================
// BOTTLE IMAGE:
// Replace this import / path with your own bottle image file whenever ready!
// =========================================================================
import bottleImage from '../assets/images/bottle.png';
import gokshuraImg from '../assets/images/gokshura.png';
import punarnavaImg from '../assets/images/punarnava.png';
import pashanbhedImg from '../assets/images/pashanabheda.png';
import varunaImg from '../assets/images/varuna.png';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const [hoveredHerb, setHoveredHerb] = useState<number | null>(null);
  const t = translations[currentLang].hero;

  const orbitingHerbs = [
    {
      name: currentLang === 'ne' ? 'गोखरु' : 'Gokshura',
      image: gokshuraImg,
      animClass: 'animate-orbit-1',
    },
    {
      name: currentLang === 'ne' ? 'पुनर्नवा' : 'Punarnava',
      image: punarnavaImg,
      animClass: 'animate-orbit-2',
    },
    {
      name: currentLang === 'ne' ? 'पाषाणभेद' : 'Pashanabheda',
      image: pashanbhedImg,
      animClass: 'animate-orbit-3',
    },
    {
      name: currentLang === 'ne' ? 'वरुण' : 'Varuna',
      image: varunaImg,
      animClass: 'animate-orbit-4',
    },
  ];

  const scrollToOrder = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
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
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-br from-[#fff8f2] via-[#fefaf5] to-[#fdede0]">
      {/* Organic atmospheric depth glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#fdecdb]/40 rounded-full blur-3xl pointer-events-none -ml-28 -mt-28" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#fedec2]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography, Social Proof, Actions, 3 Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Pill / Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#2d6930]/20 shadow-2xs">
              <Leaf className="w-3.5 h-3.5 text-[#2d6930]" />
              <span className="text-xs sm:text-sm font-semibold text-[#2d6930] tracking-wide">
                {t.topBadge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#1f281b] tracking-tight leading-[1.18] font-display text-balance"
            >
              <span>{t.titlePart1} </span>
              <span className="text-[#f15a24]">{t.titleHighlight}</span>
              <br />
              <span>{t.titlePart2}</span>
              <br />
              <span>{t.titlePart3}</span>
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-[15px] text-[#424e3c] leading-relaxed max-w-xl"
            >
              {t.description}
            </motion.p>

            {/* Customer Social Proof Line */}
            <motion.div variants={itemVariants} className="flex items-center gap-3.5 pt-1">
              {/* Overlapping customer avatars */}
              <div className="flex items-center -space-x-2 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Verified User Sita"
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Verified User Ram"
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Verified User Sunita"
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#2d6930] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                  5K+
                </div>
              </div>

              {/* Stars & Text */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-[#f15a24]">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <Star className="w-3.5 h-3.5 fill-current opacity-85" />
                  </div>
                  <span className="text-xs font-bold text-[#1f281b]">{t.ratingText}</span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#4c5c44]">
                  {t.ratingCount}
                </span>
              </div>
            </motion.div>

            {/* Action Row: Orange CTA + Delivery Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
              <motion.button
                onClick={scrollToOrder}
                whileHover={{ scale: 1.04, boxShadow: '0 12px 25px -4px rgba(241, 90, 36, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#f15a24] to-[#f5742a] shadow-md shadow-[#f15a24]/30 hover:from-[#e04f1a] hover:to-[#e8661d] transition-all text-sm sm:text-base cursor-pointer"
              >
                <span>{t.orderBtn}</span>
                <span className="text-lg">→</span>
              </motion.button>

              <motion.div
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs sm:text-sm font-semibold text-[#1f281b]"
              >
                <Truck className="w-4 h-4 text-[#2d6930]" />
                <span>{t.deliveryBadge}</span>
              </motion.div>
            </motion.div>

            {/* Bottom 3 Feature Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-md pt-3">
              {/* Card 1: 100% Herbal */}
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(45, 105, 48, 0.35)' }}
                className="bg-white rounded-xl py-3 px-2 sm:px-3 text-center border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <Leaf className="w-5 h-5 text-[#2d6930]" />
                <span className="text-[11px] sm:text-xs font-semibold text-[#1f281b]">
                  {t.feature1}
                </span>
              </motion.div>

              {/* Card 2: Ayurvedic Method */}
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(241, 90, 36, 0.35)' }}
                className="bg-white rounded-xl py-3 px-2 sm:px-3 text-center border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <FaMortarPestle className="w-5 h-5 text-[#f15a24]" />
                <span className="text-[11px] sm:text-xs font-semibold text-[#1f281b]">
                  {t.feature2}
                </span>
              </motion.div>

              {/* Card 3: Domestic Trust */}
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(45, 105, 48, 0.35)' }}
                className="bg-white rounded-xl py-3 px-2 sm:px-3 text-center border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <ShieldCheck className="w-5 h-5 text-[#2d6930]" />
                <span className="text-[11px] sm:text-xs font-semibold text-[#1f281b]">
                  {t.feature3}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Circular Pedestal Aura with CONTINUOUSLY ORBITING ELEMENTS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Outer Orbit Track */}
            <div className="orbit-track w-[320px] h-[320px] sm:w-[410px] sm:h-[410px] lg:w-[560px] lg:h-[560px] rounded-full relative flex items-center justify-center">
              {/* 4 Orbiting Botanical Herb Images with Hover Pause & Tooltip */}
              {orbitingHerbs.map((herb, idx) => {
                const isThisHovered = hoveredHerb === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      animationPlayState: hoveredHerb !== null ? 'paused' : 'running',
                    }}
                    className={`absolute top-1/2 left-1/2 -mt-6.5 -ml-6.5 sm:-mt-8 sm:-ml-8 lg:-mt-10 lg:-ml-10 ${herb.animClass} z-30`}
                  >
                    <div
                      onMouseEnter={() => setHoveredHerb(idx)}
                      onMouseLeave={() => setHoveredHerb(null)}
                      className="relative flex flex-col items-center cursor-pointer group"
                    >
                      <div
                        className={`w-13 h-13 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full p-1 sm:p-1.5 transition-all duration-200 flex items-center justify-center overflow-hidden `}
                      >
                        <img
                          src={herb.image}
                          alt={herb.name}
                          width="80"
                          height="80"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Herb Name Badge Tooltip shown below image when hovered */}
                      <AnimatePresence>
                        {isThisHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.88 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 2, scale: 0.88 }}
                            transition={{ duration: 0.16, ease: 'easeOut' as const }}
                            className="absolute top-full mt-2 px-2.5 py-1 rounded-full bg-[#221d19]/95 backdrop-blur-xs text-white text-[11px] sm:text-xs font-bold whitespace-nowrap shadow-xl shadow-black/35 border border-[#4d3f33] pointer-events-none z-50 flex items-center gap-1.5"
                          >
                            {/* <span className="w-1.5 h-1.5 rounded-full bg-[#f15a24] shrink-0" /> */}
                            <span>{herb.name}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}

              {/* Inner Glowing Gradient Halo */}
              {/* <div className="w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-tr from-[#fbe3cb]/60 via-[#fcf5e8]/70 to-[#d8f2df]/80 backdrop-blur-xs flex items-center justify-center shadow-inner relative overflow-hidden"> */}
                {/* Gentle ambient light pulse */}
                <div className="absolute inset-0 bg-radial from-white/50 via-transparent to-transparent pointer-events-none" />

                {/* CENTRAL BOTTLE IMAGE WITH FLOATING ANIMATION */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-8 lg:p-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-h-full max-w-full flex items-center justify-center"
                  >
                    <img
                      src={bottleImage}
                      alt="Kidney Stone Herbal Churna Bottle Packaging"
                      width="320"
                      height="430"
                      fetchPriority="high"
                      decoding="async"
                      className="max-h-[250px] sm:max-h-[310px] lg:max-h-[430px] w-auto object-contain filter drop-shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </motion.div>
              {/* </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
