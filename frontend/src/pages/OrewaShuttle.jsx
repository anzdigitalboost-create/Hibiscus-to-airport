import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, MapPin, Clock, DollarSign, Zap, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';

const OrewaShuttle = () => {
  return (
    <div className="min-h-screen bg-black">
      <PageMeta
        title="Orewa to Auckland Airport Shuttle"
        description="Premium airport shuttle from Orewa to Auckland Airport via Northern Busway Express. Local drivers, 24/7 service. Book online instantly."
        path="/orewa-airport-shuttle"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <span className="bg-gold/20 border border-gold/50 text-gold px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                LOCAL SERVICE
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Orewa Airport Shuttle Service
              <span className="block text-gold mt-2">Premium Transfers to Auckland Airport</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
              Your trusted local airport shuttle from Orewa to Auckland Airport. Fast, reliable, and affordable using the Northern Busway Express route.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild className="bg-gold hover:bg-amber-500 text-black px-8 py-6 text-lg font-bold shadow-2xl shadow-gold/20 hover:scale-105 transition-all duration-300">
                <Link to="/book-now">
                  Book Your Orewa Transfer
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-gold/50 hover:border-gold text-gold hover:bg-gold/10 px-8 py-6 text-lg font-semibold">
                <Link to="/book-now">
                  Get Instant Quote
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gray-900/60 backdrop-blur-md border border-gold/20 rounded-xl p-4">
                <Clock className="w-8 h-8 text-gold mb-2" />
                <div className="text-2xl font-bold text-white">45 min</div>
                <div className="text-sm text-gray-400">To Airport</div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-md border border-gold/20 rounded-xl p-4">
                <Zap className="w-8 h-8 text-gold mb-2" />
                <div className="text-2xl font-bold text-white">Express</div>
                <div className="text-sm text-gray-400">Via Busway</div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-md border border-gold/20 rounded-xl p-4">
                <Shield className="w-8 h-8 text-gold mb-2" />
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Northern Busway Benefits */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Choose Our <span className="text-gold">Northern Busway Express</span> Route?
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Skip the motorway congestion - our express route via Northern Busway gets you to the airport faster and stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold transition-all duration-300">
              <Zap className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Faster Journey</h3>
              <p className="text-gray-400 leading-relaxed">
                Bypass motorway traffic using the dedicated Northern Busway. Save up to 20 minutes on peak travel times.
              </p>
            </div>
            
            <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold transition-all duration-300">
              <DollarSign className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Better Value</h3>
              <p className="text-gray-400 leading-relaxed">
                More efficient route means lower costs. Enjoy premium service at competitive prices for Orewa residents.
              </p>
            </div>
            
            <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold transition-all duration-300">
              <Shield className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Reliable Timing</h3>
              <p className="text-gray-400 leading-relaxed">
                Predictable journey times with no traffic surprises. Never miss your flight due to unexpected delays.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Areas in Orewa */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            We Service All of <span className="text-gold">Orewa</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Orewa Beach',
              'Orewa Central',
              'Millwater',
              'Milldale',
              'Hibiscus Coast Highway',
              'Centreway Road',
              'Moana Avenue',
              'Koura Drive',
              'All Orewa Schools',
              'Business Districts',
              'Residential Areas',
              'Coastal Properties'
            ].map((area, idx) => (
              <div key={idx} className="flex items-center bg-gray-900/60 border border-gold/20 rounded-lg p-4 hover:border-gold transition-colors duration-300">
                <MapPin className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                <span className="text-gray-300">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Book Your Orewa Airport Transfer?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience the fastest route from Orewa to Auckland Airport via Northern Busway Express
          </p>
          <Button asChild className="bg-gold hover:bg-amber-500 text-black px-10 py-7 text-lg font-bold shadow-2xl shadow-gold/20 hover:scale-105 transition-all duration-300">
            <Link to="/book-now">
              Book Now - Orewa Service
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OrewaShuttle;