
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle, Button, FadeIn } from '../components/ui/Common';
import { SERVICES } from '../constants';
import { ServiceItem } from '../types';
import { Check, X, Crown, Flower, Table, Star, Heart, ShieldCheck, Gem, Palette, ArrowRight } from 'lucide-react';
import { PricingListModal } from '../components/PricingListModal';
import { NavLink } from 'react-router-dom';

const iconMap = {
  crown: Crown,
  flower: Flower,
  table: Table,
  star: Star
};

const PriceModal: React.FC<{ service: ServiceItem | null; onClose: () => void }> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-primary-cream w-full max-w-lg relative z-10 p-8 md:p-10 shadow-2xl border border-primary-gold rounded-sm max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-primary-dark hover:text-primary-gold transition-colors p-2">
          <X size={24} />
        </button>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-primary-gold mb-6 shadow-sm border border-primary-gold/20">
             {(() => {
                const Icon = iconMap[service.icon];
                return <Icon size={32} />;
             })()}
          </div>
          <h3 className="font-serif text-3xl font-bold mb-3">{service.title}</h3>
          <p className="text-primary-gold font-sans font-bold uppercase tracking-widest text-sm bg-white inline-block px-4 py-1 rounded-full border border-primary-gold/20">À partir de {service.priceStart}</p>
        </div>

        <div className="space-y-6 mb-10">
          <p className="text-gray-600 font-sans text-center text-lg leading-relaxed">{service.description}</p>
          <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
            <h4 className="font-serif font-bold mb-6 border-b border-gray-100 pb-3 text-center text-primary-dark uppercase tracking-widest text-sm">Ce qui est inclus</h4>
            <ul className="space-y-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-sans text-gray-600">
                  <Check size={18} className="text-primary-green flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
            <NavLink to="/contact" className="w-full">
                <Button className="w-full">Demander un devis</Button>
            </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Palette,
      title: "Un service sur mesure",
      text: "Chaque événement est unique, chaque détail compte. Nous créons des expériences personnalisées qui reflètent votre style."
    },
    {
      icon: Gem,
      title: "Des articles sélectionnés avec soin",
      text: "Qualité, élégance et hygiène irréprochable. Chaque pièce est choisie pour son raffinement et sa durabilité."
    },
    {
      icon: Heart,
      title: "Une équipe passionnée",
      text: "À l'écoute, créative et réactive. Nous mettons tout en œuvre pour transformer votre vision en réalité."
    },
    {
      icon: ShieldCheck,
      title: "Fiabilité et professionnalisme",
      text: "Ponctualité, rigueur et respect des engagements pour une prestation sans souci."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <SectionTitle title="Pourquoi choisir Fresh Touch Event?" subtitle="Notre Engagement" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16">
          {reasons.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="text-center group p-8 rounded-sm hover:bg-primary-cream transition-colors duration-500 border border-transparent hover:border-primary-gold/20">
              <div className="w-20 h-20 mx-auto bg-primary-cream rounded-full flex items-center justify-center text-primary-gold mb-8 group-hover:bg-primary-gold group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:-translate-y-1">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4 text-primary-dark">{item.title}</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed px-2">
                {item.text}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  return (
    <div className="bg-primary-cream">
      {/* Header Spacer */}
      <div className="h-24 bg-primary-cream" />
      
      {/* Services Section */}
      <div className="py-20 md:py-24 min-h-screen">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Nos Prestations" title="Découvrez l'ensemble de nos prestations pour des événements mémorables" />
          
          <div className="grid md:grid-cols-2 gap-10 mt-20 max-w-6xl mx-auto">
            {SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <FadeIn key={service.id} delay={index * 0.1}>
                  <div className="group bg-white p-10 md:p-12 h-full border border-transparent hover:border-primary-gold/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col rounded-sm">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                      <Icon size={160} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 bg-primary-cream rounded-full flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-white transition-colors duration-500 shadow-inner">
                            <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary-gold bg-primary-cream px-3 py-1 rounded-full">{service.priceStart}</span>
                      </div>
                      
                      <h3 className="font-serif text-3xl font-bold mb-6 group-hover:text-primary-gold transition-colors">
                        {service.title}
                      </h3>
                      
                      {/* Features List Preview */}
                      <ul className="space-y-4 mb-10 flex-grow">
                        {service.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-sans group-hover:text-gray-900 transition-colors">
                            <div className="mt-1.5 w-1.5 h-1.5 bg-primary-gold rounded-full flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center group-hover:border-primary-gold/20 transition-colors">
                        <button 
                          onClick={() => setSelectedService(service)}
                          className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-primary-dark group-hover:text-primary-gold transition-colors"
                        >
                          Détails du service <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <div className="mt-24 text-center bg-white p-12 shadow-sm border border-gray-100 rounded-sm max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl mb-4 text-primary-dark">Vous cherchez un tarif spécifique ?</h3>
            <p className="font-sans text-gray-600 mb-8 max-w-lg mx-auto">Consultez notre grille tarifaire complète pour tous nos articles de location à l'unité.</p>
            <Button variant="primary" onClick={() => setShowPricing(true)} className="shadow-xl">Voir la Grille Tarifaire Complète</Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      <AnimatePresence>
        {selectedService && (
          <PriceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
      
      <PricingListModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
};

export default ServicesPage;
