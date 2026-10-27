import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';

// Booking CTA with phone/email only — no contact form (see CLAUDE.md).
const Contact = () => {
  return (
    <div className="min-h-screen bg-black">
      <PageMeta
        title="Contact Us"
        description="Contact Hibiscus to Airport. Call 021 743 321 or email info@bookaride.co.nz — available 24/7. Book your Hibiscus Coast airport transfer online."
        path="/contact"
      />
      <Header />

      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 mb-10">
            We're available 24/7, including public holidays. The fastest way to get a price is to book online.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <a href="tel:+6421743321" className="bg-gray-900/80 border border-gold/30 hover:border-gold rounded-xl p-6 transition-colors duration-300">
              <Phone className="w-8 h-8 text-gold mx-auto mb-3" />
              <div className="text-sm text-gray-400 mb-1">Call or text</div>
              <div className="text-xl font-bold text-white">021 743 321</div>
            </a>
            <a href="mailto:info@bookaride.co.nz" className="bg-gray-900/80 border border-gold/30 hover:border-gold rounded-xl p-6 transition-colors duration-300">
              <Mail className="w-8 h-8 text-gold mx-auto mb-3" />
              <div className="text-sm text-gray-400 mb-1">Email</div>
              <div className="text-xl font-bold text-white">info@bookaride.co.nz</div>
            </a>
          </div>

          <Button asChild className="bg-gold hover:bg-amber-500 text-black font-bold py-6 px-8 text-lg">
            <Link to="/book-now">
              Book Your Transfer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
