
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import GalleryPage from './pages/Gallery';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import RealisationsPage from './pages/Realisations';
import AdminPage from './pages/Admin';
import { Settings } from 'lucide-react';

// ScrollToTop utility component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-primary-dark antialiased relative">
      <ScrollToTop />
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/realisations" element={<RealisationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      <Footer />

      {/* Admin Floating Button */}
      <Link 
        to="/admin" 
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-gold hover:border-primary-gold hover:shadow-lg transition-all duration-300 opacity-50 hover:opacity-100"
        title="Administration"
      >
        <Settings size={20} />
      </Link>
    </div>
  );
};

export default App;
