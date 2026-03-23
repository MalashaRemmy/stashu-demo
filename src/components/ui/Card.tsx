import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={cn('bg-white rounded-lg border border-gray-200 shadow-sm p-4', className)}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => (
  <div className={cn('px-4 py-3 border-b border-gray-200', className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = ({ className = '', children }) => (
  <h3 className={cn('text-lg font-semibold text-gray-900', className)}>
    {children}
  </h3>
);

export const CardContent: React.FC<CardContentProps> = ({ className = '', children }) => (
  <div className={cn('px-4 py-3', className)}>
    {children}
  </div>
);
