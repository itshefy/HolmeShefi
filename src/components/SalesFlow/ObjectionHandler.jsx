// src/components/SalesFlow/ObjectionHandler.jsx
import React, { useState } from 'react';

const OBJECTIONS = {
  price: {
    title: "בוא נדבר על ההשקעה 💰",
    responses: [
      {
        mainPoint: "תחשוב על זה ככה - 349₪ זה בערך 11₪ ליום",
        details: "זה פחות ממה שאתה מוציא על קפה, והרבה פחות ממה שעולה רופא",
        emphasis: "אתה משקיע בבריאות שלך - אין לזה מחיר",
        extras: [
          "חיסכון על טיפולי פיזיותרפיה",
          "חיסכון על תרופות",
          "פחות ימי מחלה"
        ]
      },
      {
        mainPoint: "בוא נעשה חשבון פשוט",
        details: "8 אימונים בחודש = 43₪ לאימון. זה פחות ממחיר כניסה חד פעמית לבריכה",
        emphasis: "ואתה מקבל גישה חופשית לכל המתקנים, כל יום!",
        extras: [
          "גישה לכל השיעורים",
          "שימוש בסאונה וג'קוזי",
          "אימון בכל שעה שנוחה לך"
        ]
      },
      {
        mainPoint: "אתה מקבל המון תמורה להשקעה",
        details: "בריכה, חדר כושר, סאונה, ג'קוזי, מעל 100 שיעורים בשבוע",
        emphasis: "הכל במחיר של מנוי רגיל לחדר כושר",
        extras: [
          "ציוד מתקדם",
          "מדריכים מקצועיים",
          "מתקנים ברמה גבוהה"
        ]
      }
    ],
    nlpTechniques: [
      "תסכים איתי שהבריאות שלך שווה יותר מקפה ביום?",
      "אתה הרי מבין שזו השקעה, לא הוצאה",
      "בוא נחשוב רגע כמה זה יחסוך לך בטווח הארוך"
    ],
    closing: [
      "בוא נסגור עכשיו ותקבל 3 חודשים מתנה",
      "אפשר לפרוס ל-12 תשלומים נוחים",
      "המחיר הזה מובטח רק היום"
    ]
  },
  time: {
    title: "בוא נמצא את הזמן המושלם בשבילך ⏰",
    responses: [
      {
        mainPoint: "אנחנו פתוחים מ-6 בבוקר עד 23:00",
        details: "תמיד תמצא זמן שמתאים לך, גם עם לו\"ז צפוף",
        emphasis: "אפילו 45 דקות 3 פעמים בשבוע יעשו שינוי מטורף",
        extras: [
          "גמישות מלאה בשעות",
          "אימונים קצרים ואפקטיביים",
          "מגוון שיעורים בכל שעה"
        ]
      },
      {
        mainPoint: "תחשוב כמה זמן אתה מבזבז על שטויות",
        details: "במקום עוד שעה בנטפליקס - תשקיע בעצמך",
        emphasis: "הגוף שלך שווה את הזמן הזה",
        extras: [
          "אימונים יעילים",
          "תוצאות מהירות",
          "זמן איכות לעצמך"
        ]
      }
    ],
    nlpTechniques: [
      "תסכים איתי שאם משהו חשוב לך, אתה מוצא לזה זמן?",
      "אתה יודע שזה רק תירוץ, נכון?",
      "בוא נמצא יחד את החלון המושלם בשבילך"
    ],
    closing: [
      "בוא נמצא יחד את החלון המושלם בשבילך",
      "תתחיל כבר מחר - אין סיבה לחכות",
      "נתחיל באימונים קצרים ונתקדם בקצב שלך"
    ]
  },
  consult: {
    title: "בוא נדבר על ההחלטה 🤔",
    responses: [
      {
        mainPoint: "אני מבין שאתה רוצה להתייעץ",
        details: "אבל המבצע נגמר היום - לא נוכל לשמור את המחיר הזה",
        emphasis: "כל יום שעובר זה עוד יום של הזדמנות שפספסת",
        extras: [
          "המחיר יעלה מחר",
          "המקומות מוגבלים",
          "ההטבות לזמן מוגבל"
        ]
      },
      {
        mainPoint: "תחשוב על זה - אתה כבר יודע שזה נכון",
        details: "כולם מתייעצים, אבל בסוף מצטערים שלא התחילו קודם",
        emphasis: "בוא לא נחכה עוד - נתחיל כבר מחר",
        extras: [
          "החלטה לטובתך",
          "השקעה בעצמך",
          "התחלה של שינוי"
        ]
      }
    ],
    nlpTechniques: [
      "תסכים איתי שאתה כבר יודע שזה הדבר הנכון?",
      "אתה הרי לא באמת צריך להתייעץ על הבריאות שלך",
      "בוא נחשוב יחד מה באמת מעכב אותך"
    ],
    closing: [
      "בוא נרשום אותך עכשיו - יש לך 14 יום להתרשם",
      "אני שומר לך מקום - המחיר מובטח",
      "ההחלטה הכי טובה שתעשה השנה"
    ]
  },
  distance: {
    title: "בוא נדבר על המיקום 🗺️",
    responses: [
      {
        mainPoint: "המיקום שלנו מושלם - על התפר בין גבעת שמואל לפתח תקווה",
        details: "יש לנו חניה זמינה תמיד, בלי להסתובב",
        emphasis: "תוך שבוע זה יהפוך לחלק מהשגרה שלך",
        extras: [
          "חניה בשפע",
          "גישה נוחה",
          "קרוב לצירי תנועה"
        ]
      },
      {
        mainPoint: "אנשים מגיעים אלינו מכל האזור",
        details: "15 דקות נסיעה זה כלום לעומת התוצאות שתקבל",
        emphasis: "בסוף זה עניין של סדרי עדיפויות",
        extras: [
          "שווה את הנסיעה",
          "מיקום מרכזי",
          "נגיש מכל מקום"
        ]
      }
    ],
    nlpTechniques: [
      "תסכים איתי שבשביל תוצאות צריך להתאמץ קצת?",
      "אתה יודע שזה רק תירוץ, נכון?",
      "בוא נראה כמה זה באמת קרוב"
    ],
    closing: [
      "בוא נסגור ותראה כמה זה קרוב בעצם",
      "תוך שבוע זה יהפוך לשגרה - מתחילים מחר?",
      "המיקום המושלם לשינוי שאתה רוצה"
    ]
  }
};

