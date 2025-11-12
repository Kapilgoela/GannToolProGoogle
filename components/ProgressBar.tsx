import React from 'react';

interface ProgressBarProps {
  isLoading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 z-50 transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`h-full bg-brand-blue transition-all duration-500 ease-out ${
          isLoading ? 'w-2/3' : 'w-full'
        }`}
        style={{
            backgroundImage: 'linear-gradient(to right, #0D47A1, #1976D2, #FFD700)',
            transitionProperty: 'width',
        }}
      />
    </div>
  );
};

export default ProgressBar;