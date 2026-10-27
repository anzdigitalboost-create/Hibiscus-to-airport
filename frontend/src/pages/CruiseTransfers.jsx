import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Button } from '../components/ui/button';
import { Ship, MapPin, Clock, Luggage } from 'lucide-react';

const CruiseTransfers = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Cruise Ship Transfers Auckland"
        description="Cruise ship transfers between Auckland Port and Auckland Airport. Luggage-friendly vehicles, meet and greet. Book online 24/7."
        path="/cruise-ship-transfers"
      />
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Cruise Ship Transfers
            <span className="block text-gold mt-3">Auckland Port to Airport & Beyond</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Seamless transportation between cruise terminals and Auckland Airport
          </p>
          <Button asChild className="bg-gold hover:bg-amber-500 text-black font-bold text-lg px-8 py-6">
            <Link to="/book-now">
              Book Cruise Transfer
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <Ship className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Port Pickup</h3>
              <p className="text-gray-600">Direct from cruise terminal</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">All Terminals</h3>
              <p className="text-gray-600">Princes Wharf & Queens Wharf</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Flexible Timing</h3>
              <p className="text-gray-600">Match your ship's schedule</p>
            </div>
            <div className="text-center">
              <Luggage className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Luggage Handling</h3>
              <p className="text-gray-600">Assistance with all baggage</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">Cruise Ship Transfer Specialist</h2>
            <p className="text-lg text-gray-700 mb-4">
              Whether you're disembarking from your cruise or need to catch a flight, our cruise ship transfer service ensures a smooth, stress-free journey. We're familiar with all Auckland cruise terminals and their procedures.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">Our Cruise Transfer Services:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Cruise terminal to Auckland Airport</li>
              <li>✓ Airport to cruise terminals</li>
              <li>✓ Pre-cruise hotel transfers</li>
              <li>✓ Post-cruise accommodation transfers</li>
              <li>✓ Meet and greet at terminal</li>
              <li>✓ Luggage assistance</li>
              <li>✓ Flight schedule coordination</li>
              <li>✓ Large vehicle options for groups</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Auckland Cruise Terminals We Serve:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Princes Wharf (City Centre)</li>
              <li>• Queens Wharf</li>
              <li>• Silo Park</li>
              <li>• All major cruise lines</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CruiseTransfers;