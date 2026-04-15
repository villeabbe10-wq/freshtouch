
import React from 'react';
import { SectionTitle, FadeIn } from '../components/ui/Common';
import { REALIZATIONS } from '../constants';
import { MapPin, Sparkles, Box, Quote } from 'lucide-react';

const RealisationsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-primary-cream">
      <div className="container mx-auto px-6">
        <SectionTitle 
          subtitle="Réalisations" 
          title="Découvrez comment nous avons sublimé ces événements exceptionnels" 
        />
        
        <div className="space-y-20 mt-16">
          {REALIZATIONS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <FadeIn key={project.id} delay={idx * 0.1}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-start`}>
                  
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 relative group overflow-hidden shadow-2xl">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none" />
                  </div>

                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 space-y-8 py-4">
                    <h3 className="font-serif text-3xl md:text-4xl text-primary-dark font-medium leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-gold shadow-sm flex-shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg mb-1 text-primary-dark">Lieu</h4>
                          <p className="font-sans text-gray-600 leading-relaxed">{project.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-gold shadow-sm flex-shrink-0">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg mb-1 text-primary-dark">Ambiance</h4>
                          <p className="font-sans text-gray-600 leading-relaxed">{project.ambiance}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-gold shadow-sm flex-shrink-0">
                          <Box size={20} />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg mb-1 text-primary-dark">Éléments loués</h4>
                          <p className="font-sans text-gray-600 leading-relaxed">{project.rentedElements}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 border-l-4 border-primary-gold shadow-sm mt-8 relative">
                      <Quote size={32} className="absolute top-4 right-4 text-primary-cream" />
                      <p className="font-serif italic text-lg text-gray-600 relative z-10">
                        "{project.testimonial}"
                      </p>
                    </div>

                  </div>
                </div>
                
                {/* Divider unless last item */}
                {idx !== REALIZATIONS.length - 1 && (
                  <div className="w-full h-px bg-primary-gold/20 my-20 mx-auto max-w-4xl" />
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RealisationsPage;
