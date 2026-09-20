import React from 'react';
import { Button } from '../components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Link } from 'react-router-dom';

const ServiceAreas = () => {
  const majorAreas = [
    { name: 'Orewa', route: '/orewa-airport-shuttle', description: 'Beach town with easy Northern Busway access' },
    { name: 'Silverdale', route: '/silverdale-airport-shuttle', description: 'Growing suburb with excellent connectivity' },
    { name: 'Whangaparaoa', route: '/whangaparaoa-airport-shuttle', description: 'Peninsula with premium shuttle service' },
    { name: 'Red Beach', route: '/red-beach-airport-shuttle', description: 'Coastal community, fast airport access' },
    { name: 'Gulf Harbour', route: '/gulf-harbour-airport-shuttle', description: 'Marina precinct, luxury transfers' },
    { name: 'Millwater', route: '/millwater-airport-shuttle', description: 'New development, modern service' }
  ];
  
  const allSuburbs = [
    'Orewa', 'Silverdale', 'Red Beach', 'Stanmore Bay', 'Manly',
    'Gulf Harbour', 'Whangaparaoa', 'Arkles Bay', 'Matakatia',
    'Weiti', 'Okura', 'Dairy Flat', 'Wainui', 'Warkworth',
    'Millwater', 'Milldale', 'Orewa Beach', 'Hatfields Beach',
    'Army Bay', 'Tindalls Beach', 'Little Manly', 'Big Manly'
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageMeta
        title="Service Areas - Suburbs We Cover"
        description="Airport shuttle service areas across Hibiscus Coast, Orewa, Whangaparaoa, Silverdale and North Shore to Auckland Airport. Book online 24/7."
        path="/service-areas"
      />
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Airport Shuttle Service Areas
            <span className="block text-gold mt-3">Serving Hibiscus Coast & Beyond</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Premium airport transfers across Rodney, Hibiscus Coast, and Whangaparaoa Peninsula using the fast Northern Busway Express route
          </p>
        </div>
      </section>
      
      {/* Major Service Areas */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Featured <span className="text-gold">Service Areas</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {majorAreas.map((area, idx) => (
              <Link key={idx} to={area.route} className="group">
                <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300">
                  <MapPin className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {area.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{area.description}</p>
                  <div className="flex items-center text-gold font-semibold">
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Suburbs */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Complete Coverage Area
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            We service all suburbs across Hibiscus Coast, Rodney, and Whangaparaoa Peninsula
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allSuburbs.map((suburb, idx) => (
              <div key={idx} className="flex items-center bg-gray-900/60 border border-gold/20 rounded-lg p-4 hover:border-gold hover:bg-gray-900 transition-all duration-300">
                <MapPin className="w-4 h-4 text-gold mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{suburb}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Northern Busway Highlight */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Fast Track via <span className="text-gold">Northern Busway Express</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            All our routes utilize the Northern Busway for faster, more reliable airport transfers. Skip the motorway traffic and arrive on time, every time.
          </p>
          <a href="/book-now">
            <Button className="bg-gold hover:bg-amber-500 text-black px-10 py-7 text-lg font-bold shadow-2xl shadow-gold/20 hover:scale-105 transition-all duration-300">
              Book Your Transfer Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceAreas;