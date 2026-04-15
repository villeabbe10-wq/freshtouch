
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Search, Phone } from 'lucide-react';
import { useData } from '../context/DataContext';

interface PricingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingListModal: React.FC<PricingListModalProps> = ({ isOpen, onClose }) => {
  const { pricingItems } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = pricingItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col rounded-sm"
          >
            {/* Header */}
            <div className="bg-primary-dark text-white p-6 md:p-8 text-center relative flex-shrink-0">
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-primary-gold">Nos Tarifs de Location</h2>
              <p className="font-sans text-sm text-gray-300 max-w-md mx-auto">
                Tous nos prix sont indiqués pour une journée de location.
              </p>
            </div>

            {/* Search Bar */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
               <div className="relative">
                 <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                    type="text" 
                    placeholder="Rechercher un article (ex: nappe, verre...)" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-primary-gold outline-none rounded-sm bg-white font-sans text-sm shadow-sm"
                    autoFocus
                 />
               </div>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-white">
              {filteredItems.length > 0 ? (
                <div className="border border-gray-200 rounded-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-primary-cream border-b border-gray-200">
                        <th className="py-4 px-6 font-serif text-primary-dark font-bold uppercase tracking-wider text-sm">Désignations</th>
                        <th className="py-4 px-6 font-serif text-primary-dark font-bold uppercase tracking-wider text-sm text-right">Prix Unitaire</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredItems.map((item, index) => (
                        <tr key={index} className="hover:bg-primary-cream/30 transition-colors">
                          <td className="py-3 px-6 font-sans text-sm text-gray-700">
                            {item.name}
                            <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-1">{item.category}</span>
                          </td>
                          <td className="py-3 px-6 font-sans text-sm font-bold text-primary-gold text-right whitespace-nowrap">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 font-sans">
                   Aucun article trouvé pour "{searchTerm}"
                </div>
              )}

              <div className="mt-8 flex items-start gap-3 bg-blue-50/50 p-4 border border-blue-100 rounded-sm">
                <Info size={20} className="text-primary-dark mt-0.5 flex-shrink-0" />
                <p className="font-sans text-sm text-gray-700">
                  <span className="font-bold text-primary-dark">Note :</span> Pour la location de matériels, une caution est exigée ainsi qu'une pièce d'identité valide.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-primary-cream p-4 md:p-6 border-t border-primary-gold/20 flex-shrink-0 flex flex-col md:flex-row gap-4 justify-between items-center">
               <p className="font-serif text-primary-gold font-bold italic text-sm md:text-base hidden md:block">
                 Besoin d'un devis personnalisé ?
               </p>
               <a href="tel:+22891979514" className="w-full md:w-auto">
                 <button className="w-full px-6 py-3 bg-primary-gold text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 rounded-sm shadow-md">
                   <Phone size={16} /> Appeler pour réserver
                 </button>
               </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
