import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src="/src/assets/images/logo.png" 
        alt="Merge Sensei Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg leading-tight">MERGE</span>
          <span className="text-purple-400 font-bold text-lg leading-tight">SENSEI</span>
        </div>
      )}
    </div>
  );
}
