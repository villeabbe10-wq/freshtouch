
import React from 'react';
import { SectionTitle, FadeIn } from '../components/ui/Common';
import { Star, Check, Heart } from 'lucide-react';
import { useData } from '../context/DataContext';

const AboutPage: React.FC = () => {
  const { settings } = useData();
  const defaultPhoto = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="pt-32 pb-24 min-h-screen bg-primary-cream">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="La Fondatrice" title="À Propos de Marceline AYITE" />
        
        {/* Quote */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-serif text-xl md:text-2xl italic text-primary-gold leading-relaxed">
            "Chaque table mérite sa propre poésie."
          </p>
        </FadeIn>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
           {/* Image */}
           <FadeIn className="relative">
             <div className="relative z-10">
               <img 
                 src={settings.aboutPhotoUrl || defaultPhoto} 
                 alt="Marceline AYITE" 
                 className="w-full aspect-[3/4] object-cover shadow-2xl rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-xl border border-primary-gold/20 hidden md:block">
                  <span className="font-serif text-4xl text-primary-gold block">100%</span>
                  <span className="text-xs uppercase tracking-widest text-gray-500">Passion & Dévouement</span>
               </div>
             </div>
             <div className="absolute top-8 left-8 w-full h-full border-2 border-primary-gold/30 z-0" />
           </FadeIn>

           {/* Text */}
           <FadeIn delay={0.2} className="space-y-6">
             <div className="font-sans text-gray-600 leading-relaxed space-y-6 text-lg">
                <p>
                  Je m'appelle <strong>Marceline AYITE</strong>, fondatrice de Fresh Touch Event, une entreprise née d'un amour profond pour l'art de recevoir et la beauté des détails. Depuis toujours, j'ai été fascinée par les ambiances chaleureuses, les tables soigneusement dressées, et les sourires que provoque une décoration bien pensée.
                </p>
                <p>
                  Fresh Touch Event est bien plus qu'un service de location de vaisselle — c'est une invitation à célébrer avec style, à transformer chaque repas en moment mémorable, et à faire de chaque événement une œuvre d'art.
                </p>
                
                <h3 className="font-serif text-2xl text-primary-dark pt-4">Mon histoire</h3>
                <p>
                  Tout a commencé à <strong>Lomé</strong>, par une passion pour le beau et le raffinement. J'ai compris que l'élégance pouvait être partagée, et que j'avais le pouvoir d'en faire mon métier. C'est ainsi qu'est né Fresh Touch Event — avec une mission simple: offrir aux autres ce que j'aime créer.
                </p>
                <p>
                  Aujourd'hui, nous accompagnons nos clients dans la création d'ambiances uniques, que ce soit pour un mariage prestigieux, un dîner intime ou un événement d'entreprise. Notre engagement reste le même : l'excellence dans chaque détail.
                </p>
             </div>
           </FadeIn>
        </div>

        {/* Offerings & Philosophy Grid */}
        <div className="grid md:grid-cols-2 gap-12">
            
            {/* Ce que je propose */}
            <FadeIn delay={0.3} className="bg-white p-10 border-t-4 border-primary-gold shadow-sm h-full">
                <h3 className="font-serif text-2xl text-primary-dark mb-6 flex items-center gap-3">
                    <Star className="text-primary-gold" size={24} /> Ce que je propose
                </h3>
                <ul className="space-y-4 mb-8">
                    {[
                        "Location de couverts et vaisselle haut de gamme",
                        "Décoration de table sur mesure",
                        "Conseils personnalisés pour vos événements",
                        "Ambiances élégantes, bohèmes ou modernes selon vos envies"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 font-sans">
                            <Check size={18} className="text-primary-sage mt-1 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto">
                  <p className="text-gray-500 italic font-serif border-l-2 border-primary-gold/30 pl-4">
                      "Chaque prestation est pensée avec soin, chaque détail est choisi avec amour. Mon objectif: que vous vous sentiez fier(e) de recevoir, et que vos invités se souviennent de votre table autant que de votre sourire."
                  </p>
                </div>
            </FadeIn>

            {/* Ma philosophie */}
            <FadeIn delay={0.4} className="bg-primary-dark p-10 text-white relative overflow-hidden h-full">
                <div className="relative z-10">
                    <h3 className="font-serif text-2xl text-primary-gold mb-6 flex items-center gap-3">
                        <Heart className="text-primary-gold" size={24} /> Ma philosophie
                    </h3>
                    <p className="text-gray-300 mb-8 font-sans leading-relaxed">
                        Chez Fresh Touch Event, l'élégance est accessible, la beauté est intentionnelle, et chaque client est unique. Je crois que les plus beaux souvenirs naissent autour d'une table, et je suis là pour les sublimer.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "L'élégance est accessible à tous",
                            "La beauté naît de l'intentionnalité",
                            "Chaque client mérite une expérience unique",
                            "L'excellence est dans les détails"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-primary-cream font-serif text-lg">
                                <span className="w-1.5 h-1.5 bg-primary-gold rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/10 rounded-full blur-3xl -mr-10 -mt-10" />
            </FadeIn>

        </div>

      </div>
    </div>
  );
};

export default AboutPage;
