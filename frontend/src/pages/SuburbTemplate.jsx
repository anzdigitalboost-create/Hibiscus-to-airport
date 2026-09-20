// Template component for creating suburb-specific pages
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { ArrowRight, MapPin, Clock, DollarSign, Zap, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';

export const createSuburbPage = (suburbName, travelTime, localAreas, meta = {}) => {
  const slug = meta.path || '/';
  const localBusinessSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Hibiscus to Airport - ${suburbName} Shuttle`,
    "description": `Airport shuttle service from ${suburbName} to Auckland Airport`,
    "url": `https://hibiscustoairport.co.nz${slug}`,
    "email": "info@bookaride.co.nz",
    "areaServed": {
      "@type": "Place",
      "name": `${suburbName}, Auckland, New Zealand`
    },
    "serviceType": "Airport Shuttle Service",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  });

  return () => (
    <div className="min-h-screen bg-white">
      {meta.title && (
        <PageMeta
          title={meta.title}
          description={meta.description}
          path={meta.path}
        />
      )}
      <Helmet>
        <script type="application/ld+json">{localBusinessSchema}</script>
      </Helmet>
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-gold text-black px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                Local Service
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {suburbName}
              <span className="block text-gold mt-2">Airport Shuttle</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Professional airport shuttle service from {suburbName} to Auckland Airport. Fast, reliable transfers with experienced local drivers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => window.location.href = '/book-now'}
                className="bg-gold hover:bg-amber-500 text-black px-10 py-7 text-lg font-bold shadow-xl"
              >
                Book Your Transfer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <Clock className="w-8 h-8 text-gold mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">{travelTime}</div>
                <div className="text-sm text-gray-300">To Airport</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <Zap className="w-8 h-8 text-gold mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">Express</div>
                <div className="text-sm text-gray-300">Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <Shield className="w-8 h-8 text-gold mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-300">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Choose Our <span className="text-gold">Service</span>?
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gold hover:shadow-xl transition-all duration-300">
              <Zap className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Faster Journey</h3>
              <p className="text-gray-600 leading-relaxed">
                Efficient routes and experienced drivers ensure you reach the airport on time, every time.
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gold hover:shadow-xl transition-all duration-300">
              <DollarSign className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Competitive pricing with no hidden fees. Premium service for {suburbName} residents.
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gold hover:shadow-xl transition-all duration-300">
              <Shield className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Reliable Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Fully licensed and insured. Track your driver and get real-time updates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            We Service All of <span className="text-gold">{suburbName}</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localAreas.map((area, idx) => (
              <div key={idx} className="flex items-center bg-white border border-gray-200 rounded-lg p-4 hover:border-gold hover:shadow-md transition-all duration-300">
                <MapPin className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Book Your Airport Transfer?
          </h2>
          <p className="text-xl text-gray-200 mb-10">
            Professional service from {suburbName} to Auckland Airport
          </p>
          <Button 
            onClick={() => window.location.href = '/book-now'}
            className="bg-gold hover:bg-amber-500 text-black px-12 py-7 text-lg font-bold shadow-2xl"
          >
            Book Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};