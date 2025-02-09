import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Share2, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Star, 
  Flag, 
  Clock, 
  Target, 
  Dumbbell,
  Award,
  TrendingUp,
  Users,
  Check,
  Diamond
} from 'lucide-react';

// קונסטנטות מערכת - מסלולים
const MEMBERSHIP_PLANS = {
  multiPass: {
    id: 'multiPass',
    name: "מנוי מולטי לכל הסניפים",
    basePrice: 484,
    registration: 399,
    cancellationFee: "legal",
    sectionCode: "710",
    features: [
      "כניסה לכל הסניפים",
      "תוכנית נאמנות מלאה",
      "אפשרות הקפאה",
      "גישה לכל המתקנים",
      "שעות פעילות מלאות"
    ],
    commitment: true,
    hasLoyalty: true,
    hasFreeze: true,
    isPremium: true,
    restrictions: [],
    requirements: [],
    description: "המסלול המקיף ביותר שלנו - גישה מלאה לכל הסניפים והשירותים",
    marketingPoints: [
      "הגמישות המקסימלית - תתאמן בכל סניף שתרצה",
      "כל המתקנים והשירותים במחיר אחד",
      "חווית VIP מלאה"
    ]
  },
  localNoCommitment: {
    id: 'localNoCommitment',
    name: "מנוי מקומי ללא התחייבות",
    basePrice: 454,
    registration: 299,
    cancellationFee: "none",
    sectionCode: "947",
    features: [
      "ללא התחייבות",
      "תוכנית נאמנות",
      "אפשרות הקפאה",
      "גמישות מקסימלית"
    ],
    commitment: false,
    hasLoyalty: true,
    hasFreeze: true,
    restrictions: [],
    requirements: [],
    description: "חופש מקסימלי - מנוי גמיש ללא התחייבות",
    marketingPoints: [
      "חופש מלא לבחור את משך המנוי",
      "גמישות בתנאים",
      "אפס התחייבות"
    ]
  },


 regular: {
   id: 'regular',
   name: "מנוי רגיל",
   basePrice: 393,
   registration: 299,
   cancellationFee: "legal",
   sectionCode: "721",
   features: [
     "תוכנית נאמנות מלאה",
     "אפשרות הקפאה",
     "גישה לכל המתקנים",
     "שעות פעילות מלאות"
   ],
   commitment: true,
   hasLoyalty: true,
   hasFreeze: true,
   variations: {
     givatShmuel: {
       basePrice: 363,
       name: "מנוי רגיל - תושב גבעת שמואל"
     }
   },
   marketingPoints: [
     "המסלול המושלם למתאמנים קבועים",
     "כל היתרונות במחיר משתלם",
     "גמישות מלאה בשעות האימון"
   ]
 },
 localBasic: {
   id: 'localBasic',
   name: "מנוי מקומי בסיסי",
   basePrice: 342,
   registration: 299,
   cancellationFee: "legal",
   sectionCode: "736",
   features: [
     "מחיר אטרקטיבי",
     "גישה לכל המתקנים",
     "התחייבות לשנה"
   ],
   commitment: true,
   hasLoyalty: false,
   hasFreeze: false,
   marketingPoints: [
     "המחיר המשתלם ביותר שלנו",
     "כל המתקנים במחיר בסיסי",
     "חיסכון משמעותי לטווח ארוך"
   ]
 },
 student: {
   id: 'student',
   name: "מסלול סטודנט",
   basePrice: 322,
   registration: 199,
   cancellationFee: "legal",
   sectionCode: "489",
   features: [
     "מחיר מיוחד לסטודנטים",
     "גישה מלאה למתקנים",
     "התחייבות לשנה"
   ],
   commitment: true,
   hasLoyalty: false,
   hasFreeze: false,
   requirements: "בהצגת תעודת סטודנט בתוקף",
   marketingPoints: [
     "מחיר מיוחד לסטודנטים",
     "השקעה בעצמך במחיר סטודנטיאלי",
     "כל המתקנים במחיר מוזל"
   ]
 },
 soldier: {
   id: 'soldier',
   name: "מסלול חייל",
   basePrice: 211,
   registration: 150,
   cancellationFee: 150,
   sectionCode: "842",
   features: [
     "מחיר מיוחד לחיילים",
     "גישה למתקנים",
     "התחייבות לשנה"
   ],
   commitment: true,
   hasLoyalty: false,
   hasFreeze: false,
   restrictions: "אין כניסה בין השעות 17:00-20:00",
   marketingPoints: [
     "המחיר הנמוך ביותר שלנו",
     "מותאם במיוחד לחיילים",
     "השקעה בכושר במחיר חיילי"
   ]
 },
 soldierMulti: {
   id: 'soldierMulti',
   name: "מסלול חייל מולטי",
   basePrice: 322,
   registration: 150,
   cancellationFee: 150,
   sectionCode: "848",
   features: [
     "כניסה לכל הסניפים",
     "תוכנית נאמנות",
     "אפשרות הקפאה"
   ],
   commitment: true,
   hasLoyalty: true,
   hasFreeze: true,
   restrictions: "אין כניסה בין השעות 17:00-20:00",
   marketingPoints: [
     "גישה לכל הסניפים במחיר חיילי",
     "גמישות מקסימלית בבחירת סניף",
     "תוכנית נאמנות מלאה"
   ]
 },
 senior: {
   id: 'senior',
   name: "מסלול אזרח ותיק",
   basePrice: 312,
   registration: 199,
   cancellationFee: "legal",
   sectionCode: "894",
   features: [
     "תוכנית נאמנות",
     "אפשרות הקפאה",
     "גישה מלאה למתקנים"
   ],
   commitment: true,
   hasLoyalty: true,
   hasFreeze: true,
   requirements: "גברים מגיל 67, נשים מגיל 62",
   marketingPoints: [
     "מחיר מיוחד לגיל הזהב",
     "ליווי והדרכה מקצועית",
     "גמישות מלאה בשעות האימון"
   ]
 },
 seniorMorning: {
   id: 'seniorMorning',
   name: "מסלול אזרח ותיק - בוקר",
   basePrice: 292,
   registration: 199,
   cancellationFee: "legal",
   sectionCode: "611",
   features: [
     "מחיר מוזל",
     "כניסה עד 16:00"
   ],
   commitment: true,
   hasLoyalty: false,
   hasFreeze: false,
   requirements: "גברים מגיל 67, נשים מגיל 62",
   restrictions: "כניסה עד השעה 16:00",
   marketingPoints: [
     "המחיר הטוב ביותר לשעות הבוקר",
     "אווירה נעימה ורגועה",
     "צוות מקצועי ומלווה"
   ]
 }
};


