// src/components/SalesTools/ClosingGenerator.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Share2, ChevronRight, ChevronLeft, Info, Star, Flag, Clock, Target, Dumbbell } from 'lucide-react';

// מערכת הפרופילים מעודכנת
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
        "ליווי אישי"
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
        "יוגה זריחה",
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
        "מחירים מוזלים בשעות אלו"
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

// טיפים למוכר לפי שלב
const SALES_TIPS = {
  personalInfo: [
    "צור חיבור אישי עם הלקוח",
    "הקשב לצרכים ולרצונות",
    "רשום נקודות מפתח מהשיחה",
    "שאל שאלות פתוחות"
  ],
  goals: [
    "התמקד במטרות הספציפיות של הלקוח",
    "הראה איך המועדון יכול לעזור בהשגת המטרות",
    "תן דוגמאות של הצלחות קודמות",
    "הדגש את הייחודיות של המועדון"
  ],
  availability: [
    "התאם את המסלול לזמינות של הלקוח",
    "הדגש את הגמישות בשעות הפעילות",
    "הצע פתרונות לאילוצי זמן",
    "הסבר על המגוון הרחב של פעילויות"
  ],
  experience: [
    "התאם את הגישה לרמת הניסיון",
    "הדגש את המעטפת המקצועית",
    "ספר על אפשרויות ההתקדמות",
    "הראה את היתרונות הייחודיים למועדון"
  ],
  summary: [
    "סכם את הנקודות העיקריות",
    "הדגש את ההתאמה האישית",
    "צור תחושת דחיפות",
    "הצע לסגור עכשיו עם הטבה מיוחדת"
  ]
};

// משפטי סגירה לפי סיטואציה
const CLOSING_PHRASES = {
  valueProposition: [
    "בוא נראה איך אנחנו יכולים להתאים בדיוק למה שאתה צריך",
    "המסלול הזה נותן לך בדיוק את מה שחיפשת",
    "זו ההשקעה הכי טובה בעצמך שתעשה השנה"
  ],
  urgency: [
    "המבצע הזה בתוקף רק היום",
    "נשארו רק 3 מקומות במחיר הזה",
    "ההטבה הזו לא תחזור"
  ],
  benefits: [
    "תחשוב כמה זה שווה לך להרגיש יותר טוב כל יום",
    "זה פחות מכוס קפה ליום על הבריאות שלך",
    "ההשקעה הזו תחזיר את עצמה תוך חודש"
  ],
  commitment: [
    "בוא נתחיל כבר מחר",
    "איזה כרטיס יותר נוח לך?",
    "אני אדאג שתקבל את כל התמיכה שצריך"
  ]
};

