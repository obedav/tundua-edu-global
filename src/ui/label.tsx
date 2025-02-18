import React from 'react';

// Label component for form fields
export const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
      {children}
    </label>
  );
};
