import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, GraduationCap, Users, DollarSign, Shield, Clock, Luggage, Globe, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';

const StudentAirportTransfers = () => {
  const schools = [
    'Orewa College',
    'Whangaparaoa College',
    'Silverdale School',
    'Hibiscus Coast High Schools',
    'International Student Programs',
    'Language Schools',
    'University Students (Auckland)',
    'Private Education Providers'
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageMeta
        title="Student Airport Transfers"
        description="Affordable student airport transfers from Hibiscus Coast schools to Auckland Airport. Safe, reliable for international students. Book online 24/7."
        path="/student-airport-transfers"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-gold/20 border border-gold/50 text-gold px-5 py-2.5 rounded-full text-sm font-bold tracking-wide">
                STUDENT SERVICES
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Student Airport Shuttle Service
              <span className="block text-gold mt-3">Hibiscus Coast to Auckland Airport</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
              Safe, affordable, and reliable airport transfers for local and international students. We understand student travel needs - from arrival day to holiday breaks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild className="bg-gold hover:bg-amber-500 text-black px-10 py-7 text-lg font-bold shadow-2xl shadow-gold/20 hover:scale-105 transition-all duration-300">
                <Link to="/book-now">
                  Book Student Transfer
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-gold/50 hover:border-gold text-gold hover:bg-gold/10 px-10 py-7 text-lg font-semibold">
                <a href="mailto:info@bookaride.co.nz">
                  Group Booking Enquiry
                </a>
              </Button>
            </div>
            
            {/* Special Student Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-900/60 to-teal-900/60 backdrop-blur-md border-2 border-emerald-500/30 px-6 py-3 rounded-full">
              <GraduationCap className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-emerald-200 font-semibold">Special Rates for Students & Groups Available</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Students Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why <span className="text-gold">Students</span> Choose Us
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300">
              <DollarSign className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Student-Friendly Prices</h3>
              <p className="text-gray-400">Affordable rates designed for student budgets. Special discounts for groups and regular travelers.</p>
            </div>
            
            <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300">
              <Luggage className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Extra Luggage Space</h3>
              <p className="text-gray-400">We know students travel with lots of luggage. Plenty of space for suitcases, boxes, and study materials.</p>
            </div>
            
            <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300">
              <Shield className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Safe & Reliable</h3>
              <p className="text-gray-400">Parents trust us. Professional drivers, fully insured, and tracked vehicles for complete peace of mind.</p>
            </div>
            
            <div className="bg-gray-900/80 border-2 border-gold/20 rounded-2xl p-8 hover:border-gold hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300">
              <Users className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Group Bookings</h3>
              <p className="text-gray-400">Traveling with friends? Share the ride and split the cost. Perfect for student groups and flatmates.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* International Students Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-blue-900/40 border border-blue-500/50 text-blue-300 px-4 py-2 rounded-full text-sm font-bold tracking-wide flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  INTERNATIONAL STUDENTS
                </span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Welcome to New Zealand!
                <span className="block text-gold mt-2">We're Here to Help</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Starting your student journey in New Zealand? We provide reliable airport pickup for international students arriving at Auckland Airport.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-gold text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Flight Tracking</h4>
                    <p className="text-gray-400 text-sm">We monitor your flight arrival time - no stress if delayed</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-gold text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Meet & Greet Service</h4>
                    <p className="text-gray-400 text-sm">Driver meets you at arrivals with name sign</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-gold text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Direct to Accommodation</h4>
                    <p className="text-gray-400 text-sm">Straight to your homestay, student flat, or campus</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-gold text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Friendly Local Drivers</h4>
                    <p className="text-gray-400 text-sm">Get local tips and feel welcome from day one</p>
                  </div>
                </li>
              </ul>
              
              <Button asChild className="bg-gold hover:bg-amber-500 text-black px-8 py-6 text-lg font-bold shadow-2xl shadow-gold/20">
                <Link to="/book-now">
                  Book Airport Pickup
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-md border-2 border-gold/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Popular for International Students:
              </h3>
              
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4 border border-gold/10">
                  <h4 className="text-gold font-bold mb-2">Arrival Transfers</h4>
                  <p className="text-gray-400 text-sm">First time in NZ? We pick you up from Auckland Airport and take you to Hibiscus Coast safely.</p>
                </div>
                
                <div className="bg-black/40 rounded-xl p-4 border border-gold/10">
                  <h4 className="text-gold font-bold mb-2">Holiday Break Transfers</h4>
                  <p className="text-gray-400 text-sm">Going home for holidays? Return trips to/from airport during semester breaks.</p>
                </div>
                
                <div className="bg-black/40 rounded-xl p-4 border border-gold/10">
                  <h4 className="text-gold font-bold mb-2">Parents Can Book</h4>
                  <p className="text-gray-400 text-sm">Parents overseas can pre-book and pay online. Receive confirmation and driver details.</p>
                </div>
                
                <div className="bg-black/40 rounded-xl p-4 border border-gold/10">
                  <h4 className="text-gold font-bold mb-2">24/7 Support</h4>
                  <p className="text-gray-400 text-sm">Questions? Contact us anytime. We understand international student needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Schools We Service */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Schools & Colleges We Service
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">Trusted by students across Hibiscus Coast</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schools.map((school, idx) => (
              <div key={idx} className="bg-gray-900/60 border border-gold/20 rounded-xl p-6 text-center hover:border-gold hover:bg-gray-900 transition-all duration-300">
                <GraduationCap className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="text-white font-bold">{school}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How to Book */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              How to <span className="text-gold">Book</span>
            </h2>
            <p className="text-gray-300 text-lg">Simple booking process for students</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-black">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Book Online</h3>
              <p className="text-gray-400">Enter your flight details or pickup time. Takes 60 seconds.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-black">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Confirmation</h3>
              <p className="text-gray-400">Instant email with driver details and booking reference.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-black">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Travel Safely</h3>
              <p className="text-gray-400">Relax and enjoy your ride to/from the airport.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Book Your Student Transfer?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Safe, affordable, and reliable airport shuttle for students on Hibiscus Coast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gold hover:bg-amber-500 text-black px-10 py-7 text-lg font-bold shadow-2xl shadow-gold/20 hover:scale-105 transition-all duration-300">
              <Link to="/book-now">
                Book Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-gold/50 hover:border-gold text-gold hover:bg-gold/10 px-10 py-7 text-lg font-semibold">
              <a href="mailto:info@bookaride.co.nz">
                <Mail className="mr-2 w-5 h-5" />
                Email info@bookaride.co.nz
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default StudentAirportTransfers;