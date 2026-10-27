import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Clock, Shield, Star, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

const EarlyMorningShuttle = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Early Morning Airport Shuttle"
        description="Early morning airport shuttle from Hibiscus Coast. 4AM-7AM transfers to Auckland Airport with guaranteed pickup times. Book online now."
        path="/early-morning-airport-shuttle"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Early Morning <span className="text-gold">Airport Shuttle</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Reliable 4AM-7AM airport transfers from Hibiscus Coast. Professional service for early flights with guaranteed pickup times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-black hover:bg-amber-500 px-8 py-4 text-lg">
              <Link to="/book-now">
                Book Early Morning Transfer
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              <Link to="/book-now">
                24/7 Booking Available
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Early Flight Times */}
      <section className="py-12 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black">Common Early Flight Departure Times</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-black rounded-lg p-4">
              <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
              <span className="text-white font-bold block">6:00 AM</span>
              <span className="text-gray-300 text-sm">Pickup: 4:15 AM</span>
            </div>
            <div className="bg-black rounded-lg p-4">
              <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
              <span className="text-white font-bold block">6:30 AM</span>
              <span className="text-gray-300 text-sm">Pickup: 4:45 AM</span>
            </div>
            <div className="bg-black rounded-lg p-4">
              <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
              <span className="text-white font-bold block">7:00 AM</span>
              <span className="text-gray-300 text-sm">Pickup: 5:15 AM</span>
            </div>
            <div className="bg-black rounded-lg p-4">
              <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
              <span className="text-white font-bold block">7:30 AM</span>
              <span className="text-gray-300 text-sm">Pickup: 5:45 AM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Reliable Early Morning Airport Transfers</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Don't risk missing your early morning flight with unreliable transport. Our professional early morning 
                airport shuttle service operates from 4:00 AM to 7:00 AM, ensuring you arrive at Auckland Airport 
                with plenty of time for check-in and security.
              </p>
              <p className="text-gray-700 mb-4">
                Many shuttle companies don't operate during early morning hours, leaving travelers stranded or 
                forcing them to stay overnight at expensive airport hotels. We specialize in early morning pickups 
                across the Hibiscus Coast with dedicated drivers who are ready and waiting.
              </p>
            </div>
          </div>

          {/* Why Choose Early Morning Service */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Our Early Morning Service is Different</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-gold mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">Guaranteed Availability</h4>
                    <p className="text-gray-700">24/7 operations means we're always available, even at 4 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-gold mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">Professional Drivers</h4>
                    <p className="text-gray-700">Alert, professional drivers who specialize in early morning runs</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-gold mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">Punctual Service</h4>
                    <p className="text-gray-700">Never late - we understand early flights can't be missed</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-gold mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">24/7 Support</h4>
                    <p className="text-gray-700">Email support available for any early morning concerns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Book Your Early Morning Airport Transfer</h3>
            <div className="bg-amber-50 rounded-2xl p-6 mb-6">
              <p className="text-amber-800 font-semibold mb-2">⏰ Important: Book Early Morning Transfers 24 Hours in Advance</p>
              <p className="text-amber-700">Early morning pickups require advance planning to ensure driver availability and route optimization.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">1</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Flight Details</h4>
                <p className="text-gray-600">Enter your early departure time and pickup location</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">2</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Confirm Booking</h4>
                <p className="text-gray-600">We'll calculate your pickup time and confirm availability</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">3</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Reliable Pickup</h4>
                <p className="text-gray-600">Driver arrives on time for stress-free early morning transfer</p>
              </div>
            </div>
          </div>

          {/* Coverage Areas */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Early Morning Pickup Areas</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-bold text-gold mb-3">Hibiscus Coast</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Orewa (all areas)</li>
                  <li>• Whangaparaoa Peninsula</li>
                  <li>• Silverdale</li>
                  <li>• Red Beach</li>
                  <li>• Gulf Harbour</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-3">North Shore</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Albany</li>
                  <li>• Browns Bay</li>
                  <li>• Takapuna</li>
                  <li>• Mairangi Bay</li>
                  <li>• Devonport</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-3">Extended Areas</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Millwater</li>
                  <li>• Long Bay</li>
                  <li>• Stanmore Bay</li>
                  <li>• Army Bay</li>
                  <li>• Arkles Bay</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Early Morning Transfer Pricing</h3>
            <div className="text-center mb-6">
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                No Early Morning Surcharge - Same Premium Rates
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Hibiscus Coast</h4>
                <p className="text-3xl font-bold text-gold mb-4">$120-150</p>
                <p className="text-gray-600">Orewa, Whangaparaoa, Silverdale areas</p>
              </div>
              <div className="bg-gold rounded-xl p-6 text-center border-2 border-amber-500">
                <h4 className="text-lg font-bold text-black mb-2">North Shore</h4>
                <p className="text-3xl font-bold text-black mb-4">$100-130</p>
                <p className="text-black">Albany, Takapuna, Browns Bay areas</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Extended Areas</h4>
                <p className="text-3xl font-bold text-gold mb-4">$150-180</p>
                <p className="text-gray-600">Outlying areas and remote locations</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-gold to-amber-500 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Never Miss an Early Flight Again</h3>
            <p className="text-black/80 mb-6">
              Book your early morning airport transfer with confidence. Professional service from 4 AM onwards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
                <Link to="/book-now">
                  Book Early Morning Transfer
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg">
                <a href="tel:+6421743321">
                  Call 24/7 Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EarlyMorningShuttle;