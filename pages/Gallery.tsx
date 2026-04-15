
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle, FadeIn } from '../components/ui/Common';
import { useData } from '../context/DataContext';
import { Category, GalleryItem } from '../types';
import { X, ZoomIn, Play, Search } from 'lucide-react';

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Tout', value: 'all' },
  { label: 'Mariage', value: 'mariage' },
  { label: 'Gala', value: 'gala' },
  { label: 'Bohème', value: 'bohème' },
  { label: 'Moderne', value: 'moderne' },
  { label: 'Classique', value: 'classique' },
  { label: 'Fleurs', value: 'fleurs' },
  { label: 'Verrerie', value: 'verre' },
  { label: 'Serviettes', value: 'serviette' },
  { label: 'Plats', value: 'plats' },
  { label: 'Tables & Chaises', value: 'tables_chaises' },
];

const VideoSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-primary-dark relative overflow-hidden text-white">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Vidéo de Présentation" title="Découvrez notre univers en vidéo" dark />
        
        <FadeIn className="max-w-4xl mx-auto mt-8 relative group cursor-pointer aspect-video rounded-sm overflow-hidden shadow-2xl border border-primary-gold/30">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" 
            alt="Video Cover" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary-gold/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300 shadow-glow">
              <Play size={32} fill="white" className="text-white" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">L'Art de Recevoir par Fresh Touch Event</h3>
            <p className="font-sans text-sm text-gray-300">Plongez au cœur de nos plus belles créations</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Lightbox: React.FC<{ item: GalleryItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
        <X size={32} />
      </button>
      
      <div 
        className="max-w-5xl max-h-[85vh] relative" 
        onClick={e => e.stopPropagation()}
      >
        <motion.img 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={item.imageUrl} 
          alt={item.title} 
          className="max-w-full max-h-[80vh] object-contain shadow-2xl"
        />
        <div className="mt-4 text-center">
          <h3 className="font-serif text-2xl text-white mb-1">{item.title}</h3>
          <p className="font-sans text-primary-gold uppercase text-xs tracking-widest">{item.category}</p>
          <p className="font-sans text-gray-300 text-sm mt-2">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { galleryItems } = useData();

  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, galleryItems, searchTerm]);

  return (
    <div className="bg-primary-cream">
      {/* Header Spacer */}
      <div className="h-24 bg-primary-cream" />
      
      <VideoSection />

      <div className="py-20 md:py-24 min-h-screen">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Explorez nos plus belles réalisations par catégorie" title="Notre Portfolio Complet" />
          
          {/* Controls Container */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
            
            {/* Search Bar */}
            <div className="relative w-full md:max-w-xs">
              <input 
                type="text" 
                placeholder="Rechercher (ex: or, fleur...)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-primary-gold outline-none rounded-sm bg-white font-sans text-sm shadow-sm"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Scrollable Filters */}
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex flex-nowrap md:flex-wrap md:justify-end gap-3 min-w-max px-2 md:px-0 pb-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-5 py-2.5 text-xs font-sans tracking-widest uppercase transition-all duration-300 border rounded-sm
                      ${activeCategory === cat.value 
                        ? 'bg-primary-gold border-primary-gold text-white shadow-md' 
                        : 'border-gray-200 text-gray-500 hover:border-primary-gold hover:text-primary-gold bg-white'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-square overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                    <span className="text-primary-gold text-[10px] font-sans tracking-[0.2em] uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150 leading-tight">
                      {item.title}
                    </h3>
                    <div className="mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                      <ZoomIn size={24} className="text-white/80 hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
             <div className="text-center py-24 bg-white/50 rounded-lg border border-dashed border-gray-300">
               <p className="text-gray-400 font-sans mb-2">Aucun élément ne correspond à votre recherche.</p>
               <button onClick={() => {setSearchTerm(''); setActiveCategory('all')}} className="text-primary-gold underline text-sm">Réinitialiser les filtres</button>
             </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
