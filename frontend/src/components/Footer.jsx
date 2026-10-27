import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { trustBadges } from '../mock';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="font-semibold text-gold mb-2 text-sm tracking-wide uppercase">
                  {badge.title}
                </div>
                <div className="text-sm text-gray-400">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Logo size="small" className="text-white" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium airport shuttle and private transfer service connecting Hibiscus Coast to Auckland Airport with reliability and comfort.
            </p>
            <a href="mailto:info@bookaride.co.nz" className="inline-flex items-center text-gold hover:text-amber-400 transition-colors duration-300 font-medium">
              <Mail className="w-5 h-5 mr-2" />
              info@bookaride.co.nz
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-gold tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="/student-airport-transfers" className="text-gray-400 hover:text-white transition-colors duration-300">Student Services</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</a>
              </li>
              <li>
                <a href="#fleet" className="text-gray-400 hover:text-white transition-colors duration-300">Fleet</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-gold tracking-wide uppercase">Service Areas</h4>
            <ul className="space-y-3">
              <li>
                <a href="/orewa-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300">Orewa Airport Shuttle</a>
              </li>
              <li>
                <a href="/silverdale-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300">Silverdale Transfers</a>
              </li>
              <li>
                <a href="/whangaparaoa-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300">Whangaparaoa Shuttle</a>
              </li>
              <li>
                <a href="/red-beach-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300">Red Beach Service</a>
              </li>
              <li>
                <a href="/service-areas" className="text-gray-400 hover:text-white transition-colors duration-300">View All Areas</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-gold tracking-wide uppercase">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:info@bookaride.co.nz" className="text-gray-400 hover:text-white transition-colors duration-300">
                  info@bookaride.co.nz
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Hibiscus Coast<br />Auckland, New Zealand
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Service Areas & Pages SEO Links */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Suburb Shuttle Links */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-gold tracking-wide uppercase">Service Areas</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
                <Link to="/orewa-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Orewa</Link>
                <Link to="/whangaparaoa-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Whangaparaoa</Link>
                <Link to="/silverdale-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Silverdale</Link>
                <Link to="/red-beach-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Red Beach</Link>
                <Link to="/gulf-harbour-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Gulf Harbour</Link>
                <Link to="/stanmore-bay-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Stanmore Bay</Link>
                <Link to="/albany-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Albany</Link>
                <Link to="/browns-bay-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Browns Bay</Link>
                <Link to="/takapuna-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Takapuna</Link>
                <Link to="/devonport-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Devonport</Link>
                <Link to="/millwater-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Millwater</Link>
                <Link to="/warkworth-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Warkworth</Link>
              </div>
            </div>

            {/* Service Page Links */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-gold tracking-wide uppercase">Our Services</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Link to="/corporate-airport-transfers" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Corporate Transfers</Link>
                <Link to="/early-morning-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Early Morning Shuttle</Link>
                <Link to="/family-airport-shuttle" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Family Shuttle</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Hibiscus to Airport. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
