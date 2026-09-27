import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface WhatsAppButtonProps {
  currentLang: Language;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ currentLang }) => {
  const t = translations[currentLang].whatsappWidget;
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Trigger welcome message popup after a 3.2-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsWelcomeOpen(true);
      }
    }, 3200);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWelcomeOpen(false);
    setHasInteracted(true);
  };

  const defaultText =
    currentLang === 'ne'
      ? 'नमस्ते, मलाई मृगौला पत्थरी हर्बल चूर्णबारे थप जानकारी र निःशुल्क स्वास्थ्य परामर्श चाहिएको थियो।'
      : 'Hello, I would like to get more information and health consultation regarding Kidney Stone Herbal Churna.';
  const encodedText = encodeURIComponent(defaultText);
  const waUrl = `https://wa.me/9779800000000?text=${encodedText}`;

  return (
    <div
      className="fixed bottom-15 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none"
      aria-label="WhatsApp Support"
    >
      {/* Welcome Message Popup Bubble - Only message and cut button */}
      <AnimatePresence>
        {isWelcomeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ type: 'spring', damping: 24, stiffness: 350 }}
            className="mb-3.5 w-[calc(100vw-2.5rem)] sm:w-76 max-w-[320px] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 relative origin-bottom-right cursor-pointer group"
          >
            {/* Cut / Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center shadow-md border border-gray-200 transition-colors cursor-pointer z-10"
              title="Close notification"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Link to WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setHasInteracted(true)}
              className="block text-xs sm:text-[13px] text-[#222222] font-normal leading-relaxed hover:text-[#00D757] transition-colors"
            >
              {t.welcomeMessage}
            </a>

            {/* Little speech tail pointing down toward the WhatsApp button */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular WhatsApp Button with Single Animated Ripple Effect */}
      <div className="relative flex items-center justify-center">
        {/* Single Animated Ripple Wave */}
        <motion.span
          className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#25D366] bg-[#25D366]/20 pointer-events-none"
          animate={{
            scale: [1, 1.65],
            opacity: [0, 0.65, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            times: [0, 0.25, 1],
            ease: 'easeOut',
          }}
        />

        {/* Floating Green Circle Anchor Button */}
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setHasInteracted(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.18 }}
          className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00D757] hover:bg-[#00c550] text-white flex items-center justify-center shadow-lg shadow-[#00D757]/45 cursor-pointer focus:outline-none"
          title={t.tooltip}
          aria-label={t.tooltip}
        >
          {/* WhatsApp icon from react-icons */}
          <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </motion.a>
      </div>
    </div>
  );
};
