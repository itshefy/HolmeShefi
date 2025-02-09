// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {children}
    </div>
  );
};