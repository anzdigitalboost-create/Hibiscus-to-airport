import React from 'react';
import { Shield, Lock, CreditCard, Clock, CheckCircle, Award } from 'lucide-react';

const TrustBadges = ({ variant = 'default' }) => {
  if (variant === 'payment') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {/* Payment Methods */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
          <svg viewBox="0 0 24 24" className="w-8 h-5" fill="#1A1F71">
            <path d="M9.5 4h5l3.5 8-3.5 8h-5l3.5-8z"/>
            <path d="M4 4h5l3.5 8L9 20H4l3.5-8z" fill="#FF5F00"/>
          </svg>
          <span className="text-xs text-gray-500">Visa</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
          <svg viewBox="0 0 24 24" className="w-8 h-5">
            <circle cx="9" cy="12" r="7" fill="#EB001B"/>
            <circle cx="15" cy="12" r="7" fill="#F79E1B"/>
            <path d="M12 6.5a7 7 0 000 11 7 7 0 000-11z" fill="#FF5F00"/>
          </svg>
          <span className="text-xs text-gray-500">Mastercard</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <Lock className="w-3 h-3" />
          <span>Secure Card Payment</span>
        </div>
      </div>
    );
  }

  if (variant === 'mini') {
    return (
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-green-500" /> Secure
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" /> Fixed Price
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-green-500" /> 24/7
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
            <p className="text-xs text-gray-500">256-bit SSL</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Fixed Pricing</p>
            <p className="text-xs text-gray-500">No hidden fees</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">24/7 Service</p>
            <p className="text-xs text-gray-500">Always available</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">5-Star Rated</p>
            <p className="text-xs text-gray-500">127+ reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
