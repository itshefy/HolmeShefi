// src/components/SalesTools/config/classSchedule.js

export const CLASS_SCHEDULE = {
  // קטגוריות שיעורים
  categories: {
    bodyAndSoul: {
      name: "לגוף ולנפש",
      description: "שיעורים שיעניקו לכם כלים לחיזוק הקשר בין הגוף לנפש, תוך מתן דגש על שיחרור הגוף ותנועתיות נכונה",
      classes: {
        pilates: {
          name: "Pilates",
          description: "שיעור פילאטיס המעניק עוצמה חוויתית גבוהה לשיפור הכוח, הגמישות והיציבה תוך זרימה תנועתית",
          recommendedFor: ["מתחילים", "מתקדמים", "גיל שלישי"],
          intensity: "בינונית"
        },
        bodyBalance: {
          name: "BODYBALANCE",
          description: "שיעור מובנה המשלב בין יוגה, טאי צ'י ופילאטיס. משפר את המצב הגופני והנפשי",
          recommendedFor: ["מתחילים", "גיל שלישי"],
          intensity: "קלה"
        },
        feldenkrais: {
          name: "פלדנקרייז",
          description: "הגדלת טווח תנועה והנחלת הרגלים תנועתיים בריאים דרך רצף תנועות עדינות",
          recommendedFor: ["גיל שלישי", "שיקום"],
          intensity: "קלה"
        },
        yoga: {
          name: "יוגה",
          description: "שילוב מושלם בין הגוף והנפש באמצעות נשימה, תנועות הרפיה וריכוז",
          recommendedFor: ["כולם"],
          intensity: "משתנה"
        },
        bodyPump: {
          name: "BODY PUMP",
          description: "שיעור לעיצוב וחיזוק באמצעות משקולות, יעיל להורדה במשקל",
          recommendedFor: ["מתקדמים"],
          intensity: "גבוהה"
        }
      }
    }
  },

  // לוח שיעורים שבועי
  weeklySchedule: {
    sunday: [
      { time: "07:30", className: "התעמלות בריאותית", duration: 55 },
      { time: "07:30", className: "פילאטיס מתיחות", duration: 55 },
      { time: "08:30", className: "עיצוב", duration: 55 },
      { time: "08:30", className: "יוגה ויניאסה", duration: 55 },
      { time: "09:30", className: "בונה עצם", duration: 55 },
      { time: "09:30", className: "זומבה גולד", duration: 45 },
      { time: "10:30", className: "מתיחות", duration: 55 },
      { time: "12:00", className: "התעמלות במים", duration: 45 },
      { time: "17:00", className: "עיצוב דינאמי", duration: 50 },
      { time: "18:00", className: "פילאטיס", duration: 55 },
      { time: "18:05", className: "יוגה אשטנגה", duration: 55 },
      { time: "18:15", className: "ספינינג", duration: 60 },
      { time: "19:00", className: "עיצוב דינאמי", duration: 55 },
      { time: "19:05", className: "פילאטיס", duration: 55 },
      { time: "20:00", className: "זומבה", duration: 55 },
      { time: "20:05", className: "BODY BALANCE", duration: 55 }
    ],
    monday: [
      { time: "07:00", className: "פילאטיס", duration: 55 },
      { time: "07:30", className: "זומבה", duration: 55 },
      { time: "08:00", className: "CORE", duration: 55 },
      { time: "08:30", className: "פלדנקרייז", duration: 55 },
      { time: "09:00", className: "עיצוב", duration: 55 },
      { time: "09:30", className: "אשטנגה ויניאסה", duration: 55 },
      { time: "10:00", className: "התעמלות במים", duration: 45 },
      { time: "10:00", className: "התעמלות בריאותית", duration: 55 },
      { time: "10:30", className: "ריקודי בטן", duration: 55 },
      { time: "11:00", className: "פילאטיס", duration: 55 },
      { time: "17:00", className: "עיצוב", duration: 55 },
      { time: "18:00", className: "ספינינג", duration: 60 },
      { time: "18:00", className: "פילאטיס מתיחות", duration: 55 },
      { time: "19:00", className: "עיצוב", duration: 55 },
      { time: "19:00", className: "פילאטיס", duration: 55 },
      { time: "20:00", className: "אשטנגה ויניאסה", duration: 55 },
      { time: "20:00", className: "BODYPUMP", duration: 60 },
      { time: "21:05", className: "קיקבוקס", duration: 60 }
    ],
    tuesday: [
      { time: "07:30", className: "CORE", duration: 55 },
      { time: "07:35", className: "פלדנקרייז", duration: 55 },
      { time: "08:30", className: "עיצוב דינאמי", duration: 55 },
      { time: "08:30", className: "CORE", duration: 55 },
      { time: "09:30", className: "פילאטיס", duration: 55 },
      { time: "09:30", className: "התעמלות בריאותית", duration: 60 },
      { time: "10:30", className: "התעמלות בריאותית", duration: 55 },
      { time: "18:00", className: "ספינינג", duration: 60 },
      { time: "18:15", className: "עיצוב דינאמי", duration: 55 },
      { time: "19:00", className: "ספינינג", duration: 55 },
      { time: "19:20", className: "BODY PUMP", duration: 60 },
      { time: "19:30", className: "CORE פילאטיס", duration: 55 },
      { time: "20:30", className: "אשטנגה ויניאסה", duration: 55 },
      { time: "20:30", className: "בצ'אטה", duration: 55 }
    ]
  },

  // מסגרות זמן
  timeSlots: {
    morning: {
      name: "בוקר",
      hours: "06:00-12:00",
      benefits: [
        "פחות עומס בשעות הבוקר",
        "התחלה אנרגטית ליום",
        "זמינות גבוהה של מכשירים"
      ]
    },
    noon: {
      name: "צהריים",
      hours: "12:00-16:00",
      benefits: [
        "הפסקה מרעננת באמצע היום",
        "אימונים קצרים ואפקטיביים"
      ]
    },
    evening: {
      name: "ערב",
      hours: "16:00-23:00",
      benefits: [
        "מגוון רחב של שיעורים",
        "אווירה אנרגטית",
        "מגוון רחב של מתאמנים"
      ]
    }
  },

  // שיעורים מומלצים לפי פרופיל
  recommendedClasses: {
    senior: [
      "התעמלות בונה עצם",
      "פלדנקרייז",
      "יוגה",
      "פילאטיס",
      "התעמלות במים",
      "זומבה גולד"
    ],
    beginner: [
      "עיצוב",
      "פילאטיס",
      "BODYBALANCE",
      "יוגה למתחילים",
      "התעמלות במים"
    ],
    advanced: [
      "BODY PUMP",
      "אשטנגה ויניאסה",
      "ספינינג",
      "קיקבוקס",
      "עיצוב דינאמי"
    ],
    weightLoss: [
      "זומבה",
      "ספינינג",
      "BODY PUMP",
      "עיצוב דינאמי",
      "קיקבוקס"
    ]
  }
};