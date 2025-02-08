// src/components/SalesTools/UrgencyTools.jsx
import React, { useState, useEffect } from 'react';

const URGENCY_DATA = {
  limited_spots: [
    "נשארו רק 3 מקומות במחיר הזה",
    "הקבוצות מתמלאות מהר",
    "המקומות במבצע הולכים להיגמר"
  ],
  
  time_bonuses: [
    {
      title: "הטבת סגירה מיידית",
      benefits: [
        "פטור מדמי רישום (199₪)",
        "חודש נוסף מתנה (349₪)",
        "תיק ספורט מתנה (150₪)"
      ],
      value: "שווי כולל: 698₪"
    },
    {
      title: "חבילת VIP",
      benefits: [
        "אימון אישי ראשון חינם",
        "חניה חינם לחודש הראשון",
        "שייק חלבון אחרי כל אימון בחודש הראשון"
      ],
      value: "שווי כולל: 500₪"
    }
  ],

  closing_phrases: [
    {
      title: "סגירה מיידית",
      text: "בוא נסגור עכשיו ותתחיל כבר מחר",
      followUp: "איזה כרטיס יותר נוח לך לשלם?"
    },
    {
      title: "סגירה עם בונוס",
      text: "אם נסגור עכשיו אני יכול לתת לך את כל ההטבות האלה",
      followUp: "מה אתה אומר?"
    },
    {
      title: "סגירה על זמן",
      text: "המבצע נגמר היום בחצות",
      followUp: "בוא לא נפספס את ההזדמנות"
    }
  ]
};

const UrgencyTools = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [activeBonus, setActiveBonus] = useState(0);
  const [copiedText, setCopiedText] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className="space-y-6">
      {/* טיימר */}
      <div className="bg-red-50 p-6 rounded-lg animate-pulse">
        <h3 className="text-xl font-bold text-red-600 text-center">
          ⏰ זמן שנותר למבצע:
        </h3>
        <div className="text-3xl font-bold text-center text-red-600">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-red-500 text-center mt-2">
          {URGENCY_DATA.limited_spots[Math.floor(Math.random() * URGENCY_DATA.limited_spots.length)]}
        </div>
      </div>

      {/* הטבות מיידיות */}
      <div className="grid grid-cols-2 gap-4">
        {URGENCY_DATA.time_bonuses.map((bonus, index) => (
          <div key={index} className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{bonus.title}</h3>
            <ul className="space-y-2">
              {bonus.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm text-green-600 font-bold mt-2">{bonus.value}</div>
          </div>
        ))}
      </div>

      {/* משפטי סגירה */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">משפטי סגירה מומלצים:</h3>
        <div className="space-y-4">
          {URGENCY_DATA.closing_phrases.map((phrase, index) => (
            <div 
              key={index}
              className="p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-100 transition-all"
              onClick={() => copyToClipboard(`${phrase.text}\n${phrase.followUp}`)}
            >
              <div className="font-medium">{phrase.text}</div>
              <div className="text-sm text-gray-600">{phrase.followUp}</div>
              {copiedText === `${phrase.text}\n${phrase.followUp}` && (
                <div className="text-green-600 text-sm mt-1">✓ הועתק</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* טיפים */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">טיפים לסגירה מהירה:</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="text-purple-500 ml-2">💡</span>
            <span>השתמש בטיימר כדי ליצור תחושת דחיפות</span>
          </li>
          <li className="flex items-center">
            <span className="text-purple-500 ml-2">💡</span>
            <span>הדגש את שווי ההטבות במספרים</span>
          </li>
          <li className="flex items-center">
            <span className="text-purple-500 ml-2">💡</span>
            <span>תמיד תן סיבה למה לסגור עכשיו</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UrgencyTools;