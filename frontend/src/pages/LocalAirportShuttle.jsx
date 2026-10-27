import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { MapPin, Mail, Star, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

const LocalAirportShuttle = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Local Hibiscus Coast Airport Shuttle"
        description="Locally owned airport shuttle serving Hibiscus Coast to Auckland Airport. Community trusted, 5-star rated. Book online 24/7."
        path="/local-airport-shuttle"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-green-900 via-blue-900 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Local <span className="text-gold">Hibiscus Coast</span> Airport Shuttle
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Your local premium airport transfer service. Born and raised on the Hibiscus Coast, serving our community with pride since 2024.
          </p>
          <div className="bg-gold rounded-2xl p-4 max-w-2xl mx-auto mb-8">
            <p className="text-black font-bold">
              📍 Local Business | 🏠 Community Owned | ⭐ 5-Star Service
            </p>
          </div>
        </div>
      </section>

      {/* Local Community Focus */}
      <section className="py-12 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">100% Local</span>
              <span className="text-black text-sm">Hibiscus Coast owned & operated</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Community Focused</span>
              <span className="text-black text-sm">Supporting local residents</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Local Knowledge</span>
              <span className="text-black text-sm">Know every street & shortcut</span>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Local Support</span>
              <span className="text-black text-sm">Based right here on the Coast</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Local Business Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Local Hibiscus Coast Airport Shuttle</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                As a locally owned and operated business right here on the Hibiscus Coast, we understand the unique 
                needs of our community. Whether you're a local resident heading off on holiday, a business person 
                with an important flight, or visitors exploring our beautiful area, we're your neighbors providing 
                premium transport service.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike large corporate shuttle companies, we know every street in Orewa, every development in 
                Whangaparaoa, and every local landmark that makes our area special. When you book with us, you're 
                supporting a local business that gives back to our community.
              </p>
            </div>
          </div>

          {/* Local Area Expertise */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Local Area Expertise</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold text-gold mb-4">🏖️ Orewa & Surrounds</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Orewa Beach residential areas</li>
                  <li>• Millwater new developments</li>
                  <li>• Silverdale business district</li>
                  <li>• Hibiscus Coast Highway properties</li>
                  <li>• All local streets and cul-de-sacs</li>
                  <li>• New subdivision areas</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-4">🌊 Whangaparaoa Peninsula</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Gulf Harbour marina and residential</li>
                  <li>• Army Bay and Stanmore Bay</li>
                  <li>• Red Beach beachfront properties</li>
                  <li>• Whangaparaoa town center</li>
                  <li>• Peninsula country roads</li>
                  <li>• Arkles Bay and coastal areas</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gold mb-4">🏘️ Extended Local Areas</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Long Bay regional park area</li>
                  <li>• Torbay and Waiake Bay</li>
                  <li>• Local schools and colleges</li>
                  <li>• Shopping centers and malls</li>
                  <li>• Business parks and offices</li>
                  <li>• Healthcare facilities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Community Connections */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Connected to Our Community</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-blue-800 mb-4">Local Business Partnerships</h4>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Hotels and accommodation providers</li>
                  <li>• Local restaurants and cafes</li>
                  <li>• Real estate agencies</li>
                  <li>• Medical and healthcare facilities</li>
                  <li>• Schools and educational institutions</li>
                  <li>• Tourism and activity providers</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-green-800 mb-4">Community Involvement</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Support local sports teams</li>
                  <li>• School fundraising events</li>
                  <li>• Community event transport</li>
                  <li>• Local charity partnerships</li>
                  <li>• Hibiscus Coast events</li>
                  <li>• Neighborhood watch programs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Local Testimonials */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">What Local Residents Say</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border-2 border-gold">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold mr-3">JM</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Jennifer Morrison</h4>
                    <p className="text-sm text-gray-600">Millwater Resident, 8 years</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Finally, a local airport shuttle that actually knows where everything is! The driver knew exactly 
                  how to find our house in the new Millwater development without any GPS confusion."
                </p>
                <div className="text-gold">⭐⭐⭐⭐⭐</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gold">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold mr-3">BK</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Barry Kingston</h4>
                    <p className="text-sm text-gray-600">Red Beach, Local Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Great to support a local business. The service is professional and they understand our area 
                  perfectly. Much better than the big corporate shuttle companies."
                </p>
                <div className="text-gold">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>

          {/* Local Pricing */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Local Resident Pricing</h3>
            <div className="text-center mb-6">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                🏠 Supporting Our Local Community with Fair Pricing
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Orewa Area</h4>
                <p className="text-3xl font-bold text-gold mb-4">$120</p>
                <p className="text-gray-600 mb-2">Including all Orewa suburbs</p>
                <p className="text-xs text-gray-500">Millwater, Silverdale, central Orewa</p>
              </div>
              <div className="bg-gold rounded-xl p-6 text-center border-2 border-amber-500">
                <h4 className="text-lg font-bold text-black mb-2">Whangaparaoa</h4>
                <p className="text-3xl font-bold text-black mb-4">$135</p>
                <p className="text-black mb-2">Peninsula locations</p>
                <p className="text-xs text-black/70">Gulf Harbour, Red Beach, Army Bay</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Extended Local</h4>
                <p className="text-3xl font-bold text-gold mb-4">$150</p>
                <p className="text-gray-600 mb-2">Outer areas</p>
                <p className="text-xs text-gray-500">Long Bay, Torbay, rural properties</p>
              </div>
            </div>
          </div>

          {/* Contact Local Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Contact Your Local Team</h3>
            <div className="bg-white rounded-2xl border-2 border-gold p-8 text-center">
              <div className="mb-6">
                <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Local Business Address</h4>
                <p className="text-gray-600">Based on the Hibiscus Coast</p>
                <p className="text-gray-600">Serving our local community daily</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Mail className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Email</p>
                  <p className="text-gold font-bold">info@bookaride.co.nz</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Available</p>
                  <p className="text-gray-600">24/7 for our neighbors</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-gold to-amber-500 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Support Local - Book with Your Neighbors</h3>
            <p className="text-black/80 mb-6">
              Choose local expertise, community support, and premium service all in one
            </p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
              <Link to="/book-now">
                Book Your Local Airport Transfer
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocalAirportShuttle;