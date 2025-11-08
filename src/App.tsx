import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Drawer from './components/Drawer.tsx';
import GlobePage from './pages/GlobePage.tsx';
import PassportPage from './pages/PassportPage.tsx';
<<<<<<< HEAD
import TicketPage from './pages/TicketPage.tsx';
=======
import OnboardingPage from './pages/OnboardingPage.tsx';
>>>>>>> e9a8ee668ef5ece97e4feccb61b474442e62f3e6
import './index.css';


type AuthStatus = 'loggedOut' | 'needsOnboarding' | 'loggedIn';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
<<<<<<< HEAD
  const [currentPage, setCurrentPage] = useState<'globe' | 'passport' | 'ticket'>('globe');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
=======
  const [currentPage, setCurrentPage] = useState<'globe' | 'passport'>('globe');
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loggedOut');

  if (authStatus === 'needsOnboarding') {
    return (
      <OnboardingPage 
        onOnboardingComplete={() => setAuthStatus('loggedIn')} 
      />
    );
  }
>>>>>>> e9a8ee668ef5ece97e4feccb61b474442e62f3e6

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setIsDrawerOpen(true)} />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
<<<<<<< HEAD
        isLoggedIn={isLoggedIn}
        onAuthChange={setIsLoggedIn} 
      />
      <div className="pt-16">
      {currentPage === 'globe' && <GlobePage />}
      {currentPage === 'passport' && <PassportPage />}
      {currentPage === 'ticket' && <TicketPage />}
=======
        authStatus={authStatus}
        onLoginSuccess={() => setAuthStatus('loggedIn')}
        onSignUpSuccess={() => setAuthStatus('needsOnboarding')}
        onLogout={() => setAuthStatus('loggedOut')}  
      />
      <div className="pt-16">
        {currentPage === 'globe' ? <GlobePage /> : (authStatus === 'loggedIn' ? <PassportPage /> : <GlobePage />)}
>>>>>>> e9a8ee668ef5ece97e4feccb61b474442e62f3e6
      </div>
    </div>
  );
}

export default App;
