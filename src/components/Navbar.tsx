import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, ShoppingCart, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import logo from '../assets/images/logo.png';
import { translations } from "../data/translations";
import { Language } from "../types";


interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    onLanguageChange(currentLang === "ne" ? "en" : "ne");
  };

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 select-none ${
        isScrolled
          ? "bg-[#221d19]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[#3d332a] py-3"
          : "bg-[#221d19] border-b border-[#352d24]/80 py-3"
      }`}
    >
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 group transition-transform"
            aria-label="Ayurvedic Support Home"
          >
            <img
              src={logo}
              alt="Ayurvedic Support"
              className="h-9 sm:h-12 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-[13.5px] font-semibold text-[#e2d7cc]">
            {[
              { id: "benefits", label: t.benefits },
              { id: "ingredients", label: t.ingredients },
              { id: "how-to-use", label: t.howToUse },
              { id: "reviews", label: t.reviews },
              { id: "faq", label: t.faq },
            ].map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ y: -1.5, color: "#ffffff" }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="hover:text-white transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* Right Controls: Language Switcher & Order Button */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(241, 90, 36, 0.6)",
              }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#483d34] bg-[#2d251f] hover:bg-[#3a3028] text-xs sm:text-[13px] font-medium text-[#f0eae3] hover:text-white transition-all cursor-pointer shadow-2xs"
              title="Switch Language / भाषा परिवर्तन गर्नुहोस्"
              aria-label="Toggle language between Nepali and English"
            >
              <Globe className="w-3.5 h-3.5 text-[#b8f0d5]" />
              <span>{currentLang === "ne" ? "नेपाली" : "English"}</span>
              <span className="text-[11px] text-[#f15a24] font-bold">
                ({currentLang === "ne" ? "EN" : "ने"})
              </span>
            </motion.button>

            {/* Order Now CTA Pill Button */}
            <motion.button
              onClick={() => scrollToSection("order-form")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#f15a24] hover:bg-[#e04f1a] rounded-full shadow-md shadow-[#f15a24]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t.orderNow}</span>
            </motion.button>

            {/* Mobile Menu Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#d8cec4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="lg:hidden mt-3 pt-3 pb-4 border-t border-[#3d332a] bg-[#221d19] space-y-1 overflow-hidden"
            >
              {[
                { id: "benefits", label: t.benefits },
                { id: "ingredients", label: t.ingredients },
                { id: "how-to-use", label: t.howToUse },
                { id: "reviews", label: t.reviews },
                { id: "faq", label: t.faq },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#d8cec4] hover:text-[#f15a24] hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 px-1">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("order-form")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#f15a24] hover:bg-[#e04f1a] rounded-full shadow-md shadow-[#f15a24]/20 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{t.orderNow}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
