
import { GalleryItem, ServiceItem, Testimonial, Realization, PricingItem } from './types';

export const NAVIGATION_LINKS = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Réalisations', path: '/realisations' },
  { name: 'Portfolio', path: '/gallery' },
  { name: 'À Propos', path: '/about' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Vaisselle Haut de Gamme',
    description: 'Une sélection rigoureuse pour une table d\'exception.',
    priceStart: 'Sur devis',
    features: [
      'Assiettes plates, creuses et à dessert design',
      'Verrerie cristalline et contemporaine',
      'Couverts en inox et métal argenté',
      'Services à thé et café raffinés'
    ],
    icon: 'crown'
  },
  {
    id: 's2',
    title: 'Linge de Table Élégant',
    description: 'Des matières nobles pour habiller vos tables avec raffinement.',
    priceStart: 'Sur devis',
    features: [
      'Nappes en lin, coton et satin',
      'Chemins de table sur mesure',
      'Serviettes en tissu assorties',
      'Napperons et dessous de plat'
    ],
    icon: 'table'
  },
  {
    id: 's3',
    title: 'Décoration Événementielle',
    description: 'Des accessoires uniques pour créer une ambiance inoubliable.',
    priceStart: 'Sur devis',
    features: [
      'Centres de table floraux et modernes',
      'Éclairage d\'ambiance',
      'Éléments décoratifs thématiques',
      'Supports et présentoirs design'
    ],
    icon: 'flower'
  },
  {
    id: 's4',
    title: 'Conseil en mise en scène',
    description: 'Une expertise dédiée à l\'harmonie de votre événement.',
    priceStart: 'Sur devis',
    features: [
      'Harmonisation des couleurs et styles',
      'Création d\'ambiances sur mesure',
      'Conseils en design de table',
      'Accompagnement personnalisé',
      'Planification et coordination'
    ],
    icon: 'star'
  }
];

