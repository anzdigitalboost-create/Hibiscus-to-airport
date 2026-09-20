import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Button } from '../components/ui/button';
import { Calendar, Music, Wine, ShoppingBag, MapPin, Clock } from 'lucide-react';

const MatakanaShuttle = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Matakana Shuttle and Transport Service"
        description="Shuttle service to Matakana for markets, wineries, concerts and events. Premium transport from Hibiscus Coast. Book online today."
        path="/matakana-shuttle"
      />
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-gold text-black px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                Event Transport
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Matakana Shuttle Service
              <span className="block text-gold mt-2">From Hibiscus Coast</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Safe, reliable transport to Matakana concerts, farmers market, wineries & events. No drinking & driving worries!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => window.location.href = '/book-now'}
                className="bg-gold hover:bg-amber-500 text-black px-10 py-7 text-lg font-bold shadow-xl"
              >
                Book Matakana Shuttle
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <Clock className="w-8 h-8 text-gold mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">35 min</div>
                <div className="text-sm text-gray-300">From Orewa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <Wine className="w-8 h-8 text-gold mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">Safe</div>
                <div className="text-sm text-gray-300">No DUI Risk</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <Music className="w-8 h-8 text-gold mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">All Events</div>
                <div className="text-sm text-gray-300">Concerts & More</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Popular <span className="text-gold">Matakana Destinations</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gold hover:shadow-xl transition-all">
              <ShoppingBag className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Farmers Market</h3>
              <p className="text-gray-600 text-sm">Saturday mornings - Matakana's famous market with local produce, crafts & food</p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gold hover:shadow-xl transition-all">
              <Music className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Concerts & Shows</h3>
              <p className="text-gray-600 text-sm">Live music at Matakana Cinemas, wineries & outdoor venues year-round</p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gold hover:shadow-xl transition-all">
              <Wine className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Winery Tours</h3>
              <p className="text-gray-600 text-sm">Visit Ascension, Hyperion, Mahurangi & other premium wineries safely</p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gold hover:shadow-xl transition-all">
              <Calendar className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Special Events</h3>
              <p className="text-gray-600 text-sm">Festivals, food events, art shows & seasonal celebrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            We Pick Up From All <span className="text-gold">Hibiscus Coast Areas</span>
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Orewa', 'Silverdale', 'Whangaparaoa', 'Red Beach', 'Gulf Harbour',
              'Stanmore Bay', 'Arkles Bay', 'Army Bay', 'Hatfields Beach',
              'Manly', 'Milldale', 'Dairy Flat'
            ].map((area, idx) => (
              <div key={idx} className="flex items-center bg-white border border-gray-200 rounded-lg p-4 hover:border-gold hover:shadow-md transition-all">
                <MapPin className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why Book Our <span className="text-gold">Matakana Shuttle</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy Responsibly</h3>
              <p className="text-gray-600">
                Visit wineries and enjoy tastings without worrying about driving. We'll get you home safely.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Pickup Times</h3>
              <p className="text-gray-600">
                Early market runs, afternoon wine tours, or late concert pickups - we accommodate your schedule.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Group Friendly</h3>
              <p className="text-gray-600">
                Traveling with friends? Our vans accommodate up to 11 passengers for your group outings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready for Your Matakana Adventure?
          </h2>
          <p className="text-xl text-gray-200 mb-10">
            Book your shuttle from Hibiscus Coast to Matakana today
          </p>
          <Button 
            onClick={() => window.location.href = '/book-now'}
            className="bg-gold hover:bg-amber-500 text-black px-12 py-7 text-lg font-bold shadow-2xl"
          >
            Book Now
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MatakanaShuttle;
