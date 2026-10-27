import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Button } from '../components/ui/button';
import { Briefcase, Clock, Shield, Star } from 'lucide-react';

const CorporateTransfers = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Corporate Airport Transfers"
        description="Corporate airport transfer service from Hibiscus Coast to Auckland Airport. Account billing, professional drivers. Book online 24/7."
        path="/corporate-airport-transfers"
      />
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Corporate Airport Transfers
            <span className="block text-gold mt-3">Professional Business Transportation</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Reliable, punctual airport transfers for your business needs
          </p>
          <Button asChild className="bg-gold hover:bg-amber-500 text-black font-bold text-lg px-8 py-6">
            <Link to="/book-now">
              Book Corporate Transfer
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <Briefcase className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Professional Service</h3>
              <p className="text-gray-600">Executive-level transportation for your team</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Always On Time</h3>
              <p className="text-gray-600">Punctual service you can rely on</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Fully Insured</h3>
              <p className="text-gray-600">Comprehensive business coverage</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Premium Fleet</h3>
              <p className="text-gray-600">Executive vehicles for your business</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Corporate Transfers?</h2>
            <p className="text-lg text-gray-700 mb-4">
              At Hibiscus to Airport, we understand the importance of reliable, professional transportation for your business. Our corporate airport transfer service is designed specifically for business travelers who value punctuality, comfort, and professionalism.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">Our Corporate Services Include:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Executive airport transfers for staff and clients</li>
              <li>✓ Meet and greet service at terminals</li>
              <li>✓ Flight tracking for arrival delays</li>
              <li>✓ Corporate accounts with monthly billing</li>
              <li>✓ Professional, smartly dressed drivers</li>
              <li>✓ Premium vehicles maintained to highest standards</li>
              <li>✓ Flexible booking for last-minute changes</li>
              <li>✓ Detailed invoicing for expense reporting</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Perfect For:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Business meetings and conferences</li>
              <li>• Client entertainment and hospitality</li>
              <li>• Executive team transportation</li>
              <li>• International visitor arrangements</li>
              <li>• Regular commuter services</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CorporateTransfers;