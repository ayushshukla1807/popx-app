import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 w-full flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Simulator Container */}
      <div className="w-full max-w-md h-screen sm:h-[850px] bg-white relative overflow-hidden sm:rounded-[2rem] sm:shadow-2xl sm:border-8 border-gray-900 flex flex-col">
        {/* Optional Notch for extra realism on desktop */}
        <div className="hidden sm:block absolute top-0 inset-x-0 h-6 bg-gray-900 w-40 mx-auto rounded-b-3xl z-50"></div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