// מבצעים מיוחדים
const SPECIAL_OFFERS = {
 givatShmuelLocal: {
   name: "מבצע מיוחד לתושבי גבעת שמואל",
   basePrice: 349,
   originalPrice: 454,
   registration: 49,
   originalRegistration: 299,
   description: "מנוי ללא התחייבות עם אפשרות ביטול בהתראה של חודש מראש",
   features: [
     "ללא דמי ביטול",
     "חודש ראשון חינם",
     "דמי רישום מוזלים",
   ],
   bonuses: {
     firstMonth: "חודש ראשון חינם",
     registration: "דמי רישום מוזלים - רק 49₪ במקום 299₪"
   },
   urgencyPoints: [
     "המבצע לתושבי גבעת שמואל בלבד",
     "מוגבל למספר הנרשמים הראשונים",
     "בתוקף לזמן מוגבל"
   ],
   socialProof: [
     "מאות תושבי גבעת שמואל כבר נהנים מהמבצע",
     "המסלול המועדף על תושבי השכונה",
     "98% מרוצים מהבחירה"
   ]
 },
 threeMonthsFree: {
   name: "3 חודשים במתנה",
   basePrice: 393,
   freeMonths: ["מרץ", "יולי", "נובמבר"],
   registration: 149,
   originalRegistration: 299,
   description: "מנוי שנתי עם 3 חודשים חינם",
   features: [
     "3 חודשים מלאים במתנה",
     "דמי רישום מוזלים",
     "תוכנית נאמנות מלאה"
   ],
   averagePrice: 295,
   conditions: [
     "בהתחייבות לשנה",
     "ללא אפשרות הקפאה",
     "החזר שווי הטבה בביטול מוקדם"
   ],
   urgencyPoints: [
     "מספר המקומות במבצע מוגבל",
     "מחיר ממוצע של 295₪ לחודש בלבד",
     "חיסכון של אלפי שקלים בשנה"
   ],
   socialProof: [
     "המסלול הפופולרי ביותר שלנו",
     "אלפי מתאמנים כבר נהנים מהחיסכון",
     "95% ממשיכים לשנה נוספת"
   ]
 }
};

// טכניקות מכירה מתקדמות
const SALES_TECHNIQUES = {
 socialProof: {
   templates: [
     "הצטרף ל-{number} המתאמנים שכבר נהנים מהמסלול הזה",
     "תסכים איתי ש-{benefit} זה משהו שכולם רוצים",
     "{percentage}% מהמתאמנים שלנו ממליצים על המסלול הזה",
     "רק השבוע הצטרפו {number} מתאמנים חדשים"
   ],
   statistics: {
     activeMembers: "10,000+",
     satisfaction: "98%",
     returnRate: "92%",
     recommendRate: "95%"
   }
 },
 agreementPhrases: [
   "תסכים איתי שבריאות זו ההשקעה הכי חשובה",
   "אתה ודאי מבין שהשקעה בעצמך תמיד משתלמת",
   "בטח שמת לב שהמחיר היומי נמוך מכוס קפה",
   "אתה בוודאי רואה את היתרונות של המסלול הזה"
 ],
 urgencyTriggers: [
   "המבצע בתוקף רק היום",
   "נשארו רק {number} מקומות במחיר הזה",
   "המחיר יעלה בשבוע הבא",
   "ההטבות האלה לא יחזרו"
 ],
 valueFraming: [
   "זה פחות מ-{price}₪ ליום על הבריאות שלך",
   "ההשקעה מחזירה את עצמה תוך חודש",
   "החיסכון השנתי שווה ל-{savings}₪",
   "אתה מקבל הטבות בשווי {value}₪"
 ]
};

// הגדרות תוכנית הנאמנות
const LOYALTY_PROGRAM = {
 levels: {
   welcome: {
     name: "Welcome",
     points: 0,
     benefits: [
       "2 כניסות חד פעמיות לאורחים במחיר מופחת"
     ]
   },
   silver: {
     name: "Silver",
     points: 800,
     benefits: [
       "כניסה חופשית למועדון נוסף בארץ",
       "מינוי שבוע לאורח במחיר מופחת",
       "2 כניסות חד פעמיות לאורחים במחיר מופחת"
     ]
   },
   gold: {
     name: "Gold",
     points: 1600,
     benefits: [
       "כניסה חופשית למועדונים נוספים בארץ",
       "מינוי שבוע לאורח במחיר מופחת",
       "2 כניסות חד פעמיות לאורחים במחיר מופחת"
     ]
   },
   platinum: {
     name: "Platinum",
     points: 4000,
     benefits: [
       "כניסה חופשית למועדונים נוספים בארץ",
       "2 מינויים של שבועיים לאורחים במחיר מופחת",
       "4 כניסות חד פעמיות לאורחים במחיר מופחת"
     ]
   }
 },
 pointsSystem: {
   weeklyWorkout: {
     points: 10,
     description: "נקודות עבור כל שבוע של אימון"
   },
   activeMonth: {
     points: 40,
     description: "נקודות עבור כל חודש פעיל"
   },
   renewal: {
     points: 100,
     description: "נקודות עבור חידוש מנוי ברצף"
   },
   referral: {
     points: 200,
     description: "נקודות עבור המלצה על חבר שהצטרף"
   }
 }
};


