import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Drawer from './components/Drawer.tsx';
import GlobePage from './pages/GlobePage.tsx';
import PassportPage from './pages/PassportPage.tsx';
import TicketPage from './pages/TicketPage.tsx';
import './index.css';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'globe' | 'passport' | 'ticket'>('globe');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setIsDrawerOpen(true)} />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onAuthChange={setIsLoggedIn} 
      />
      <div className="pt-16">
      {currentPage === 'globe' && <GlobePage />}
      {currentPage === 'passport' && <PassportPage />}
      {currentPage === 'ticket' && <TicketPage />}
      </div>
    </div>
  );
}

export default App;
