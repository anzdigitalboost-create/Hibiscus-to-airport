import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { ArrowRight, Car, CreditCard, CheckCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Hibiscus Coast Airport Shuttle | Door-to-Door Auckland Airport Transfers 24/7"
        rawTitle
        description="Private airport shuttle from Orewa, Whangaparaoa, Silverdale & Hibiscus Coast to Auckland Airport. Book online, flat rates, 24/7 service."
        path="/"
      />
      <Header />
      <Hero />

      {/* HOW IT WORKS — 3 steps, nothing more */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] text-center mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Book in 3 Simple Steps
          </h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                step: '1',
                icon: Car,
                title: 'Enter Your Address',
                desc: 'Tell us where to pick you up and when you need to be at the airport.'
              },
              {
                step: '2',
                icon: CreditCard,
                title: 'Get Your Price & Pay',
                desc: 'Instant flat-rate quote. Pay online or choose cash — no surge, no hidden fees.'
              },
              {
                step: '3',
                icon: CheckCircle,
                title: 'We Pick You Up',
                desc: 'Professional driver at your door. Private ride, flight monitoring, door-to-door.'
              }
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-5 text-[#D4AF37] font-bold text-lg shadow-sm"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — one clear action */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Book Your Airport Transfer?
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Private ride. Professional driver. Price calculated by distance — get an instant quote when you book.
          </p>
          <Link
            to="/book-now"
            className="inline-flex items-center bg-[#D4AF37] hover:bg-[#C4A030] text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Book Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
