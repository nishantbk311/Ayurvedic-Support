import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Ingredients } from './components/Ingredients';
import { HowToUse } from './components/HowToUse';
import { Reviews } from './components/Reviews';
import { Faq } from './components/Faq';
import { Warning } from './components/Warning';
import { OrderForm } from './components/OrderForm';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ShoppingBag, PhoneCall } from 'lucide-react';

import { scrollToOrder } from './utils/scroll';


export default function App() {
  // Nepali is the default language as strictly requested
  const [currentLang, setCurrentLang] = useState<Language>('ne');
  const [showStickyBottom, setShowStickyBottom] = useState(false);

  // Monitor scroll for mobile bottom CTA bar (respecting 15% mobile sticky cap)
  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down 500px, and hide when reaching near bottom order form
      const orderFormEl = document.getElementById('order-form');
      if (orderFormEl) {
        const rect = orderFormEl.getBoundingClientRect();
        const isInOrderForm = rect.top < window.innerHeight && rect.bottom > 0;
        setShowStickyBottom(window.scrollY > 450 && !isInOrderForm);
      } else {
        setShowStickyBottom(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#222b1c] font-sans antialiased">
      {/* 1. Navbar */}
      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} />

      {/* Main Page Flow - Exact 11 Section Order */}
      <main className="flex-1">
        {/* 2. Hero */}
        <Hero currentLang={currentLang} />

        {/* 4. Benefits */}
        <Benefits currentLang={currentLang} />

        {/* 5. Ingredients Used */}
        <Ingredients currentLang={currentLang} />

        {/* 6. How to Use */}
        <HowToUse currentLang={currentLang} />

        {/* 7. Reviews */}
        <Reviews currentLang={currentLang} />

        {/* 8. Order Form */}
        <OrderForm currentLang={currentLang} />

        {/* 9. Final CTA */}
        <FinalCTA currentLang={currentLang} />

        {/* 10. Frequently Asked Questions (FAQ - before Warning section) */}
        <Faq currentLang={currentLang} />

        {/* 11. Warning (Just before the Footer) */}
        <Warning currentLang={currentLang} />
      </main>

      {/* 11. Footer */}
      <Footer currentLang={currentLang} />

  
      {/* Mobile Sticky Action Bar - Max 10% viewport height, strictly compliant with 15% cap */}
      <AnimatePresence>
        {showStickyBottom && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' as const }}
            className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#35571b]/15 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3"
          >
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="tel:+9779800000000"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#35571b]/20 bg-white text-xs font-semibold text-[#1b2615] shrink-0"
              aria-label="Direct Phone Consultation"
            >
              <PhoneCall className="w-4 h-4 text-[#4a9a97]" />
              <span>{currentLang === 'ne' ? 'परामर्श' : 'Call'}</span>
            </motion.a>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={scrollToOrder}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#d74428] via-[#eb7d26] to-[#ec904a] shadow-md cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{currentLang === 'ne' ? 'अर्डर गर्नुहोस् (COD)' : 'Order Now (COD)'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
