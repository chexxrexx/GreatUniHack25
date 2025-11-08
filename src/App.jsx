import React, { useState } from "react";

// Navbar component
function Navbar() {
  return (
    <nav
      style={{
        width: "98%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#4f46e5",
        color: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>HolidayBuddy</div>
      <div style={{ fontSize: "1.5rem", cursor: "pointer" }}>&#9776;</div>
    </nav>
  );
}

// List of countries (can expand)
const countries = [
  "Japan",
  "Brazil",
  "France",
  "Kenya",
  "Australia",
  "Canada",
  "Italy",
  "India",
  "Egypt",
  "Mexico",
];

export default function App() {
  const [pickedCountry, setPickedCountry] = useState("");

  const spinGlobe = () => {
    const random = countries[Math.floor(Math.random() * countries.length)];
    setPickedCountry(random);
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          width: "100%",
          position: "fixed",
          paddingTop: "70px", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 70px)",
          textAlign: "center",
        }}
      >
        {/* Spinning globe */}
        <div
          onClick={spinGlobe}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "conic-gradient(#4f46e5, #22c55e, #f59e0b, #ef4444, #4f46e5)",
            animation: "spin 3s linear infinite",
            cursor: "pointer",
            marginBottom: "2rem",
          }}
        ></div>

        {pickedCountry && (
          <h2>You landed on: {pickedCountry} 🌍</h2>
        )}
        <p>Click the globe to spin!</p>
      </div>

      {/* Keyframes for spinning */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
