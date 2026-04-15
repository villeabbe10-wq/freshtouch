
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GalleryItem, PricingItem } from '../types';
import { GALLERY_ITEMS, INITIAL_PRICING_DATA } from '../constants';

interface DataContextType {
  galleryItems: GalleryItem[];
  pricingItems: PricingItem[];
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  addPricingItem: (item: PricingItem) => void;
  deletePricingItem: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage or Constants
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('fte_gallery_items');
    return saved ? JSON.parse(saved) : GALLERY_ITEMS;
  });

  const [pricingItems, setPricingItems] = useState<PricingItem[]>(() => {
    const saved = localStorage.getItem('fte_pricing_items');
    return saved ? JSON.parse(saved) : INITIAL_PRICING_DATA;
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('fte_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('fte_pricing_items', JSON.stringify(pricingItems));
  }, [pricingItems]);

  // Actions
  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems(prev => [item, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  const addPricingItem = (item: PricingItem) => {
    setPricingItems(prev => [...prev, item]);
  };

  const deletePricingItem = (id: string) => {
    setPricingItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <DataContext.Provider value={{
      galleryItems,
      pricingItems,
      addGalleryItem,
      deleteGalleryItem,
      addPricingItem,
      deletePricingItem
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
