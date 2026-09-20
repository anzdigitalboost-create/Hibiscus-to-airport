import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900/80 backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12">
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Payment Cancelled
            </h1>
            
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-300 mb-8">
              Your payment was cancelled and no charges were made. Your booking is still pending payment.
            </p>
            
            <div className="bg-black/50 border border-gold/30 rounded-xl p-6 mb-8">
              <h3 className="text-gold text-lg font-bold mb-3">What Would You Like To Do?</h3>
              <ul className="text-left text-gray-300 space-y-2">
                <li>💡 Review your booking details and try again</li>
                <li>💡 Contact us if you need assistance with payment</li>
                <li>💡 Choose a different payment method</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/book-now')}
                className="bg-gold hover:bg-amber-500 text-black font-bold py-6 px-8"
              >
                Try Again
              </Button>
              
              <Button 
                onClick={() => navigate('/')}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-8 border border-gold/30"
              >
                Back to Home
              </Button>
            </div>
          </div>
          
          <div className="mt-8 text-gray-400">
            <p>Need assistance? Contact us at <a href="mailto:info@bookaride.co.nz" className="text-gold hover:underline">info@bookaride.co.nz</a></p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PaymentCancel;