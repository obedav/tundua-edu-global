// src/ui/input.tsx
import React from 'react';

interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ id, name, value, onChange, type = 'text', placeholder, className }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${className}`}
    />
  );
};
