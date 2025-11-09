// src/components/Drawer.tsx

import React, { useState } from 'react';
import { X, ArrowLeft, Mail, Lock, User } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: 'globe' | 'passport' | 'ticket') => void;
  currentPage: 'globe' | 'passport' | 'ticket';
  authStatus: 'loggedOut' | 'needsOnboarding' | 'loggedIn';
  onLoginSuccess: () => void;
  onSignUpSuccess: () => void;
  onLogout: () => void;
}

type DrawerView = 'menu' | 'login' | 'signup';

export default function Drawer({
  isOpen,
  onClose,
  onNavigate,
  currentPage,
  authStatus,
  onLoginSuccess,
  onSignUpSuccess,
  onLogout,
}: DrawerProps) {
  const [view, setView] = useState<DrawerView>('menu');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // NOTE: correct union type used here
  const handleNavigate = (page: 'globe' | 'passport' | 'ticket') => {
    // require login for restricted pages (passport & ticket)
    if ((page === 'passport' || page === 'globe' || page === 'ticket') && authStatus !== 'loggedIn') {
      setView('login');
      return;
    }

    onNavigate(page);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView('menu');
      setEmail('');
      setPassword('');
      setName('');
    }, 300);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    onLoginSuccess();
    handleClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with:', name, email, password);
    onSignUpSuccess();
    handleClose();
  };

  const handleLogout = () => {
    onLogout();
    // safe navigate back to home
    onNavigate('globe');
    handleClose();
  };

  const renderContent = () => {
    if (view === 'login') {
      return (
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign in or create an account</h3>
          <p className="text-gray-600 text-sm mb-4">You can sign in using your HolidayBuddy account to access our services.</p>

          <label htmlFor="email-login" className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email-login"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            style={{ fontSize: '16px' }}
          />

          <button type="submit" className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors mt-6"
            style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Continue with email
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600">Don't have an account? </span>
            <button type="button" onClick={() => setView('signup')} className="text-blue-600 hover:underline font-semibold">
              Sign up
            </button>
          </div>
        </form>
      );
    }

    if (view === 'signup') {
      return (
        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h3>
          <p className="text-gray-600 text-sm mb-4">Join HolidayBuddy to plan your next adventure.</p>

          <label htmlFor="name-signup" className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name-signup"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            style={{ fontSize: '16px' }}
          />

          <label htmlFor="email-signup" className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email-signup"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            style={{ fontSize: '16px' }}
          />

          <label htmlFor="password-signup" className="text-sm font-medium text-gray-700">Password</label>
          <input
            id="password-signup"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            style={{ fontSize: '16px' }}
          />

          <button type="submit" className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors mt-6"
            style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Create Account
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <button type="button" onClick={() => setView('login')} className="text-blue-600 hover:underline font-semibold">
              Log In
            </button>
          </div>
        </form>
      );
    }

    return (
      <nav className="space-y-2">
        <button
          onClick={() => handleNavigate('globe')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            currentPage === 'globe'
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          Explore Globe
        </button>

        <button
          onClick={() => handleNavigate('passport')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            currentPage === 'passport'
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          My Passport
        </button>

        <button
          onClick={() => handleNavigate('ticket')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            currentPage === 'ticket'
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          My Tickets
        </button>

        <div className="pt-2 border-t" />

        {authStatus === 'loggedIn' ? (
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition-colors font-semibold"
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              onClick={() => setView('login')}
              className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              Log In
            </button>
            <button
              onClick={() => setView('signup')}
              className="w-full px-4 py-3 rounded-md bg-gray-200 text-gray-800 font-bold text-lg hover:bg-gray-300 transition-colors"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              Sign Up
            </button>
          </>
        )}
      </nav>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {view === 'menu' ? (
              <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
            ) : (
              <button
                onClick={() => setView('menu')}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back to menu"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {renderContent()}
        </div>
      </div>
    </>
  );
}
