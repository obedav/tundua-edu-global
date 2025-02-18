import React from 'react';

// Select component to choose a role
export const Select: React.FC<{ value: string; onValueChange: (value: string | undefined) => void; children: React.ReactNode }> = ({
  value,
  onValueChange,
  children,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full p-2 border rounded-md text-sm"
    >
      {children}
    </select>
  );
};

// SelectContent component
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

// SelectItem component
export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  return (
    <option value={value} className="text-sm">
      {children}
    </option>
  );
};

// SelectTrigger component
export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

// SelectValue component
export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  return <span className="text-sm text-gray-500">{placeholder}</span>;
};