// טיפים למוכר לפי שלב
const SALES_TIPS = {
 personalInfo: {
   mainTips: [
     "צור חיבור אישי עם הלקוח",
     "הקשב לצרכים ולרצונות",
     "רשום נקודות מפתח מהשיחה",
     "שאל שאלות פתוחות"
   ],
   questions: [
     "מה הביא אותך לחפש מועדון כושר?",
     "איך אתה מרגיש עם המצב הגופני שלך כיום?",
     "מה היית רוצה לשפר בכושר שלך?",
     "איזה ניסיון קודם יש לך עם חדרי כושר?"
   ],
   techniques: [
     "השתמש בשם הלקוח לעיתים קרובות",
     "הראה הקשבה פעילה - הנהון, סיכום הדברים",
     "מצא נקודות חיבור משותפות",
     "תן ללקוח לדבר יותר ממך"
   ]
 },
 goals: {
   mainTips: [
     "התמקד במטרות הספציפיות של הלקוח",
     "הראה איך המועדון יכול לעזור בהשגת המטרות",
     "תן דוגמאות של הצלחות קודמות",
     "הדגש את הייחודיות של המועדון"
   ],
   objectionHandling: [
     {
       objection: "אני לא בטוח שאצליח להתמיד",
       responses: [
         "תסכים איתי שעם ליווי מקצועי הסיכויים גדלים משמעותית?",
         "בדיוק בשביל זה יש לנו תוכנית ליווי אישית",
         "רוב המתאמנים שלנו מתמידים בזכות הליווי והתמיכה"
       ]
     },
     {
       objection: "ניסיתי בעבר ולא הצלחתי",
       responses: [
         "מה היה חסר לך בניסיון הקודם?",
         "אצלנו תקבל בדיוק את מה שהיה חסר לך",
         "הפעם יש לך את כל הכלים להצליח"
       ]
     }
   ]
 },
 availability: {
   mainTips: [
     "התאם את המסלול לזמינות של הלקוח",
     "הדגש את הגמישות בשעות הפעילות",
     "הצע פתרונות לאילוצי זמן",
     "הסבר על המגוון הרחב של פעילויות"
   ],
   timeManagement: [
     "הראה איך אפשר להשתלב גם בלוח זמנים עמוס",
     "הדגש את שעות הפתיחה הארוכות",
     "הצע אופציות לאימונים קצרים ואפקטיביים",
     "הסבר על הגמישות בבחירת השעות"
   ]
 },
 experience: {
   mainTips: [
     "התאם את הגישה לרמת הניסיון",
     "הדגש את המעטפת המקצועית",
     "ספר על אפשרויות ההתקדמות",
     "הראה את היתרונות הייחודיים למועדון"
   ],
   levelSpecific: {
     beginner: [
       "הדגש את הליווי הצמוד בהתחלה",
       "הסבר על תוכנית ההדרכה המובנית",
       "הרגע חששות מחוסר ניסיון"
     ],
     intermediate: [
       "הדגש את מגוון האפשרויות",
       "הסבר על תוכניות מתקדמות",
       "הראה אפשרויות לשדרוג האימונים"
     ],
     advanced: [
       "הדגש את איכות הציוד",
       "הסבר על אפשרויות האימון המתקדמות",
       "הראה את היתרונות למתאמנים מנוסים"
     ]
   }
 },
 summary: {
   mainTips: [
     "סכם את הנקודות העיקריות",
     "הדגש את ההתאמה האישית",
     "צור תחושת דחיפות",
     "הצע לסגור עכשיו עם הטבה מיוחדת"
   ],
   closingTechniques: [
     {
       name: "סגירה ישירה",
       phrases: [
         "בוא נסגור את זה עכשיו ותתחיל כבר מחר",
         "איזה כרטיס יותר נוח לך לשלם?",
         "מתי תרצה להתחיל?"
       ]
     },
     {
       name: "סגירה עם הטבה",
       phrases: [
         "אם נסגור עכשיו, אוכל לתת לך גם...",
         "למצטרפים היום יש לנו הטבה מיוחדת",
         "זו הזדמנות לקבל את כל ההטבות"
       ]
     },
     {
       name: "סגירה עם דחיפות",
       phrases: [
         "המבצע הזה נגמר היום",
         "נשארו לנו רק X מקומות במחיר הזה",
         "המחיר יעלה מחר"
       ]
     }
   ]
 }
};

// משפטי סגירה מותאמים אישית
const PERSONALIZED_CLOSING_TEMPLATES = {
 healthGoals: [
   "{name}, תסכים איתי שהבריאות שלך שווה יותר מ-{pricePerDay}₪ ליום?",
   "ראיתי כמה חשוב לך {specificGoal}, והתוכנית שבנינו תעזור לך להשיג את זה",
   "אתה כבר מבין שההשקעה הזו תחזיר את עצמה דרך {benefit}"
 ],
 fitnessGoals: [
   "עם התוכנית המותאמת שבנינו, תוכל להשיג את {goal} תוך {timeframe}",
   "המסלול הזה נבנה במיוחד בשביל {specificNeed} שדיברת עליו",
   "תחשוב איך תרגיש כש{achievementDescription}"
 ],
 valueProposition: [
   "אתה מקבל הרבה יותר מסתם מנוי - זו השקעה ב{benefitsList}",
   "במחיר של {priceComparison} ליום, אתה מקבל {features}",
   "חשוב שתדע ש-{percentage}% מהמתאמנים שלנו משיגים את המטרות שלהם"
 ]
};

