import React from 'react';

// Card component structure
export const Card: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>{children}</div>;
};

// CardHeader component structure
export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="border-b pb-4">{children}</div>;
};

// CardTitle component structure
export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-2xl font-semibold">{children}</h2>;
};

// CardDescription component structure
export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};

// CardContent component structure
export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="pt-4">{children}</div>;
};
