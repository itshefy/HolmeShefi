// src/components/SalesFlow/Dashboard.jsx
import React, { useState } from 'react';

const SELLING_POINTS = {
  lifestyle: {
    title: "אורח חיים בריא ומאוזן",
    points: [
      "מסגרת מקצועית שתלווה אותך לאורח חיים בריא",
      "גיוון בפעילויות ושינוי דפוסי אימון",
      "ליווי אישי להצלחה מתמשכת"
    ],
    emphasis: "אצלנו תקבל הרבה יותר מסתם חדר כושר!"
  },
  facilities: {
    title: "מתקנים ברמה הגבוהה ביותר",
    points: [
      "בריכה חצי אולימפית מחוממת",
      "סאונה יבשה ורטובה וג'קוזי מפנק",
      "סטודיו עם מיטב השיעורים בעולם"
    ],
    emphasis: "כל מה שצריך תחת קורת גג אחת!"
  },
  professional: {
    title: "צוות מקצועי ומוסמך",
    points: [
      "יועץ כושר אישי שילווה אותך",
      "תוכנית אימונים מותאמת אישית",
      "מדריכים מוסמכים בכל התחומים"
    ],
    emphasis: "המקצועיות שלנו - ההצלחה שלך!"
  }
};

const SalesQuickTools = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showUrgency, setShowUrgency] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">כלי מכירה מהירים</h3>
          <button 
            onClick={() => setShowUrgency(!showUrgency)}
            className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200"
          >
            דחיפות
          </button>
        </div>

        {showUrgency && (
          <div className="mb-4 bg-red-50 p-3 rounded-lg">
            <p className="text-red-600 font-medium">משפטי דחיפות:</p>
            <ul className="text-sm space-y-2">
              <li>• "המבצע נגמר היום - אי אפשר לדחות יותר"</li>
              <li>• "נשארו רק 2 מקומות במחיר הזה"</li>
              <li>• "המחיר עולה מחר ב-150₪"</li>
            </ul>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 mb-4">
          {Object.keys(SELLING_POINTS).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedPoint(key)}
              className={`p-2 rounded-lg text-sm font-medium transition-all ${
                selectedPoint === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {SELLING_POINTS[key].title}
            </button>
          ))}
        </div>

        {selectedPoint && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-medium mb-2">{SELLING_POINTS[selectedPoint].title}</p>
            <ul className="text-sm space-y-2">
              {SELLING_POINTS[selectedPoint].points.map((point, index) => (
                <li key={index}>• {point}</li>
              ))}
            </ul>
            <p className="text-blue-600 font-medium mt-2">
              {SELLING_POINTS[selectedPoint].emphasis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesQuickTools;