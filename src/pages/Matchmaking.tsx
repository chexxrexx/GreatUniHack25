// src/pages/MatchmakingPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Profile {
  name: string;
  age: number;
  hobbies: string[];
  country: string;
}

export default function MatchmakingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hardcoded example profile (you can replace this with dynamic logic later)
  const profile: Profile = {
    name: 'Alex',
    age: 27,
    hobbies: ['Hiking', 'Cooking', 'Photography'],
    country: 'Spain'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold mb-2">{profile.name}, {profile.age}</h2>
        <p className="text-xl text-gray-600 mb-4">From: {profile.country}</p>
        <p className="text-gray-700 mb-4">Hobbies: {profile.hobbies.join(', ')}</p>
        <button
          onClick={() => navigate('/globe')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Globe
        </button>
      </div>
    </div>
  );
}
