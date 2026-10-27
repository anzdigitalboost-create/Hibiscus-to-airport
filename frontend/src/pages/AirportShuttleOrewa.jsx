import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { MapPin, Star, Clock, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

const AirportShuttleOrewa = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Airport Shuttle Orewa - Premium Transfers"
        description="Orewa's top-rated airport shuttle to Auckland Airport. Local drivers, door-to-door service, luxury vehicles. Book online for instant pricing."
        path="/airport-shuttle-orewa"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-blue-900 via-teal-800 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Airport Shuttle <span className="text-gold">Orewa</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Orewa's premier airport shuttle service. Premium door-to-door transfers from any Orewa location to Auckland Airport.
          </p>
          <div className="bg-gold rounded-2xl p-4 max-w-2xl mx-auto mb-8">
            <p className="text-black font-bold">
              🏖️ Orewa Local | 📍 Know Every Street | ⭐ 5-Star Service | 🚗 Premium Vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Orewa Coverage Map */}
      <section className="py-12 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black text-center mb-8">Complete Orewa Coverage</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Orewa Beach</span>
              <span className="text-black text-sm">Beachfront & residential</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Millwater</span>
              <span className="text-black text-sm">New developments</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Central Orewa</span>
              <span className="text-black text-sm">Town center & shops</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">All Streets</span>
              <span className="text-black text-sm">Every address covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Orewa Expertise */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Orewa Airport Shuttle Specialists</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Based right here in Orewa, we provide premium airport shuttle services to every corner of our 
                beautiful coastal town. From the beachfront properties along Orewa Beach to the newest developments 
                in Millwater, and every street in between - we know exactly where you are and the best route to 
                get you to Auckland Airport on time.
              </p>
              <p className="text-gray-700 mb-4">
                As local Orewa residents ourselves, we understand the unique geography of our area. Unlike outside 
                shuttle services that might struggle with our address system or get lost in the new subdivisions, 
                we navigate Orewa's streets with complete confidence every day.
              </p>
            </div>
          </div>

          {/* Detailed Orewa Coverage */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Every Part of Orewa Covered</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold text-gold mb-4">🏖️ Orewa Beach Area</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Beachfront apartments and houses</li>
                  <li>• Orewa Beach Resort areas</li>
                  <li>• Seafront Road properties</li>
                  <li>• Beach access accommodations</li>
                  <li>• Holiday parks and motels</li>
                  <li>• Esplanade and waterfront</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-4">🏘️ Residential Orewa</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Central Orewa residential streets</li>
                  <li>• Hill properties with views</li>
                  <li>• Quieter suburban areas</li>
                  <li>• Family neighborhoods</li>
                  <li>• Retirement village areas</li>
                  <li>• School zone properties</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-4">🏗️ Millwater & New Areas</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Millwater development (all stages)</li>
                  <li>• New subdivision areas</li>
                  <li>• Modern townhouse complexes</li>
                  <li>• Recently built neighborhoods</li>
                  <li>• Under-construction areas</li>
                  <li>• Future development zones</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Orewa to Airport Journey */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Orewa to Auckland Airport Journey</h3>
            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="font-bold text-blue-800">Orewa Pickup</span>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-blue-300 mx-4"></div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="font-bold text-blue-800">45 min journey</span>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-blue-300 mx-4"></div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="font-bold text-blue-800">Auckland Airport</span>
                </div>
              </div>
              <p className="text-blue-700 text-center">
                Professional pickup from your Orewa address → Northern Motorway → Auckland Airport Terminal
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-gold mb-3">Route Expertise</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Best routes from each Orewa area</li>
                  <li>• Traffic-aware timing adjustments</li>
                  <li>• Alternative route knowledge</li>
                  <li>• Peak hour optimization</li>
                  <li>• Construction zone awareness</li>
                  <li>• Weather condition adaptations</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-3">Local Advantages</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Know every Orewa street personally</li>
                  <li>• Familiar with all new developments</li>
                  <li>• Local traffic pattern knowledge</li>
                  <li>• Shortcut awareness for efficiency</li>
                  <li>• House number system expertise</li>
                  <li>• GPS backup with local knowledge</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Orewa Customer Stories */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Orewa Resident Reviews</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border-2 border-gold">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold mr-3">TC</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Tracy Chen</h4>
                    <p className="text-sm text-gray-600">Orewa Beach Road, 3 years</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Perfect for our beachfront location! The driver knew exactly where to find us on Beach Road 
                  and had us at the airport in perfect time for our international flight."
                </p>
                <div className="text-gold">⭐⭐⭐⭐⭐</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gold">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold mr-3">MS</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Mike Sullivan</h4>
                    <p className="text-sm text-gray-600">Millwater Development</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Amazing service! They found our house in the new Millwater development without any issues. 
                  Other shuttle services always get lost in our area, but these guys know Orewa inside out."
                </p>
                <div className="text-gold">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>

          {/* Orewa Pricing */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Orewa to Airport Pricing</h3>
            <div className="text-center mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                🏖️ Fair Pricing for All Orewa Locations
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Central Orewa</h4>
                <p className="text-3xl font-bold text-gold mb-4">$120</p>
                <p className="text-gray-600 mb-2">Town center, main streets</p>
                <p className="text-xs text-gray-500">Most residential areas</p>
              </div>
              <div className="bg-gold rounded-xl p-6 text-center border-2 border-amber-500">
                <h4 className="text-lg font-bold text-black mb-2">All Orewa Areas</h4>
                <p className="text-3xl font-bold text-black mb-4">$120-135</p>
                <p className="text-black mb-2">Including Millwater</p>
                <p className="text-xs text-black/70">Beach to hill properties</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Premium Service</h4>
                <p className="text-3xl font-bold text-gold mb-4">$150</p>
                <p className="text-gray-600 mb-2">Executive transport</p>
                <p className="text-xs text-gray-500">Luxury vehicle & amenities</p>
              </div>
            </div>
          </div>

          {/* Local Orewa Business */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Proudly Serving Orewa Since 2024</h3>
            <div className="bg-white rounded-2xl border-2 border-gold p-8 text-center">
              <div className="mb-6">
                <Star className="w-16 h-16 text-gold mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Local Orewa Business</h4>
                <p className="text-gray-600 mb-4">Based in Orewa, serving our community with pride</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Mail className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Email Us</p>
                  <p className="text-gold font-bold">info@bookaride.co.nz</p>
                  <p className="text-xs text-gray-500">Quick response guaranteed</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Always Available</p>
                  <p className="text-gray-600">24/7 for Orewa residents</p>
                  <p className="text-xs text-gray-500">Early flights welcome</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Book Your Orewa Airport Transfer</h3>
            <p className="mb-6">
              Local expertise, premium service, guaranteed reliability for all Orewa locations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-black hover:bg-amber-500 px-8 py-4 text-lg">
                <Link to="/book-now">
                  Book Orewa Pickup Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                <Link to="/book-now">
                  Get Orewa Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AirportShuttleOrewa;