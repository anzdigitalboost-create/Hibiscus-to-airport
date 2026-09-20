import React, { useState, useEffect, useCallback } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  const DISCOUNT_CODE = 'FIRST10';

  const handleMouseLeave = useCallback((e) => {
    // Only trigger when mouse moves to top of viewport (leaving page)
    if (e.clientY <= 0 && !hasShown && !isVisible) {
      // Check if user hasn't seen the popup in this session
      const popupShown = sessionStorage.getItem('exitPopupShown');
      if (!popupShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    }
  }, [hasShown, isVisible]);

  useEffect(() => {
    // Check if already shown this session
    const popupShown = sessionStorage.getItem('exitPopupShown');
    if (popupShown) {
      setHasShown(true);
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Store email (could send to backend later)
      localStorage.setItem('discount_email', email);
      localStorage.setItem('discount_code', DISCOUNT_CODE);
      setIsSubmitted(true);
    }
  };

  const handleBookNow = () => {
    setIsVisible(false);
    navigate('/book-now');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Wait! Don&apos;t Leave Yet
          </h2>
          <p className="text-amber-100">
            We have a special offer just for you
          </p>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          {!isSubmitted ? (
            <>
              {/* Offer */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  🎉 First-Time Customer Offer
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  10% OFF
                </h3>
                <p className="text-gray-600">
                  Your first airport transfer booking
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 text-center border-2 border-gray-200 focus:border-amber-500"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
                >
                  Get My 10% Discount
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              
              {/* No Thanks */}
              <button
                onClick={handleClose}
                className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                No thanks, I&apos;ll pay full price
              </button>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Your Discount is Ready!
                </h3>
                <p className="text-gray-600 mb-4">
                  Use code at checkout:
                </p>
                <div className="bg-gray-100 rounded-lg px-6 py-3 mb-6">
                  <span className="text-2xl font-bold text-amber-600 tracking-wider">
                    {DISCOUNT_CODE}
                  </span>
                </div>
                <Button 
                  onClick={handleBookNow}
                  className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
                >
                  Book Now & Save 10%
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-gray-400 mt-4">
                  Code sent to {email}
                </p>
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <span className="mr-2">🔒</span>
            Your email is safe with us. No spam, ever.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
