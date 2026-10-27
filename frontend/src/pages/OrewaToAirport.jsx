import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Clock, MapPin, Star, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';

const OrewaToAirport = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Orewa to Auckland Airport Transfer"
        description="Direct transfers from Orewa to Auckland Airport. Affordable pricing, professional drivers, luxury vehicles. Book online for instant quotes."
        path="/orewa-to-auckland-airport-shuttle"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Orewa to <span className="text-gold">Auckland Airport</span> Shuttle
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Premium door-to-door airport transfer service from Orewa. Professional drivers, luxury vehicles, guaranteed pickup times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-black hover:bg-amber-500 px-8 py-4 text-lg">
              <Link to="/book-now">
                Book Orewa Airport Transfer
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              <Link to="/book-now">
                Get Instant Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center">
              <Clock className="w-6 h-6 text-black mr-2" />
              <span className="text-black font-bold">45 min journey</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 text-black mr-2" />
              <span className="text-black font-bold">66km distance</span>
            </div>
            <div className="flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-black mr-2" />
              <span className="text-black font-bold">From $120</span>
            </div>
            <div className="flex items-center justify-center">
              <Star className="w-6 h-6 text-black mr-2" />
              <span className="text-black font-bold">5-star service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Route Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Orewa to Auckland Airport Transfer Service</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Our premium airport shuttle service connects Orewa directly to Auckland Airport with luxury Toyota Hiace vehicles 
                and professional drivers. We specialize in reliable, comfortable transfers for Orewa residents and visitors.
              </p>
              <p className="text-gray-700 mb-4">
                The journey from Orewa to Auckland Airport typically takes 45 minutes via the Northern Motorway (SH1), 
                covering approximately 66 kilometers. Our experienced drivers know the best routes and monitor traffic 
                conditions to ensure timely arrival for your flight.
              </p>
            </div>
          </div>

          {/* Service Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Orewa Airport Shuttle?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-gold mb-3">Premium Service Features</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Door-to-door pickup from any Orewa address</li>
                  <li>• Professional uniformed drivers</li>
                  <li>• Luxury Toyota Hiace vehicles (up to 11 passengers)</li>
                  <li>• Flight monitoring for pickup time adjustments</li>
                  <li>• Complimentary Wi-Fi and phone charging</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-3">Orewa Pickup Areas</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Orewa Beach and beachfront properties</li>
                  <li>• Orewa town center and shopping areas</li>
                  <li>• Millwater and surrounding developments</li>
                  <li>• Silverdale industrial and business areas</li>
                  <li>• All Orewa residential areas and streets</li>
                  <li>• Hotels and accommodation providers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Orewa to Airport Pricing</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Standard Service</h4>
                <p className="text-3xl font-bold text-gold mb-4">$120</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Up to 4 passengers</li>
                  <li>Standard luggage</li>
                  <li>Professional driver</li>
                </ul>
              </div>
              <div className="bg-gold rounded-xl p-6 text-center border-2 border-amber-500">
                <h4 className="text-lg font-bold text-black mb-2">Premium Service</h4>
                <p className="text-3xl font-bold text-black mb-4">$150</p>
                <ul className="text-sm text-black space-y-1">
                  <li>Up to 6 passengers</li>
                  <li>Extra luggage space</li>
                  <li>Premium amenities</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Group Service</h4>
                <p className="text-3xl font-bold text-gold mb-4">$180</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Up to 11 passengers</li>
                  <li>Maximum luggage</li>
                  <li>Group discounts available</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Instructions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Book Your Orewa Airport Transfer</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">1</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Enter Details</h4>
                <p className="text-gray-600">Provide your Orewa pickup address, flight details, and passenger count</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">2</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Get Quote</h4>
                <p className="text-gray-600">Receive instant pricing and confirm your booking with secure payment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">3</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Enjoy Transfer</h4>
                <p className="text-gray-600">Professional driver arrives on time for comfortable journey to airport</p>
              </div>
            </div>
          </div>

          {/* FAQ for Orewa */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Orewa Airport Transfer FAQ</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">How long does it take from Orewa to Auckland Airport?</h4>
                <p className="text-gray-700">Typically 45-50 minutes via the Northern Motorway, depending on traffic conditions. We monitor traffic and adjust pickup times accordingly.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">What's included in the Orewa airport shuttle service?</h4>
                <p className="text-gray-700">Door-to-door service, professional driver, luxury vehicle, flight monitoring, Wi-Fi, phone charging, and assistance with luggage.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Do you provide return trips from Auckland Airport to Orewa?</h4>
                <p className="text-gray-700">Yes! We offer airport pickup services with flight monitoring to ensure we're there when you land, regardless of delays.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-gold to-amber-500 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Book Your Orewa Airport Transfer Today</h3>
            <p className="text-black/80 mb-6">
              Guaranteed pickup times, professional service, and competitive pricing for Orewa residents
            </p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
              <Link to="/book-now">
                Get Instant Quote & Book Online
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrewaToAirport;