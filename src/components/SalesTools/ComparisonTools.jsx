// src/components/SalesTools/ComparisonTools.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Timer, 
  Users, 
  Dumbbell,
  Waves,
  Heart,
  MapPin,
  Calendar,
  Shield,
  Award
} from 'lucide-react';

const COMPETITORS_DATA = {
  // נתוני מתחרים לפי אזור
  areas: {
    givatShmuel: {
      name: "גבעת שמואל",
      competitors: [
        {
          name: "מכון כושר מקומי",
          price: "199-249",
          facilities: ["חדר כושר בסיסי", "מספר שיעורים מצומצם"],
          limitations: ["אין בריכה", "אין חניה", "שעות מוגבלות", "ציוד ישן"],
          advantages: ["מחיר נמוך"]
        },
        {
          name: "רשת מתחרה",
          price: "299-349",
          facilities: ["חדר כושר", "מספר שיעורי סטודיו", "חניה"],
          limitations: ["אין בריכה", "אין סאונה", "ציוד מוגבל"],
          advantages: ["מחיר ביניים", "פריסה ארצית מוגבלת"]
        }
      ]
    }
  },

  // יתרונות הולמס פלייס
  holmesAdvantages: {
    facilities: [
      {
        title: "בריכה וספא",
        description: "בריכה חצי אולימפית מחוממת + סאונה רטובה ויבשה + ג'קוזי",
        icon: Waves,
        value: "שווי של 200₪ בחודש לבריכה בלבד"
      },
      {
        title: "שיעורי סטודיו",
        description: "מעל 100 שיעורים בשבוע עם המדריכים הטובים ביותר",
        icon: Users,
        value: "שווי של 400₪ בחודש לשיעורים"
      },
      {
        title: "ציוד מתקדם",
        description: "ציוד חדיש ומתקדם מהמותגים המובילים בעולם",
        icon: Dumbbell,
        value: "הציוד הכי מתקדם בשוק"
      },
      {
        title: "שעות פעילות",
        description: "פתוח מ-6 בבוקר עד 23:00, כולל סופ״ש",
        icon: Timer,
        value: "גמישות מקסימלית"
      }
    ],
    services: [
      {
        title: "תוכנית נאמנות",
        description: "צבירת נקודות על כל אימון והטבות ייחודיות",
        icon: Heart,
        value: "הטבות בשווי מאות שקלים"
      },
      {
        title: "מיקום נגיש",
        description: "חניה חינם, נגישות מלאה, מיקום מרכזי",
        icon: MapPin,
        value: "חיסכון של 150₪ בחודש על חניה"
      }
    ],
    extras: [
      {
        title: "גמישות במנוי",
        description: "אפשרויות הקפאה, שדרוג והעברת מנוי",
        icon: Calendar,
        value: "גמישות מקסימלית"
      },
      {
        title: "תנאים מועדפים",
        description: "ביטוח מקיף, אחריות מלאה, שירות VIP",
        icon: Shield,
        value: "שקט נפשי מלא"
      }
    ]
  },

  // נקודות מכירה והתמודדות עם התנגדויות
  sellingPoints: {
    priceObjections: [
      {
        objection: "זה יקר מדי",
        response: "בוא נעשה השוואה של מה אתה מקבל - רק הבריכה והספא שווים 200₪ בחודש",
        sellingPoint: "אצלנו אתה מקבל הרבה יותר ערך לשקל"
      },
      {
        objection: "במקום אחר זה יותר זול",
        response: "תחשוב כמה היית משלם על הכל בנפרד - בריכה, סאונה, שיעורים",
        sellingPoint: "החבילה שלנו כוללת הכל במחיר אחד"
      }
    ],
    valueProposition: [
      {
        title: "איכות המתקנים",
        points: [
          "ציוד חדיש ומתוחזק היטב",
          "בריכה מחוממת כל השנה",
          "מלתחות מפנקות עם כל הפינוקים"
        ]
      },
      {
        title: "מקצועיות",
        points: [
          "צוות מדריכים מוסמך ומנוסה",
          "תוכניות אימון מותאמות אישית",
          "ליווי מקצועי לאורך כל הדרך"
        ]
      }
    ]
  }
};

