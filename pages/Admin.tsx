
import React, { useState, useEffect } from 'react';
import { SectionTitle, Button, FadeIn } from '../components/ui/Common';
import { useData } from '../context/DataContext';
import { Lock, Plus, Trash2, Image as ImageIcon, Package, Upload, LogOut, Loader2, Database, Camera, Star, MessageCircle, Instagram, Facebook, LayoutDashboard, CheckCircle, Clock, Phone } from 'lucide-react';
import { Category, GalleryItem, PricingItem } from '../types';
import { auth, storage } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { INITIAL_PRICING_DATA, GALLERY_ITEMS } from '../constants';

const AdminPage: React.FC = () => {
  const { user, loading: authLoading, addPricingItem, addGalleryItem, pricingItems, galleryItems, settings, updateSettings, realizations, addRealization, deleteRealization } = useData();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  
  const handleImportData = async () => {
    setIsImporting(true);
    try {
      // Import Pricing
      for (const item of INITIAL_PRICING_DATA) {
        if (!pricingItems.find(p => p.id === item.id)) {
          await addPricingItem(item);
        }
      }
      // Import Gallery
      for (const item of GALLERY_ITEMS) {
        if (!galleryItems.find(g => g.id === item.id)) {
          await addGalleryItem(item);
        }
      }
      setShowImportConfirm(false);
    } catch (error) {
      console.error("Import failed:", error);
    } finally {
      setIsImporting(false);
    }
  };
  
  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-gold" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center pt-24 px-6">
        <div className="bg-white p-8 md:p-12 shadow-xl border border-primary-gold/30 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary-dark text-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="font-serif text-2xl text-primary-dark mb-2">Espace Administration</h2>
          <p className="text-sm font-sans text-gray-500 mb-8">Veuillez vous connecter avec votre compte Google autorisé</p>
          
          <button 
            onClick={handleLogin} 
            disabled={isLoggingIn}
            className="w-full bg-white border border-gray-300 p-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-sans font-bold text-gray-700 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : (
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            )}
            Se connecter avec Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
           <div>
             <h1 className="font-serif text-3xl font-bold text-primary-dark">Administration</h1>
             <p className="text-sm text-gray-500">Connecté en tant que {user.email}</p>
           </div>
           <div className="flex gap-4">
             {!showImportConfirm ? (
               <button 
                 onClick={() => setShowImportConfirm(true)} 
                 className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-primary-gold border border-primary-gold px-4 py-2 hover:bg-primary-gold hover:text-white transition-all"
               >
                 <Database size={14} /> Importer données d'exemple
               </button>
             ) : (
               <div className="flex items-center gap-2 bg-primary-gold/10 p-1 border border-primary-gold">
                 <span className="text-[10px] font-bold uppercase px-2">Confirmer ?</span>
                 <button 
                   onClick={handleImportData} 
                   disabled={isImporting}
                   className="bg-primary-gold text-white text-[10px] font-bold uppercase px-3 py-1 hover:bg-primary-dark transition-colors disabled:opacity-50"
                 >
                   {isImporting ? "En cours..." : "Oui"}
                 </button>
                 <button 
                   onClick={() => setShowImportConfirm(false)}
                   className="text-[10px] font-bold uppercase px-3 py-1 text-gray-500"
                 >
                   Non
                 </button>
               </div>
             )}
             <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-red-500 border border-red-500 px-4 py-2 hover:bg-red-50 transition-colors">
               <LogOut size={14} /> Déconnexion
             </button>
           </div>
        </div>
        
        <DashboardSection />
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            <UserManagementSection />
            <MessageManagementSection />
            <SiteSettingsSection />
            <AddProductSection />
            <ProductListSection />
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <RealizationManagementSection />
            <TestimonialManagementSection />
            <AddGalleryItemSection />
            <GalleryListSection />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const UserManagementSection: React.FC = () => {
  const { admins, addAdminByEmail, removeAdmin, user } = useData();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await addAdminByEmail(email);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <Lock size={20} className="text-primary-gold" /> Gestion des Administrateurs
      </h3>
      
      <form onSubmit={handleAddAdmin} className="flex gap-2 mb-6">
        <input 
          type="email" 
          placeholder="Email du futur admin" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-grow p-3 border border-gray-200 text-sm outline-none focus:border-primary-gold"
          required
        />
        <button 
          disabled={isSubmitting}
          className="bg-primary-dark text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary-gold transition-colors disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Ajouter"}
        </button>
      </form>

      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Administrateurs Actifs</div>
        {admins.map(admin => (
          <div key={admin.uid} className="flex justify-between items-center p-3 bg-gray-50 rounded-sm">
            <span className="text-sm font-medium text-primary-dark">{admin.email}</span>
            {admin.email !== "seduceconseil@gmail.com" && admin.email !== user?.email && (
              <button 
                onClick={() => removeAdmin(admin.uid)}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        {/* Placeholder for permanent admin */}
        {!admins.find(a => a.email === "seduceconseil@gmail.com") && (
          <div className="flex justify-between items-center p-3 bg-primary-gold/5 border border-primary-gold/20 rounded-sm">
            <span className="text-sm font-medium text-primary-dark">seduceconseil@gmail.com</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-gold">Super Admin</span>
          </div>
        )}
      </div>
    </div>
  );
};

const AddProductSection: React.FC = () => {
  const { addPricingItem } = useData();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<PricingItem['category']>('Vaisselle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    
    setIsSubmitting(true);
    try {
      await addPricingItem({
        id: Date.now().toString(),
        name,
        price,
        category
      });
      setName('');
      setPrice('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <Plus size={20} className="text-green-600" /> Ajouter un Nouveau Produit
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nom du produit</label>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none"
            placeholder="ex: Assiette Or"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Prix</label>
          <input 
            type="text" 
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none"
            placeholder="ex: 2 500 F"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Catégorie</label>
          <select 
            value={category}
            onChange={e => setCategory(e.target.value as any)}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none bg-white"
          >
            <option value="Vaisselle">🍽️ Vaisselle</option>
            <option value="Linge de table">📦 Linge de table</option>
            <option value="Décoration">🎨 Décoration</option>
            <option value="Mobilier">🪑 Mobilier</option>
            <option value="Autre">✨ Autre</option>
          </select>
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Ajouter le Produit"}
        </Button>
      </form>
    </div>
  );
};

const SiteSettingsSection: React.FC = () => {
  const { settings, updateSettings } = useData();
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  
  // Social states
  const [instagram, setInstagram] = useState(settings.instagramUrl || '');
  const [facebook, setFacebook] = useState(settings.facebookUrl || '');
  const [tiktok, setTiktok] = useState(settings.tiktokUrl || '');
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber || '');
  const [isSavingSocials, setIsSavingSocials] = useState(false);

  useEffect(() => {
    setInstagram(settings.instagramUrl || '');
    setFacebook(settings.facebookUrl || '');
    setTiktok(settings.tiktokUrl || '');
    setWhatsapp(settings.whatsappNumber || '');
  }, [settings]);

  const handleSaveSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSocials(true);
    try {
      await updateSettings({
        instagramUrl: instagram,
        facebookUrl: facebook,
        tiktokUrl: tiktok,
        whatsappNumber: whatsapp
      });
    } finally {
      setIsSavingSocials(false);
    }
  };

  const handleAboutPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploadingAbout(true);
      try {
        const storageRef = ref(storage, `settings/about_photo_${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        await updateSettings({ aboutPhotoUrl: url });
      } catch (error) {
        console.error("Update about photo failed:", error);
      } finally {
        setIsUploadingAbout(false);
      }
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploadingLogo(true);
      try {
        const storageRef = ref(storage, `settings/logo_${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        await updateSettings({ logoUrl: url });
      } catch (error) {
        console.error("Update logo failed:", error);
      } finally {
        setIsUploadingLogo(false);
      }
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <ImageIcon size={20} className="text-primary-gold" /> Paramètres du Site
      </h3>
      
      <div className="space-y-10">
        {/* Logo Section */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Logo du Site</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
              ) : (
                <div className="text-[10px] text-gray-300 text-center px-1">Aucun logo</div>
              )}
            </div>
            <div className="flex-grow">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoChange}
                className="hidden" 
                id="logo-upload"
              />
              <label 
                htmlFor="logo-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {isUploadingLogo ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                {settings.logoUrl ? "Remplacer le logo" : "Ajouter un logo"}
              </label>
              <p className="text-[10px] text-gray-400 mt-2">Format recommandé: PNG transparent ou SVG</p>
            </div>
          </div>
        </div>

        {/* About Photo Section */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Photo de Profil (À Propos)</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              {settings.aboutPhotoUrl ? (
                <img src={settings.aboutPhotoUrl} alt="About" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAboutPhotoChange}
                className="hidden" 
                id="about-photo-upload"
              />
              <label 
                htmlFor="about-photo-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {isUploadingAbout ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                Remplacer la photo
              </label>
              <p className="text-[10px] text-gray-400 mt-2">Format recommandé: Portrait (3:4)</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="pt-6 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Réseaux Sociaux & Contact</h4>
          <form onSubmit={handleSaveSocials} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Instagram URL</label>
                <div className="flex items-center gap-2 border border-gray-200 p-2 focus-within:border-primary-gold transition-colors">
                  <Instagram size={14} className="text-gray-400" />
                  <input 
                    type="url" 
                    value={instagram}
                    onChange={e => setInstagram(e.target.value)}
                    className="flex-grow outline-none text-sm"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Facebook URL</label>
                <div className="flex items-center gap-2 border border-gray-200 p-2 focus-within:border-primary-gold transition-colors">
                  <Facebook size={14} className="text-gray-400" />
                  <input 
                    type="url" 
                    value={facebook}
                    onChange={e => setFacebook(e.target.value)}
                    className="flex-grow outline-none text-sm"
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">TikTok URL</label>
                <div className="flex items-center gap-2 border border-gray-200 p-2 focus-within:border-primary-gold transition-colors">
                  <MessageCircle size={14} className="text-gray-400" />
                  <input 
                    type="url" 
                    value={tiktok}
                    onChange={e => setTiktok(e.target.value)}
                    className="flex-grow outline-none text-sm"
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Numéro WhatsApp</label>
                <div className="flex items-center gap-2 border border-gray-200 p-2 focus-within:border-primary-gold transition-colors">
                  <Phone size={14} className="text-gray-400" />
                  <input 
                    type="text" 
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    className="flex-grow outline-none text-sm"
                    placeholder="ex: 22891979514"
                  />
                </div>
              </div>
            </div>
            <Button className="w-full md:w-auto" disabled={isSavingSocials}>
              {isSavingSocials ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Enregistrer les liens"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const MessageManagementSection: React.FC = () => {
  const { messages, deleteMessage, markMessageAsRead } = useData();

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <MessageCircle size={20} className="text-primary-gold" /> Messages Reçus ({messages.length})
      </h3>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400 italic">
            Aucun message pour le moment.
          </div>
        ) : (
          messages.map(msg => (
            <div 
              key={msg.id} 
              className={`p-4 border rounded-sm transition-all ${msg.status === 'new' ? 'border-primary-gold bg-primary-gold/5' : 'border-gray-100 bg-white'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-primary-dark">{msg.name}</h4>
                  <p className="text-xs text-gray-500">{msg.email} • {msg.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  {msg.status === 'new' && (
                    <button 
                      onClick={() => markMessageAsRead(msg.id)}
                      className="text-[10px] font-bold uppercase tracking-widest text-primary-gold hover:text-primary-dark transition-colors"
                    >
                      Marquer comme lu
                    </button>
                  )}
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Sujet</span>
                <p className="text-sm font-medium text-primary-dark">{msg.subject}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Message</span>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{msg.message}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleString('fr-FR')}</span>
                {msg.status === 'new' && <span className="flex items-center gap-1 text-[10px] font-bold text-primary-gold uppercase tracking-widest"><Clock size={10} /> Nouveau</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DashboardSection: React.FC = () => {
  const { galleryItems, pricingItems, realizations, messages } = useData();
  const newMessages = messages.filter(m => m.status === 'new').length;

  const stats = [
    { label: 'Produits', value: pricingItems.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Portfolio', value: galleryItems.length, icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Réalisations', value: realizations.length, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Nouveaux Messages', value: newMessages, icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
          <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center mb-4`}>
            <stat.icon size={20} />
          </div>
          <div className="text-2xl font-bold text-primary-dark">{stat.value}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const TestimonialManagementSection: React.FC = () => {
  const { testimonials, addTestimonial, deleteTestimonial } = useData();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const id = `t_${Date.now()}`;
      await addTestimonial({ id, name, role, content, rating });
      setName('');
      setRole('');
      setContent('');
      setRating(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <Star size={20} className="text-primary-gold" /> Témoignages Clients
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 pb-8 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nom</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none"
              placeholder="ex: Marie D."
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Rôle</label>
            <input 
              type="text" 
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none"
              placeholder="ex: Mariée"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Note (1-5)</label>
          <select 
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none bg-white"
          >
            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} étoiles</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Témoignage</label>
          <textarea 
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none resize-none"
            rows={3}
            placeholder="Le message du client..."
            required
          />
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Ajouter le Témoignage"}
        </Button>
      </form>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {testimonials.map(t => (
          <div key={t.id} className="p-4 bg-gray-50 rounded-sm group relative">
            <button 
              onClick={() => deleteTestimonial(t.id)}
              className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={14} />
            </button>
            <div className="flex items-center gap-1 text-primary-gold mb-1">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
            </div>
            <p className="text-sm italic text-gray-600 mb-2">"{t.content}"</p>
            <p className="text-xs font-bold text-primary-dark">{t.name} <span className="text-gray-400 font-normal">- {t.role}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RealizationManagementSection: React.FC = () => {
  const { realizations, addRealization, deleteRealization } = useData();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [ambiance, setAmbiance] = useState('');
  const [rentedElements, setRentedElements] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) return;

    setIsSubmitting(true);
    try {
      const storageRef = ref(storage, `realizations/${Date.now()}_${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);

      await addRealization({
        id: Date.now().toString(),
        title,
        location,
        ambiance,
        rentedElements,
        testimonial,
        imageUrl: url
      });

      setTitle('');
      setLocation('');
      setAmbiance('');
      setRentedElements('');
      setTestimonial('');
      setSelectedFile(null);
    } catch (error) {
      console.error("Add realization failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <Star size={20} className="text-primary-gold" /> Gérer les Réalisations (Gâteaux, Événements...)
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Titre (ex: Mariage Champêtre)" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            className="p-3 border border-gray-200 text-sm outline-none focus:border-primary-gold"
            required
          />
          <input 
            type="text" 
            placeholder="Lieu" 
            value={location} 
            onChange={e => setLocation(e.target.value)}
            className="p-3 border border-gray-200 text-sm outline-none focus:border-primary-gold"
          />
        </div>
        <input 
          type="text" 
          placeholder="Ambiance (ex: Bohème chic)" 
          value={ambiance} 
          onChange={e => setAmbiance(e.target.value)}
          className="w-full p-3 border border-gray-200 text-sm outline-none focus:border-primary-gold"
        />
        <textarea 
          placeholder="Éléments loués" 
          value={rentedElements} 
          onChange={e => setRentedElements(e.target.value)}
          className="w-full p-3 border border-gray-200 text-sm outline-none focus:border-primary-gold h-20"
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setSelectedFile(e.target.files?.[0] || null)}
          className="text-xs"
          required
        />
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Ajouter la Réalisation"}
        </Button>
      </form>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {realizations.map(r => (
          <div key={r.id} className="flex gap-4 p-3 border border-gray-100 items-center">
            <img src={r.imageUrl} className="w-12 h-12 object-cover rounded-sm" alt="" />
            <div className="flex-grow">
              <h4 className="text-sm font-bold">{r.title}</h4>
              <p className="text-[10px] text-gray-500">{r.location}</p>
            </div>
            <button onClick={() => deleteRealization(r.id)} className="text-gray-300 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddGalleryItemSection: React.FC = () => {
  const { addGalleryItem } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('mariage');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) return;

    setIsUploading(true);
    try {
      // 1. Upload to Storage
      const storageRef = ref(storage, `gallery/${Date.now()}_${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 2. Add to Firestore
      await addGalleryItem({
        id: Date.now().toString(),
        title,
        description,
        category,
        imageUrl: downloadURL
      });

      setTitle('');
      setDescription('');
      setImagePreview(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <ImageIcon size={20} className="text-blue-600" /> Ajouter une Image au Portfolio
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Fichier image</label>
          <div className="relative border-2 border-dashed border-gray-300 p-6 text-center hover:bg-gray-50 transition-colors">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <div className="pointer-events-none">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : "Cliquez pour choisir une image"}
                </span>
            </div>
          </div>
        </div>
        
        {imagePreview && (
          <div className="relative aspect-video bg-gray-100 overflow-hidden border border-gray-200">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <button 
              type="button" 
              onClick={() => { setImagePreview(null); setSelectedFile(null); }} 
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Titre</label>
          <input 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none"
            placeholder="ex: Mariage Élégant"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
          <input 
            type="text" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none"
            placeholder="ex: Table ronde avec décoration florale"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Catégorie</label>
          <select 
            value={category}
            onChange={e => setCategory(e.target.value as Category)}
            className="w-full p-3 border border-gray-200 focus:border-primary-gold outline-none bg-white"
          >
            <option value="mariage">💍 Mariage</option>
            <option value="gala">✨ Gala</option>
            <option value="entreprise">🏢 Entreprise</option>
            <option value="anniversaire">🎂 Anniversaire</option>
            <option value="bohème">🌿 Bohème</option>
            <option value="moderne">⚪ Moderne</option>
            <option value="classique">🏛️ Classique</option>
            <option value="fleurs">🌸 Fleurs</option>
            <option value="verre">🥂 Verrerie</option>
            <option value="serviette">🧵 Serviettes</option>
            <option value="plats">🍽️ Plats</option>
            <option value="tables_chaises">🪑 Tables & Chaises</option>
          </select>
        </div>
        <Button className="w-full" disabled={isUploading}>
          {isUploading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Ajouter au Portfolio"}
        </Button>
      </form>
    </div>
  );
};

const ProductListSection: React.FC = () => {
  const { pricingItems, deletePricingItem } = useData();

  // Group by category
  const grouped = pricingItems.reduce((acc, item) => {
    const cat = item.category || 'Autre';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, PricingItem[]>);

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <Package size={20} className="text-primary-gold" /> Liste des Produits ({pricingItems.length})
      </h3>
      
      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {(Object.entries(grouped) as [string, PricingItem[]][]).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-bold text-primary-gold text-sm uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">
              {category}
            </h4>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm group hover:bg-gray-50 p-2 rounded-sm transition-colors">
                  <span className="text-gray-700">{item.name} <span className="text-gray-400">-</span> {item.price}</span>
                  <button 
                    onClick={() => deletePricingItem(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryListSection: React.FC = () => {
  const { galleryItems, deleteGalleryItem } = useData();

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <h3 className="font-serif text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
        <ImageIcon size={20} className="text-primary-gold" /> Images du Portfolio ({galleryItems.length})
      </h3>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {galleryItems.map(item => (
          <div key={item.id} className="flex gap-4 p-3 border border-gray-100 hover:border-primary-gold/30 transition-colors">
            <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-sm text-primary-dark">{item.title}</h4>
              <p className="text-xs text-gray-500 mb-1">{item.description}</p>
              <span className="text-[10px] uppercase tracking-widest bg-gray-100 px-2 py-0.5 text-gray-600 rounded-sm">
                Catégorie: {item.category}
              </span>
            </div>
            <button 
              onClick={() => deleteGalleryItem(item.id)}
              className="text-gray-300 hover:text-red-500 transition-colors self-center p-2"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
