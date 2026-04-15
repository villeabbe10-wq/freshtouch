
import React, { useState } from 'react';
import { SectionTitle, FadeIn, Button } from '../components/ui/Common';
import { MapPin, Phone, Mail, MessageCircle, Smartphone, Download, Send, Loader2, CheckCircle, Instagram, Facebook } from 'lucide-react';
import { PricingListModal } from '../components/PricingListModal';
import { useData } from '../context/DataContext';

// Custom TikTok Icon since it's not always available in standard libraries
// ... (TikTokIcon remains same)
const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const ContactPage: React.FC = () => {
  const [showPricing, setShowPricing] = useState(false);
  const { addMessage, settings } = useData();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addMessage(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submit message failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionTitle 
            subtitle="Préparons ensemble votre prochain événement" 
            title="Contactez-nous" 
          />
          <FadeIn delay={0.1}>
            <p className="font-serif text-xl italic text-gray-600">
              "Discutons de votre projet et créons l'ambiance parfaite pour votre célébration"
            </p>
          </FadeIn>
        </div>

        {/* Logo & Quick Info Summary */}
        <FadeIn delay={0.2} className="bg-primary-cream/50 p-10 md:p-12 mb-20 border border-primary-gold/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo Representation */}
            <div className="mb-8">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-20 w-auto object-contain" />
              ) : (
                <>
                  <span className="font-serif text-3xl md:text-4xl font-bold tracking-tighter text-primary-dark block">
                    Fresh Touch
                  </span>
                  <span className="font-sans text-xs tracking-[0.4em] uppercase text-primary-gold block mt-1">
                    Event
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-sans text-gray-600 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-gold" />
                <span>+228 91 97 95 14</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-gold" />
                <span>+228 90 20 17 97</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary-gold" />
                <span className="lowercase">freshtouchevent@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-gold" />
                <span>Lomé, Togo</span>
              </div>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-50 z-0" />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Form */}
          <FadeIn delay={0.3}>
            <div className="bg-white p-8 md:p-10 shadow-xl border border-gray-100 rounded-sm">
              <h3 className="font-serif text-2xl font-bold text-primary-dark mb-6">Envoyez-nous un message</h3>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-100 p-8 text-center rounded-sm">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-green-800 mb-2">Message envoyé !</h4>
                  <p className="text-green-700">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-sm font-bold uppercase tracking-widest text-green-800 border-b border-green-800"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nom Complet</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-100 focus:border-primary-gold outline-none transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-100 focus:border-primary-gold outline-none transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Téléphone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border border-gray-100 focus:border-primary-gold outline-none transition-colors"
                        placeholder="Votre numéro"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Sujet</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-100 focus:border-primary-gold outline-none transition-colors bg-white"
                      >
                        <option value="">Choisir un sujet</option>
                        <option value="Mariage">💍 Mariage</option>
                        <option value="Événement d'entreprise">🏢 Événement d'entreprise</option>
                        <option value="Anniversaire">🎂 Anniversaire</option>
                        <option value="Location de vaisselle">🍽️ Location de vaisselle</option>
                        <option value="Autre">✨ Autre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full p-4 bg-gray-50 border border-gray-100 focus:border-primary-gold outline-none transition-colors resize-none"
                      placeholder="Comment pouvons-nous vous aider ?"
                    ></textarea>
                  </div>
                  <Button className="w-full py-5" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="animate-spin mx-auto" size={24} />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Envoyer le message <Send size={18} />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Contact Info & Socials */}
          <FadeIn delay={0.4} className="flex flex-col justify-center">
            <h3 className="font-serif text-2xl font-bold text-primary-dark mb-8">Nos Coordonnées</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-cream text-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-dark uppercase tracking-widest text-xs mb-1">Adresse</h4>
                  <p className="text-gray-600">Lomé, Togo</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-cream text-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-dark uppercase tracking-widest text-xs mb-1">Téléphone</h4>
                  <p className="text-gray-600">+228 91 97 95 14</p>
                  <p className="text-gray-600">+228 90 20 17 97</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-cream text-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-dark uppercase tracking-widest text-xs mb-1">Email</h4>
                  <p className="text-gray-600">freshtouchevent@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100">
              <h4 className="font-bold text-primary-dark uppercase tracking-widest text-xs mb-6">Suivez-nous</h4>
              <div className="flex gap-4">
                {settings.instagramUrl && (
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-gold hover:border-primary-gold transition-all">
                    <Instagram size={20} />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-gold hover:border-primary-gold transition-all">
                    <Facebook size={20} />
                  </a>
                )}
                {settings.tiktokUrl && (
                  <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-gold hover:border-primary-gold transition-all">
                    <TikTokIcon size={20} />
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Contact Cards Grid */}
        <SectionTitle 
          subtitle="Comment Nous Contacter" 
          title="Plusieurs moyens pour échanger sur votre projet" 
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-20">
          
          {/* WhatsApp */}
          <FadeIn delay={0.3} className="bg-white border border-gray-100 p-8 text-center hover:shadow-xl hover:border-primary-gold/30 transition-all duration-300 group rounded-sm">
            <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <MessageCircle size={28} />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">WhatsApp</h3>
            <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-4">Échangez directement</p>
            <p className="font-bold text-primary-dark mb-4">+228 91 97 95 14</p>
            <a 
              href="https://wa.me/22891979514" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-green-600 border-b border-green-600 pb-0.5 hover:text-green-700 hover:border-green-700"
            >
              Réponse rapide garantie
            </a>
          </FadeIn>

          {/* Phone */}
          <FadeIn delay={0.4} className="bg-white border border-gray-100 p-8 text-center hover:shadow-xl hover:border-primary-gold/30 transition-all duration-300 group rounded-sm">
            <div className="w-16 h-16 mx-auto bg-primary-cream rounded-full flex items-center justify-center text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-white transition-colors">
              <Phone size={28} />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">Appel Téléphonique</h3>
            <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-4">Discutons de votre projet</p>
            <div className="space-y-1 mb-4">
              <p className="font-bold text-primary-dark">+228 91 97 95 14</p>
              <p className="font-bold text-primary-dark">+228 90 20 17 97</p>
            </div>
          </FadeIn>

          {/* Email */}
          <FadeIn delay={0.5} className="bg-white border border-gray-100 p-8 text-center hover:shadow-xl hover:border-primary-gold/30 transition-all duration-300 group rounded-sm">
            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Mail size={28} />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">Email</h3>
            <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-4">Demandes détaillées</p>
            <p className="font-medium text-primary-dark text-sm mb-4 break-words">freshtouchevent@gmail.com</p>
            <a 
              href="mailto:freshtouchevent@gmail.com"
              className="inline-block text-xs font-bold text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-700 hover:border-blue-700"
            >
              Réponse sous 24h
            </a>
          </FadeIn>

          {/* TikTok */}
          <FadeIn delay={0.6} className="bg-white border border-gray-100 p-8 text-center hover:shadow-xl hover:border-primary-gold/30 transition-all duration-300 group rounded-sm">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-black mb-6 group-hover:bg-black group-hover:text-white transition-colors">
              <TikTokIcon size={28} />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">TikTok</h3>
            <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-4">Découvrez nos créations</p>
            <p className="font-bold text-primary-dark mb-4">@freshouuu</p>
            <a 
              href="https://www.tiktok.com/@freshouuu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-black border-b border-black pb-0.5"
            >
              Inspirez-vous
            </a>
          </FadeIn>

        </div>

        {/* CTA Section */}
        <FadeIn delay={0.7} className="bg-primary-green rounded-sm p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">📞 Appelez-nous dès maintenant !</h2>
            <p className="font-sans text-gray-300 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans l'organisation de votre événement.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <a href="tel:+22891979514" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-primary-gold text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary-dark transition-all shadow-lg flex items-center justify-center gap-2">
                  <Phone size={18} /> Appeler le 91 97 95 14
                </button>
              </a>
              <a href="https://wa.me/22891979514" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary-dark transition-all flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> WhatsApp
                </button>
              </a>
              <button 
                onClick={() => setShowPricing(true)}
                className="w-full sm:w-auto px-8 py-4 border border-primary-gold text-primary-gold font-bold uppercase tracking-widest hover:bg-primary-gold hover:text-white transition-all flex items-center justify-center gap-2"
              >
                  <Download size={18} /> Télécharger les Tarifs
              </button>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-gold rounded-full blur-3xl"></div>
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-gold rounded-full blur-3xl"></div>
          </div>
        </FadeIn>

      </div>

      <PricingListModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
};

export default ContactPage;
