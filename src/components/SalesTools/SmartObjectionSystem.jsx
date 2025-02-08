// src/components/SalesTools/SmartObjectionSystem.jsx
import React, { useState, useEffect } from 'react';

const OBJECTION_PATTERNS = {
  price: {
    keywords: ['יקר', 'מחיר', 'כסף', 'תשלום', 'תקציב', 'לא יכול להרשות', 'הרבה', 'גבוה'],
    type: 'מחיר',
    responses: {
      standard: {
        title: "תגובות מתונות למחיר",
        answers: [
          {
            text: "בוא נעשה חשבון פשוט - זה יוצא 11₪ ליום בלבד",
            followUp: "זה פחות מקפה וכריך"
          },
          {
            text: "תן לי להראות לך את המסלולים השונים שיש לנו",
            followUp: "יש לנו אפשרויות לכל תקציב"
          },
          {
            text: "אפשר לפרוס את התשלום ל-12 תשלומים נוחים",
            followUp: "ככה זה הרבה יותר קל לנהל"
          }
        ]
      },
      aggressive: {
        title: "תגובות אסרטיביות למחיר",
        answers: [
          {
            text: "תחשוב על זה כהשקעה בבריאות שלך, לא כהוצאה",
            followUp: "כמה עולה לך ביקור אחד אצל רופא?"
          },
          {
            text: "אתה משלם יותר על הסלולרי שלך בחודש",
            followUp: "ומה יותר חשוב - הבריאות או הטלפון?"
          },
          {
            text: "המחיר הזה כולל הכל - בריכה, חדר כושר, סאונה, ג'קוזי",
            followUp: "איפה עוד תקבל כל כך הרבה במחיר כזה?"
          }
        ]
      },
      value: {
        title: "תגובות ממוקדות ערך",
        answers: [
          {
            text: "בוא אני אראה לך מה אתה מקבל תמורת ההשקעה",
            followUp: "יש לנו את המתקנים הכי מתקדמים באזור"
          },
          {
            text: "אתה מקבל ליווי אישי מלא לאורך כל הדרך",
            followUp: "זה כמו מאמן אישי שמלווה אותך"
          },
          {
            text: "המנוי כולל גם את כל השיעורים - יותר מ-100 בשבוע",
            followUp: "אין הגבלה על כמות השיעורים"
          }
        ]
      }
    }
  },
  time: {
    keywords: ['זמן', 'עסוק', 'לו"ז', 'פנוי', 'שעות', 'לא מספיק', 'עבודה', 'משפחה'],
    type: 'זמן',
    responses: {
      standard: {
        title: "תגובות מתונות לזמן",
        answers: [
          {
            text: "אנחנו פתוחים מ-6 בבוקר עד 23:00",
            followUp: "תמיד תמצא זמן שמתאים לך"
          },
          {
            text: "אפשר להתאמן גם 3 פעמים בשבוע לחצי שעה",
            followUp: "זה מספיק בשביל לראות תוצאות"
          },
          {
            text: "יש לנו מגוון שיעורים לאורך כל היום",
            followUp: "אתה בוחר מתי להגיע"
          }
        ]
      },
      aggressive: {
        title: "תגובות אסרטיביות לזמן",
        answers: [
          {
            text: "כשמשהו חשוב, מוצאים לזה זמן",
            followUp: "הבריאות שלך לא שווה שעה ביום?"
          },
          {
            text: "תחשוב כמה זמן אתה מבזבז על דברים פחות חשובים",
            followUp: "במקום עוד שעה בנטפליקס - תשקיע בעצמך"
          },
          {
            text: "אנשים עסוקים ממך מתאמנים פה כל יום",
            followUp: "זה עניין של סדרי עדיפויות"
          }
        ]
      },
      value: {
        title: "תגובות ממוקדות ערך לזמן",
        answers: [
          {
            text: "אתה יכול להתחיל את היום באנרגיות או לסיים אותו בכיף",
            followUp: "הרבה מתאמנים משלבים את זה בשגרה"
          },
          {
            text: "יש לנו מקלחות מפנקות - אפשר ישר לעבודה",
            followUp: "הרבה מגיעים לפני העבודה"
          },
          {
            text: "אימון קצר וממוקד שווה יותר מכלום",
            followUp: "נבנה לך תוכנית יעילה לזמן שיש לך"
          }
        ]
      }
    }
  },
  commitment: {
    keywords: ['התחייבות', 'חוזה', 'לבדוק', 'לחשוב', 'להתייעץ', 'ננסה', 'אולי', 'בהמשך'],
    type: 'התחייבות',
    responses: {
      standard: {
        title: "תגובות מתונות להתחייבות",
        answers: [
          {
            text: "בוא נדבר על המסלולים השונים שיש לנו",
            followUp: "יש אפשרויות גמישות"
          },
          {
            text: "המחיר המיוחד כולל תקופת התנסות",
            followUp: "תוכל להתרשם בעצמך"
          },
          {
            text: "אפשר להתחיל ולראות איך זה מתאים לך",
            followUp: "אין התחייבות ארוכת טווח"
          }
        ]
      },
      aggressive: {
        title: "תגובות אסרטיביות להתחייבות",
        answers: [
          {
            text: "המבצע הזה נגמר היום - אי אפשר לשמור את המחיר",
            followUp: "למה לדחות את מה שאתה יודע שנכון?"
          },
          {
            text: "כל יום שעובר זה עוד יום של הזדמנות שפספסת",
            followUp: "בוא נתחיל כבר מחר"
          },
          {
            text: "אתה כבר יודע שזה מה שאתה רוצה",
            followUp: "למה לחכות?"
          }
        ]
      },
      value: {
        title: "תגובות ממוקדות ערך להתחייבות",
        answers: [
          {
            text: "ההתחייבות מאפשרת לך מחיר מיוחד",
            followUp: "אתה חוסך המון בטווח הארוך"
          },
          {
            text: "אתה מקבל 3 חודשים מתנה - זה שווה המון",
            followUp: "זו ההזדמנות הטובה ביותר"
          },
          {
            text: "ככה אתה מחויב לעצמך ולבריאות שלך",
            followUp: "זה מה שיעזור לך להתמיד"
          }
        ]
      }
    }
  }
};

