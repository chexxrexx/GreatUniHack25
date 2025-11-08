// src/pages/OnboardingPage.tsx

import React, { useState } from 'react';
import { User, DollarSign, MapPin, Smile, Check } from 'lucide-react';

// Define the props, including the callback function
interface OnboardingPageProps {
  onOnboardingComplete: () => void;
}

// Define steps
const steps = [
  { id: 1, name: 'Gender', icon: User },
  { id: 2, name: 'Budget', icon: DollarSign },
  { id: 3, name: 'Hobbies', icon: Smile },
  { id: 4, name: 'Countries', icon: MapPin },
  { id: 5, name: 'Done!', icon: Check },
];

export default function OnboardingPage({ onOnboardingComplete }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onOnboardingComplete(); // Tell App.tsx we are done
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Helper to render the content for the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">What is your gender?</h2>
            <div className="space-y-3">
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">Man</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">Woman</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">Non-binary</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">Prefer not to say</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">What's your typical budget?</h2>
            <div className="space-y-3">
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">$ (0-500)</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">$$ (500-1000)</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">$$$ (1000+)</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select your hobbies?</h2>
            <div className="space-y-3">
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">$ Hiking</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">$$ Swimming</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">$$$ Reading</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dream city to travel in?</h2>
            <div className="space-y-3">
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">Paris</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">Kuala Lumpur</button>
              <button onClick={handleNext} className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">London</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center">
            <Check className="w-24 h-24 text-green-500 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-800 mt-6">You're all set!</h2>
            <p className="text-gray-600 mt-2">Your profile is complete. Get ready to find your next HolidayBuddy!</p>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };
  // --- END OF REPLACEMENT ---


  // ... (keep the entire return (...) part of your component)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* ... all your existing JSX ... */}
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">Almost there!</h1>
          <p className="text-lg text-gray-600 mt-2">Help us personalize your experience.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex flex-col items-center ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-xs mt-2 font-semibold">{step.name}</span>
              </div>
              {index < steps.length - 1 && <div className="flex-1 h-1 bg-gray-200" />}
            </React.Fragment>
          ))}
        </div>

        {/* Form Content Area */}
        <div className="bg-white p-8 rounded-xl shadow-lg min-h-[300px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold"
          >
            {currentStep === steps.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}