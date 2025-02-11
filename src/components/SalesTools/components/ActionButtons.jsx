// src/components/SalesTools/components/ActionButtons.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ActionButtons = ({ onClose, onReject, profile }) => {
  const handleCloseDeal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // שמירת פרטי העסקה
    const dealData = {
      name: profile.name,
      gender: profile.gender,
      status: profile.status,
      goals: profile.subGoals,
      dateTime: new Date().toISOString(),
      sectionCode: {
        student: '489',
        soldier: '842',
        senior: '894',
        regular: '721'
      }[profile.status] || '721'
    };

    // אפקט קונפטי
    try {
      const confettiContainer = document.createElement('div');
      confettiContainer.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden';
      document.body.appendChild(confettiContainer);

      const colors = ['#FFD700', '#FFA500', '#FF4500', '#87CEEB', '#90EE90'];
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'absolute w-2 h-2 rounded-full';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        confettiContainer.appendChild(confetti);
      }

      setTimeout(() => {
        document.body.removeChild(confettiContainer);
      }, 3000);
    } catch (error) {
      console.log('Visual effect not available');
    }

    // קריאה לפונקציית הסגירה
    if (typeof onClose === 'function') {
      onClose(dealData);
    }
  };

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium shadow-lg relative overflow-hidden"
        onClick={handleCloseDeal}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-500/30"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span>מעולה! אני רוצה להצטרף</span>
          <Sparkles className="w-5 h-5" />
        </span>
      </motion.button>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'price', icon: '💰', text: 'המחיר גבוה' },
          { id: 'time', icon: '⏰', text: 'הזמנים לא מתאימים' },
          { id: 'location', icon: '📍', text: 'המיקום רחוק' },
          { id: 'think', icon: '🤔', text: 'צריך/ה לחשוב' }
        ].map((reason) => (
          <motion.button
            key={reason.id}
            whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-white rounded-lg text-gray-700 text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 border border-gray-100"
            onClick={() => onReject(reason.id)}
          >
            <span>{reason.icon}</span>
            <span>{reason.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;