const ClosingGenerator = () => {
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
    isSenior: false
  });
  const [recommendedPlan, setRecommendedPlan] = useState(null);
  const [generatedPitch, setGeneratedPitch] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [savedPitches, setSavedPitches] = useState([]);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [lastCalculatedPrice, setLastCalculatedPrice] = useState(null);

  // הצעדים בתהליך המכירה
  const progressSteps = [
    { title: 'פרטים אישיים', icon: '👤', component: PersonalInfoStep },
    { title: 'מטרות', icon: '🎯', component: GoalsStep },
    { title: 'זמינות', icon: '⏰', component: AvailabilityStep },
    { title: 'ניסיון', icon: '💪', component: ExperienceStep },
    { title: 'סיכום', icon: '✨', component: SummaryStep }
  ];

  // בחירת מסלול מומלץ
  const calculateRecommendedPlan = () => {
    if (!profile.goal || !profile.experience) return null;

    let possiblePlans = CLIENT_PROFILE.goals[profile.goal].recommendedPlans;
    possiblePlans = possiblePlans.filter(plan => {
      if (profile.isSoldier) return ['soldier', 'soldierMulti'].includes(plan);
      if (profile.isStudent) return ['student', 'regular'].includes(plan);
      if (profile.isSenior) return ['senior', 'seniorMorning'].includes(plan);
      return true;
    });

    // בחירת המסלול המתאים ביותר לפי הפרמטרים
    let bestPlan = possiblePlans[0];
    if (profile.availability.includes('evening') && !profile.isSoldier) {
      bestPlan = possiblePlans.includes('multiPass') ? 'multiPass' : bestPlan;
    }
    if (profile.location === 'givatShmuel') {
      bestPlan = 'regular'; // מסלול מיוחד לתושבי גבעת שמואל
    }

    return bestPlan;
  };

  // יצירת משפט סגירה מותאם אישית
  const generateCustomPitch = () => {
    const plan = recommendedPlan;
    if (!plan) return;

    const goalData = CLIENT_PROFILE.goals[profile.goal];
    const expData = CLIENT_PROFILE.experience[profile.experience];
    
    const priceData = lastCalculatedPrice ? { 
      monthlyPrice: lastCalculatedPrice.finalMonthlyPrice, 
      registration: lastCalculatedPrice.registrationFee,
      savings: lastCalculatedPrice.savings,
      perDayPrice: lastCalculatedPrice.perDayPrice
    } : null;

   const pitch = {
  opening: `${profile.name}, בוא נראה איך אנחנו יכולים לעזור לך להשיג את המטרות שלך`,
  personalMatch: `אני רואה שחשוב לך ${goalData.text.toLowerCase()}, ואצלנו תקבל בדיוק את התמיכה שאתה צריך:`,
  goalPoints: profile.subGoals,
  programBenefits: goalData.sellingPoints,
  experienceMatch: `בהתאם לרמת הניסיון שלך, אנחנו נתאים לך:`,
  experiencePoints: expData.approach,
  schedule: `המועדון פתוח ומציע פעילויות בשעות הנוחות לך:`,
  schedulePoints: profile.availability.flatMap(time => 
    CLIENT_PROFILE.availability[time].activities
  ),
  valueProposition: {
    main: CLOSING_PHRASES.valueProposition[
      Math.floor(Math.random() * CLOSING_PHRASES.valueProposition.length)
    ],
    urgency: CLOSING_PHRASES.urgency[
      Math.floor(Math.random() * CLOSING_PHRASES.urgency.length)
    ],
    benefits: CLOSING_PHRASES.benefits[
      Math.floor(Math.random() * CLOSING_PHRASES.benefits.length)
    ],
    closing: CLOSING_PHRASES.commitment[
      Math.floor(Math.random() * CLOSING_PHRASES.commitment.length)
    ],
    price: priceData ? `במחיר מיוחד של ${priceData.monthlyPrice}₪ לחודש, ${priceData.perDayPrice}₪ ליום בלבד! חסכון של ${priceData.savings}₪` : null
  }
};

setGeneratedPitch(pitch);
};
// רכיב פרטים אישיים
function PersonalInfoStep() {
return (
<div className="space-y-6">
<div>
<label className="block text-lg font-bold mb-2">איך קוראים לך?</label>
<input
type="text"
value={profile.name}
onChange={(e) => setProfile({...profile, name: e.target.value})}
className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
placeholder="שם מלא"
/>
</div>
<div>
      <label className="block text-lg font-bold mb-2">איפה אתה גר?</label>
      <select
        value={profile.location}
        onChange={(e) => setProfile({...profile, location: e.target.value})}
        className="w-full p-4 border rounded-lg"
      >
        <option value="">בחר מיקום</option>
        <option value="givatShmuel">גבעת שמואל</option>
        <option value="other">אחר</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="block text-lg font-bold mb-2">סטטוס מיוחד</label>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={profile.isStudent}
            onChange={(e) => setProfile({...profile, isStudent: e.target.checked})}
            className="ml-2"
          />
          סטודנט
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={profile.isSoldier}
            onChange={(e) => setProfile({...profile, isSoldier: e.target.checked})}
            className="ml-2"
          />
          חייל בשירות סדיר
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={profile.isSenior}
            onChange={(e) => setProfile({...profile, isSenior: e.target.checked})}
            className="ml-2"
          />
          אזרח ותיק
        </label>
      </div>
    </div>
  </div>
);
}

