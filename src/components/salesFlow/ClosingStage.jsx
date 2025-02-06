// src/components/SalesFlow/ClosingStage.jsx
import React, { useState, useEffect } from 'react';

const getBonusContent = (profile) => {
  if (profile?.schedule?.id === 'morning') {
    return {
      title: "🌅 בונוס מיוחד למתאמני בוקר!",
      perks: [
        "שייק חלבון חינם בכל אימון בוקר",
        "תיק ספורט מתנה בשווי 199₪",
        "עדיפות ברישום לשיעורי בוקר"
      ]
    };
  }
  return {
    title: "🎁 בונוס מיוחד!",
    perks: [
      "חודש רביעי מתנה (שווי 349₪)",
      "תיק ספורט מתנה",
      "אימון אישי ראשון חינם"
    ]
  };
};

const ClosingStage = ({ profile, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showingBonus, setShowingBonus] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    // הצג בונוס אחרי 30 שניות
    const bonusTimer = setTimeout(() => setShowingBonus(true), 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(bonusTimer);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const bonusContent = getBonusContent(profile);

  const paymentOptions = [
    {
      id: 'monthly',
      title: 'תשלום חודשי',
      price: '349₪',
      description: 'לחודש למשך 12 חודשים'
    },
    {
      id: 'full',
      title: 'תשלום מראש',
      price: '3,490₪',
      description: '2 חודשים חינם + הטבת תשלום מראש'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          בוא נסגור את זה! 🚀
        </h2>
        
        <div className="text-red-600 font-bold text-xl animate-pulse mt-4">
          ⏰ המבצע יסתיים בעוד: {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="space-y-8">
        {/* הטבות עיקריות */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">מה אתה מקבל היום:</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-2xl ml-3">💪</span>
              <span className="text-lg">מנוי מלא לשנה במחיר מיוחד</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl ml-3">🎯</span>
              <span className="text-lg">3 חודשים מתנה (349₪ × 3 = 1,047₪)</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl ml-3">🏊‍♂️</span>
              <span className="text-lg">גישה מלאה לכל המתקנים והשיעורים</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl ml-3">👨‍🏫</span>
              <span className="text-lg">תוכנית אימונים אישית</span>
            </div>
          </div>
        </div>

        {/* בונוס */}
        {showingBonus && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl animate-bounce-in">
            <h3 className="text-xl font-bold mb-4">{bonusContent.title}</h3>
            {bonusContent.perks.map((perk, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-2xl ml-3">🎁</span>
                <span className="text-lg">{perk}</span>
              </div>
            ))}
            <div className="text-sm text-green-600 mt-2">
              * הבונוס יינתן רק לנרשמים ב-10 הדקות הקרובות
            </div>
          </div>
        )}

        {/* אפשרויות תשלום */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">בחר מסלול תשלום:</h3>
          <div className="grid grid-cols-2 gap-4">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPayment(option.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPayment === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-lg font-bold">{option.title}</div>
                <div className="text-2xl text-blue-600 font-bold">{option.price}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* טופס פרטים */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">הפרטים שלך:</h3>
          <input
            type="text"
            placeholder="שם מלא"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all text-right"
          />
          <input
            type="tel"
            placeholder="טלפון נייד"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all text-right"
          />
          <input
            type="email"
            placeholder="אימייל"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all text-right"
          />
        </div>

        {/* כפתור סגירה */}
        <button
          onClick={onComplete}
          disabled={!selectedPayment || !formData.name || !formData.phone}
          className={`w-full py-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 ${
            selectedPayment && formData.name && formData.phone
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          סוגרים את זה! 🚀
        </button>

        <div className="text-center space-y-2 text-sm text-gray-500">
          <p>* ההרשמה מותנית בחתימה על הצהרת בריאות</p>
          <p>* המחיר כולל מע"מ</p>
          <p>* ניתן לבטל בכל עת בהתאם לתקנון</p>
        </div>
      </div>
    </div>
  );
};

export default ClosingStage;