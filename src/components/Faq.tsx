import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqProps {
  currentLang: Language;
}

export const Faq: React.FC<FaqProps> = ({ currentLang }) => {
  const t = translations[currentLang].faq;

  // Open the first item by default for great discoverability
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const formatDevanagari = (num: number): string => {
    if (currentLang === 'ne') {
      const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      const padded = num < 10 ? `0${num}` : `${num}`;
      return padded.replace(/[0-9]/g, (d) => devanagariDigits[parseInt(d, 10)]);
    }
    return num < 10 ? `0${num}` : `${num}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-b from-[#faf6f0] via-[#f7efe4] to-[#faf5ee] relative select-none overflow-hidden">
      {/* Soft warm amber and cream ambient glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#fae3cf]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#fdecdb]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e6dcce] shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#f15a24]" />
            <span className="text-xs sm:text-[13px] font-bold text-[#f15a24] tracking-wide">
              {t.eyebrow}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e1b18] font-display tracking-tight text-balance">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#635a52] leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-3.5"
        >
          {t.items.map((item, index) => {
            const isOpen = openIndex === index;
            const itemNumber = formatDevanagari(index + 1);

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-white rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#f15a24]/40 shadow-sm ring-1 ring-[#f15a24]/20'
                    : 'border-[#e6dcce] hover:border-[#cfc3b4] shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold shrink-0 transition-colors ${
                        isOpen ? 'text-[#f15a24]' : 'text-[#8e857c]'
                      }`}
                    >
                      {itemNumber}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1e1b18] leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' as const }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-[#fde9de] text-[#f15a24]'
                        : 'bg-[#f4efe8] text-[#78716a] hover:bg-[#eae3d9]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' as const }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-[13.5px] text-[#554c44] leading-relaxed border-t border-[#f4efe8]">
                        <p className="pl-7 sm:pl-8">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
