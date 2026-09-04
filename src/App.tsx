import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { GalleryCollectionPage } from './pages/GalleryCollectionPage';
import { ExhibitionsPage } from './pages/ExhibitionsPage';
import { PressPage } from './pages/PressPage';
import { JourneyPage } from './pages/JourneyPage';
import { ContactPage } from './pages/ContactPage';
import { CharityPage } from './pages/CharityPage';
import { LanguageProvider } from './i18n/LanguageContext';

export function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="gallery/:slug" element={<GalleryCollectionPage />} />
              <Route path="workshops" element={<Navigate to="/" replace />} />
              <Route path="charity" element={<CharityPage />} />
              <Route path="exhibitions" element={<ExhibitionsPage />} />
              <Route path="press" element={<PressPage />} />
              <Route path="journey" element={<JourneyPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
