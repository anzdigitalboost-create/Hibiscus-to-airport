import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Button } from '../components/ui/button';
import { Plane, Clock, Shield, DollarSign } from 'lucide-react';

const AucklandAirportTransfers = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Auckland Airport Transfers"
        description="Fast, reliable Auckland Airport transfers from Hibiscus Coast. Professional drivers and luxury vehicles. Book online 24/7."
        path="/auckland-airport-transfers"
      />
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Auckland Airport Transfers
            <span className="block text-gold mt-3">Fast, Reliable Airport Shuttle Service</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Professional transfers to and from Auckland International Airport
          </p>
          <Button asChild className="bg-gold hover:bg-amber-500 text-black font-bold text-lg px-8 py-6">
            <Link to="/book-now">
              Book Airport Transfer Now
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <Plane className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Flight Tracking</h3>
              <p className="text-gray-600">We monitor your flight arrival</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">24/7 Service</h3>
              <p className="text-gray-600">Available anytime, day or night</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Safe & Insured</h3>
              <p className="text-gray-600">Fully licensed and insured</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive rates guaranteed</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">Auckland Airport Shuttle Specialist</h2>
            <p className="text-lg text-gray-700 mb-4">
              Hibiscus to Airport provides premium shuttle services between the Hibiscus Coast and Auckland International Airport. With years of experience, we ensure your journey is comfortable, safe, and on time.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">Why Choose Our Airport Transfers?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Door-to-door service from any Hibiscus Coast location</li>
              <li>✓ Meet and greet at arrivals terminal</li>
              <li>✓ Professional, experienced drivers</li>
              <li>✓ Modern, clean, and comfortable vehicles</li>
              <li>✓ Child seats available on request</li>
              <li>✓ Plenty of luggage space</li>
              <li>✓ Both domestic and international terminals</li>
              <li>✓ Online booking with instant confirmation</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Popular Routes:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Orewa to Auckland Airport</li>
              <li>• Silverdale to Auckland Airport</li>
              <li>• Whangaparaoa to Auckland Airport</li>
              <li>• Red Beach to Auckland Airport</li>
              <li>• Gulf Harbour to Auckland Airport</li>
              <li>• All Hibiscus Coast suburbs</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AucklandAirportTransfers;