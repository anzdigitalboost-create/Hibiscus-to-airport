import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Users, CheckCircle, MapPin, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Two-column layout: Message left, Social proof right */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          {/* LEFT — Message + CTA */}
          <div className="mb-12 lg:mb-0">
            <p className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Hibiscus Coast &rarr; Auckland Airport
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-5 leading-[1.15]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Private Airport Transfers.
              <br />
              <span className="text-[#64748B] font-normal">Instant pricing. Book in 60 seconds.</span>
            </h1>

            <p className="text-[#64748B] text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
              Door-to-door from Orewa, Whangaparaoa, Silverdale and all Hibiscus Coast suburbs.
              No sharing. No surge pricing. 24/7.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                to="/book-now"
                className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#C4A030] text-white px-8 py-4 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Book Your Transfer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:+64217433321"
                className="inline-flex items-center justify-center border border-[#E2E8F0] hover:border-[#D4AF37] text-[#1E293B] px-8 py-4 text-base font-medium rounded-lg hover:bg-[#FAFBFC] transition-all duration-200"
              >
                <Phone className="mr-2 w-4 h-4" />
                Call 021 743 321
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { icon: Shield, text: 'Fully insured' },
                { icon: Clock, text: '24/7 service' },
                { icon: Users, text: 'Private — never shared' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-[#64748B] text-sm">
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Social proof card */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-8 sm:p-10">
            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <span className="text-[#1E293B] font-semibold">4.9 out of 5</span>
            </div>

            <p className="text-[#1E293B] text-lg font-medium mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              "Best shuttle service on the Coast"
            </p>
            <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
              "On time, professional, and the flat rate means no surprises.
              We've used them for every flight since moving to Orewa.
              Wouldn't go with anyone else."
            </p>
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                SK
              </div>
              <div>
                <div className="text-[#1E293B] font-medium text-sm">Sarah K.</div>
                <div className="text-[#94A3B8] text-xs">Orewa — Verified Customer</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Playfair Display, serif' }}>5,000+</div>
                <div className="text-[#94A3B8] text-xs font-medium uppercase tracking-wide mt-0.5">Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Playfair Display, serif' }}>24/7</div>
                <div className="text-[#94A3B8] text-xs font-medium uppercase tracking-wide mt-0.5">Service</div>
              </div>
            </div>
          </div>
        </div>

        {/* Suburbs served — SEO + trust */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[#94A3B8] text-xs sm:text-sm">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] mr-1" />
            <span className="font-medium text-[#64748B]">Serving:</span>
            {['Orewa', 'Whangaparaoa', 'Silverdale', 'Red Beach', 'Gulf Harbour', 'Stanmore Bay', 'Albany', 'Browns Bay', 'Millwater', 'Warkworth'].map((suburb, i) => (
              <span key={suburb}>
                {suburb}{i < 9 ? <span className="mx-1">·</span> : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
