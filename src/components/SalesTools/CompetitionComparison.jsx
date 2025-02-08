// src/components/SalesTools/CompetitionComparison.jsx
import React from 'react';

const COMPARISONS = {
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

  priceComparison: {
    "הולמס פלייס": {
      monthlyPrice: "349₪",
      whatsIncluded: [
        "כל המתקנים",
        "כל השיעורים",
        "3 חודשים מתנה",
        "ליווי אישי"
      ],
      pricePerDay: "11₪"
    },
    "חדר כושר רגיל": {
      monthlyPrice: "299₪",
      whatsIncluded: [
        "חדר כושר בלבד",
        "תוספת תשלום לשיעורים",
        "ללא חודשי מתנה",
        "ללא ליווי"
      ],
      pricePerDay: "10₪"
    }
  },

  valueProposition: [
    "אצלנו אתה מקבל פי 3 על כל שקל",
    "תחשוב על זה - רק הבריכה שווה את ההפרש",
    "אתה חוסך על ספא בנפרד",
    "כל השיעורים כלולים - בלי הפתעות"
  ]
};

const CompetitionComparison = () => {
  return (
    <div className="space-y-6 p-4">
      {/* השוואת מתקנים */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-bold mb-4">השוואת מתקנים ושירותים</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-blue-600 mb-2">הולמס פלייס ✨</h4>
            {COMPARISONS.facilities["הולמס פלייס"].map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-green-500 ml-2">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-gray-600 mb-2">חדר כושר רגיל</h4>
            {COMPARISONS.facilities["חדר כושר רגיל"].map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-red-500 ml-2">✗</span>
                <span className="text-gray-500">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* השוואת מחירים */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-bold mb-4">השוואת מחירים</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(COMPARISONS.priceComparison).map(([name, data]) => (
            <div key={name} className={`p-4 rounded-lg ${
              name === "הולמס פלייס" ? 'bg-blue-50' : 'bg-gray-50'
            }`}>
              <h4 className="font-bold mb-2">{name}</h4>
              <div className="text-2xl font-bold mb-2">{data.monthlyPrice}</div>
              <div className="text-sm text-gray-600 mb-2">
                {data.pricePerDay} ליום בלבד!
              </div>
              <ul className="space-y-1">
                {data.whatsIncluded.map((item, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className={name === "הולמס פלייס" ? 'text-green-500' : 'text-red-500'}>
                      {name === "הולמס פלייס" ? '✓' : '✗'}
                    </span>
                    <span className="mr-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* משפטי שכנוע */}
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-bold mb-2">למה ההשקעה משתלמת?</h3>
        {COMPARISONS.valueProposition.map((prop, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="text-green-500 ml-2">💡</span>
            <span>{prop}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionComparison;