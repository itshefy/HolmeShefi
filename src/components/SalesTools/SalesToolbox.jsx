// src/components/SalesTools/SalesToolbox.jsx
import React, { useState } from 'react';

const PRICE_PLANS = {
  regular: {
    basePrice: 393,
    months: 9,
    freeMonths: 3,
    registration: 199
  },
  student: {
    basePrice: 349,
    months: 9,
    freeMonths: 3,
    registration: 149
  },
  senior: {
    basePrice: 312,
    months: 12,
    registration: 99
  }
};

const OBJECTION_TEMPLATES = {
  price: {
    high: [
      "בוא נעשה חשבון פשוט - זה יוצא רק [price] ליום!",
      "חושב על זה כהשקעה בבריאות שלך, לא כהוצאה",
      "פחות מקפה ומאפה ביום - אבל התמורה הרבה יותר גדולה"
    ],
    value: [
      "אתה מקבל הרבה יותר ממנוי רגיל:",
      "• בריכה חצי אולימפית",
      "• סאונה וג'קוזי",
      "• מעל 100 שיעורים בשבוע",
      "• ליווי מקצועי צמוד"
    ]
  },
  time: {
    busy: [
      "פתוח מ-6 בבוקר עד 23:00 - תמיד תמצא זמן",
      "גם 3 פעמים בשבוע יעשו שינוי מטורף",
      "תחשוב כמה זמן 'הולך לאיבוד' על דברים פחות חשובים"
    ],
    schedule: [
      "אפשר לבוא מתי שנוח לך",
      "אין התחייבות לשעות קבועות",
      "גמישות מלאה בשעות האימון"
    ]
  }
};

const SalesToolbox = () => {
  const [selectedPlan, setSelectedPlan] = useState('regular');
  const [months, setMonths] = useState(12);
  const [discount, setDiscount] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // מחשבון מחירים והצעות
  const calculateOffer = () => {
    const plan = PRICE_PLANS[selectedPlan];
    const baseTotal = plan.basePrice * months;
    const discountAmount = (baseTotal * discount) / 100;
    const finalPrice = baseTotal - discountAmount;

    return {
      monthly: plan.basePrice,
      total: finalPrice,
      registration: plan.registration,
      savings: discountAmount + (plan.freeMonths || 0) * plan.basePrice
    };
  };

  // סטטיסטיקות מכירה
  const todayStats = {
    calls: 15,
    meetings: 8,
    conversions: 3,
    conversionRate: "37.5%",
    avgDealValue: "4,716₪"
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-4">
      {/* כלי מכירה מהירים */}
      <div className="bg-white rounded-lg shadow-xl p-4 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">כלי מכירה</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowStats(!showStats)}
              className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200"
            >
              סטטיסטיקות
            </button>
          </div>
        </div>

        {showStats && (
          <div className="mb-4 bg-blue-50 p-3 rounded-lg">
            <p className="font-bold mb-2">סטטיסטיקות היום:</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{todayStats.calls}</p>
                <p className="text-xs">שיחות</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{todayStats.conversions}</p>
                <p className="text-xs">סגירות</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{todayStats.conversionRate}</p>
                <p className="text-xs">אחוז המרה</p>
              </div>
            </div>
          </div>
        )}

        {/* מחשבון הצעות */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <select 
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="regular">רגיל</option>
              <option value="student">סטודנט</option>
              <option value="senior">גיל הזהב</option>
            </select>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="% הנחה"
              className="p-2 border rounded"
            />
          </div>

          {/* תצוגת הצעת מחיר */}
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>מחיר חודשי:</span>
              <span className="font-bold">{calculateOffer().monthly}₪</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>סה"כ חיסכון:</span>
              <span className="font-bold text-green-600">{calculateOffer().savings}₪</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>סה"כ לתשלום:</span>
              <span>{calculateOffer().total}₪</span>
            </div>
          </div>

          {/* תבניות לטיפול בהתנגדויות */}
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="font-bold mb-2">תבניות לטיפול בהתנגדויות:</p>
            <select className="w-full p-2 border rounded mb-2">
              <option value="">בחר תבנית...</option>
              <optgroup label="מחיר">
                <option value="price_high">מחיר גבוה</option>
                <option value="price_value">תמורה למחיר</option>
              </optgroup>
              <optgroup label="זמן">
                <option value="time_busy">אין זמן</option>
                <option value="time_schedule">לו"ז לא מתאים</option>
              </optgroup>
            </select>
            <div className="text-sm">
              {OBJECTION_TEMPLATES.price.high.map((template, index) => (
                <div key={index} className="p-2 hover:bg-yellow-100 cursor-pointer rounded">
                  {template}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* כפתורי פעולה מהירים */}
      <div className="flex justify-end space-x-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          📝 הצעת מחיר
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          ✨ טיפים מנצחים
        </button>
      </div>
    </div>
  );
};

export default SalesToolbox;