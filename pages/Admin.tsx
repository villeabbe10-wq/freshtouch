
import React, { useState, useEffect } from 'react';
import { SectionTitle, Button, FadeIn } from '../components/ui/Common';
import { useData } from '../context/DataContext';
import { Lock, Plus, Trash2, Image as ImageIcon, Package, Upload } from 'lucide-react';
import { Category, GalleryItem, PricingItem } from '../types';

const ADMIN_CODE = "aapidio";

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Checking existing session
  useEffect(() => {
    const session = sessionStorage.getItem('fte_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('fte_admin_session', 'true');
      setError('');
    } else {
      setError('Code incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('fte_admin_session');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center pt-24 px-6">
        <div className="bg-white p-8 md:p-12 shadow-xl border border-primary-gold/30 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary-dark text-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="font-serif text-2xl text-primary-dark mb-2">Espace Administration</h2>
          <p className="text-sm font-sans text-gray-500 mb-8">Veuillez entrer le code d'accès pour continuer</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Code d'accès"
              className="w-full p-4 border border-gray-300 focus:border-primary-gold focus:outline-none font-sans text-center tracking-widest"
            />
            {error && <p className="text-red-500 text-xs font-sans">{error}</p>}
            <Button className="w-full">Connexion</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
           <h1 className="font-serif text-3xl font-bold text-primary-dark">Administration des Produits & Portfolio</h1>
           <button onClick={handleLogout} className="text-xs font-sans uppercase tracking-widest text-red-500 border-b border-red-500 pb-1">Déconnexion</button>
        </div>
        
        <p className="font-sans text-gray-500 mb-12">Gérez vos produits, tarifs et images du portfolio</p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Product Management */}
          <div className="space-y-12">
            <AddProductSection />
            <ProductListSection />
          </div>

          {/* Right Column: Gallery Management */}
          <div className="space-y-12">
            <AddGalleryItemSection />
            <GalleryListSection />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const AddProductSection: React.FC = () => {
  const { addPricingItem } = useData();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<PricingItem['category']>('Vaisselle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    
    addPricingItem({
      id: Date.now().toString(),
      name,
      price,
      category
    });

    setName('');
    setPrice('');
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
        <Button className="w-full">Ajouter le Produit</Button>
      </form>
    </div>
  );
};

const AddGalleryItemSection: React.FC = () => {
  const { addGalleryItem } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('mariage');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imagePreview) return;

    addGalleryItem({
      id: Date.now().toString(),
      title,
      description,
      category,
      imageUrl: imagePreview
    });

    setTitle('');
    setDescription('');
    setImagePreview(null);
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
            />
            <div className="pointer-events-none">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Cliquez pour choisir une image</span>
            </div>
          </div>
        </div>
        
        {imagePreview && (
          <div className="relative aspect-video bg-gray-100 overflow-hidden border border-gray-200">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <button 
              type="button" 
              onClick={() => setImagePreview(null)} 
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
        <Button className="w-full">Ajouter au Portfolio</Button>
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
