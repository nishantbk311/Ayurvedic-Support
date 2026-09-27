import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, OrderFormData, PackageTier } from '../types';
import { translations } from '../data/translations';
import { CheckCircle, Package, Phone, MapPin, Truck, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderFormData | null;
  selectedTier: PackageTier | null;
  currentLang: Language;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  orderData,
  selectedTier,
  currentLang,
}) => {
  const t = translations[currentLang].order;

  return (
    <AnimatePresence>
      {isOpen && orderData && selectedTier && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#35571b]/20 p-6 sm:p-8 text-center space-y-5 z-10"
          >
            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#cafbd9] text-[#35571b] flex items-center justify-center mx-auto shadow-sm"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>

            <div className="space-y-2">
              <h3 id="success-modal-title" className="text-2xl font-bold text-[#1b2615] font-display">
                {t.successTitle}
              </h3>
              <p className="text-sm text-[#46533f]">
                {t.successMessage}
              </p>
            </div>

            {/* Order Details Receipt Box */}
            <div className="bg-[#faf8f5] rounded-xl p-4 text-left border border-[#35571b]/10 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#35571b]/10">
                <span className="text-[#64755c] flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#eb7d26]" />
                  {currentLang === 'ne' ? 'प्याकेज:' : 'Package:'}
                </span>
                <span className="font-bold text-[#1b2615]">
                  {selectedTier.name[currentLang]}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#35571b]/10">
                <span className="text-[#64755c] flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#4a9a97]" />
                  {currentLang === 'ne' ? 'ग्राहक तथा फोन:' : 'Customer Phone:'}
                </span>
                <span className="font-semibold text-[#1b2615]">
                  {orderData.fullName} ({orderData.phoneNumber})
                </span>
              </div>

              <div className="flex items-start justify-between pb-2 border-b border-[#35571b]/10">
                <span className="text-[#64755c] flex items-center gap-1.5 shrink-0">
                  <MapPin className="w-4 h-4 text-[#d74428]" />
                  {currentLang === 'ne' ? 'डेलिभरी ठेगाना:' : 'Delivery Address:'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 text-sm font-bold">
                <span className="text-[#1b2615]">
                  {currentLang === 'ne' ? 'डेलिभरीमा तिर्नुपर्ने रकम (COD):' : 'Payable on Delivery:'}
                </span>
                <span className="text-[#d74428] font-mono text-base">
                  रु. {selectedTier.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Courier dispatch reassurance */}
            <div className="flex items-center justify-center gap-2 text-xs text-[#35571b] font-medium">
              <Truck className="w-4 h-4 text-[#35571b]" />
              <span>
                {currentLang === 'ne'
                  ? 'काठमाडौँ उपत्यकाभित्र २४ घण्टा र बाहिर २-३ दिनभित्र डेलिभरी हुनेछ।'
                  : 'Dispatch within 24h. Express doorstep arrival in 2-3 business days.'}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#35571b] hover:bg-[#284314] transition-colors cursor-pointer"
            >
              {t.closeModal}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
