
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import RefillModal from './components/RefillModal';
import ContactPage from "./ContactPage";
import PrivacyPage from "./PrivacyPage";
import TermsPage from "./TermsPage";
import AboutPage from "./AboutPage";
import { UserProfile, UserType } from './types';
import { authService } from './services/authService';

type View = 'home' | 'privacy' | 'terms' | 'contact' | 'about';

function App() {
  const [user, setUser] = useState<UserProfile | null>(authService.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    const session = authService.getCurrentUser();
    if (session) setUser(session);
    window.scrollTo(0, 0);
  }, [view]);

  const handleAuthSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const handleUpgradeSuccess = async (tier: UserType) => {
    if (!user) return;
    await authService.upgradeUser(user.id, tier);
    const updatedUser = authService.getCurrentUser();
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30 flex flex-col bg-[#030303]">
      <Navbar 
        user={user} 
        onLoginClick={() => setIsAuthModalOpen(true)} 
        onLogout={handleLogout}
        onUpgradeClick={() => {
          setView('home');
          setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'}), 100);
        }}
        onLogoClick={() => setView('home')}
      />
      
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onStartClick={() => user ? document.getElementById('generator')?.scrollIntoView({behavior: 'smooth'}) : setIsAuthModalOpen(true)} />
            <PlatformCarousel />
            <Generator 
              user={user} 
              onTriggerAuth={() => setIsAuthModalOpen(true)}
              onTriggerRefill={() => setIsRefillModalOpen(true)}
              onCreditSync={(bal) => user && setUser({ ...user, credits_balance: bal })}
            />
            <Features />
            <Pricing 
              user={user}
              onUpgrade={handleUpgradeSuccess}
              onAuthTrigger={() => setIsAuthModalOpen(true)}
            />
          </>
        )}

        {view === 'contact' && <ContactPage />}
        {view === 'privacy' && <PrivacyPage />}
        {view === 'terms' && <TermsPage />}
        {view === 'about' && <AboutPage />}
      </main>

      <Footer setView={setView} />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
      
      <RefillModal 
        isOpen={isRefillModalOpen}
        onClose={() => setIsRefillModalOpen(false)}
        onBuy={() => {
          setIsRefillModalOpen(false);
          document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'});
        }}
        onWatchAd={async () => {
          if (!user) return;
          const newBal = await authService.updateCredits(user.id, 20);
          setUser({ ...user, credits_balance: newBal });
          setIsRefillModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
