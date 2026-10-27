import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Building, Shield, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

const BusinessAirportTransfer = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Business Airport Transfer Service"
        description="Professional business airport transfers from Hibiscus Coast to Auckland Airport. Punctual, luxury vehicles for executives. Book online 24/7."
        path="/business-airport-transfer"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Business <span className="text-gold">Airport Transfer</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Professional corporate transport for executives and business travelers. Luxury vehicles, guaranteed punctuality, and premium service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-black hover:bg-amber-500 px-8 py-4 text-lg">
              <Link to="/book-now">
                Book Corporate Transfer
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              <a href="mailto:info@bookaride.co.nz">
                Setup Business Account
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Business Features */}
      <section className="py-12 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Building className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Corporate Accounts</span>
              <span className="text-black text-sm">Monthly invoicing available</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Guaranteed Service</span>
              <span className="text-black text-sm">Never miss important meetings</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Punctuality Promise</span>
              <span className="text-black text-sm">Professional reliability</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-black mb-2" />
              <span className="text-black font-bold">Executive Service</span>
              <span className="text-black text-sm">Premium treatment always</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Premium Corporate Airport Transfer Service</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Business travel demands reliability, professionalism, and punctuality. Our corporate airport transfer 
                service is designed specifically for executives, business travelers, and companies who require 
                guaranteed transportation solutions between Hibiscus Coast and Auckland Airport.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike standard shuttle services, our business transfer service includes dedicated account management, 
                corporate invoicing, and priority booking to ensure your travel plans are never compromised.
              </p>
            </div>
          </div>

          {/* Corporate Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Executive Transport Features</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gold mb-4">Service Excellence</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Professional uniformed chauffeurs</li>
                  <li>• Luxury Toyota Hiace executive vehicles</li>
                  <li>• Meet and greet service at airport</li>
                  <li>• Assistance with luggage and briefcases</li>
                  <li>• Complimentary bottled water and mints</li>
                  <li>• Business newspapers on request</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gold mb-4">Business Convenience</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Corporate account setup with monthly billing</li>
                  <li>• Online booking portal for assistants</li>
                  <li>• Priority vehicle allocation</li>
                  <li>• Last-minute booking accommodation</li>
                  <li>• Flight tracking and schedule adjustments</li>
                  <li>• Detailed trip receipts and reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Corporate Account Benefits */}
          <div className="mb-16 bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Corporate Account Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Monthly Invoicing</h4>
                <p className="text-gray-600">Consolidated monthly bills with detailed trip breakdowns for easy expense management</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Priority Service</h4>
                <p className="text-gray-600">Guaranteed availability and priority booking even during peak periods</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Volume Discounts</h4>
                <p className="text-gray-600">Attractive pricing for regular corporate bookings and multi-trip packages</p>
              </div>
            </div>
          </div>

          {/* Industries Served */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Industries We Serve</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Finance & Banking</h4>
                <p className="text-sm text-gray-600">Investment firms, banks, financial advisors</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Technology</h4>
                <p className="text-sm text-gray-600">Tech companies, startups, IT consultants</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Legal Services</h4>
                <p className="text-sm text-gray-600">Law firms, legal consultants, barristers</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Healthcare</h4>
                <p className="text-sm text-gray-600">Medical professionals, pharmaceutical</p>
              </div>
            </div>
          </div>

          {/* Corporate Pricing */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Corporate Transfer Pricing</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center border">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Executive Single</h4>
                <p className="text-3xl font-bold text-gold mb-4">$150</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Single executive transfer</li>
                  <li>Premium vehicle and service</li>
                  <li>Meet and greet included</li>
                </ul>
              </div>
              <div className="bg-gold rounded-xl p-6 text-center border-2 border-amber-500">
                <h4 className="text-lg font-bold text-black mb-2">Corporate Package</h4>
                <p className="text-3xl font-bold text-black mb-4">$120</p>
                <ul className="text-sm text-black space-y-1">
                  <li>Volume discount pricing</li>
                  <li>Monthly invoicing</li>
                  <li>Priority booking</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 text-center border">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Group Executive</h4>
                <p className="text-3xl font-bold text-gold mb-4">$200</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Up to 6 executives</li>
                  <li>Large luxury vehicle</li>
                  <li>Corporate amenities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Corporate Booking Process</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">1</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Account Setup</h4>
                <p className="text-gray-600">Register your company for corporate rates and monthly invoicing</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">2</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Book Online</h4>
                <p className="text-gray-600">Use our corporate portal or call our dedicated business line</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">3</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Executive Service</h4>
                <p className="text-gray-600">Professional chauffeur provides premium airport transfer</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Elevate Your Business Travel Experience</h3>
            <p className="mb-6">
              Join leading companies who trust us for professional, reliable airport transfers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-black hover:bg-amber-500 px-8 py-4 text-lg">
                <a href="mailto:info@bookaride.co.nz">
                  Setup Corporate Account
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg">
                <a href="mailto:info@bookaride.co.nz">
                  Speak with Account Manager
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

export default BusinessAirportTransfer;