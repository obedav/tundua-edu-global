// src/components/common/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tundua EDU</h3>
            <p className="text-gray-400">
              Empowering global education through accessible online learning.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-gray-400 hover:text-white">All Courses</Link></li>
              <li><Link to="/universities" className="text-gray-400 hover:text-white">Universities</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tundua EDU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};