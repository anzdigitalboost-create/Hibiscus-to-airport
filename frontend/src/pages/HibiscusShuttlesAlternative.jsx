import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { ArrowRight, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const HibiscusShuttlesAlternative = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Hibiscus Shuttles Alternative"
        description="Looking for a Hibiscus Shuttles alternative? Premium airport transfers, modern booking, luxury vehicles. Book online for competitive pricing."
        path="/hibiscus-shuttles-alternative"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Looking for a <span className="text-gold">Hibiscus Shuttles</span> Alternative?
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Upgrade to premium airport transfer service with modern technology, luxury vehicles, and guaranteed reliability.
          </p>
          <div className="bg-gold rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <p className="text-black font-bold text-lg">
              🚗 Same routes, better service, competitive pricing
            </p>
          </div>
        </div>
      </section>

      {/* Direct Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Why Switch Banner */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Switch to Hibiscus to Airport?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get all the convenience you expect, plus modern features and premium service you deserve
            </p>
          </div>

          {/* Main Comparison */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg mb-12">
            <div className="bg-gradient-to-r from-gold to-amber-500 px-6 py-4">
              <h3 className="text-2xl font-bold text-black text-center">Service Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gold uppercase tracking-wider">Hibiscus to Airport</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Hibiscus Shuttles</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Online Booking System</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      <span className="block text-xs text-green-600 mt-1">Instant booking & confirmation</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                      <span className="block text-xs text-red-600 mt-1">Phone booking only</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Flight Monitoring</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      <span className="block text-xs text-green-600 mt-1">Real-time flight tracking</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                      <span className="block text-xs text-red-600 mt-1">Manual scheduling only</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vehicle Quality</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      <span className="block text-xs text-green-600 mt-1">Luxury Toyota Hiace</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-gray-500">Basic</span>
                      <span className="block text-xs text-gray-500 mt-1">Standard vehicles</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Professional Drivers</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      <span className="block text-xs text-green-600 mt-1">Uniformed, trained</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-gray-500">Basic</span>
                      <span className="block text-xs text-gray-500 mt-1">Casual presentation</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">24/7 Service</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      <span className="block text-xs text-green-600 mt-1">Round-the-clock availability</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                      <span className="block text-xs text-red-600 mt-1">Business hours only</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amenities</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      <span className="block text-xs text-green-600 mt-1">Wi-Fi, charging ports</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                      <span className="block text-xs text-red-600 mt-1">Basic transport only</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Migration Stories */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Customers Made the Switch</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">SM</div>
                  <div>
                    <h4 className="font-bold text-green-800">Sarah Mitchell - Orewa</h4>
                    <p className="text-sm text-green-600">Switched from Hibiscus Shuttles</p>
                  </div>
                </div>
                <p className="text-green-700 mb-4">
                  "I used Hibiscus Shuttles for years but got tired of having to call every time and uncertainty about pickup times. 
                  The online booking with Hibiscus to Airport is so convenient, and they actually show up exactly when they say they will."
                </p>
                <div className="text-green-800 font-semibold">⭐⭐⭐⭐⭐</div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">DT</div>
                  <div>
                    <h4 className="font-bold text-blue-800">David Thompson - Whangaparaoa</h4>
                    <p className="text-sm text-blue-600">Business traveler</p>
                  </div>
                </div>
                <p className="text-blue-700 mb-4">
                  "For business travel, reliability is everything. Hibiscus Shuttles let me down twice with late pickups. 
                  Hibiscus to Airport has never been late, and the vehicles are much more professional for client meetings."
                </p>
                <div className="text-blue-800 font-semibold">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>

          {/* Pricing Comparison */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Competitive Pricing, Premium Service</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border-2 border-gold">
                <h4 className="text-xl font-bold text-gold mb-4 text-center">Hibiscus to Airport</h4>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-gray-900">$120-180</span>
                  <span className="text-gray-600 block">Hibiscus Coast to Airport</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm">Instant online booking</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm">Flight monitoring included</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm">Professional drivers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm">Luxury amenities included</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm">24/7 customer support</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">Hibiscus Shuttles</h4>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-gray-900">$100-150</span>
                  <span className="text-gray-600 block">Similar routes</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Phone booking only</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">No flight tracking</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-5 h-5 text-gray-400 mr-2">~</span>
                    <span className="text-sm text-gray-600">Basic driver service</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Limited amenities</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Business hours support</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-gold font-semibold">Premium service at competitive prices - no hidden fees!</p>
            </div>
          </div>

          {/* Easy Switch Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Making the Switch is Easy</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">1</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Book Online</h4>
                <p className="text-gray-600">Use our instant booking system - no more phone calls or waiting on hold</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">2</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Experience Premium</h4>
                <p className="text-gray-600">Professional driver arrives in luxury vehicle with modern amenities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">3</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Never Go Back</h4>
                <p className="text-gray-600">Join hundreds of customers who made the switch to better service</p>
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <div className="mb-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">🎉 First Booking Discount</h3>
            <p className="text-xl mb-6">Save $20 on your first premium airport transfer when you switch</p>
            <div className="bg-white rounded-lg p-4 inline-block">
              <p className="text-green-600 font-bold text-lg">Use code: SWITCH20</p>
              <p className="text-green-600 text-sm">Valid for new customers only</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-gold to-amber-500 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Ready to Upgrade Your Airport Transfer?</h3>
            <p className="text-black/80 mb-6">
              Experience the difference with professional service, modern technology, and guaranteed reliability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
                <Link to="/book-now">
                  Book Your First Premium Transfer
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg">
                <Link to="/book-now">
                  Compare Services & Pricing
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

export default HibiscusShuttlesAlternative;