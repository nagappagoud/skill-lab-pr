import React, { useEffect, useState } from 'react';
import { AppDataProvider } from './context/AppDataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectQuoteModal } from './components/ProjectQuoteModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { ContactModal } from './components/ContactModal';
import { HomePage } from './pages/HomePage';
import { EnterprisePage } from './pages/EnterprisePage';
import { EduTechPage } from './pages/EduTechPage';
import { CollaborationsPage } from './pages/CollaborationsPage';
import { VerifyCertificatePage } from './pages/VerifyCertificatePage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { EnterpriseServiceCategory, Program, RouteView } from './types';

const PATH_TO_VIEW: Record<string, RouteView> = {
  '/': 'home',
  '/enterprise': 'enterprise',
  '/edutech': 'edutech',
  '/collaborations': 'collaborations',
  '/verify': 'verify',
  '/admin': 'admin',
};

const VIEW_TO_PATH: Record<RouteView, string> = {
  home: '/',
  enterprise: '/enterprise',
  edutech: '/edutech',
  collaborations: '/collaborations',
  verify: '/verify',
  admin: '/admin',
};

function resolveInitialView(): RouteView {
  if (typeof window === 'undefined') return 'home';
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  return PATH_TO_VIEW[pathname] || 'home';
}

export default function App() {
  const [currentView, setCurrentView] = useState<RouteView>(resolveInitialView);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState<EnterpriseServiceCategory | undefined>(
    undefined
  );
  const [enrollProgram, setEnrollProgram] = useState<Program | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(resolveInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (view: RouteView) => {
    setCurrentView(view);
    const nextPath = VIEW_TO_PATH[view];
    if (window.location.pathname !== nextPath) {
      try {
        window.history.pushState({ view }, '', nextPath);
      } catch {
        // Fallback silently if History pushState is restricted
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuoteModal = (category?: EnterpriseServiceCategory) => {
    setQuoteCategory(category);
    setQuoteModalOpen(true);
  };

  return (
    <AppDataProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar
          currentView={currentView}
          onNavigate={navigate}
          onOpenContact={() => setContactOpen(true)}
        />

        <main className="flex-1">
          {currentView === 'home' && (
            <HomePage
              onNavigate={navigate}
              onOpenQuote={openQuoteModal}
              onEnrollProgram={(prog) => setEnrollProgram(prog)}
            />
          )}

          {currentView === 'enterprise' && <EnterprisePage onOpenQuote={openQuoteModal} />}

          {currentView === 'edutech' && (
            <EduTechPage onEnrollProgram={(prog) => setEnrollProgram(prog)} />
          )}

          {currentView === 'collaborations' && (
            <CollaborationsPage onViewAdmin={() => navigate('admin')} />
          )}

          {currentView === 'verify' && <VerifyCertificatePage />}

          {currentView === 'admin' && <AdminPortalPage onNavigate={navigate} />}
        </main>

        <Footer onNavigate={navigate} onOpenContact={() => setContactOpen(true)} />

        <ProjectQuoteModal
          isOpen={quoteModalOpen}
          initialCategory={quoteCategory}
          onClose={() => setQuoteModalOpen(false)}
          onViewAdmin={() => navigate('admin')}
        />

        <EnrollmentModal
          program={enrollProgram}
          onClose={() => setEnrollProgram(null)}
          onViewAdmin={() => navigate('admin')}
        />

        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </AppDataProvider>
  );
}
