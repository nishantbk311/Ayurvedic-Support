import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

// =========================================================================
// BANNER IMAGE CONFIGURATION:
// Replace this import / path with your own banner image file whenever ready!
// =========================================================================
import bannerImage from '../assets/images/banner.webp';

interface BannerProps {
  currentLang?: Language;
  /* Optional custom banner image source if passed from props */
  bannerSrc?: string;
}

export const Banner: React.FC<BannerProps> = ({ bannerSrc }) => {
  const activeBanner = bannerSrc || bannerImage;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' as const }}
      className="w-full p-0 m-0 overflow-hidden relative"
      aria-label="Ayurvedic Banner Overview"
    >
      <img
        src={activeBanner}
        alt="Ayurvedic Kidney Stone Herbal Churna Banner Infographic"
        width="1376"
        height="768"
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-cover block"
        referrerPolicy="no-referrer"
      />
    </motion.section>
  );
};
