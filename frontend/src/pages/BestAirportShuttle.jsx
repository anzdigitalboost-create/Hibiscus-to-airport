import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Button } from '../components/ui/button';

const BestAirportShuttle = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Best Airport Shuttle Hibiscus Coast"
        description="Compare Hibiscus Coast airport shuttles to Auckland Airport. See why we are rated #1 for service and reliability. Book online today."
        path="/best-airport-shuttle-hibiscus-coast"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Best Airport Shuttle <span className="text-gold">Hibiscus Coast</span> 2025
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Complete comparison of airport shuttle services from Hibiscus Coast to Auckland Airport. Find out why premium matters.
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Winner Banner */}
          <div className="bg-gradient-to-r from-gold to-amber-500 rounded-2xl p-8 text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              🏆 2025 Winner: Hibiscus to Airport
            </h2>
            <p className="text-black/80 text-lg">
              The clear choice for premium airport transfers with modern technology and luxury service
            </p>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Complete Service Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gold uppercase tracking-wider">Hibiscus to Airport</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Hibiscus Shuttles</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Other Operators</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Online Booking System</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Flight Monitoring</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Guaranteed Pickup Times</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Professional Uniformed Drivers</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Basic</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Varies</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Luxury Vehicle Fleet</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Standard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Basic</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">24/7 Customer Service</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Business Hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Limited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Complimentary Wi-Fi</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mobile Phone Charging</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><X className="w-6 h-6 text-red-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Price vs Value Comparison</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-gold">
                <h4 className="text-xl font-bold text-gold mb-4">Hibiscus to Airport</h4>
                <p className="text-3xl font-bold text-gray-900 mb-4">$120-180</p>
                <p className="text-gray-600 mb-4">Premium service with luxury amenities</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> All premium features included</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> No hidden fees</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Instant online booking</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-700 mb-4">Hibiscus Shuttles</h4>
                <p className="text-3xl font-bold text-gray-900 mb-4">$100-150</p>
                <p className="text-gray-600 mb-4">Basic shuttle service</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" /> No premium amenities</li>
                  <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" /> Phone booking only</li>
                  <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" /> Limited availability</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-700 mb-4">Other Operators</h4>
                <p className="text-3xl font-bold text-gray-900 mb-4">$80-140</p>
                <p className="text-gray-600 mb-4">Variable quality service</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" /> Inconsistent service</li>
                  <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" /> Limited coverage</li>
                  <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" /> No guarantees</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">What Customers Say</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">Hibiscus to Airport Reviews</h4>
                <p className="text-green-700 mb-4">"Amazing service! Professional driver, luxury vehicle, and exactly on time. Worth every penny for the premium experience."</p>
                <p className="text-sm text-green-600">- Sarah M., Orewa</p>
                <div className="mt-4">
                  <span className="text-green-800 font-bold">⭐⭐⭐⭐⭐ 5.0/5 Average</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-2">Competitors</h4>
                <p className="text-gray-600 mb-4">"Basic service, got there eventually but nothing special. Vehicle was old and driver was late."</p>
                <p className="text-sm text-gray-500">- Mark T., Whangaparaoa</p>
                <div className="mt-4">
                  <span className="text-gray-600">⭐⭐⭐ 3.2/5 Average</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center bg-gradient-to-r from-gold to-amber-500 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Choose the Best Airport Shuttle Service</h3>
            <p className="text-black/80 mb-6 max-w-2xl mx-auto">
              Don't settle for basic when you can have premium. Experience the difference with guaranteed pickup times, 
              professional service, and luxury amenities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4">
                <Link to="/book-now">
                  Book Premium Service Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white px-8 py-4">
                <Link to="/book-now">
                  Get Instant Quote
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

export default BestAirportShuttle;