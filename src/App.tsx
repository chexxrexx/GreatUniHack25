import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Drawer from './components/Drawer.tsx';
import GlobePage from './pages/GlobePage.tsx';
import PassportPage from './pages/PassportPage.tsx';
import TicketPage from './pages/TicketPage.tsx';
import OnboardingPage from './pages/OnboardingPage.tsx'
import MatchmakingPage from './pages/Matchmaking.tsx';;
import ScanPage from './pages/ScanPage.tsx';
import './index.css';

type AuthStatus = 'loggedOut' | 'needsOnboarding' | 'loggedIn';

function AppContent({ authStatus, setAuthStatus }: { authStatus: AuthStatus; setAuthStatus: (status: AuthStatus) => void }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
    setIsDrawerOpen(false);
  };

  // If the user is not logged in and needs onboarding, show onboarding
  if (authStatus === 'needsOnboarding') {
    return (
      <OnboardingPage
        onOnboardingComplete={() => {
          setAuthStatus('loggedIn');
          navigate('/globe'); // redirect to globe after onboarding
        }}
      />
    );
  }

  return (
    <>
      <Navbar onMenuClick={() => setIsDrawerOpen(true)} />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
        currentPage={window.location.pathname.replace('/', '') || 'globe'}
        authStatus={authStatus}
        onLoginSuccess={() => setAuthStatus('loggedIn')}
        onSignUpSuccess={() => setAuthStatus('needsOnboarding')}
        onLogout={() => setAuthStatus('loggedOut')}
      />
      <div className="pt-16">
        <Routes>
          <Route path="/globe" element={<GlobePage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="/matchmaking" element={<MatchmakingPage />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/scan" element={<ScanPage />} /> {/* hidden from drawer */}
          <Route path="*" element={<Navigate to="/globe" replace />} /> {/* fallback */}
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('needsOnboarding'); // <-- start onboarding by default for testing

  return (
    <Router>
      <AppContent authStatus={authStatus} setAuthStatus={setAuthStatus} />
    </Router>
  );
}
