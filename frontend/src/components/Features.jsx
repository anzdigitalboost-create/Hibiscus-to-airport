import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Zap,
  CheckCircle,
  Award,
  Shield,
  Repeat,
  Star,
  Package,
  DollarSign,
  X
} from 'lucide-react';
import { features } from '../mock';
import { Button } from './ui/button';

const iconMap = {
  'zap': Zap,
  'check-circle': CheckCircle,
  'award': Award,
  'shield': Shield,
  'repeat': Repeat,
  'star': Star,
  'package': Package,
  'dollar-sign': DollarSign
};

const Features = () => {
  return (
    <section className="py-20 bg-white reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1B2B4B] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why Choose Hibiscus to Airport?
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          <p className="text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of reliability, comfort, and modern convenience
          </p>
        </div>

        {/* Competitive Comparison Section */}
        <div className="bg-[#FAFBFC] rounded-2xl border border-[#E8ECF0] shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-[#1B2B4B] text-center mb-8">
            Hibiscus to Airport vs Traditional Shuttles
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-[#1B2B4B] mb-4 text-center">Hibiscus to Airport</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-[#4A5568]"><CheckCircle className="w-5 h-5 text-[#1B2B4B] mr-3 flex-shrink-0" /> Luxury Toyota Hiace vehicles</li>
                <li className="flex items-center text-[#4A5568]"><CheckCircle className="w-5 h-5 text-[#1B2B4B] mr-3 flex-shrink-0" /> Professional uniformed drivers</li>
                <li className="flex items-center text-[#4A5568]"><CheckCircle className="w-5 h-5 text-[#1B2B4B] mr-3 flex-shrink-0" /> Advanced online booking system</li>
                <li className="flex items-center text-[#4A5568]"><CheckCircle className="w-5 h-5 text-[#1B2B4B] mr-3 flex-shrink-0" /> Flight monitoring & real-time updates</li>
                <li className="flex items-center text-[#4A5568]"><CheckCircle className="w-5 h-5 text-[#1B2B4B] mr-3 flex-shrink-0" /> Complimentary Wi-Fi & charging</li>
                <li className="flex items-center text-[#4A5568]"><CheckCircle className="w-5 h-5 text-[#1B2B4B] mr-3 flex-shrink-0" /> 24/7 premium customer service</li>
                <li className="flex items-center text-[#4A5568]"><CheckCircle className="w-5 h-5 text-[#1B2B4B] mr-3 flex-shrink-0" /> Guaranteed pickup times</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#8896A6] mb-4 text-center">Traditional Shuttles</h4>
              <ul className="space-y-3 text-[#8896A6]">
                <li className="flex items-center"><X className="w-5 h-5 text-[#8896A6]/50 mr-3 flex-shrink-0" /> Basic vehicle options</li>
                <li className="flex items-center"><X className="w-5 h-5 text-[#8896A6]/50 mr-3 flex-shrink-0" /> Casual driver presentation</li>
                <li className="flex items-center"><X className="w-5 h-5 text-[#8896A6]/50 mr-3 flex-shrink-0" /> Phone-only booking</li>
                <li className="flex items-center"><X className="w-5 h-5 text-[#8896A6]/50 mr-3 flex-shrink-0" /> Manual scheduling systems</li>
                <li className="flex items-center"><X className="w-5 h-5 text-[#8896A6]/50 mr-3 flex-shrink-0" /> Limited amenities</li>
                <li className="flex items-center"><X className="w-5 h-5 text-[#8896A6]/50 mr-3 flex-shrink-0" /> Business hours only</li>
                <li className="flex items-center"><X className="w-5 h-5 text-[#8896A6]/50 mr-3 flex-shrink-0" /> Estimated arrival times</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card key={feature.id} className="bg-[#FAFBFC] border border-[#E8ECF0] border-t-2 border-t-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 group">
                <CardHeader className="p-8">
                  <div className="w-12 h-12 bg-[#1B2B4B]/5 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[#1B2B4B]" />
                  </div>
                  <CardTitle className="text-lg font-bold text-[#1B2B4B] mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-[#4A5568] text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="text-center bg-[#F8FAFB] rounded-2xl p-12 border border-[#E8ECF0]">
          <div className="relative">
            <h3 className="text-3xl font-bold text-[#1B2B4B] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready to Book Your Transfer?
            </h3>
            <p className="text-[#4A5568] mb-8 text-lg max-w-2xl mx-auto">
              Experience reliable, professional airport transportation
            </p>
            <Button
              onClick={() => window.location.href = '/book-now'}
              className="bg-gradient-to-r from-[#1B2B4B] to-[#2D4A7A] hover:from-[#162340] hover:to-[#264068] text-white px-10 py-6 text-lg font-semibold shadow-sm">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