// הגדרת פרופילי לקוחות
const CLIENT_PROFILE = {
  goals: {
    health: {
      text: "בריאות ואיכות חיים",
      subGoals: [
        "הורדת כאבים",
        "שיפור גמישות",
        "חיזוק הגב",
        "העלאת אנרגיה",
        "שיפור היציבה",
        "חיזוק שרירי הליבה"
      ],
      recommendedPlans: ['regular', 'multiPass'],
      sellingPoints: [
        "התוכנית שלנו מותאמת אישית למטרות הבריאות שלך",
        "יש לנו צוות מקצועי שילווה אותך לאורך כל הדרך",
        "הציוד המתקדם ביותר לאימון בריא ובטוח"
      ]
    },
    shape: {
      text: "חיטוב וכוח",
      subGoals: [
        "חיטוב הבטן",
        "חיזוק שרירים",
        "העלאת מסת שריר",
        "הורדת אחוזי שומן",
        "עיצוב הגוף",
        "שיפור הקומפוזיציה"
      ],
      recommendedPlans: ['multiPass', 'regular'],
      sellingPoints: [
        "מגוון רחב של ציוד לאימוני כוח",
        "שיעורי סטודיו ממוקדי חיטוב",
        "מאמנים מוסמכים לבניית שריר"
      ]
    },
    weight: {
      text: "ירידה במשקל",
      subGoals: [
        "הורדת משקל",
        "שינוי הרגלי אכילה",
        "שריפת שומנים",
        "עיצוב הגוף",
        "התאמת תוכנית תזונה",
      ],
      recommendedPlans: ['regular', 'localNoCommitment'],
      sellingPoints: [
        "שילוב של אימוני כוח וקרדיו",
        "מעקב והתקדמות שבועית",
        "תוכנית תזונה מותאמת אישית"
      ]
    },
    stress: {
      text: "הפגת מתחים",
      subGoals: [
        "שיפור איכות שינה",
        "הפחתת מתח",
        "איזון נפשי",
        "זמן לעצמי",
        "שיפור מצב הרוח",
        "הפחתת חרדה"
      ],
      recommendedPlans: ['localNoCommitment', 'regular'],
      sellingPoints: [
        "מגוון שיעורי יוגה ופילאטיס",
        "סאונה להרגעה ושחרור",
        "אווירה נעימה ורגועה"
      ]
    }
  },
  
  availability: {
    morning: {
      text: "בוקר (6:00-12:00)",
      activities: [
        "שחייה בוקר",
        "אימון כוח בוקר",
        "ספינינג בוקר",
        "פילאטיס בוקר",
        "אימון פונקציונלי"
      ],
      recommendedPlans: ['senior', 'seniorMorning', 'regular'],
      benefits: [
        "פחות עומס בשעות הבוקר",
        "התחלה אנרגטית ליום",
        "זמינות גבוהה של מכשירים"
      ]
    },
    noon: {
      text: "צהריים (12:00-16:00)",
      activities: [
        "הפסקת צהריים אקטיבית",
        "אימון מהיר וממוקד",
        "שחייה בצהריים",
        "יוגה צהריים",
        "TRX מהיר",
        "אימון טאבטה"
      ],
      recommendedPlans: ['regular', 'student'],
      benefits: [
        "הפסקה מרעננת באמצע היום",
        "אימונים קצרים ואפקטיביים",
      ]
    },
    evening: {
      text: "ערב (16:00-23:00)",
      activities: [
        "אימוני ערב אנרגטיים",
        "שיעורי סטודיו",
        "אימון כוח מתקדם",
        "שחייה ערב",
        "אימוני HIIT",
        "קיקבוקס"
      ],
      recommendedPlans: ['multiPass', 'regular'],
      benefits: [
        "מגוון רחב של שיעורים",
        "אווירה אנרגטית",
        "צוות מקצועי מלא"
      ]
    }
  },

  experience: {
    beginner: {
      text: "מתחיל לגמרי",
      approach: [
        "ליווי צמוד בהתחלה",
        "בניית בסיס נכון",
        "למידה הדרגתית",
        "תמיכה מקצועית",
        "תוכנית מותאמת למתחילים",
        "הדרכה על כל מכשיר"
      ],
      recommendedPlans: ['regular', 'localNoCommitment'],
      sellingPoints: [
        "צוות מקצועי שילווה אותך מהצעד הראשון",
        "תוכנית מובנית למתחילים",
        "אווירה תומכת ומעודדת"
      ]
    },
    intermediate: {
      text: "יש קצת ניסיון",
      approach: [
        "שדרוג הטכניקה",
        "העלאת אינטנסיביות",
        "מגוון תרגילים",
        "אתגרים חדשים",
        "תוכניות מתקדמות",
        "עבודה על נקודות חולשה"
      ],
      recommendedPlans: ['multiPass', 'regular'],
      sellingPoints: [
        "מגוון רחב של אפשרויות אימון",
        "ציוד מתקדם לאתגר נוסף",
        "קהילה תומכת של מתאמנים"
      ]
    },
    advanced: {
      text: "מתאמן מנוסה",
      approach: [
        "אימונים מתקדמים",
        "טכניקות מקצועיות",
        "אתגרים ברמה גבוהה",
        "תוכניות מותאמות",
        "אימוני עצימות גבוהה",
        "מעקב התקדמות מתקדם"
      ],
      recommendedPlans: ['multiPass'],
      sellingPoints: [
        "הציוד המתקדם ביותר בשוק",
        "מאמנים מוסמכים לרמות מתקדמות",
        "קהילת מתאמנים ברמה גבוהה"
      ]
    }
  }
};

// רכיבי המשנה

const PersonalInfoStep = ({ profile, onUpdate }) => {
 return (
   <div className="space-y-6">
     <div className="max-w-lg">
       <h3 className="text-xl font-bold mb-4">בוא נכיר אותך טוב יותר</h3>
       <div className="space-y-4">
         <div>
           <label className="block text-lg font-bold mb-2">איך קוראים לך?</label>
           <input
             type="text"
             value={profile.name}
             onChange={(e) => onUpdate('name', e.target.value)}
             className="w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
             placeholder="שם מלא"
           />
         </div>
         
         <div>
           <label className="block text-lg font-bold mb-2">איפה אתה גר?</label>
           <select
             value={profile.location}
             onChange={(e) => onUpdate('location', e.target.value)}
             className="w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500"
           >
             <option value="">בחר מיקום</option>
             <option value="givatShmuel">גבעת שמואל</option>
             <option value="other">אחר</option>
           </select>
         </div>

         <div className="space-y-3">
           <label className="block text-lg font-bold">סטטוס מיוחד</label>
           <div className="space-y-2">
             {[
               { id: 'isStudent', label: 'סטודנט', icon: '🎓' },
               { id: 'isSoldier', label: 'חייל בשירות סדיר', icon: '🪖' },
               { id: 'isSenior', label: 'אזרח ותיק', icon: '👴' }
             ].map(status => (
               <motion.label 
                 key={status.id}
                 className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                 whileHover={{ scale: 1.01 }}
               >
                 <input
                   type="checkbox"
                   checked={profile[status.id]}
                   onChange={(e) => onUpdate(status.id, e.target.checked)}
                   className="ml-3"
                 />
                 <span className="ml-2">{status.icon}</span>
                 <span>{status.label}</span>
               </motion.label>
             ))}
           </div>
         </div>

         <div>
           <label className="block text-lg font-bold mb-2">דחיפות ההצטרפות</label>
           <select
             value={profile.urgencyLevel}
             onChange={(e) => onUpdate('urgencyLevel', e.target.value)}
             className="w-full p-4 rounded-lg border border-gray-200"
           >
             <option value="high">רוצה להתחיל מיד</option>
             <option value="normal">מעוניין להצטרף בקרוב</option>
             <option value="low">בודק אפשרויות</option>
           </select>
         </div>
       </div>
     </div>
   </div>
 );
};


