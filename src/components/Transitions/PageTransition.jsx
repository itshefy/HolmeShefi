// src/components/Transitions/PageTransition.jsx
import React from 'react';

const PageTransition = ({ children, isVisible }) => {
  return (
    <div
      className={`transition-all duration-500 transform ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8'
      }`}
      role="main"
      aria-live="polite"
    >
      {children}
    </div>
  );
};

export default PageTransition;

// הוספת CSS גלובלי
// src/index.css
.page-enter {
  opacity: 0;
  transform: translateX(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 500ms, transform 500ms;
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 500ms, transform 500ms;
}