const ObjectionHandler = ({ onClose }) => {
  const [selectedObjection, setSelectedObjection] = useState(null);
  const [showingResponse, setShowingResponse] = useState(false);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);

  const handleObjectionSelect = (objection) => {
    setSelectedObjection(objection);
    setShowingResponse(true);
    setCurrentResponseIndex(0);
  };

  const renderObjectionButtons = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">במה אפשר לעזור?</h2>
      {Object.entries(OBJECTIONS).map(([key, data]) => (
        <button
          key={key}
          onClick={() => handleObjectionSelect(key)}
          className="w-full p-4 text-right rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between"
        >
          <span className="text-lg font-medium">{data.title}</span>
          <span className="text-2xl">→</span>
        </button>
      ))}
    </div>
  );

  const renderResponse = () => {
    const objection = OBJECTIONS[selectedObjection];
    const currentResponse = objection.responses[currentResponseIndex];

    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">{objection.title}</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
          <div className="text-lg font-bold mb-2">{currentResponse.mainPoint}</div>
          <div className="text-gray-700 mb-2">{currentResponse.details}</div>
          <div className="text-blue-600 font-medium">{currentResponse.emphasis}</div>
          
          <div className="mt-4 space-y-2">
            {currentResponse.extras.map((extra, index) => (
              <div key={index} className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span>{extra}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
          <div className="text-lg font-bold mb-4">טכניקות שכנוע:</div>
          {objection.nlpTechniques.map((technique, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="text-2xl ml-3">💡</span>
              <span className="text-lg">{technique}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
          <div className="text-lg font-bold mb-4">בוא נסגור את זה:</div>
          {objection.closing.map((close, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="text-2xl ml-3">✓</span>
              <span className="text-lg">{close}</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg text-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
          >
            מעולה, בוא נתחיל! 🚀
          </button>
          
          <button
            onClick={() => setShowingResponse(false)}
            className="flex-1 border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-lg text-xl hover:bg-blue-50 transition-all"
          >
            יש לי עוד התלבטות
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {!showingResponse ? renderObjectionButtons() : renderResponse()}
    </div>
  );
};

export default ObjectionHandler;