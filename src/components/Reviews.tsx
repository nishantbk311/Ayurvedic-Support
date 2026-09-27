import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface ReviewsProps {
  currentLang: Language;
}

export const Reviews: React.FC<ReviewsProps> = ({ currentLang }) => {
  const t = translations[currentLang].reviews;

  // Star rendering helper matching the screenshot (Card 1: 4.5 stars, Card 2: 4 stars, Card 3: 5 stars)
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 text-[#f15a24]">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          if (rating >= starIndex) {
            return <Star key={starIndex} className="w-4 h-4 fill-[#f15a24]" />;
          } else if (rating >= starIndex - 0.5) {
            return (
              <div key={starIndex} className="relative w-4 h-4">
                <Star className="w-4 h-4 text-[#f15a24]" />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className="w-4 h-4 fill-[#f15a24] text-[#f15a24]" />
                </div>
              </div>
            );
          } else {
            return <Star key={starIndex} className="w-4 h-4 text-[#f15a24]" />;
          }
        })}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-gradient-to-b from-[#faf6f0] via-[#f5ece0] to-[#faf5ed] relative overflow-hidden">
      {/* Soft warm ivory and amber radiance */}
      <div
        className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-[#fae3cf]/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-12 -left-12 w-96 h-96 rounded-full bg-[#fdecdb]/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

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
        </motion.div>

        {/* Continuous Sliding Reviews Track */}
        <div className="relative w-full overflow-hidden py-4 -my-4">
          {/* Edge Blur / Fade Masks for cinematic marquee effect */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#faf6f0] via-[#faf6f0]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#faf5ed] via-[#faf5ed]/80 to-transparent z-20" />

          {/* Marquee Track */}
          <div className="animate-marquee flex gap-6 sm:gap-7 items-stretch">
            {/* Duplicated 5 items to create seamless infinite loop */}
            {[...t.items, ...t.items].map((review, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  y: -6,
                  borderColor: '#cfc0ad',
                  boxShadow: '0 12px 28px -6px rgba(90, 70, 40, 0.12)',
                  transition: { duration: 0.2 },
                }}
                className="w-[300px] sm:w-[360px] md:w-[380px] shrink-0 bg-[#ffffff] rounded-[28px] p-7 sm:p-8 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.03)] transition-colors flex flex-col justify-between min-h-[260px] space-y-6 select-none cursor-pointer"
              >
                {/* Star Rating and Quote Text */}
                <div className="space-y-4">
                  {/* 5-Star Row */}
                  {renderStars(review.rating)}

                  {/* Review Quote Body */}
                  <p className="text-xs sm:text-[13px] text-[#3b4436] leading-relaxed font-normal">
                    {review.text}
                  </p>
                </div>

                {/* Author Footer (Avatar + Name + Location) */}
                <div className="flex items-center gap-3.5 pt-2">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    width="40"
                    height="40"
                    className="w-10 h-10 rounded-full object-cover border border-[#e6dcce] shadow-2xs shrink-0"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-[#1e1b18]">
                      {review.name}
                    </span>
                    <span className="text-[11px] text-[#5c544d]">
                      {review.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footnote matching review.jpg */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <p className="text-[11px] sm:text-xs text-[#78716a]">
            {t.footnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
