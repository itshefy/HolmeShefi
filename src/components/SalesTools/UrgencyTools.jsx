// src/components/SalesTools/UrgencyTools.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, Users, Calendar, Archive, AlertCircle } from 'lucide-react';

const URGENCY_TOOLS = {
  // מבצעים שמסתיימים היום
  currentDeals: {
    givatShmuel: {
      name: "מבצע גבעת שמואל",
      originalPrice: 454,
      dealPrice: 349,
      registration: 49,
      description: "מנוי מקומי ללא התחייבות",
      bonuses: [
        "אפשרות לחודש חינם",
        "דמי רישום מוזלים",
        "ביטול בהתראה של חודש"
      ],
      totalSaving: "1,410₪"
    },
    regularDeal: {
      name: "מבצע 3 חודשים חינם",
      originalPrice: 393,
      dealPrice: 295,
      registration: 149,
      description: "כולל תוכנית נאמנות",
      bonuses: [
        "מרץ חינם",
        "יולי חינם",
        "נובמבר חינם"
      ],
      totalSaving: "1,328₪"
    }
  },

  // משפטי דחיפות לפי סיטואציה
  urgencyPhrases: {
    limited_spots: [
      "המבצע מוגבל ל-10 נרשמים בלבד היום",
      "נשארו רק 3 מקומות במחיר הזה",
      "מספר המקומות במבצע הזה מוגבל"
    ],
    time_sensitive: [
      "המבצע בתוקף רק עד סוף היום",
      "ההטבות האלה זמינות רק היום",
      "המחיר עולה מחר בחצות"
    ],
    bonuses: [
      "דמי רישום מוזלים רק בהרשמה היום",
      "החודש חינם רק בסגירה מיידית",
      "ההטבות המיוחדות רק למצטרפים היום"
    ]
  },

  // טיפים למוכר
  salesTips: {
    preClosing: [
      "הקשב לצרכים של הלקוח ותפור לו את ההצעה בהתאם",
      "תן דוגמאות של לקוחות מרוצים מהמבצע",
      "הדגש את החיסכון הכולל לאורך זמן"
    ],
    objectionHandling: [
      "כשהלקוח אומר 'אני צריך לחשוב': הראה את החיסכון היומי",
      "כשמדברים על המחיר: התמקד בערך ובהטבות הנוספות",
      "כשרוצים להתייעץ בבית: הדגש שההטבות הן לסגירה מיידית"
    ],
    timing: [
      "תן ללקוח להרגיש שהוא מקבל הזדמנות מיוחדת",
      "צור תחושת בלעדיות עם ההטבות",
      "הדגש שזו הזדמנות חד פעמית"
    ]
  },

  // תסריטי מכירה
  closingScripts: {
    value_based: [
      {
        situation: "התלבטות על המחיר",
        script: "בוא נעשה חישוב קטן - זה יוצא פחות מ-10₪ ליום על הבריאות שלך",
        followUp: "איזה כרטיס יותר נוח לך לשלם?"
      },
      {
        situation: "צריך להתייעץ בבית",
        script: "אני מבין, אבל המבצע הזה עם כל ההטבות זמין רק עכשיו",
        followUp: "בוא נסגור היום ותרוויח את כל ההטבות"
      }
    ],
    bonus_based: [
      {
        situation: "מתעניין בהטבות",
        script: "בסגירה עכשיו אתה מקבל 3 חודשים במתנה, דמי רישום מוזלים וגם תיק ספורט",
        followUp: "איך נוח לך לשלם את זה?"
      }
    ]
  }
};

const UrgencyTools = () => {
  const [selectedDeal, setSelectedDeal] = useState('givatShmuel');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [selectedScript, setSelectedScript] = useState(null);
  const [showTips, setShowTips] = useState(true);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* כלי דחיפות למוכר */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* חלק 1: מבצעים נוכחיים */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            מבצעים פעילים
          </h3>
          
          <div className="space-y-4">
            {Object.entries(URGENCY_TOOLS.currentDeals).map(([key, deal]) => (
              <div
                key={key}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedDeal === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedDeal(key)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{deal.name}</h4>
                    <p className="text-gray-600 text-sm">{deal.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="line-through text-gray-400">{deal.originalPrice}₪</span>
                    <span className="text-green-600 font-bold text-lg block">{deal.dealPrice}₪</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-bold mb-1">הטבות:</p>
                  <ul className="text-sm space-y-1">
                    {deal.bonuses.map((bonus, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 ml-1">✓</span>
                        {bonus}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 bg-green-50 p-2 rounded text-center">
                  <span className="font-bold">חיסכון כולל: </span>
                  <span className="text-green-600">{deal.totalSaving}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* חלק 2: משפטי דחיפות */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            משפטי דחיפות
          </h3>

          <div className="space-y-6">
            {Object.entries(URGENCY_TOOLS.urgencyPhrases).map(([category, phrases]) => (
              <div key={category} className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  {phrases.map((phrase, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-3 rounded mb-2 cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(phrase);
                        // Add some feedback here
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {phrase}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* חלק 3: טיימר ומשפטי סגירה */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* טיימר */}
        <div className="bg-red-50 p-6 rounded-xl">
          <div className="text-center">
            <h3 className="text-xl font-bold text-red-600 mb-2">⏰ זמן שנותר למבצע:</h3>
            <div className="text-4xl font-bold text-red-600 mb-2">
              {formatTime(timeLeft)}
            </div>
            <p className="text-red-500">
              {URGENCY_TOOLS.urgencyPhrases.time_sensitive[
                Math.floor(Math.random() * URGENCY_TOOLS.urgencyPhrases.time_sensitive.length)
              ]}
            </p>
          </div>
        </div>

        {/* תסריטי מכירה */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            תסריטי סגירה
          </h3>

          <div className="space-y-4">
            {Object.entries(URGENCY_TOOLS.closingScripts).map(([category, scripts]) => (
              <div key={category}>
                {scripts.map((script, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg mb-3 cursor-pointer"
                    onClick={() => setSelectedScript(script)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="font-bold text-blue-600 mb-1">{script.situation}</div>
                    <div className="text-gray-600">{script.script}</div>
                    <div className="text-sm text-gray-500 mt-1">המשך: {script.followUp}</div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* חלק 4: טיפים למוכר */}
      {showTips && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 p-6 rounded-xl"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              טיפים למוכר
            </h3>
            <button
              onClick={() => setShowTips(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(URGENCY_TOOLS.salesTips).map(([category, tips]) => (
              <div key={category} className="space-y-2">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-yellow-500 ml-2">•</span>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UrgencyTools;