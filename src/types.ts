export type Language = 'ne' | 'en';

export interface PackageTier {
  id: string;
  name: {
    ne: string;
    en: string;
  };
  subtitle: {
    ne: string;
    en: string;
  };
  bottles: number;
  price: number;
  originalPrice: number;
  savings: number;
  badge?: {
    ne: string;
    en: string;
  };
  freeGift?: {
    ne: string;
    en: string;
  };
  recommendedFor: {
    ne: string;
    en: string;
  };
}

export interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  city: string;
  landmark: string;
  fullAddress: string;
  packageId: string;
  deliveryNotes?: string;
}