export const INITIAL_PRICING_DATA: PricingItem[] = [
  { id: 'p1', name: "Nappe blanche pour table ronde", price: "2 500 F", category: "Linge de table" },
  { id: 'p2', name: "Nappe blanche pour table rectangulaire", price: "2 000 F", category: "Linge de table" },
  { id: 'p3', name: "Napperon (couleur bleu et vert)", price: "300 F", category: "Linge de table" },
  { id: 'p4', name: "Couteaux", price: "100 F", category: "Vaisselle" },
  { id: 'p5', name: "Fourchette", price: "100 F", category: "Vaisselle" },
  { id: 'p6', name: "Cuillère", price: "100 F", category: "Vaisselle" },
  { id: 'p7', name: "Assiette à bordure dorée - entrée", price: "200 F", category: "Vaisselle" },
  { id: 'p8', name: "Assiette à bordure dorée - résistance", price: "200 F", category: "Vaisselle" },
  { id: 'p9', name: "Verre à eau", price: "100 F", category: "Vaisselle" },
  { id: 'p10', name: "Verre à vin", price: "100 F", category: "Vaisselle" },
  { id: 'p11', name: "Décoration de table - rose de fleur", price: "2 500 F", category: "Décoration" },
  { id: 'p12', name: "Décoration de table - pot de fleur", price: "2 500 F", category: "Décoration" },
  { id: 'p13', name: "Table de 08 personnes", price: "1 500 F", category: "Mobilier" },
  { id: 'p14', name: "Chafindish", price: "2 000 F", category: "Mobilier" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Mariage & Styles
  {
    id: 'g1',
    title: 'Table de Mariage',
    category: 'mariage',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=1200',
    description: 'Décoration raffinée pour mariage prestigieux'
  },
  {
    id: 'g2',
    title: 'Dîner de Gala',
    category: 'gala',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200',
    description: 'Élégance et sophistication pour événements prestigieux'
  },
  {
    id: 'g3',
    title: 'Style Classique',
    category: 'classique',
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200',
    description: 'Service en finition or pour événements prestigieux'
  },
  {
    id: 'g4',
    title: 'Style Bohème',
    category: 'bohème',
    imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1200',
    description: 'Fleurs fraîches et ambiance naturelle'
  },
  {
    id: 'g5',
    title: 'Style Moderne',
    category: 'moderne',
    imageUrl: 'https://images.unsplash.com/photo-1603598506840-058df500593c?auto=format&fit=crop&q=80&w=1200',
    description: 'Lignes épurées et design contemporain'
  },
  // Fleurs
  {
    id: 'g6',
    title: 'Composition Florale',
    category: 'fleurs',
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=1200',
    description: 'Bouquet élégant pour centre de table'
  },
  {
    id: 'g7',
    title: 'Roses Blanches',
    category: 'fleurs',
    imageUrl: 'https://images.unsplash.com/photo-1495904786722-d2b5a1955543?auto=format&fit=crop&q=80&w=1200',
    description: 'Élégance et pureté pour votre table'
  },
  {
    id: 'g8',
    title: 'Fleurs Champêtres',
    category: 'fleurs',
    imageUrl: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200',
    description: 'Ambiance naturelle et romantique'
  },
  {
    id: 'g9',
    title: 'Vases à fleurs',
    category: 'fleurs',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1200',
    description: 'Élégance naturelle pour votre table'
  },
  // Verrerie
  {
    id: 'g10',
    title: 'Verres à Vin',
    category: 'verre',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200',
    description: 'Cristallerie de qualité pour vos vins'
  },
  {
    id: 'g11',
    title: 'Verre à Champagne',
    category: 'verre',
    imageUrl: 'https://images.unsplash.com/photo-1576579309858-a92c3a504c54?auto=format&fit=crop&q=80&w=1200',
    description: 'Élégance pour vos cocktails'
  },
  {
    id: 'g12',
    title: 'Verrerie Cristalline',
    category: 'verre',
    imageUrl: 'https://images.unsplash.com/photo-1574625219765-a864756314f3?auto=format&fit=crop&q=80&w=1200',
    description: 'Transparence et élégance'
  },
  // Serviettes
  {
    id: 'g13',
    title: 'Serviettes Colorées',
    category: 'serviette',
    imageUrl: 'https://images.unsplash.com/photo-1601366533287-5ee3c2b8ba6c?auto=format&fit=crop&q=80&w=1200',
    description: 'Plis créatifs pour une table raffinée'
  },
  {
    id: 'g14',
    title: 'Serviettes Colorées',
    category: 'serviette',
    imageUrl: 'https://images.unsplash.com/photo-1569055823122-2628469cb232?auto=format&fit=crop&q=80&w=1200',
    description: 'Touches de couleur pour votre table'
  },
  // Assiettes & Plats
  {
    id: 'g15',
    title: 'Plats de Service',
    category: 'plats',
    imageUrl: 'https://images.unsplash.com/photo-1581339893527-380d12e617d9?auto=format&fit=crop&q=80&w=1200',
    description: 'Présentation élégante pour vos mets'
  },
  {
    id: 'g16',
    title: 'Assiettes Design',
    category: 'plats',
    imageUrl: 'https://images.unsplash.com/photo-1528659146523-281b67f40775?auto=format&fit=crop&q=80&w=1200',
    description: 'Formes et motifs contemporains'
  },
  {
    id: 'g17',
    title: 'Service Complet',
    category: 'plats',
    imageUrl: 'https://images.unsplash.com/photo-1602534577543-a60d05776d65?auto=format&fit=crop&q=80&w=1200',
    description: 'Harmonie des couverts et assiettes'
  },
  {
    id: 'g18',
    title: 'Plats Chauffants',
    category: 'plats',
    imageUrl: 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?auto=format&fit=crop&q=80&w=1200',
    description: 'Vaisselle raffinée pour présentation élégante'
  },
  // Tables & Chaises
  {
    id: 'g19',
    title: 'Table Rectangulaire Élégante',
    category: 'tables_chaises',
    imageUrl: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&q=80&w=1200',
    description: 'Configuration parfaite pour réceptions intimes'
  },
  {
    id: 'g20',
    title: 'Banquet Prestige',
    category: 'tables_chaises',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    description: 'Tables rectangulaires pour événements d\'envergure'
  },
  {
    id: 'g21',
    title: 'Chaises Design',
    category: 'tables_chaises',
    imageUrl: 'https://images.unsplash.com/photo-1506093554160-b6df33240210?auto=format&fit=crop&q=80&w=1200',
    description: 'Assises confortables et stylées'
  },
  {
    id: 'g22',
    title: 'Table Rectangulaire',
    category: 'tables_chaises',
    imageUrl: 'https://images.unsplash.com/photo-1478146896981-b80c463e7e22?auto=format&fit=crop&q=80&w=1200',
    description: 'Hauteurs variables pour ambiances dynamiques'
  },
  {
    id: 'g23',
    title: 'Table Habillée',
    category: 'tables_chaises',
    imageUrl: 'https://images.unsplash.com/photo-1487452066049-a710b4e6d29c?auto=format&fit=crop&q=80&w=1200',
    description: 'Aménagement optimisé pour votre événement'
  },
  {
    id: 'g24',
    title: 'Tables Habillées',
    category: 'tables_chaises',
    imageUrl: 'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&q=80&w=1200',
    description: 'Nappes et décoration sur mesure'
  },
  {
    id: 'g25',
    title: 'Extérieur Élégant',
    category: 'tables_chaises',
    imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1200',
    description: 'Une élégance totale'
  },
  {
    id: 'g26',
    title: 'Gala d\'Entreprise',
    category: 'entreprise',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
    description: 'Adapté pour vos événements professionnels'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Laeticia GAGNO',
    role: 'Mariée',
    content: "Un service impeccable et des couverts magnifiques ! Notre mariage a été embelli par leurs touches élégantes. Marceline a su comprendre notre vision et l'a sublimée.",
    rating: 5
  }
];

export const REALIZATIONS: Realization[] = [
  {
    id: 'r1',
    title: 'Mariage champêtre à Baguida',
    location: 'Jardin privé – 120 invités',
    ambiance: 'Bohème chic, tons ivoire et eucalyptus',
    rentedElements: 'Vaisselle vintage, couverts dorés, nappes en lin naturel, chandeliers',
    testimonial: "Une table digne d'un conte de fées. Merci pour votre écoute et votre goût exquis.",
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'r2',
    title: "Cocktail d'entreprise – Lomé Business Center",
    location: 'Rooftop – 80 invités',
    ambiance: 'Moderne et épurée, noir & or',
    rentedElements: 'Verres à cocktail, assiettes ardoise, serviettes satinées, bougies LED',
    testimonial: "Professionnalisme, ponctualité et élégance. Nos invités étaient bluffés.",
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'r3',
    title: 'Anniversaire privé – Résidence à Agoè',
    location: 'Terrasse familiale – 30 invités',
    ambiance: 'Colorée et conviviale',
    rentedElements: 'Assiettes pastel, chemins de table fleuris, vaisselle enfantine',
    testimonial: "Vous avez transformé notre jardin en un lieu magique. Merci pour cette touche unique.",
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af38?auto=format&fit=crop&q=80&w=1200'
  }
];
