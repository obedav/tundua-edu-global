// src/ui/button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};
