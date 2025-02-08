// src/components/SalesTools/animations.js
export const pageTransitions = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 }
};

export const cardTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  transition: { duration: 0.2 }
};

export const buttonTransitions = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  transition: { duration: 0.1 }
};