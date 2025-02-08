// src/components/Accessibility/SkipLink.jsx
import React from 'react';

const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-blue-600 text-white p-4 rounded-lg"
  >
    דלג לתוכן הראשי
  </a>
);

// src/components/Accessibility/LiveRegion.jsx
const LiveRegion = ({ message }) => (
  <div
    role="status"
    aria-live="polite"
    className="sr-only"
  >
    {message}
  </div>
);

// src/components/Accessibility/FormField.jsx
const FormField = ({ label, id, error, children }) => (
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

// שיפורי נגישות גלובליים
const globalA11yStyles = `
  /* תוספת פוקוס ויזואלי */
  *:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
  }

  /* הגדלת אזור לחיצה */
  button, a {
    min-height: 44px;
    min-width: 44px;
  }

  /* ניגודיות צבעים */
  .text-contrast {
    color: #1a365d;
  }

  /* טקסט קריא */
  body {
    line-height: 1.5;
    font-size: 16px;
  }
`;

// הוספת אטריביוטים של נגישות לקומפוננטות קיימות
const accessibilityAttributes = {
  button: {
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.click();
      }
    }
  },
  dialog: {
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': 'dialog-title'
  },
  navigation: {
    role: 'navigation',
    'aria-label': 'תפריט ראשי'
  }
};