// src/components/SalesTools/ComparisonTools.jsx
import React from 'react';

const COMPARISON_DATA = {
  facilities: {
    "הולמס פלייס": [
      "בריכה חצי אולימפית מחוממת",
      "סאונה יבשה ורטובה",
      "ג'קוזי מפנק",
      "חדר כושר עם ציוד מתקדם",
      "מעל 100 שיעורי סטודיו בשבוע",
      "חניה זמינה",
      "מלתחות מפנקות עם שמפו",
      "פתוח מ-6 בבוקר עד 23:00"
    ],
    "חדר כושר רגיל": [
      "חדר כושר בסיסי",
      "מספר שיעורים מצומצם",
      "ללא בריכה",
      "ללא סאונה",
      "ללא ג'קוזי",
      "שעות פתיחה מוגבלות",
      "מלתחות בסיסיות",
      "בעיות חניה"
    ]
  },

  valueProps: [
    {
      title: "בריכה וספא",
      holmesPlace: "בריכה חצי אולימפית מחוממת + סאונה וג'קוזי",
      others: "אין בריכה או מתקני ספא",
      advantage: "שווי שימוש של 150₪ בחודש לבריכה בלבד"
    },
    {
      title: "שיעורים",
      holmesPlace: "מעל 100 שיעורים בשבוע ללא הגבלה",
      others: "מספר שיעורים מוגבל, לעיתים בתשלום נוסף",
      advantage: "חיסכון של 400₪ בחודש על שיעורים"
    },
    {
      title: "ציוד",
      holmesPlace: "ציוד חדיש ומתקדם מהמותגים המובילים",
      others: "ציוד בסיסי ולעיתים ישן",
      advantage: "אימון איכותי יותר עם תוצאות טובות יותר"
    },
    {
      title: "שעות פעילות",
      holmesPlace: "פתוח מ-6 בבוקר עד 23:00",
      others: "שעות פעילות מוגבלות",
      advantage: "גמישות מלאה להתאמן מתי שנוח לך"
    }
  ],

  closingPoints: [
    "אצלנו אתה מקבל פי 3 על כל שקל",
    "בוא נחשב כמה היית משלם על הכל בנפרד",
    "תחשוב כמה אתה חוסך על ספא בחודש",
    "אין תוספות או הפתעות - הכל כלול במחיר"
  ]
};

const ComparisonTools = () => {
  return (
    <div className="space-y-6">
      {/* השוואת מתקנים */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">השוואת מתקנים ושירותים</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-blue-600 mb-2">הולמס פלייס ✨</h4>
            {COMPARISON_DATA.facilities["הולמס פלייס"].map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-green-500 ml-2">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-gray-600 mb-2">חדר כושר רגיל</h4>
            {COMPARISON_DATA.facilities["חדר כושר רגיל"].map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-red-500 ml-2">✗</span>
                <span className="text-gray-500">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* יתרונות ערך */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">יתרונות והבדלים</h3>
        <div className="space-y-4">
          {COMPARISON_DATA.valueProps.map((prop, index) => (
            <div key={index} className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-blue-600">{prop.title}</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-green-600 font-medium">אצלנו:</div>
                  <div>{prop.holmesPlace}</div>
                </div>
                <div>
                  <div className="text-red-600 font-medium">אצל אחרים:</div>
                  <div className="text-gray-500">{prop.others}</div>
                </div>
              </div>
              <div className="mt-2 text-blue-600 font-medium">
                היתרון שלך: {prop.advantage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* משפטי סגירה */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">משפטי סגירה מומלצים:</h3>
        <div className="space-y-2">
          {COMPARISON_DATA.closingPoints.map((point, index) => (
            <div key={index} className="flex items-center">
              <span className="text-green-500 ml-2">💡</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTools;