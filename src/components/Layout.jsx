import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-200 w-full flex items-center justify-center p-0 sm:p-4">
      {/* Perfect Mobile Simulator (iPhone X dimensions) */}
      <div className="w-full sm:w-[375px] h-screen sm:h-[812px] bg-[#f7f8f9] relative overflow-hidden sm:rounded-[2.5rem] sm:shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col sm:border-[8px] border-white sm:border-gray-900">
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
