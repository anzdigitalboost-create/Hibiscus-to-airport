import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Mail, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-20 bg-[#F8FAFB] reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1B2B4B] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Book Your Ride?
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          <p className="text-xl text-[#4A5568] max-w-2xl mx-auto">
            Book online in under 2 minutes. We're here 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Booking CTA */}
          <div className="text-center lg:text-left space-y-6">
            <Button
              onClick={() => navigate('/book-now')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#1B2B4B] to-[#2D4A7A] hover:from-[#162340] hover:to-[#264068] text-white py-6 px-12 text-lg font-semibold tracking-wide shadow-sm"
            >
              Book Now
            </Button>
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <Mail className="w-5 h-5 text-[#1B2B4B]" />
              <a href="mailto:info@bookaride.co.nz" className="text-lg text-[#4A5568] hover:text-[#1B2B4B] font-medium transition-colors duration-300">
                info@bookaride.co.nz
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <Card className="bg-white border border-[#E8ECF0] shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#1B2B4B]/5 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#1B2B4B]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B2B4B] mb-1">Email</h3>
                    <a href="mailto:info@bookaride.co.nz" className="text-[#4A5568] hover:text-[#1B2B4B] transition-colors duration-300">info@bookaride.co.nz</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#E8ECF0] shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#1B2B4B]/5 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#1B2B4B]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B2B4B] mb-1">Service Area</h3>
                    <p className="text-[#4A5568]">Hibiscus Coast - Orewa & Surrounds</p>
                    <p className="text-sm text-[#8896A6] mt-1">Servicing all suburbs to Auckland Airport</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#E8ECF0] shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#1B2B4B]/5 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#1B2B4B]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B2B4B] mb-1">Operating Hours</h3>
                    <p className="text-[#4A5568]">24 Hours / 7 Days a Week</p>
                    <p className="text-sm text-[#8896A6] mt-1">Including public holidays</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