const ComparisonTools = () => {
  const [selectedArea, setSelectedArea] = useState('givatShmuel');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showValueProps, setShowValueProps] = useState(false);

  return (
    <div className="space-y-8">
      {/* כותרת ראשית */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold flex items-center mb-4">
          <Award className="w-6 h-6 mr-2 text-blue-600" />
          כלי השוואה למתחרים
        </h2>
        <p className="text-gray-600">
          השוואה מקיפה של היתרונות שלנו מול המתחרים, כולל נקודות מכירה והתמודדות עם התנגדויות
        </p>
      </div>

      {/* השוואת מתקנים ושירותים */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">הולמס פלייס {COMPETITORS_DATA.areas[selectedArea].name}</h3>
          <div className="space-y-4">
            {COMPETITORS_DATA.holmesAdvantages.facilities.map((facility, index) => (
              <motion.div
                key={index}
                className="p-4 border rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => setSelectedFeature(facility)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start">
                  <facility.icon className="w-5 h-5 text-blue-600 mt-1 ml-2" />
                  <div>
                    <div className="font-bold">{facility.title}</div>
                    <div className="text-sm text-gray-600">{facility.description}</div>
                    <div className="text-sm text-blue-600 mt-1">{facility.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">מתחרים באזור</h3>
          <div className="space-y-6">
            {COMPETITORS_DATA.areas[selectedArea].competitors.map((competitor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="font-bold mb-2">{competitor.name}</div>
                <div className="text-sm space-y-2">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 ml-1" />
                    מחיר: {competitor.price}₪
                  </div>
                  
                  <div className="space-y-1">
                    {competitor.facilities.map((facility, fIndex) => (
                      <div key={fIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                    
                    {competitor.limitations.map((limitation, lIndex) => (
                      <div key={lIndex} className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-500 ml-1" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* נקודות מכירה והתמודדות עם התנגדויות */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* התמודדות עם התנגדויות */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">התמודדות עם התנגדויות</h3>
          <div className="space-y-4">
            {COMPETITORS_DATA.sellingPoints.priceObjections.map((objection, index) => (
              <motion.div
                key={index}
                className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <div className="font-bold text-red-600">{objection.objection}</div>
                <div className="text-sm mt-1">{objection.response}</div>
                <div className="text-sm text-green-600 mt-1">
                  <span className="font-bold">נקודת מכירה:</span> {objection.sellingPoint}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* הצעת ערך */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">נקודות מכירה מנצחות</h3>
          <div className="space-y-4">
            {COMPETITORS_DATA.sellingPoints.valueProposition.map((prop, index) => (
              <motion.div
                key={index}
                className="p-4 border rounded-lg hover:bg-green-50 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <div className="font-bold text-green-600">{prop.title}</div>
                <ul className="mt-2 space-y-1">
                  {prop.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* טיפים למוכר */}
      <motion.div
        className="bg-blue-50 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold mb-4">טיפים למוכר</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-blue-600 mb-2">בהשוואת מחירים</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                התמקד בערך הכולל, לא רק במחיר
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                הדגש את החיסכון בטווח הארוך
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                הראה את העלות היומית הנמוכה
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-blue-600 mb-2">בהצגת יתרונות</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                התאם את היתרונות לצרכי הלקוח
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                הדגש את הייחודיות שלנו
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                ספר על לקוחות מרוצים
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-blue-600 mb-2">בסגירת העסקה</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                תמיד הצע לסגור עכשיו
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                הדגש את ההטבות המיידיות
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 ml-2">•</span>
                צור תחושת דחיפות
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* תצוגת יתרון נבחר */}
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeature(null)}
        >
          <div 
            className="bg-white rounded-xl p-6 max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <selectedFeature.icon className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold">{selectedFeature.title}</h3>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p>{selectedFeature.description}</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold">ערך ללקוח:</p>
                <p>{selectedFeature.value}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-bold">משפטי מכירה מומלצים:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                    תחשוב כמה היית משלם על {selectedFeature.title.toLowerCase()} בנפרד
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                    זה לבד שווה את ההשקעה
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                    אצלנו זה כלול במחיר המנוי
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ComparisonTools;