// רכיב מטרות
function GoalsStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">מה המטרה העיקרית שלך?</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(CLIENT_PROFILE.goals).map(([key, goal]) => (
          <motion.button
            key={key}
            onClick={() => setProfile({...profile, goal: key})}
            className={`p-4 rounded-lg border-2 text-right transition-all ${
              profile.goal === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <Target className="w-5 h-5 text-blue-500" />
              <div className="text-right">
                <div className="font-bold">{goal.text}</div>
                <div className="text-sm text-gray-600 mt-2">
                  {goal.subGoals.join(', ')}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {profile.goal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <h4 className="font-bold mb-3">בחר יעדים ספציפיים:</h4>
          <div className="grid grid-cols-2 gap-2">
            {CLIENT_PROFILE.goals[profile.goal].subGoals.map((subGoal) => (
              <label key={subGoal} className="flex items-center p-3 border rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={profile.subGoals.includes(subGoal)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProfile({...profile, subGoals: [...profile.subGoals, subGoal]});
                    } else {
                      setProfile({...profile, subGoals: profile.subGoals.filter(g => g !== subGoal)});
                    }
                  }}
                  className="ml-2"
                />
                {subGoal}
              </label>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// רכיב זמינות
function AvailabilityStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">מתי נוח לך להתאמן?</h3>
      <div className="space-y-4">
        {Object.entries(CLIENT_PROFILE.availability).map(([key, timeSlot]) => (
          <motion.label
            key={key}
            className={`block p-4 rounded-lg border-2 transition-all ${
              profile.availability.includes(key) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={profile.availability.includes(key)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setProfile({...profile, availability: [...profile.availability, key]});
                  } else {
                    setProfile({...profile, availability: profile.availability.filter(t => t !== key)});
                  }
                }}
                className="ml-3"
              />
              <div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-500 ml-2" />
                  <span className="font-bold">{timeSlot.text}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {timeSlot.activities.map((activity, index) => (
                    <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                      {activity}
                    </span>
                  ))}
                </div>
                {profile.availability.includes(key) && (
                  <div className="mt-2 text-blue-600 text-sm">
                    {timeSlot.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center mt-1">
                        <span className="text-blue-500 ml-2">✓</span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.label>
        ))}
      </div>
    </div>
  );
}

