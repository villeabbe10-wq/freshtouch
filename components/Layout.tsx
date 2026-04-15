
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

// --- Animations Variants ---
// ... (previous code remains same)
const menuVariants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as const,
    }
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as const,
    }
  }
};

const navListVariants = {
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const linkVariants = {
  closed: { opacity: 0, y: -30 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useData();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change & handle body scroll lock
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b 
        ${scrolled 
          ? 'bg-primary-cream/90 backdrop-blur-md py-3 shadow-sm border-primary-gold/20' 
          : 'bg-transparent py-5 md:py-6 border-transparent'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        
        {/* Logo Image Integration */}
        <NavLink to="/" className="group relative z-50 flex items-center gap-2" aria-label="Fresh Touch Event Accueil">
             {settings.logoUrl ? (
               <img 
                 src={settings.logoUrl} 
                 alt="Fresh Touch Event" 
                 className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
               />
             ) : (
               <img 
                 src="/logo.png" 
                 alt="Fresh Touch Event" 
                 className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
                 onError={(e) => {
                   // Fallback textuel si l'image n'est pas trouvée
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
                 }}
               />
             )}
             
             {/* Fallback (Texte) caché par défaut, s'affiche si l'image plante */}
             <div className={`${settings.logoUrl ? 'hidden' : 'hidden'} flex-col items-start pl-2 border-l border-primary-gold/50 ml-2`}>
               <span className={`font-serif text-xl md:text-2xl font-bold tracking-tight text-primary-dark leading-none`}>
                Fresh Touch
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-primary-gold pl-0.5 leading-none mt-1">
                Event
              </span>
             </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-8">
          {NAVIGATION_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-bold tracking-widest uppercase relative py-2 group
                ${isActive ? 'text-primary-gold' : 'text-primary-dark hover:text-primary-gold'} 
                transition-colors duration-300`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}
          
          <div className="h-4 w-px bg-primary-gold/30 mx-2" />

          <div className="flex items-center gap-2 text-primary-dark">
             <Phone size={14} className="text-primary-gold" />
             <span className="text-xs font-bold tracking-widest">00228 91 97 95 14</span>
          </div>

          <NavLink to="/contact">
            <button className="px-6 py-2.5 bg-primary-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-gold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-transparent hover:border-primary-gold">
              Contactez-nous
            </button>
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="xl:hidden z-50 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-primary-gold/20 shadow-sm hover:bg-primary-gold/10 transition-colors active:scale-95"
          aria-label="Toggle menu"
        >
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="text-primary-dark"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-primary-cream/98 backdrop-blur-xl z-40 flex flex-col justify-center items-center h-screen w-screen overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <motion.nav 
              variants={navListVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center space-y-6 w-full max-w-sm px-6 relative z-10"
            >
              {NAVIGATION_LINKS.map((link) => (
                <motion.div key={link.path} variants={linkVariants} className="w-full text-center">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block text-xl md:text-2xl font-serif font-medium transition-all duration-300 py-2
                      ${isActive 
                        ? 'text-primary-gold scale-105' 
                        : 'text-primary-dark hover:text-primary-gold hover:scale-105'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div 
                variants={linkVariants}
                className="w-24 h-px bg-primary-gold/30 my-8"
              />

              <motion.div variants={linkVariants} className="flex flex-col items-center gap-8 w-full">
                <a href="tel:+22891979514" className="flex items-center gap-3 text-primary-dark hover:text-primary-gold transition-colors group p-2">
                  <div className="w-10 h-10 rounded-full border border-primary-gold/30 flex items-center justify-center group-hover:bg-primary-gold group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <span className="text-lg font-serif">00228 91 97 95 14</span>
                </a>

                <NavLink to="/contact" className="w-full max-w-xs">
                  <button className="w-full py-4 bg-primary-gold text-white font-bold uppercase tracking-widest text-sm shadow-xl hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2 rounded-sm">
                    Contactez-nous <ChevronRight size={16} />
                  </button>
                </NavLink>

                {/* Socials Mobile */}
                <div className="flex gap-8 mt-2">
                  <a href="#" className="text-gray-400 hover:text-primary-gold transition-colors p-2"><Instagram size={24} /></a>
                  <a href="#" className="text-gray-400 hover:text-primary-gold transition-colors p-2"><Facebook size={24} /></a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer: React.FC = () => {
  const { settings } = useData();
  return (
    <footer className="bg-primary-green text-white border-t border-primary-gold/30 relative overflow-hidden">
      
      {/* 2. Main Content Grid */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand & Socials - Col Span 4 */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            <div>
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-16 w-auto object-contain mb-6 brightness-0 invert" />
              ) : (
                <h2 className="font-serif text-2xl font-bold text-white tracking-widest uppercase mb-4">Fresh Touch Event</h2>
              )}
              <p className="text-gray-200 text-sm leading-relaxed max-w-sm font-sans opacity-80">
                Votre partenaire privilégié pour la location de vaisselle et la décoration événementielle à Lomé. Créez des souvenirs inoubliables avec une touche d'élégance unique.
              </p>
            </div>
            <div className="flex space-x-4">
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-white transition-all duration-300 border border-transparent hover:border-primary-cream">
                  <Instagram size={18} />
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-white transition-all duration-300 border border-transparent hover:border-primary-cream">
                  <Facebook size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation - Col Span 3 */}
          <div className="md:col-span-2 lg:col-start-6">
            <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-primary-gold mb-8">Explorateur</h3>
            <ul className="space-y-4 font-sans text-sm text-gray-300 opacity-80">
              <li><NavLink to="/" className="hover:text-white hover:opacity-100 transition-all block py-1 hover:translate-x-1 duration-300">Accueil</NavLink></li>
              <li><NavLink to="/services" className="hover:text-white hover:opacity-100 transition-all block py-1 hover:translate-x-1 duration-300">Services</NavLink></li>
              <li><NavLink to="/gallery" className="hover:text-white hover:opacity-100 transition-all block py-1 hover:translate-x-1 duration-300">Portfolio</NavLink></li>
              <li><NavLink to="/about" className="hover:text-white hover:opacity-100 transition-all block py-1 hover:translate-x-1 duration-300">À Propos</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-white hover:opacity-100 transition-all block py-1 hover:translate-x-1 duration-300">Contact</NavLink></li>
            </ul>
          </div>

          {/* Contact - Col Span 5 */}
          <div className="md:col-span-5 lg:col-span-4 lg:col-start-9">
            <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-primary-gold mb-8">Nous Trouver</h3>
            <div className="space-y-6 font-sans text-sm text-gray-300 opacity-80">
              <div className="flex items-start gap-4 group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-gold flex-shrink-0 group-hover:bg-primary-gold group-hover:text-white transition-colors">
                    <MapPin size={16} />
                 </div>
                 <div className="pt-2">
                    <span className="block text-white mb-1 font-medium tracking-wide">Adresse</span>
                    <span>Lomé - Togo</span>
                 </div>
              </div>

              <div className="flex items-start gap-4 group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-gold flex-shrink-0 group-hover:bg-primary-gold group-hover:text-white transition-colors">
                    <Phone size={16} />
                 </div>
                 <div className="pt-2">
                    <span className="block text-white mb-1 font-medium tracking-wide">Téléphone</span>
                    <a href="tel:+22891979514" className="block hover:text-white transition-colors">+228 91 97 95 14</a>
                    <a href="tel:+22890201797" className="block mt-1 hover:text-white transition-colors">+228 90 20 17 97</a>
                 </div>
              </div>

              <div className="flex items-start gap-4 group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-gold flex-shrink-0 group-hover:bg-primary-gold group-hover:text-white transition-colors">
                    <Mail size={16} />
                 </div>
                 <div className="pt-2">
                    <span className="block text-white mb-1 font-medium tracking-wide">Email</span>
                    <a href="mailto:freshtouchevent@gmail.com" className="hover:text-white transition-colors">freshtouchevent@gmail.com</a>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Copyright Bar */}
      <div className="bg-black/20 py-8 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 flex justify-center items-center">
          <p className="text-xs text-gray-300 font-sans tracking-widest text-center opacity-70">
            &copy; {new Date().getFullYear()} FRESH TOUCH EVENT - MARCELINE AYITE. TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </div>
    </footer>
  );
};
