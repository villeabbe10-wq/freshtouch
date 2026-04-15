
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionTitle, Button, FadeIn } from '../components/ui/Common';
import { SERVICES, TESTIMONIALS } from '../constants';
import { Star, Crown, Table, Flower } from 'lucide-react';
import { useData } from '../context/DataContext';

const iconMap = {
  crown: Crown,
  flower: Flower,
  table: Table,
  star: Star
};

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Table Setting Lomé" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-md"
        >
          Fresh Touch Event <br/> <span className="font-light italic text-primary-gold">Votre Élégance de Table</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-lg md:text-xl text-gray-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-sm"
        >
          Location de vaisselle, couverts et décoration de table haut de gamme pour vos événements d'exception
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <NavLink to="/gallery">
            <button className="w-full sm:w-auto bg-primary-gold text-white px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-primary-dark transition-all duration-300 shadow-xl rounded-sm border border-primary-gold">
              Découvrir le Portfolio
            </button>
          </NavLink>
          <NavLink to="/contact">
             <button className="w-full sm:w-auto bg-transparent text-white border border-white px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-primary-dark transition-all duration-300 shadow-lg rounded-sm backdrop-blur-sm">
              Demander un devis
            </button>
          </NavLink>
        </motion.div>
      </div>
    </section>
  );
};

const Presentation: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-primary-cream">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-primary-dark mb-4 leading-tight">Présentation – Fresh Touch Event</h2>
            <p className="font-serif text-xl md:text-2xl italic text-primary-gold mb-12 font-medium">"L'art de recevoir, sublimé."</p>
            
            <div className="font-sans text-gray-600 leading-loose space-y-8 text-lg">
              <p>
                Chez Fresh Touch Event, chaque table est une scène, chaque détail une émotion. Basée à Lomé, notre entreprise est spécialisée dans la location de vaisselle, couverts, linge de table et décoration événementielle. Nous accompagnons particuliers et professionnels dans la création d'ambiances élégantes, chaleureuses et inoubliables.
              </p>
              <p>
                Que ce soit pour un mariage intimiste, un dîner d'entreprise ou une célébration familiale, nous croyons que la beauté se cache dans les détails. Notre mission: transformer vos événements en expériences sensorielles, où chaque invité se sent attendu, choyé, émerveillé.
              </p>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.3} className="mt-20 text-center">
          <div className="inline-block border border-primary-gold p-6 px-10 bg-white shadow-sm">
             <span className="font-serif text-2xl md:text-4xl font-bold tracking-tighter text-primary-dark">
              Fresh Touch <span className="text-primary-gold">Event</span>
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const RealizationsPreview: React.FC = () => {
  const { realizations } = useData();
  
  // Take the first 6 realizations for the preview
  const previewImages = realizations.slice(0, 6).map(r => ({
    src: r.imageUrl,
    alt: r.title
  }));

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Un aperçu de notre univers créatif" title="Quelques Réalisations" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 mb-16">
          {previewImages.map((img, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="relative group overflow-hidden aspect-square shadow-md cursor-pointer">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary-gold/20 group-hover:bg-transparent transition-colors duration-500" />
            </FadeIn>
          ))}
        </div>

        <div className="text-center">
          <NavLink to="/gallery">
            <Button variant="outline" className="min-w-[200px]">Voir tout notre portfolio</Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

const Expertise: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-primary-cream relative overflow-hidden">
      {/* Abstract Background Shape */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Découvrez nos spécialités pour sublimer vos événements" title="Nos Domaines d'Expertise" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {SERVICES.map((service, idx) => {
             const Icon = iconMap[service.icon];
             return (
              <FadeIn key={service.id} delay={idx * 0.1} className="bg-white p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-primary-gold/30 rounded-sm flex flex-col items-center">
                <div className="w-20 h-20 mx-auto bg-primary-cream rounded-full flex items-center justify-center text-primary-gold mb-8 shadow-inner">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-4 text-primary-dark">{service.title}</h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="w-12 h-0.5 bg-primary-gold/50" />
              </FadeIn>
             );
          })}
        </div>

        <div className="text-center mt-16">
          <NavLink to="/services">
            <Button className="min-w-[200px]">Découvrir tous nos services</Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

const TestimonialSection: React.FC = () => {
  const { testimonials } = useData();
  const t = testimonials[0];
  if (!t) return null;

  return (
    <section className="py-24 bg-primary-green relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-3/4 h-full opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200" 
          alt="Decoration Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary-green to-primary-green" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
             <div className="flex justify-center mb-10 text-primary-gold space-x-2">
               {[...Array(t.rating)].map((_, i) => <Star key={i} size={28} fill="currentColor" strokeWidth={0} />)}
             </div>
             <blockquote className="text-center">
               <p className="font-serif text-xl md:text-3xl italic text-primary-cream leading-normal mb-12 font-light">
                 "{t.content}"
               </p>
               <footer className="text-center">
                 <div className="font-sans font-bold uppercase tracking-[0.2em] text-white text-lg border-b border-primary-gold inline-block pb-2">{t.name}</div>
                 <div className="text-xs text-primary-gold uppercase tracking-widest mt-2">{t.role}</div>
               </footer>
             </blockquote>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const BrandQuote: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-primary-gold/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn className="flex flex-col items-center text-center">
          {/* Decorative Image */}
          <div className="relative">
             <div className="absolute -inset-6 border border-primary-gold/30 rotate-3 z-0"></div>
             <img 
               src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800" 
               alt="Fresh Touch Detail" 
               className="relative z-10 w-full max-w-lg h-72 md:h-96 object-cover shadow-2xl grayscale-[10%] hover:grayscale-0 transition-all duration-700"
             />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Presentation />
      <RealizationsPreview />
      <Expertise />
      <TestimonialSection />
      <BrandQuote />
    </main>
  );
};

export default HomePage;
