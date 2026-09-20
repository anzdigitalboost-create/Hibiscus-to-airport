import React from 'react';

const LoadingSpinner = ({ message = 'Processing...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <p className="text-sm text-gray-600 text-center">Please do not close this window</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;