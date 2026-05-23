
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { useData } from './context/DataContext';
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
  const { settings, user, admins, authorizedEmails } = useData();

  const isAdminUser = 
    user?.email === "seduceconseil@gmail.com" || 
    admins.some(a => a.uid === user?.uid || a.email === user?.email) ||
    authorizedEmails.some(a => a.email.toLowerCase() === user?.email?.toLowerCase());

  // Dynamic Favicon Update
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && settings.logoUrl) {
      favicon.setAttribute('href', settings.logoUrl);
    } else if (!favicon && settings.logoUrl) {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = settings.logoUrl;
      document.head.appendChild(newFavicon);
    }
  }, [settings.logoUrl]);

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
    </div>
  );
};

export default App;