const SmartObjectionSystem = () => {
  const [input, setInput] = useState('');
  const [detectedObjections, setDetectedObjections] = useState([]);
  const [responseStyle, setResponseStyle] = useState('standard');
  const [selectedResponses, setSelectedResponses] = useState({});
  const [copiedText, setCopiedText] = useState('');

  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => setCopiedText(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedText]);

  const detectObjections = (text) => {
    const detected = [];
    Object.entries(OBJECTION_PATTERNS).forEach(([key, pattern]) => {
      if (pattern.keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        detected.push({
          key,
          ...pattern
        });
      }
    });
    return detected;
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    setDetectedObjections(detectObjections(text));
  };

  const copyToClipboard = (text, objectionKey, responseIndex) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setSelectedResponses({
      ...selectedResponses,
      [objectionKey]: responseIndex
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">מערכת זיהוי וטיפול בהתנגדויות</h2>
        <p className="text-gray-600">הקלד את התנגדות הלקוח לזיהוי אוטומטי וקבלת תשובות מותאמות</p>
      </div>

      <div className="space-y-6">
        <div>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="הקלד את דברי הלקוח כאן..."
            className="w-full p-4 border rounded-lg h-32 text-right"
            dir="rtl"
          />
        </div>

        <div>
          <select
            value={responseStyle}
            onChange={(e) => setResponseStyle(e.target.value)}
            className="w-full p-3 border rounded-lg"
            dir="rtl"
          >
            <option value="standard">תגובות מתונות</option>
            <option value="aggressive">תגובות אסרטיביות</option>
            <option value="value">תגובות ממוקדות ערך</option>
          </select>
        </div>

        {detectedObjections.length > 0 ? (
          <div className="space-y-6">
            {detectedObjections.map((objection) => (
              <div key={objection.key} className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-4">
                  התנגדות: {objection.type}
                </h3>
                
                <div className="space-y-4">
                  {objection.responses[responseStyle].answers.map((answer, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg transition-all cursor-pointer ${
                        selectedResponses[objection.key] === index
                          ? 'bg-blue-100'
                          : 'hover:bg-blue-100'
                      }`}
                      onClick={() => copyToClipboard(answer.text, objection.key, index)}
                    >
                      <p className="text-lg font-medium text-right">{answer.text}</p>
                      <p className="text-sm text-gray-600 mt-1 text-right">{answer.followUp}</p>
                      {selectedResponses[objection.key] === index && copiedText === answer.text && (
                        <span className="text-green-600 text-sm">✓ הועתק</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : input ? (
          <div className="text-center text-gray-500 p-4">
            לא זוהו התנגדויות ספציפיות. נסה להיות יותר ספציפי.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SmartObjectionSystem;