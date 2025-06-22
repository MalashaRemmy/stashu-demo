import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`rounded-lg shadow-md p-4 bg-white ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`mt-2 ${className}`}>
    {children}
  </div>
);
