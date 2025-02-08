// src/components/Accessibility/index.jsx
import React from 'react';

export const SkipLink = () => {
  return (
    
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-blue-600 text-white p-4 rounded-lg"
    >
      דלג לתוכן הראשי
    </a>
  );
};

export const LiveRegion = ({ message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="sr-only"
    >
      {message}
    </div>
  );
};

export const FormField = ({ label, id, error, children }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 font-medium mb-2"
      >
        {label}
      </label>
      {children}
      {error && (
        <div
          role="alert"
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default {
  SkipLink,
  LiveRegion,
  FormField
};