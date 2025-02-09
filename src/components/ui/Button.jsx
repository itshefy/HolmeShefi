// src/components/ui/Button.jsx
import React from 'react';

export const Button = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};