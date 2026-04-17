
export type Category = 
  | 'all' 
  | 'mariage' 
  | 'gala' 
  | 'entreprise' 
  | 'anniversaire' 
  | 'bohème' 
  | 'moderne' 
  | 'classique' 
  | 'fleurs' 
  | 'verre' 
  | 'serviette' 
  | 'plats' 
  | 'tables_chaises';

export interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  imageUrl: string;
  description: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string; // YouTube or Vimeo URL
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceStart: string;
  features: string[];
  icon: 'star' | 'flower' | 'table' | 'crown';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Realization {
  id: string;
  title: string;
  location: string;
  ambiance: string;
  rentedElements: string;
  testimonial: string;
  imageUrl: string;
}

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  category: 'Vaisselle' | 'Linge de table' | 'Décoration' | 'Mobilier' | 'Autre';
}
