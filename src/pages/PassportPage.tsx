import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';

const passportPages = [
  {
    title: 'Cover',
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-r-lg">
        <Plane className="w-16 h-16 mb-4" />
        <h1 className="text-4xl font-bold mb-2">PASSPORT</h1>
        <p className="text-xl">HolidayBuddy</p>
        <div className="mt-8 w-24 h-24 border-4 border-white/50 rounded-full" />
      </div>
    ),
  },
  {
    title: 'Page 1',
    content: (
      <div className="h-full p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-r-lg">
        <div className="border-2 border-gray-300 p-6 h-full rounded-lg bg-white/60">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Personal Information</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex border-b pb-2">
              <span className="font-semibold w-32">Name:</span>
              <span>Travel Enthusiast</span>
            </div>
            <div className="flex border-b pb-2">
              <span className="font-semibold w-32">Nationality:</span>
              <span>World Citizen</span>
            </div>
            <div className="flex border-b pb-2">
              <span className="font-semibold w-32">Passport No:</span>
              <span>HB2024001</span>
            </div>
            <div className="flex border-b pb-2">
              <span className="font-semibold w-32">Issue Date:</span>
              <span>01 Jan 2024</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Page 2',
    content: (
      <div className="h-full p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-r-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Visa Stamps</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-4 border-red-600 rounded-lg p-3 bg-red-50 transform -rotate-3">
            <p className="text-xs font-bold text-red-800">JAPAN</p>
            <p className="text-xl">🇯🇵</p>
            <p className="text-xs text-red-700">15 Mar 2024</p>
          </div>
          <div className="border-4 border-blue-600 rounded-lg p-3 bg-blue-50 transform rotate-2">
            <p className="text-xs font-bold text-blue-800">FRANCE</p>
            <p className="text-xl">🇫🇷</p>
            <p className="text-xs text-blue-700">22 Apr 2024</p>
          </div>
          <div className="border-4 border-green-600 rounded-lg p-3 bg-green-50 transform rotate-1">
            <p className="text-xs font-bold text-green-800">BRAZIL</p>
            <p className="text-xl">🇧🇷</p>
            <p className="text-xs text-green-700">08 Jun 2024</p>
          </div>
          <div className="border-4 border-yellow-600 rounded-lg p-3 bg-yellow-50 transform -rotate-2">
            <p className="text-xs font-bold text-yellow-800">AUSTRALIA</p>
            <p className="text-xl">🇦🇺</p>
            <p className="text-xs text-yellow-700">30 Jul 2024</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Page 3',
    content: (
      <div className="h-full p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-r-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Travel Memories</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="font-semibold text-gray-800">Egypt - Pyramids of Giza</p>
            <p className="text-sm text-gray-600">An unforgettable experience!</p>
            <p className="text-xs text-gray-500 mt-1">🇪🇬 12 Sep 2024</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="font-semibold text-gray-800">Greece - Santorini Sunset</p>
            <p className="text-sm text-gray-600">Most beautiful sunset ever seen</p>
            <p className="text-xs text-gray-500 mt-1">🇬🇷 05 Oct 2024</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="font-semibold text-gray-800">Thailand - Bangkok Street Food</p>
            <p className="text-sm text-gray-600">Amazing culinary adventure</p>
            <p className="text-xs text-gray-500 mt-1">🇹🇭 20 Oct 2024</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function PassportPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleNextPage = () => {
    if (currentPage < passportPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex items-center justify-center p-8">
      <div className="relative">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">My Travel Passport</h1>

        <div className="relative" style={{ perspective: '2000px' }}>
          <div
            className={`relative w-[600px] h-[400px] transition-transform duration-600 ease-in-out ${
              isFlipping ? 'animate-flip' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-2xl">
              <div className="absolute left-0 w-8 h-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-l-lg" />

              <div className="ml-8 h-full">{passportPages[currentPage].content}</div>
            </div>
          </div>

          <div className="absolute -left-16 top-1/2 -translate-y-1/2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || isFlipping}
              className={`p-3 rounded-full bg-white shadow-lg transition-all ${
                currentPage === 0 || isFlipping
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-50 hover:shadow-xl hover:scale-110'
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="absolute -right-16 top-1/2 -translate-y-1/2">
            <button
              onClick={handleNextPage}
              disabled={currentPage === passportPages.length - 1 || isFlipping}
              className={`p-3 rounded-full bg-white shadow-lg transition-all ${
                currentPage === passportPages.length - 1 || isFlipping
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-50 hover:shadow-xl hover:scale-110'
              }`}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {passportPages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentPage ? 'bg-blue-600 w-8' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>

        <p className="text-center mt-4 text-gray-600">
          Page {currentPage + 1} of {passportPages.length}
        </p>
      </div>

      <style>{`
        @keyframes flip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-90deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
        .animate-flip {
          animation: flip 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
