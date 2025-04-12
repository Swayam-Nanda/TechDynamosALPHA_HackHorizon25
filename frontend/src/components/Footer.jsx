import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">
            🚓 Virtual Police
          </h2>
          <p className="text-sm leading-relaxed">
            Bringing law and order to your fingertips. File FIRs, track cases,
            and stay safe — all online.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-emerald-400">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to="/file-fir" className="hover:text-emerald-400">
                📄 File FIR
              </Link>
            </li>
            <li>
              <Link to="/track-fir" className="hover:text-emerald-400">
                🔍 Track FIR
              </Link>
            </li>
            <li>
              <Link to="/sos" className="hover:text-emerald-400">
                🚨 SOS
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-emerald-400">
                📞 Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@virtualpolice.in</p>
          <p className="text-sm">Phone: +91 12345 67890</p>
          <div className="flex gap-4 mt-4 text-2xl">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Virtual Police Station. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
