import React from 'react';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const countries = [
  { name: 'Japan', emoji: '🇯🇵', color: 'text-red-500' },
  { name: 'France', emoji: '🇫🇷', color: 'text-blue-500' },
  { name: 'Brazil', emoji: '🇧🇷', color: 'text-green-500' },
  { name: 'Australia', emoji: '🇦🇺', color: 'text-yellow-500' },
  { name: 'Egypt', emoji: '🇪🇬', color: 'text-orange-500' },
  { name: 'Canada', emoji: '🇨🇦', color: 'text-red-600' },
  { name: 'Italy', emoji: '🇮🇹', color: 'text-green-600' },
  { name: 'Thailand', emoji: '🇹🇭', color: 'text-blue-600' },
  { name: 'Spain', emoji: '🇪🇸', color: 'text-yellow-600' },
  { name: 'South Korea', emoji: '🇰🇷', color: 'text-blue-700' },
  { name: 'Greece', emoji: '🇬🇷', color: 'text-blue-400' },
  { name: 'Mexico', emoji: '🇲🇽', color: 'text-green-700' },
  { name: 'India', emoji: '🇮🇳', color: 'text-orange-600' },
  { name: 'United Kingdom', emoji: '🇬🇧', color: 'text-blue-800' },
  { name: 'Germany', emoji: '🇩🇪', color: 'text-yellow-700' },
];

export default function GlobePage() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCountry, setShowCountry] = useState(false);

  useEffect(() => {
    if (!isSpinning) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isSpinning]);

  const handleGlobeClick = () => {
    setIsSpinning(false);
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    setSelectedCountry('France');
    setShowCountry(true);

    setTimeout(() => {
      setIsSpinning(true);
      setShowCountry(false);
      setSelectedCountry(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center top-margin: mt-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Click the globe to explore a random destination
        </p>

        <div className="relative inline-block">
          <button
            onClick={handleGlobeClick}
            className="relative group cursor-pointer focus:outline-none"
            disabled={!isSpinning}
          >
            <div
              className="w-64 h-64 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <Globe className="w-64 h-64 text-blue-500 drop-shadow-2xl" strokeWidth={1.5} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                  style={{
                    top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 8)}%`,
                    left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </button>

          {showCountry && selectedCountry && (
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 border-4 border-blue-500">
                <p className="text-6xl mb-2">
                  {countries.find((c) => c.name === selectedCountry)?.emoji}
                </p>
                <p className="text-2xl font-bold text-gray-800">{selectedCountry}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-4">
          {countries.map((country, index) => (
            <div
              key={country.name}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <p className="text-4xl mb-2">{country.emoji}</p>
              <p className="text-sm font-semibold text-gray-700">{country.name}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
