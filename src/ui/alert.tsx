// src/ui/alert.tsx
import React from 'react';
// import { Alert, AlertDescription } from "@/src/ui/alert";

interface AlertProps {
  variant: 'success' | 'error' | 'info';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const alertClass = variant === 'success' 
    ? 'bg-green-100 text-green-800'
    : variant === 'error'
    ? 'bg-red-100 text-red-800'
    : 'bg-blue-100 text-blue-800';

  return (
    <div className={`p-4 rounded-md ${alertClass}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};
