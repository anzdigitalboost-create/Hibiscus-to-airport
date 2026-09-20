import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
    } border-b border-[#E2E8F0]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-light text-[#1E293B] tracking-[0.15em] uppercase">
              Hibiscus
            </span>
            <div className="w-5 h-px bg-[#D4AF37]"></div>
            <span className="text-base sm:text-lg font-light text-[#1E293B] tracking-[0.15em] uppercase">
              Airport
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link to="/service-areas" className="text-[#64748B] hover:text-[#1E293B] transition-colors text-sm font-medium">
              Service Areas
            </Link>
            <Link to="/faq" className="text-[#64748B] hover:text-[#1E293B] transition-colors text-sm font-medium">
              FAQ
            </Link>
            <Link
              to="/book-now"
              className="bg-[#D4AF37] hover:bg-[#C4A030] text-white px-6 py-2.5 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#64748B] hover:text-[#1E293B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0]">
          <div className="px-4 py-3 space-y-1">
            {[
              { to: '/service-areas', label: 'Service Areas' },
              { to: '/faq', label: 'FAQ' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block py-3 px-3 rounded-lg text-[#1E293B] hover:bg-[#F8FAFC] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#E2E8F0]">
              <Link
                to="/book-now"
                className="block w-full text-center bg-[#D4AF37] hover:bg-[#C4A030] text-white py-3 px-6 rounded-lg font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