// רכיב ניסיון
function ExperienceStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">מה הניסיון שלך באימונים?</h3>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(CLIENT_PROFILE.experience).map(([key, exp]) => (
          <motion.button
            key={key}
            onClick={() => setProfile({...profile, experience: key})}
            className={`p-6 rounded-lg border-2 text-right transition-all ${
              profile.experience === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center">
              <Dumbbell className="w-6 h-6 text-blue-500" />
              <div className="text-right flex-grow ml-4">
                <div className="font-bold text-lg mb-2">{exp.text}</div>
                <div className="text-gray-600">
                  {exp.approach.map((approach, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <span className="text-blue-500 ml-2">•</span>
                      {approach}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// רכיב סיכום
function SummaryStep() {
  const [localGeneratedPitch, setLocalGeneratedPitch] = useState(null);

  useEffect(() => {
    if (activeStep === 4) {
      setRecommendedPlan(calculateRecommendedPlan());
      if (!generatedPitch) {
        generateCustomPitch();
      }
      setLocalGeneratedPitch(generatedPitch);
    }
  }, [activeStep, generatedPitch]);

  if (!localGeneratedPitch) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const RecommendedPlanDisplay = () => (
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
      <h4 className="font-bold mb-2">המסלול המומלץ עבורך:</h4>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">{BASE_PLANS[recommendedPlan].name}</p>
          <p className="text-sm text-gray-600">{BASE_PLANS[recommendedPlan].description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{BASE_PLANS[recommendedPlan].basePrice}₪</p>
          <p className="text-sm text-gray-600">לחודש</p>
        </div>
      </div>
    </div>
  );

return (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      {/* פתיחה */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-2">
          {generatedPitch.opening}
        </h3>
        <p className="text-gray-600">{generatedPitch.personalMatch}</p>
      </div>

      {/* מטרות */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">המטרות שלך:</h4>
        <div className="grid grid-cols-2 gap-3">
          {generatedPitch.goalPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center bg-blue-50 p-3 rounded-lg"
            >
              <span className="text-blue-500 ml-2">✓</span>
              {point}
            </motion.div>
          ))}
        </div>
      </div>

      {/* יתרונות התוכנית */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">איך נעזור לך להשיג את זה:</h4>
        <div className="grid grid-cols-1 gap-3">
          {generatedPitch.programBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-center bg-green-50 p-3 rounded-lg"
            >
              <span className="text-green-500 ml-2">💪</span>
              {benefit}
            </motion.div>
          ))}
        </div>
      </div>

      {/* המלצת מסלול */}
      <RecommendedPlanDisplay />
      
      {/* לוח זמנים */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">{generatedPitch.schedule}</h4>
        <div className="flex flex-wrap gap-2">
          {generatedPitch.schedulePoints.map((activity, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.6 }}
              className="bg-gray-100 rounded-full px-3 py-1 text-sm"
>
{activity}
</motion.span>
))}
</div>
</div>
   {/* משפטי סגירה */}
      <div className="mt-8 space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-blue-600 text-white p-4 rounded-lg"
        >
          <p className="text-center text-lg font-bold">
            {generatedPitch.valueProposition.main}
          </p>
        </motion.div>

        {generatedPitch.valueProposition.price && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="bg-green-500 text-white p-4 rounded-lg"
          >
            <p className="text-center font-bold">
              {generatedPitch.valueProposition.price}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-red-50 p-4 rounded-lg"
        >
          <p className="text-center text-red-600 font-bold animate-pulse">
            {generatedPitch.valueProposition.urgency}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <button
            onClick={() => {/* פונקציית שמירה */}}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Save className="w-5 h-5" />
            שמור הצעה
          </button>
          <button
            onClick={() => {/* פונקציית שיתוף */}}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            שתף הצעה
          </button>
        </motion.div>
      </div>
    </motion.div>
  </div>
);
}
return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
{/* כותרת וכפתורים */}
<div className="flex justify-between items-center mb-8">
<h2 className="text-2xl font-bold">מחולל משפטי סגירה</h2>
<div className="flex gap-3">
<button
onClick={() => setShowTips(!showTips)}
className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
>
<Info className="w-4 h-4" />
טיפים למוכר
</button>
</div>
</div>
  {/* Progress Steps */}
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
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
              ${index < activeStep ? 'bg-blue-100' : 
                index === activeStep ? 'bg-blue-600 text-white' : 
                'bg-gray-100'
              }`}
            >
              {step.icon}
            </div>
            <span className="mt-2 text-sm font-medium">{step.title}</span>
          </motion.div>
        ))}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStep / (progressSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>

    {/* Main Content Area */}
    <AnimatePresence mode="wait">
      <motion.div
        key={activeStep}
        initial={{ x: 50 * animationDirection, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50 * animationDirection, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px] bg-gray-50 rounded-xl p-6"
      >
        {progressSteps[activeStep].component()}
      </motion.div>
    </AnimatePresence>

    {/* Navigation */}
    <div className="flex justify-between mt-8">
      <button
        onClick={() => {
          setAnimationDirection(-1);
          setActiveStep(Math.max(0, activeStep - 1));
        }}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
          activeStep === 0 ? 'invisible' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
        הקודם
      </button>
      <button
  onClick={() => {
    setAnimationDirection(1);
    setActiveStep(Math.min(4, activeStep + 1));
  }}
  disabled={!isStepValid(activeStep, profile)}
  className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
    isStepValid(activeStep, profile)
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-300 cursor-not-allowed'
  }`}
>
  {activeStep === 4 ? 'סיים' : 'הבא'}
  <ChevronLeft className="w-5 h-5" />
</button>
    </div>

    {/* Tips */}
    {showTips && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 bg-yellow-50 p-4 rounded-lg"
      >
        <h4 className="font-bold mb-2">💡 טיפים למוכר:</h4>
        <ul className="space-y-2">
          {SALES_TIPS[Object.keys(SALES_TIPS)[activeStep]].map((tip, index) => (
            <li key={index} className="flex items-center">
              <span className="text-yellow-500 ml-2">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    )}
  </div>
</div>
);
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
export default ClosingGenerator; 