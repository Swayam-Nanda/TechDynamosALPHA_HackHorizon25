import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FileFIR from "./pages/FileFIR";
import TrackFIR from "./pages/TrackFIR";
import SOS from "./pages/SOS";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmergencySOS from "./pages/Emergency";
import VerifyAadhaar from "./components/VerifyAadhaar";
import PoliceDashboard from "./pages/PoliceDashboard";

// Auth Context
import { AuthProvider } from "./context/AuthContext"; // Assuming you have AuthContext.js

// Components
import PrivateRoute from "./components/PrivateRoute"; // Protects routes

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-aadhaar" element={<VerifyAadhaar />} />

              {/* Private Routes - Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/file-fir" element={<FileFIR />} />
                <Route path="/track-fir" element={<TrackFIR />} />
                <Route path="/sos" element={<SOS />} />
                <Route path="/emergency" element={<EmergencySOS />} />
                <Route path="/police-dashboard" element={<PoliceDashboard />} />
              </Route>
            </Routes>
          </div>
          <Footer /> {/* 👣 Footer stays at the bottom */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
