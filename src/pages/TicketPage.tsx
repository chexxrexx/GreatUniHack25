// src/pages/TicketPage.tsx
import React from 'react';
import { QrCode, MapPin } from 'lucide-react';

interface TicketPageProps {
  passengerName?: string;
  from?: string;
  to?: string;
  flight?: string;
  date?: string;
  seat?: string;
}

const LANDMARKS: Record<string, { name: string; img: string }> = {
  tokyo: {
    name: 'Tokyo Tower',
    img: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1200&q=60',
  },
  paris: {
    name: 'Eiffel Tower',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=60',
  },
  newyork: {
    name: 'Statue of Liberty',
    img: 'https://images.unsplash.com/photo-1505765056287-1c2f9f0b2f4d?auto=format&fit=crop&w=1200&q=60',
  },
  sydney: {
    name: 'Sydney Opera House',
    img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=60',
  },
  default: {
    name: 'Famous Landmark',
    img: 'https://images.unsplash.com/photo-1508685096480-7f8b2b2d4f84?auto=format&fit=crop&w=1200&q=60',
  },
};

export default function TicketPage({
  passengerName = 'A. Traveller',
  from = 'LHR',
  to = 'paris',
  flight = 'HB123',
  date = '2025-11-20',
  seat = '12A',
}: TicketPageProps) {
  const destKey = (to || '').toLowerCase().replace(/\s+/g, '') as keyof typeof LANDMARKS;
  const landmark = LANDMARKS[destKey] ?? LANDMARKS.default;

  const handleScan = () => {
    window.alert('Scan initiated! Launching camera for AR experience... (not implemented)');
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="w-full max-w-3xl mt-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Tickets</h1>
        </header>

        <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="h-3 bg-blue-600 w-full" />
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <p className="text-xs text-gray-400">Passenger</p>
              <p className="font-semibold text-gray-900">{passengerName}</p>

              <p className="mt-3 text-xs text-gray-400">Flight</p>
              <p className="font-semibold text-gray-900">{flight}</p>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-400">From → To</p>
              <p className="text-xl font-bold text-gray-900">{from} → {String(to).toUpperCase()}</p>

              <p className="mt-2 text-xs text-gray-400">Date</p>
              <p className="font-medium text-gray-800">{date}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">Seat</p>
              <p className="font-semibold text-gray-900 text-lg">{seat}</p>

              <div className="mt-4 inline-flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center shadow-sm">
                  <QrCode className="w-10 h-10 text-gray-700" />
                </div>
                <div className="text-xs text-gray-500">QR for boarding<br/>(tap SCAN)</div>
              </div>
            </div>
          </div>

          {/* CTA area */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
                <span className="text-sm font-semibold text-blue-600">{new Date(date).toLocaleDateString()}</span>
              </div>
            </div>

            <button
            onClick={handleScan}
            className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Scan to start PEAK game"
            >
            SCAN
            </button>

          </div>
        </section>
      </div>
    </div>
  );
}

/*
Usage (example):

import TicketPage from './pages/TicketPage';

<TicketPage
  passengerName="Yuna K-S"
  from="LHR"
  to="paris"
  flight="HB245"
  date="2025-11-20"
  seat="7C"
/>

Notes:
- Replace LANDMARKS image urls with your own assets or a dynamic lookup.
- Replace handleScan with camera/AR logic or deep link to the mini-game.
*/
