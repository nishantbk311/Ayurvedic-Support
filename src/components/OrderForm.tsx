import { motion } from 'framer-motion';
import {
    AlertCircle,
    Banknote,
    Box,
    Boxes,
    Building2,
    Check,
    Home,
    Layers,
    Lock,
    MapPin,
    Minus,
    Package,
    Phone,
    Plus,
    RefreshCw,
    ShieldCheck,
    ShoppingCart,
    SlidersHorizontal,
    Star,
    Truck,
    User,
} from 'lucide-react';
import React, { useState } from 'react';
import bottleImage from '../assets/images/bottle.png';
import { translations } from '../data/translations';
import { Language, OrderFormData, PackageTier } from '../types';
import { SuccessModal } from './SuccessModal';

interface OrderFormProps {
  currentLang: Language;
}

interface BottleOption {
  qty: number;
  price: number;
  originalPrice: number;
  savings: number;
  badgeType?: 'popular' | 'savings' | 'bestValue';
}

export const OrderForm: React.FC<OrderFormProps> = ({ currentLang }) => {
  const t = translations[currentLang].order;

  // Selected quantity (defaults to 2 bottles matching orderform-3.jpg)
  const [quantity, setQuantity] = useState<number>(2);

  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phoneNumber: '',
    city: '',
    landmark: '',
    fullAddress: '',
    packageId: '2-bottles',
    deliveryNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderFormData | null>(null);
  const [submittedTier, setSubmittedTier] = useState<PackageTier | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Fixed preset options from orderform-3.jpg
  const presetOptions: BottleOption[] = [
    { qty: 1, price: 2000, originalPrice: 2000, savings: 0 },
    { qty: 2, price: 3500, originalPrice: 4000, savings: 500, badgeType: 'popular' },
    { qty: 3, price: 5000, originalPrice: 6000, savings: 1000, badgeType: 'savings' },
    { qty: 4, price: 6500, originalPrice: 8000 , savings: 1500, badgeType: 'bestValue' },
  ];

  // Dynamic pricing calculation
  const calculatePricing = (qty: number) => {
    const preset = presetOptions.find((p) => p.qty === qty);
    if (preset) return preset;

    // For custom quantities > 4
    const unitPrice = 1625;
    const originalPrice = qty * 2000;
    const price = qty * unitPrice;
    const savings = originalPrice - price;
    return { qty, price, originalPrice, savings };
  };

  const currentPricing = calculatePricing(quantity);

  // Helper for Devanagari numerals
  const formatNumber = (num: number): string => {
    if (currentLang === 'ne') {
      const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      return num.toLocaleString('en-IN').replace(/[0-9]/g, (d) => devanagariDigits[parseInt(d, 10)]);
    }
    return num.toLocaleString('en-US');
  };

  const handleQuantitySelect = (newQty: number) => {
    setQuantity(newQty);
    setFormData((prev) => ({ ...prev, packageId: `${newQty}-bottles` }));
  };

  const handleStepQuantity = (delta: number) => {
    const nextQty = Math.max(1, quantity + delta);
    handleQuantitySelect(nextQty);
  };

  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  // Strip non-digits for the phone field only
  const sanitizedValue = name === "phoneNumber" ? value.replace(/\D/g, "") : value;

  setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

  if (errors[name]) {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }
};

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = t.errorRequired;
    }

    const cleanPhone = formData.phoneNumber.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phoneNumber = t.errorRequired;
    } else if (!/^(98|97|96|\+977)?[0-9]{8,10}$/.test(cleanPhone)) {
      errs.phoneNumber = t.errorPhone;
    }

    if (!formData.city.trim()) {
      errs.city = t.errorRequired;
    }

    if (!formData.fullAddress.trim()) {
      errs.fullAddress = t.errorRequired;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) {
    const firstError = Object.keys(errors)[0] || 'fullName';
    const el = document.getElementById(firstError);

    if (el) el.focus();

    return;
  }

  setIsSubmitting(true);

  try {
    const randomId = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const currentTierSnapshot: PackageTier = {
      id: `${quantity}-bottles`,
      name: {
        ne: `${formatNumber(quantity)} ${t.bottleUnit}`,
        en: `${quantity} ${t.bottleUnit}`,
      },
      subtitle: {
        ne: `${formatNumber(quantity * 150)} ग्राम`,
        en: `${quantity * 150}g Total`,
      },
      bottles: quantity,
      recommendedFor: {
        ne: 'दैनिक आयुर्वेदिक हेरचाह',
        en: 'Daily आयुर्वेदिक Care',
      },
      originalPrice: currentPricing.originalPrice,
      price: currentPricing.price,
      savings: currentPricing.savings,
    };

    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: randomId,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        landmark: formData.landmark,
        fullAddress: formData.fullAddress,
        quantity: quantity,
        totalPrice: currentPricing.price,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to submit order');
    }

    setGeneratedOrderId(randomId);
    setSubmittedOrder({ ...formData });
    setSubmittedTier(currentTierSnapshot);
    setOrderModalOpen(true);

    setFormData({
      fullName: '',
      phoneNumber: '',
      city: '',
      landmark: '',
      fullAddress: '',
      packageId: '2-bottles',
      deliveryNotes: '',
    });

    setQuantity(2);
    setErrors({});
  } catch (error) {
    console.error('Order submission failed:', error);
    alert('Unable to submit order. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
  // Adapter for SuccessModal
  const selectedTierAdapter: PackageTier = {
    id: `${quantity}-bottles`,
    name: {
      ne: `${formatNumber(quantity)} ${t.bottleUnit}`,
      en: `${quantity} ${t.bottleUnit}`,
    },
    subtitle: {
      ne: `${formatNumber(quantity * 150)} ग्राम`,
      en: `${quantity * 150}g Total`,
    },
    bottles: quantity,
    recommendedFor: {
      ne: 'दैनिक आयुर्वेदिक हेरचाह',
      en: 'Daily Ayurvedic Care',
    },
    originalPrice: currentPricing.originalPrice,
    price: currentPricing.price,
    savings: currentPricing.savings,
  };

  return (
    <section id="order-form" className="py-20 sm:py-28 bg-gradient-to-b from-[#fdfbf7] via-[#f8f2e7] to-[#f2e7d8] relative overflow-hidden">
      {/* Background warm saffron and light orange glow highlights */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#fbdcbd]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fae2ce]/45 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching orderform-1.jpg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#fbe3cb] shadow-2xs">
            <ShoppingCart className="w-3.5 h-3.5 text-[#f15a24]" />
            <span className="text-xs sm:text-[13px] font-bold text-[#f15a24] tracking-wide">
              {t.eyebrow}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e1b18] font-display tracking-tight">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#635a52] max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Checkout Layout (Swapped Sides: Summary on Left, Form on Right) */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
            {/* Left 5 Columns: Order Summary + What Happens Next (orderform-2.jpg) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="lg:col-span-5 space-y-6 lg:sticky lg:top-24"
            >
              {/* Order Summary Card */}
              <div className="bg-[#ffffff] rounded-[28px] p-6 sm:p-7 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.03)] space-y-5">
                {/* Product Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#f15a24] p-1.5 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    <img
                      src={bottleImage}
                      alt="Kidney Stone Churna Bottle"
                      width="64"
                      height="64"
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#8e857c] uppercase tracking-wider block">
                      {t.productSupport}
                    </span>
                    <h4 className="text-base font-bold text-[#1e1b18] leading-tight">
                      {t.productName}
                    </h4>
                    <div className="flex items-center gap-1 text-[#f15a24] text-xs">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <Star className="w-3 h-3 fill-current opacity-80" />
                      <span className="text-[#78716a] text-[11px] ml-1">{t.ratingText}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#f1ede6]" />

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs sm:text-[13px]">
                  <div className="flex justify-between items-center text-[#635a52]">
                    <span>{t.unitPriceLabel}</span>
                    <span className="font-mono font-semibold text-[#1e1b18]">
                      रु. {formatNumber(2000)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#635a52]">
                    <span>{t.selectedQtyLabel}</span>
                    <span className="font-semibold text-[#1e1b18]">
                      {formatNumber(quantity)} {t.bottleUnit}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#235828] font-semibold">
                    <span>{t.savingsLabel}</span>
                    <span className="font-mono">
                      रु. {formatNumber(currentPricing.savings)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#e6dcce]" />

                {/* Grand Total Row */}
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-sm sm:text-base font-bold text-[#1e1b18]">
                    {t.totalLabel}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#f15a24] font-mono">
                    रु. {formatNumber(currentPricing.price)}
                  </span>
                </div>
              </div>

              {/* What Happens After Order Card */}
              <div className="bg-[#ffffff] rounded-[28px] p-6 sm:p-7 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.03)] space-y-4">
                <h4 className="text-sm sm:text-[15px] font-bold text-[#1e1b18]">
                  {t.afterOrderTitle}
                </h4>

                <div className="space-y-3 pt-1">
                  {/* Step 1 */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#e3f6ea] text-[#1c663b] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-[13px] text-[#46533f]">
                      {t.afterOrderStep1}
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#e2f0f7] text-[#2b719b] flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-[13px] text-[#46533f]">
                      {t.afterOrderStep2}
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#fde9de] text-[#ea6427] flex items-center justify-center shrink-0">
                      <Banknote className="w-4 h-4 text-[#ea6427]" />
                    </div>
                    <span className="text-xs sm:text-[13px] text-[#46533f]">
                      {t.afterOrderStep3}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Guarantee Strip */}
              <div className="flex items-center justify-between px-2 pt-1 text-[11px] sm:text-xs text-[#635a52]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#235828]" />
                  <span>{t.trustSecure}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#235828]" />
                  <span>{t.trustDelivery}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#235828]" />
                  <span>{t.trustReturn}</span>
                </div>
              </div>
            </motion.div>

            {/* Right 7 Columns: JOINED SINGLE UNIFIED CARD containing Quantity Selection AND Delivery Details Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="lg:col-span-7"
            >
              <div className="bg-[#ffffff] rounded-[28px] p-6 sm:p-8 border border-[#e6dcce] shadow-[0_2px_8px_rgba(90,70,40,0.03)] space-y-7">
                {/* Part 1: Package / Quantity Selection */}
                <div className="space-y-5">
                  {/* Header with Orange Boxes Icon */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#fde9de] flex items-center justify-center text-[#f15a24]">
                      <Boxes className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1e1b18]">
                      {t.packageHeader}
                    </h3>
                  </div>

                  {/* 4 Quantity Cards in a Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 pt-2">
                    {presetOptions.map((opt) => {
                      const isSelected = quantity === opt.qty;

                      // Badge details
                      let badgeLabel = '';
                      let badgeBg = '';
                      if (opt.badgeType === 'popular') {
                        badgeLabel = t.popularBadge;
                        badgeBg = 'bg-[#f15a24] text-white';
                      } else if (opt.badgeType === 'savings') {
                        badgeLabel = t.savingsBadge;
                        badgeBg = 'bg-[#0e8a8a] text-white';
                      } else if (opt.badgeType === 'bestValue') {
                        badgeLabel = t.bestValueBadge;
                        badgeBg = 'bg-[#156e72] text-white';
                      }

                      return (
                        <motion.div
                          key={opt.qty}
                          onClick={() => handleQuantitySelect(opt.qty)}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          className={`relative rounded-2xl p-3.5 pt-4 pb-4 border cursor-pointer transition-all duration-200 flex flex-col items-center text-center justify-between min-h-[145px] ${
                            isSelected
                              ? 'border-[#f15a24] ring-2 ring-[#f15a24]/20 bg-[#ffffff] shadow-sm'
                              : 'border-[#e6dcce] bg-[#fdfbf7]/60 hover:border-[#d9cbba] hover:bg-[#ffffff]'
                          }`}
                        >
                          {/* Top Badge (if any) */}
                          {badgeLabel && (
                            <div
                              className={`absolute -top-2.5 inset-x-0 mx-auto w-max px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs ${badgeBg}`}
                            >
                              {badgeLabel}
                            </div>
                          )}

                          {/* Top Right Checkmark Badge for Selected Item */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#f15a24] text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}

                          {/* Icon Representation */}
                          <div className="my-1.5 flex items-center justify-center">
                            {opt.qty === 1 && (
                              <div className="w-8 h-8 rounded-lg bg-[#f1ede6] flex items-center justify-center text-[#78716a]">
                                <Box className="w-4 h-4" />
                              </div>
                            )}
                            {opt.qty === 2 && (
                              <div className="w-8 h-8 rounded-lg bg-[#fde9de] flex items-center justify-center text-[#f15a24]">
                                <Boxes className="w-4 h-4" />
                              </div>
                            )}
                            {opt.qty === 3 && (
                              <div className="w-8 h-8 rounded-lg bg-[#e2f3f1] flex items-center justify-center text-[#0e8a8a]">
                                <Layers className="w-4 h-4" />
                              </div>
                            )}
                            {opt.qty === 4 && (
                              <div className="w-8 h-8 rounded-lg bg-[#e2f0f2] flex items-center justify-center text-[#156e72]">
                                <Boxes className="w-4 h-4" />
                              </div>
                            )}
                          </div>

                          {/* Quantity Title */}
                          <span className="text-sm font-bold text-[#1e1b18]">
                            {formatNumber(opt.qty)} {t.bottleUnit}
                          </span>

                          {/* Pricing */}
                          <div className="mt-1">
                            {opt.originalPrice > opt.price && (
                              <span className="text-[11px] text-[#9ca3af] line-through mr-1 font-mono">
                                {formatNumber(opt.originalPrice)}
                              </span>
                            )}
                            <span className="text-xs sm:text-[13px] font-bold text-[#6b5849] font-mono">
                              रु. {formatNumber(opt.price)}
                            </span>
                          </div>

                          {/* Bottom Radio Indicator */}
                          <div className="mt-2.5">
                            {isSelected ? (
                              <div className="w-4 h-4 rounded-full border-2 border-[#f15a24] flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#f15a24]" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-[#d5cbbe]" />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Custom Quantity Adjustment Stepper */}
                  <div className="rounded-2xl bg-[#fbf8f2] border border-[#e6dcce] px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-[#46533f]">
                      <SlidersHorizontal className="w-4 h-4 text-[#78716a]" />
                      <span>{t.customQuantity}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleStepQuantity(-1)}
                        className="w-7 h-7 rounded-full bg-white border border-[#e6dcce] flex items-center justify-center text-[#46533f] hover:border-[#f15a24] hover:text-[#f15a24] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm sm:text-base font-bold text-[#1e1b18] w-5 text-center font-mono">
                        {formatNumber(quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStepQuantity(1)}
                        className="w-7 h-7 rounded-full bg-white border border-[#e6dcce] flex items-center justify-center text-[#46533f] hover:border-[#f15a24] hover:text-[#f15a24] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seamless Divider joining the two sections */}
                <div className="border-t border-[#f1ede6]" />

                {/* Part 2: Delivery Details Form */}
                <div className="space-y-5">
                  {/* Header with Green Truck Icon */}
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#235828]" />
                    <h3 className="text-base sm:text-lg font-bold text-[#1e1b18]">
                      {t.deliveryHeader}
                    </h3>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs sm:text-[13px] font-semibold text-[#1e1b18] block">
                        {t.fullNameLabel}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e857c]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.fullName}
                          placeholder={t.fullNamePlaceholder}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm text-[#1e1b18] bg-[#fbf8f2] focus:bg-white focus:outline-none transition-all placeholder:text-[#a0978e] ${
                            errors.fullName
                              ? 'border-[#d74428] focus:ring-2 focus:ring-[#d74428]/20'
                              : 'border-[#e6dcce] focus:border-[#f15a24] focus:ring-2 focus:ring-[#f15a24]/20'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-xs text-[#d74428] flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone & City Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <label htmlFor="phoneNumber" className="text-xs sm:text-[13px] font-semibold text-[#1e1b18] block">
                          {t.phoneLabel}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e857c]">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            id="phoneNumber"
                             maxLength={10}
                             inputMode="numeric"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            autoComplete="tel"
                            aria-required="true"
                            aria-invalid={!!errors.phoneNumber}
                            placeholder={t.phonePlaceholder}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm text-[#1e1b18] bg-[#fbf8f2] focus:bg-white focus:outline-none transition-all placeholder:text-[#a0978e] ${
                              errors.phoneNumber
                                ? 'border-[#d74428] focus:ring-2 focus:ring-[#d74428]/20'
                              : 'border-[#e6dcce] focus:border-[#f15a24] focus:ring-2 focus:ring-[#f15a24]/20'
                            }`}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-xs text-[#d74428] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div className="space-y-1.5">
                        <label htmlFor="city" className="text-xs sm:text-[13px] font-semibold text-[#1e1b18] block">
                          {t.cityLabel}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e857c]">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            autoComplete="address-level2"
                            aria-required="true"
                            aria-invalid={!!errors.city}
                            placeholder={t.cityPlaceholder}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm text-[#1e1b18] bg-[#fbf8f2] focus:bg-white focus:outline-none transition-all placeholder:text-[#a0978e] ${
                              errors.city
                                ? 'border-[#d74428] focus:ring-2 focus:ring-[#d74428]/20'
                                : 'border-[#e6dcce] focus:border-[#f15a24] focus:ring-2 focus:ring-[#f15a24]/20'
                            }`}
                          />
                        </div>
                        {errors.city && (
                          <p className="text-xs text-[#d74428] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Landmark */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="landmark" className="text-xs sm:text-[13px] font-semibold text-[#1e1b18]">
                          {t.landmarkLabel}
                        </label>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f1ede6] text-[#78716a] font-normal">
                          {t.landmarkOptional}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e857c]">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="landmark"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          autoComplete="address-line2"
                          placeholder={t.landmarkPlaceholder}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e6dcce] text-xs sm:text-sm text-[#1e1b18] bg-[#fbf8f2] focus:bg-white focus:border-[#f15a24] focus:ring-2 focus:ring-[#f15a24]/20 focus:outline-none transition-all placeholder:text-[#a0978e]"
                        />
                      </div>
                    </div>

                    {/* Full Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullAddress" className="text-xs sm:text-[13px] font-semibold text-[#1e1b18] block">
                        {t.addressLabel}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e857c]">
                          <Home className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="fullAddress"
                          name="fullAddress"
                          value={formData.fullAddress}
                          onChange={handleInputChange}
                          autoComplete="street-address"
                          aria-required="true"
                          aria-invalid={!!errors.fullAddress}
                          placeholder={t.addressPlaceholder}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm text-[#1e1b18] bg-[#fbf8f2] focus:bg-white focus:outline-none transition-all placeholder:text-[#a0978e] ${
                            errors.fullAddress
                              ? 'border-[#d74428] focus:ring-2 focus:ring-[#d74428]/20'
                              : 'border-[#e6dcce] focus:border-[#f15a24] focus:ring-2 focus:ring-[#f15a24]/20'
                          }`}
                        />
                      </div>
                      {errors.fullAddress && (
                        <p className="text-xs text-[#d74428] flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.fullAddress}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cash on Delivery Highlight Banner */}
                  <div className="rounded-2xl bg-[#effaf4] border border-[#c6eed5] px-4 py-3 flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1c663b] font-medium">
                    <Banknote className="w-4 h-4 shrink-0 text-[#1c663b]" />
                    <span>{t.codBanner}</span>
                  </div>

                  {/* Large Orange Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f15a24] to-[#f5742a] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#f15a24]/30 hover:from-[#e04f1a] hover:to-[#e8661d] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? currentLang === 'ne'
                          ? 'अर्डर पठाउँदै...'
                          : 'Submitting Order...'
                        : `${t.submitBtn} — रु. ${formatNumber(currentPricing.price)} →`}
                    </span>
                  </motion.button>

                  {/* Privacy Assurance */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#635a52]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#235828]" />
                    <span>{t.privacyAssurance}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <SuccessModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        orderData={submittedOrder}
        selectedTier={submittedTier || selectedTierAdapter}
        currentLang={currentLang}
        orderId={generatedOrderId}
      />
    </section>
  );
};