const GoalsStep = ({ profile, onUpdate }) => {
 const [showSubGoals, setShowSubGoals] = useState(false);

 return (
   <div className="space-y-8">
     <div>
       <h3 className="text-xl font-bold mb-4">מה המטרה העיקרית שלך?</h3>
       <div className="grid grid-cols-2 gap-4">
         {Object.entries(CLIENT_PROFILE.goals).map(([key, goal]) => (
           <motion.button
             key={key}
             onClick={() => {
               onUpdate('goal', key);
               setShowSubGoals(true);
             }}
             className={`p-6 rounded-lg border-2 text-right transition-all ${
               profile.goal === key 
                 ? 'border-blue-500 bg-blue-50' 
                 : 'border-gray-200 hover:border-blue-300'
             }`}
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
           >
             <div className="flex items-center justify-between">
               <Target className="w-6 h-6 text-blue-500" />
               <div className="flex-grow text-right mr-4">
                 <div className="font-bold text-lg mb-2">{goal.text}</div>
                 <div className="text-sm text-gray-600">
                   {goal.subGoals.slice(0, 2).join(', ')}...
                 </div>
               </div>
             </div>
             {profile.goal === key && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="mt-3 pt-3 border-t border-blue-200"
               >
                 <div className="text-sm text-blue-600">
                   {goal.sellingPoints[0]}
                 </div>
               </motion.div>
             )}
           </motion.button>
         ))}
       </div>
     </div>

     {showSubGoals && profile.goal && (
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white p-6 rounded-lg shadow-sm"
       >
         <h4 className="font-bold text-lg mb-4">בוא נדייק את המטרות שלך:</h4>
         <div className="grid grid-cols-2 gap-3">
           {CLIENT_PROFILE.goals[profile.goal].subGoals.map((subGoal) => (
             <motion.label
               key={subGoal}
               className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                 profile.subGoals.includes(subGoal)
                   ? 'bg-green-50 border-green-500'
                   : 'hover:bg-gray-50'
               }`}
               whileHover={{ scale: 1.01 }}
             >
               <input
                 type="checkbox"
                 checked={profile.subGoals.includes(subGoal)}
                 onChange={(e) => {
                   const newSubGoals = e.target.checked
                     ? [...profile.subGoals, subGoal]
                     : profile.subGoals.filter(g => g !== subGoal);
                   onUpdate('subGoals', newSubGoals);
                 }}
                 className="ml-3"
               />
               <span>{subGoal}</span>
               {profile.subGoals.includes(subGoal) && (
                 <motion.span
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="mr-auto text-green-500"
                 >
                   ✓
                 </motion.span>
               )}
             </motion.label>
           ))}
         </div>

         {profile.subGoals.length > 0 && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="mt-6 p-4 bg-blue-50 rounded-lg"
           >
             <div className="font-bold mb-2">מעולה! בחרת:</div>
             <div className="flex flex-wrap gap-2">
               {profile.subGoals.map((goal) => (
                 <span key={goal} className="bg-white px-3 py-1 rounded-full text-sm text-blue-600">
                   {goal}
                 </span>
               ))}
             </div>
           </motion.div>
         )}
       </motion.div>
     )}

     {/* טיפים למוכר שמופיעים בצד */}
     <motion.div
       initial={{ opacity: 0, x: 20 }}
       animate={{ opacity: 1, x: 0 }}
       className="fixed top-1/3 left-4 bg-yellow-50 p-4 rounded-lg shadow-lg max-w-xs"
     >
       <h5 className="font-bold mb-2">💡 טיפ למוכר</h5>
       <ul className="text-sm space-y-2">
         {SALES_TIPS.goals.mainTips.map((tip, index) => (
           <li key={index} className="flex items-start">
             <span className="text-yellow-500 ml-2">•</span>
             {tip}
           </li>
         ))}
       </ul>
     </motion.div>
   </div>
 );
};


const AvailabilityStep = ({ profile, onUpdate }) => {
 return (
   <div className="space-y-6">
     <h3 className="text-xl font-bold mb-6">מתי נוח לך להתאמן?</h3>
     <div className="space-y-4">
       {Object.entries(CLIENT_PROFILE.availability).map(([key, timeSlot]) => (
         <motion.div
           key={key}
           className={`p-4 rounded-lg border-2 transition-all ${
             profile.availability.includes(key)
               ? 'border-blue-500 bg-blue-50'
               : 'border-gray-200'
           }`}
           whileHover={{ scale: 1.01 }}
         >
           <label className="flex items-start cursor-pointer">
             <input
               type="checkbox"
               checked={profile.availability.includes(key)}
               onChange={(e) => {
                 const newAvailability = e.target.checked
                   ? [...profile.availability, key]
                   : profile.availability.filter(t => t !== key);
                 onUpdate('availability', newAvailability);
               }}
               className="mt-1 ml-3"
             />
             <div className="flex-grow">
               <div className="flex items-center mb-2">
                 <Clock className="w-5 h-5 text-blue-500 ml-2" />
                 <span className="font-bold text-lg">{timeSlot.text}</span>
               </div>
               
               <div className="flex flex-wrap gap-2 mt-2">
                 {timeSlot.activities.map((activity, index) => (
                   <span
                     key={index}
                     className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm"
                   >
                     {activity}
                   </span>
                 ))}
               </div>

               {profile.availability.includes(key) && (
                 <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   className="mt-3 pt-3 border-t border-blue-200"
                 >
                   <div className="text-blue-600 text-sm space-y-1">
                     {timeSlot.benefits.map((benefit, index) => (
                       <div key={index} className="flex items-center">
                         <span className="text-green-500 ml-2">✓</span>
                         {benefit}
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}
             </div>
           </label>
         </motion.div>
       ))}
     </div>

     {profile.availability.length > 0 && (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="mt-6 p-4 bg-green-50 rounded-lg"
       >
         <div className="font-bold mb-2">המלצות מותאמות לשעות שבחרת:</div>
         <ul className="space-y-2">
           <li className="flex items-center">
             <span className="text-green-500 ml-2">💡</span>
             {profile.availability.includes('morning')
               ? "שעות הבוקר מושלמות להתחלת היום באנרגיה"
               : profile.availability.includes('evening')
               ? "אימוני הערב מושלמים לשחרור לחצי היום"
               : "הפסקת צהריים אקטיבית תיתן לך אנרגיה להמשך היום"
             }
           </li>
           <li className="flex items-center">
             <span className="text-green-500 ml-2">🎯</span>
             נוכל להתאים לך תוכנית אימונים מושלמת לשעות האלה
           </li>
         </ul>
       </motion.div>
     )}
   </div>
 );
};

const ExperienceStep = ({ profile, onUpdate }) => {
 return (
   <div className="space-y-6">
     <h3 className="text-xl font-bold mb-6">מה הניסיון שלך באימונים?</h3>
     <div className="grid grid-cols-1 gap-4">
       {Object.entries(CLIENT_PROFILE.experience).map(([key, exp]) => (
         <motion.button
           key={key}
           onClick={() => onUpdate('experience', key)}
           className={`p-6 rounded-lg border-2 text-right transition-all ${
             profile.experience === key
               ? 'border-blue-500 bg-blue-50'
               : 'border-gray-200'
           }`}
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
         >
           <div className="flex justify-between items-start">
             <Dumbbell className="w-6 h-6 text-blue-500" />
             <div className="flex-grow text-right mr-4">
               <div className="font-bold text-lg mb-2">{exp.text}</div>
               <div className="grid grid-cols-2 gap-2 mt-3">
                 {exp.approach.map((approach, index) => (
                   <div key={index} className="flex items-center text-sm text-gray-600">
                     <span className="text-blue-500 ml-2">•</span>
                     {approach}
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {profile.experience === key && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="mt-4 pt-4 border-t border-blue-200"
             >
               <div className="text-blue-600">
                 <div className="font-bold mb-2">התוכנית המומלצת:</div>
                 {exp.sellingPoints.map((point, index) => (
                   <div key={index} className="flex items-center text-sm">
                     <span className="text-green-500 ml-2">✓</span>
                     {point}
                   </div>
                 ))}
               </div>
             </motion.div>
           )}
         </motion.button>
       ))}
     </div>
   </div>
 );
};


const SummaryStep = ({ profile, salesData, generateNewPitch }) => {
 const [showPriceDetails, setShowPriceDetails] = useState(false);
 const [showLoyaltyInfo, setShowLoyaltyInfo] = useState(false);
 const [showSectionCode, setShowSectionCode] = useState(false);

 const [localGeneratedPitch, setLocalGeneratedPitch] = useState(null);

 useEffect(() => {
   if (activeStep === 4) {
     setSalesData(prev => ({
       ...prev,
       recommendedPlan: calculateRecommendedPlan(),
     }));
     if (!salesData.generatedPitch) {
       generateCustomPitch();
     }
     setLocalGeneratedPitch(salesData.generatedPitch);
   }
 }, [activeStep, salesData.generatedPitch]);

 if (!localGeneratedPitch) {
   return (
     <div className="flex justify-center items-center h-64">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
     </div>
   );
 }

 const { generatedPitch } = salesData;
 const plan = MEMBERSHIP_PLANS[salesData.recommendedPlan];

 return (
   <div className="space-y-8">
     {/* כותרת וברכה */}
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl"
     >
       <h3 className="text-2xl font-bold text-blue-800 mb-2">
         {generatedPitch.opening}
       </h3>
       <p className="text-gray-600">
         {profile.name}, תסכים איתי שהשקעה בבריאות היא ההשקעה החכמה ביותר שאפשר לעשות?
       </p>
     </motion.div>

     {/* מטרות ויעדים */}
     <div className="bg-white p-6 rounded-xl shadow-sm">
       <h4 className="text-xl font-bold mb-4">המטרות שלך:</h4>
       <div className="grid grid-cols-2 gap-4">
         {profile.subGoals.map((goal, index) => (
           <motion.div
             key={goal}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: index * 0.1 }}
             className="flex items-center p-3 bg-blue-50 rounded-lg"
           >
             <span className="text-blue-500 ml-2">✓</span>
             {goal}
           </motion.div>
         ))}
       </div>

       <div className="mt-6 text-gray-600">
         {generatedPitch.valueProposition.mainValue}
       </div>
     </div>

     {/* תוכנית האימונים */}
     <div className="bg-white p-6 rounded-xl shadow-sm">
       <h4 className="text-xl font-bold mb-4">תוכנית האימונים המותאמת:</h4>
       
       <div className="space-y-4">
         {generatedPitch.schedule.schedule.map((slot, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: index * 0.1 }}
             className="p-4 border rounded-lg"
           >
             <div className="font-bold mb-2">{slot.time}</div>
             <div className="flex flex-wrap gap-2">
               {slot.activities.map((activity, idx) => (
                 <span
                   key={idx}
                   className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                 >
                   {activity}
                 </span>
               ))}
             </div>
           </motion.div>
         ))}
       </div>

       <div className="mt-4 text-blue-600">
         {generatedPitch.schedule.flexibility}
       </div>
     </div>

     {/* הצעת מחיר */}
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-sm"
     >
       <div className="flex justify-between items-start mb-6">
         <div>
           <h4 className="text-xl font-bold">המסלול המומלץ עבורך:</h4>
           <p className="text-gray-600">{plan.description}</p>
         </div>
         <button
           onClick={() => setShowSectionCode(!showSectionCode)}
           className="text-sm text-gray-500 hover:text-gray-700"
         >
           {showSectionCode ? `קוד סעיף: ${plan.sectionCode}` : 'הצג קוד סעיף'}
         </button>
       </div>

       <div className="grid grid-cols-2 gap-6">
         <div className="space-y-4">
           <div className="text-3xl font-bold text-blue-600">
             {generatedPitch.pricing.mainPrice}₪
             <span className="text-lg text-gray-500 ml-2">לחודש</span>
           </div>
           {generatedPitch.pricing.originalPrice && (
             <div className="line-through text-gray-500">
               במקום {generatedPitch.pricing.originalPrice}₪
             </div>
           )}
           <div className="text-sm text-green-600">
             חיסכון של {generatedPitch.pricing.savings.toFixed(0)}₪
           </div>
         </div>

         <div className="space-y-2">
           {plan.features.map((feature, index) => (
             <div key={index} className="flex items-center text-sm">
               <span className="text-green-500 ml-2">✓</span>
               {feature}
             </div>
           ))}
         </div>
       </div>

       {/* תוכנית נאמנות */}
       {plan.hasLoyalty && (
         <div className="mt-6">
           <button
             onClick={() => setShowLoyaltyInfo(!showLoyaltyInfo)}
             className="text-blue-600 hover:text-blue-700 font-medium"
           >
             {showLoyaltyInfo ? 'הסתר פרטי תוכנית נאמנות' : 'הצג פרטי תוכנית נאמנות'}
           </button>
           {showLoyaltyInfo && (
             <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               className="mt-4 p-4 bg-blue-50 rounded-lg"
             >
               <h5 className="font-bold mb-2">תוכנית הנאמנות שלנו:</h5>
               <div className="grid grid-cols-2 gap-4">
                 {Object.entries(LOYALTY_PROGRAM.pointsSystem).map(([key, data]) => (
                   <div key={key} className="flex items-start">
                     <Star className="w-4 h-4 text-yellow-500 mt-1 ml-2" />
                     <div>
                       <div className="font-medium">{data.points} נקודות</div>
                       <div className="text-sm text-gray-600">{data.description}</div>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
           )}
         </div>
       )}
     </motion.div>

     {/* משפטי סגירה */}
     <div className="space-y-4">
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.5 }}
         className="bg-blue-600 text-white p-6 rounded-xl"
       >
         <p className="text-lg text-center font-bold">
           {generatedPitch.closing.callToAction}
         </p>
       </motion.div>

       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.7 }}
         className="bg-red-50 p-4 rounded-lg"
       >
         <p className="text-center text-red-600 font-bold animate-pulse">
           {generatedPitch.closing.urgency}
         </p>
       </motion.div>

       <div className="text-center text-sm text-gray-500 mt-8">
         © {new Date().getFullYear()} Omri Shefi - כל הזכויות שמורות
       </div>
     </div>
   </div>
 );
};


// הרכיב הראשי

const ClosingGenerator = () => {
 // הצגת השלבים בתהליך
 const progressSteps = [
   { title: 'פרטים אישיים', icon: '👤', component: PersonalInfoStep },
   { title: 'מטרות', icon: '🎯', component: GoalsStep },
   { title: 'זמינות', icon: '⏰', component: AvailabilityStep },
   { title: 'ניסיון', icon: '💪', component: ExperienceStep },
   { title: 'סיכום', icon: '✨', component: SummaryStep }
 ];

 // ניהול State
 const [activeStep, setActiveStep] = useState(0);
 const [profile, setProfile] = useState({
   name: '',
   goal: '',
   subGoals: [],
   availability: [],
   experience: '',
   location: '',
   isStudent: false,
   isSoldier: false,
   isSenior: false,
   specificNeeds: '',
   healthConditions: false,
   pricePreference: '',
   urgencyLevel: 'normal'
 });

 const [uiState, setUiState] = useState({
   showTips: true,
   showLoyaltyInfo: false,
   showPriceDetails: false,
   animationDirection: 1,
   lastAction: null,
   savedDrafts: [],
   showSectionCode: false
 });

 const [salesData, setSalesData] = useState({
   recommendedPlan: null,
   alternativePlan: null,
   generatedPitch: null,
   customDiscounts: [],
   objectionHistory: [],
   successMetrics: {
     attempts: 0,
     closingRate: 0,
     commonObjections: {}
   }
 });

 // פונקציות עזר
 const calculateRecommendedPlan = useCallback(() => {
   if (!profile.goal || !profile.experience) return null;

   let possiblePlans = [...CLIENT_PROFILE.goals[profile.goal].recommendedPlans];

   // פילטור לפי סטטוס מיוחד
   if (profile.isSoldier) {
     return profile.availability.includes('evening') ? 'soldier' : 'soldierMulti';
   }
   if (profile.isStudent) {
     return 'student';
   }
   if (profile.isSenior) {
     return profile.availability.includes('morning') ? 'seniorMorning' : 'senior';
   }

   // התאמה לפי מיקום
   if (profile.location === 'givatShmuel') {
     const specialOffer = SPECIAL_OFFERS.givatShmuelLocal;
     if (profile.pricePreference === 'low' || profile.urgencyLevel === 'high') {
       return specialOffer;
     }
   }

   // התאמה לפי זמינות וניסיון
   if (profile.availability.includes('evening') && profile.experience === 'advanced') {
     return possiblePlans.includes('multiPass') ? 'multiPass' : 'regular';
   }

   // התאמה לפי מטרות ספציפיות
   const goalSpecificPlan = determineGoalSpecificPlan(profile.goal, profile.subGoals);
   if (goalSpecificPlan) return goalSpecificPlan;

   return possiblePlans[0];
 }, [profile]);

 const calculateAlternativePlan = (mainPlan, profile) => {
   if (!mainPlan) return null;

   // אם המסלול העיקרי יקר, נציע אלטרנטיבה זולה יותר
   if (MEMBERSHIP_PLANS[mainPlan].basePrice > 400) {
     return 'regular';
   }

   // אם זה מסלול בסיסי, נציע שדרוג
   if (mainPlan === 'regular' || mainPlan === 'localBasic') {
     return 'multiPass';
   }

   return null;
 };

 const determineGoalSpecificPlan = (goal, subGoals) => {
   const goalPriorities = {
     health: ['regular', 'multiPass'],
     shape: ['multiPass', 'regular'],
     weight: ['regular', 'localNoCommitment'],
     stress: ['localNoCommitment', 'regular']
   };

   return goalPriorities[goal]?.[0];
 };

 // פונקציות עדכון State
 const handleStepChange = (direction) => {
   setUiState(prev => ({
     ...prev,
     animationDirection: direction,
     lastAction: direction > 0 ? 'next' : 'back'
   }));

   setActiveStep(prev => {
     const newStep = Math.max(0, Math.min(4, prev + direction));
     if (newStep === 4) {
       generateCustomPitch();
     }
     return newStep;
   });
 };

 const handleProfileUpdate = (field, value) => {
   setProfile(prev => {
     const newProfile = { ...prev, [field]: value };
     // התאמת שדות נוספים בהתאם לשינוי
     if (field === 'goal') {
       newProfile.subGoals = [];
     }
     return newProfile;
   });
 };

 // יצירת משפט סגירה מותאם אישית
 const generateCustomPitch = () => {
   const plan = salesData.recommendedPlan;
   if (!plan) return;

   const goalData = CLIENT_PROFILE.goals[profile.goal];
   const expData = CLIENT_PROFILE.experience[profile.experience];
   
   // בניית פתיחה מותאמת אישית
   const generateOpening = () => {
     const openings = [
       `${profile.name}, לאחר שהבנתי את המטרות שלך, יש לי בדיוק את המסלול המתאים בשבילך`,
       `${profile.name}, תסכים איתי ש${goalData.text.toLowerCase()} זה משהו שלא כדאי לדחות?`,
       `${profile.name}, אני רואה שאתה באמת רציני לגבי ${goalData.text.toLowerCase()}`
     ];
     return openings[Math.floor(Math.random() * openings.length)];
   };

   // בניית משפטי ערך ויתרונות
   const generateValueProposition = () => {
     const planData = MEMBERSHIP_PLANS[plan];
     const benefits = [
       ...planData.features,
       ...goalData.sellingPoints,
       ...expData.approach.slice(0, 2)
     ];

     // שילוב טכניקות שכנוע
     const socialProof = SALES_TECHNIQUES.socialProof.templates[0]
       .replace('{number}', '1,000+')
       .replace('{benefit}', goalData.text.toLowerCase());

     const agreement = SALES_TECHNIQUES.agreementPhrases
       .find(phrase => phrase.includes(goalData.text.toLowerCase())) || 
       SALES_TECHNIQUES.agreementPhrases[0];

     return {
       mainValue: `המסלול הזה ייתן לך בדיוק את מה שחיפשת:`,
       benefits: benefits.map(benefit => ({
         text: benefit,
         icon: '✓',
         emphasis: planData.isPremium
       })),
       socialProof,
       agreement
     };
   };

   // בניית משפטי סגירה ודחיפות
   const generateClosing = () => {
     const plan = MEMBERSHIP_PLANS[salesData.recommendedPlan];
     const averagePrice = plan.basePrice / 30; // מחיר יומי
     const urgency = profile.urgencyLevel === 'high' ? 
       SALES_TECHNIQUES.urgencyTriggers[0] :
       SALES_TECHNIQUES.urgencyTriggers[2];

     return {
       priceFrame: `זה יוצא פחות מ-${averagePrice.toFixed(0)}₪ ליום על הבריאות שלך`,
       urgency,
       callToAction: `בוא נסגור את זה עכשיו ותתחיל כבר מחר את הדרך ל${goalData.text.toLowerCase()}`,
       valueAddition: profile.location === 'givatShmuel' ? 
         'ואני אפילו אוכל להוסיף לך חודש חינם!' :
         'ואני אדאג שתקבל את כל התמיכה שצריך'
     };
   };

   // בניית טקסט מותאם לפי שעות הפעילות
   const generateScheduleText = () => {
     const timeSlots = profile.availability.map(time => 
       CLIENT_PROFILE.availability[time]);
     
     const schedulePoints = timeSlots.flatMap(slot => ({
       time: slot.text,
       activities: slot.activities,
       benefits: slot.benefits
     }));

     return {
       intro: `בנינו בשבילך מערכת אימונים מותאמת אישית:`,
       schedule: schedulePoints,
       flexibility: `עם הגמישות המלאה בשעות, תוכל להתאמן מתי שנוח לך`
     };
   };

   // בניית הצעת המחיר המותאמת
   const generatePricing = () => {
     const plan = MEMBERSHIP_PLANS[salesData.recommendedPlan];
     const specialOffer = profile.location === 'givatShmuel' ? 
       SPECIAL_OFFERS.givatShmuelLocal : null;

     return {
       mainPrice: specialOffer ? specialOffer.basePrice : plan.basePrice,
       originalPrice: specialOffer ? specialOffer.originalPrice : null,
       registration: specialOffer ? specialOffer.registration : plan.registration,
       perDayPrice: (plan.basePrice / 30).toFixed(0),
       savings: specialOffer ? 
         (specialOffer.originalPrice - specialOffer.basePrice) * 12 :
         plan.basePrice * 0.2, // הנחה ממוצעת
       bonuses: specialOffer ? specialOffer.bonuses : null
     };
   };

   // הרכבת ה-Pitch המלא
   const fullPitch = {
     opening: generateOpening(),
     valueProposition: generateValueProposition(),
     schedule: generateScheduleText(),
     pricing: generatePricing(),
     closing: generateClosing()
   };

   setSalesData(prev => ({
     ...prev,
     generatedPitch: fullPitch
   }));
 };

 // בדיקת תקינות השלב
 const isStepValid = (step, profile) => {
   switch (step) {
     case 0:
       return profile.name.length > 0 && profile.location;
     case 1:
       return profile.goal && profile.subGoals.length > 0;
     case 2:
       return profile.availability.length > 0;
     case 3:
       return profile.experience;
     default:
       return true;
   }
 };

 // רינדור ראשי
 return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6" dir="rtl">
     <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
       {/* כותרת ראשית וכפתורים */}
       <div className="flex justify-between items-center mb-8">
         <div>
           <h1 className="text-3xl font-bold">
             מחולל משפטי סגירה
             {salesData.recommendedPlan === 'multiPass' && (
               <Diamond className="w-6 h-6 text-yellow-500 inline ml-2" />
             )}
           </h1>
           <p className="text-gray-600">בניית הצעה מותאמת אישית למקסום הסגירה</p>
         </div>
         <div className="flex gap-3">
           <button 
             onClick={() => setUiState(prev => ({ ...prev, showTips: !prev.showTips }))}
             className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
           >
             <Info className="w-4 h-4" />
             טיפים למוכר
           </button>
         </div>
       </div>

       {/* שלבי התהליך */}
       <div className="mb-8">
         <div className="flex justify-between relative">
           {progressSteps.map((step, index) => (
             <motion.div
               key={index}
               className={`flex flex-col items-center ${
                 index <= activeStep ? 'text-blue-600' : 'text-gray-400'
               }`}
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: index * 0.1 }}
             >
               <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl
                 ${index < activeStep ? 'bg-blue-100' : 
                   index === activeStep ? 'bg-blue-600 text-white' : 
                   'bg-gray-100'
                 }`}
               >
                 {step.icon}
               </div>
               <span className="mt-2 text-sm font-medium">{step.title}</span>
               {index <= activeStep && (
                 <motion.div
                   className="absolute -bottom-2 w-4 h-4 bg-blue-600 rounded-full"
                   layoutId="stepIndicator"
                 />
               )}
             </motion.div>
           ))}
           <div className="absolute top-7 left-0 right-0 h-1 bg-gray-200 -z-10">
             <motion.div
               className="h-full bg-blue-600"
               initial={{ width: "0%" }}
               animate={{ width: `${(activeStep / (progressSteps.length - 1)) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
           </div>
         </div>
       </div>

       {/* אזור תוכן דינמי */}
       <AnimatePresence mode="wait">
         <motion.div
           key={activeStep}
           initial={{ x: 50 * uiState.animationDirection, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           exit={{ x: -50 * uiState.animationDirection, opacity: 0 }}
           transition={{ duration: 0.3 }}
           className="min-h-[400px] bg-gray-50 rounded-xl p-6"
         >
           {React.createElement(progressSteps[activeStep].component, {
             profile,
             salesData,
             onUpdate: handleProfileUpdate,
             generateNewPitch: generateCustomPitch
           })}
         </motion.div>
       </AnimatePresence>

       {/* כפתורי ניווט */}
       <div className="flex justify-between mt-8">
         <button
           onClick={() => handleStepChange(-1)}
           className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
             activeStep === 0 ? 'invisible' : 'bg-gray-200 hover:bg-gray-300'
           }`}
         >
           <ChevronRight className="w-5 h-5" />
           הקודם
         </button>
         <button
           onClick={() => handleStepChange(1)}
           disabled={!isStepValid(activeStep, profile)}
           className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
             isStepValid(activeStep, profile)
               ? 'bg-blue-600 text-white hover:bg-blue-700'
               : 'bg-gray-300 cursor-not-allowed'
           }`}
         >
           {activeStep === progressSteps.length - 1 ? 'סיים' : 'הבא'}
           <ChevronLeft className="w-5 h-5" />
         </button>
       </div>

       {/* טיפים למוכר */}
       {uiState.showTips && (
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mt-6 bg-yellow-50 p-4 rounded-lg"
         >
           <div className="flex justify-between items-center mb-2">
             <h4 className="font-bold">💡 טיפים למוכר:</h4>
             <button 
               onClick={() => setUiState(prev => ({ ...prev, showTips: false }))}
               className="text-gray-500 hover:text-gray-700"
             >
               ✕
             </button>
           </div>
           <ul className="space-y-2">
             {SALES_TIPS[Object.keys(SALES_TIPS)[activeStep]].mainTips.map((tip, index) => (
               <li key={index} className="flex items-center">
                 <span className="text-yellow-500 ml-2">•</span>
                 {tip}
               </li>
             ))}
           </ul>
         </motion.div>
       )}

       {/* זכויות יוצרים */}
       <div className="text-center text-sm text-gray-500 mt-8">
         © {new Date().getFullYear()} Omri Shefi 
       </div>
     </div>
   </div>
 );
};

export default ClosingGenerator;