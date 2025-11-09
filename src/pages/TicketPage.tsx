// src/pages/TicketPage.tsx
import React, { useEffect, useState } from "react";
import { QrCode, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TicketPage() {
  const navigate = useNavigate();
  const [attractions, setAttractions] = useState<string[]>([]);
  const landmarkImg =
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=60"; // Eiffel Tower fallback

  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions")
      .then((res) => res.json())
      .then((data) => {
        if (data.places) setAttractions(data.places);
        else console.error("No attractions found:", data);
      })
      .catch((err) => console.error("Error fetching attractions:", err));
  }, []);

  const handleScan = () => navigate("/scan");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white p-6">
      <header className="w-full max-w-3xl mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Tickets
        </h1>
      </header>

      {attractions.length > 0 ? (
        attractions.map((place, idx) => (
          <section
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-6 w-full max-w-3xl"
          >
            <div className="h-3 bg-blue-600 w-full" />
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <p className="text-xs text-gray-400">Passenger</p>
                <p className="font-semibold text-gray-900">A. Traveller</p>

                <p className="mt-3 text-xs text-gray-400">Flight</p>
                <p className="font-semibold text-gray-900">HB123</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">Attraction</p>
                <p className="text-xl font-bold text-gray-900">{place}</p>

                <p className="mt-2 text-xs text-gray-400">Date</p>
                <p className="font-medium text-gray-800">
                  {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">Seat</p>
                <p className="font-semibold text-gray-900 text-lg">12A</p>

                <div className="mt-4 inline-flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center shadow-sm">
                    <QrCode className="w-10 h-10 text-gray-700" />
                  </div>
                  <div className="text-xs text-gray-500">
                    QR for boarding
                    <br />
                    (tap SCAN)
                  </div>
                </div>
              </div>
            </div>

            {/* Attraction info */}
            <div className="border-t border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" /> Visit: {place}
              </h2>
              <img
                src={landmarkImg}
                alt={place}
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>

            {/* CTA */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
                  <span className="text-sm font-semibold text-blue-600">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleScan}
                className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                SCAN
              </button>
            </div>
          </section>
        ))
      ) : (
        <p className="text-sm text-gray-500 mt-10">Fetching attractions...</p>
      )}
    </div>
  );
}
