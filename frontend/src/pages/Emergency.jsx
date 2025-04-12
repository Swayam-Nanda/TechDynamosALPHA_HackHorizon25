import React from "react";

const EmergencySOS = () => {
  const handleSOS = () => {
    alert("🚨 Emergency Alert Sent! Authorities have been notified.");
    // You can integrate SMS, email, or backend logic here.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-red-400">
        Emergency SOS
      </h1>

      <button
        onClick={handleSOS}
        className="w-48 h-48 bg-red-600 hover:bg-red-700 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl font-bold border-4 border-white transition-transform transform hover:scale-105 active:scale-95"
      >
        SOS
      </button>

      <div className="mt-12 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-red-300">
          Important Helpline Numbers
        </h2>
        <ul className="space-y-2 text-lg">
          <li>
            <strong>Police:</strong> 100
          </li>
          <li>
            <strong>Ambulance:</strong> 102 / 108
          </li>
          <li>
            <strong>Women Helpline:</strong> 1091
          </li>
          <li>
            <strong>Child Helpline:</strong> 1098
          </li>
          <li>
            <strong>Disaster Management:</strong> 1078
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencySOS;
