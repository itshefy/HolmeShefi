// src/components/SalesTools/PriceCalculator.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Info, 
  AlertCircle, 
  Tag, 
  Diamond,
  Star
} from 'lucide-react';

// מסלולי המנויים המעודכנים
const BASE_PLANS = {
  multiPass: {
    name: "מנוי מולטי לכל הסניפים",
    basePrice: 484,
    registration: 399,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה עם אפשרות להקפאה",
    features: ["כניסה לכל הסניפים", "תוכנית נאמנות", "אפשרות הקפאה"],
    section: "710",
    hasLoyalty: true,
    hasFreeze: true,
    commitment: true,
    type: "premium",
    isPremium: true
  },
  localNoCommitment: {
    name: "מנוי מקומי ללא התחייבות",
    basePrice: 454,
    registration: 299,
    description: "כולל תוכנית נאמנות, מנוי ללא התחייבות עם אפשרות להקפאה",
    features: ["ללא התחייבות", "תוכנית נאמנות", "אפשרות הקפאה"],
    section: "947",
    hasLoyalty: true,
    hasFreeze: true,
    commitment: false
  },
  regular: {
    name: "מנוי רגיל",
    basePrice: 393,
    registration: 299,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה עם אפשרות להקפאה",
    features: ["מחיר מוזל", "תוכנית נאמנות", "אפשרות הקפאה"],
    section: "721",
    hasLoyalty: true,
    hasFreeze: true,
    commitment: true,
    variations: {
      givatShmuel: {
        basePrice: 363,
        name: "מנוי רגיל - תושב גבעת שמואל"
      }
    }
  },
localBasic: {
    name: "מנוי מקומי בסיסי",
    basePrice: 342,
    registration: 299,
    description: "מנוי בהתחייבות לשנה ללא אפשרות הקפאה",
    features: ["מחיר נמוך", "התחייבות לשנה"],
    section: "736",
    hasLoyalty: false,
    hasFreeze: false,
    commitment: true
  },
  student: {
    name: "מסלול סטודנט",
    basePrice: 322,
    registration: 199,
    description: "מנוי בהתחייבות לשנה ללא אפשרות הקפאה",
    features: ["מחיר מוזל לסטודנטים", "בהצגת תעודת סטודנט"],
    section: "489",
    hasLoyalty: false,
    hasFreeze: false,
    commitment: true,
    requirements: "בהצגת תעודת סטודנט בתוקף"
  },
  soldier: {
    name: "מסלול חייל",
    basePrice: 211,
    registration: 150,
    cancelationFee: 150,
    description: "מנוי בהתחייבות לשנה ללא אפשרות הקפאה",
    features: ["מחיר מיוחד לחיילים", "ללא כניסה 17:00-20:00"],
    section: "842",
    hasLoyalty: false,
    hasFreeze: false,
    commitment: true,
    restrictions: "אין כניסה בין השעות 17:00-20:00"
  },
  soldierMulti: {
    name: "מסלול חייל מולטי",
    basePrice: 322,
    registration: 150,
    cancelationFee: 150,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה עם אפשרות הקפאה",
    features: ["כניסה לכל הסניפים", "תוכנית נאמנות", "אפשרות הקפאה"],
    section: "848",
    hasLoyalty: true,
    hasFreeze: true,
    commitment: true,
    restrictions: "אין כניסה בין השעות 17:00-20:00"
  },
  senior: {
    name: "מסלול אזרח ותיק",
    basePrice: 312,
    registration: 199,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה עם אפשרות הקפאה",
    features: ["מחיר מיוחד לאזרחים ותיקים", "תוכנית נאמנות", "אפשרות הקפאה"],
    section: "894",
    hasLoyalty: true,
    hasFreeze: true,
    commitment: true,
    requirements: "גברים מגיל 67, נשים מגיל 62"
  },
seniorMorning: {
    name: "מסלול אזרח ותיק - בוקר",
    basePrice: 292,
    registration: 199,
    description: "מנוי בהתחייבות לשנה ללא אפשרות הקפאה",
    features: ["מחיר מוזל", "כניסה עד 16:00"],
    section: "611",
    hasLoyalty: false,
    hasFreeze: false,
    commitment: true,
    requirements: "גברים מגיל 67, נשים מגיל 62",
    restrictions: "כניסה עד השעה 16:00"
  },
  couple: {
    name: "מסלול זוגי",
    basePrice: 685,
    registration: 199,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה עם אפשרות הקפאה",
    features: ["מחיר מוזל לזוג", "תוכנית נאמנות", "הקפאה זוגית בלבד"],
    section: "910",
    hasLoyalty: true,
    hasFreeze: true,
    commitment: true,
    variations: {
      givatShmuel: {
        basePrice: 631,
        name: "מסלול זוגי - תושבי גבעת שמואל"
      }
    },
    notes: "הקפאה זוגית בלבד"
  },
  parentChild: {
    name: "מסלול הורה + ילד/ה",
    basePrice: 564,
    registration: 299,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה ללא אפשרות הקפאה",
    features: ["מחיר משפחתי מוזל", "תוכנית נאמנות"],
    section: "583",
    hasLoyalty: true,
    hasFreeze: false,
    commitment: true
  },
  familyThree: {
    name: "מסלול משפחתי 3 נפשות",
    basePrice: 786,
    registration: 299,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה ללא אפשרות הקפאה",
    features: ["מחיר משפחתי מוזל", "תוכנית נאמנות"],
    section: "580",
    hasLoyalty: true,
    hasFreeze: false,
    commitment: true,
    variations: {
      givatShmuel: {
        basePrice: 706,
        name: "משפחתי 3 נפשות - תושבי גבעת שמואל"
      }
    }
  },
  familyFour: {
    name: "מסלול משפחתי 4 נפשות",
    basePrice: 806,
    registration: 299,
    description: "כולל תוכנית נאמנות, מנוי בהתחייבות לשנה ללא אפשרות הקפאה",
    features: ["מחיר משפחתי מוזל", "תוכנית נאמנות"],
    section: "581",
    hasLoyalty: true,
    hasFreeze: false,
    commitment: true,
    variations: {
      givatShmuel: {
        basePrice: 746,
        name: "משפחתי 4 נפשות - תושבי גבעת שמואל"
      }
    }
  }
};

// תוכנית הנאמנות המעודכנת
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
    weeklyWorkout: 10,  // נקודות לשבוע אימון
    monthlyActive: 40,  // נקודות לחודש פעיל
    renewal: 100,      // נקודות לחידוש מנוי
    referral: 200      // נקודות להמלצת חבר
  }
};
const PriceCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState('regular');
  const [isGivatShmuel, setIsGivatShmuel] = useState(false);
  const [showLoyaltyInfo, setShowLoyaltyInfo] = useState(false);
  const [showSectionCode, setShowSectionCode] = useState(false);
  const [waiveRegistration, setWaiveRegistration] = useState(false);
  const [calculationDetails, setCalculationDetails] = useState(null);

  // פונקציה חכמה ליצירת משפטי מכירה מותאמים
  const generateSmartPhrases = (basePrice, finalPrice, perDayPrice, savings) => {
    const phrases = [];
    
    // משפט בסיסי של מחיר יומי לכולם
    phrases.push(`תסכים איתי שהבריאות שלך שווה יותר מ-${perDayPrice}₪ ליום?`);

    // משפטים מותאמים לפי סוג המסלול
    switch(selectedPlan) {
      case 'multiPass':
        phrases.push(
          'תחשוב על החופש להתאמן בכל סניף שתרצה',
          'המסלול הכי גמיש שלנו - מתאמנים איפה שנוח לך',
          'אתה מקבל גישה מלאה לכל המתקנים בכל הסניפים',
          'הצטרף למאות המתאמנים שכבר נהנים מהגמישות המקסימלית'
        );
        break;
      case 'localNoCommitment':
        phrases.push(
          'בלי התחייבות - אתה שולט במנוי שלך',
          'גמישות מקסימלית בתנאים',
          'תוכל להתחיל להתאמן כבר מחר בלי חששות',
          'אפשרות לבטל בכל עת'
        );
        break;
      case 'regular':
        phrases.push(
          'המסלול המושלם למתאמנים קבועים',
          'כל היתרונות במחיר משתלם',
          'תסכים איתי שזה המסלול המשתלם ביותר?',
          'אלפי מתאמנים כבר בחרו במסלול הזה'
        );
        break;
      case 'student':
        phrases.push(
          'מחיר מיוחד לסטודנטים - משתלם במיוחד',
          'תשקיע בעצמך במחיר סטודנטיאלי',
          'שלב את האימונים בשגרת הלימודים',
          'תסכים איתי שזה פחות ממחיר של ספר לימוד?'
        );
        break;
      case 'soldier':
      case 'soldierMulti':
        phrases.push(
          'מחיר מיוחד לחיילים - הכי משתלם שיש',
          'תשמור על הכושר גם בשירות',
          'מותאם במיוחד ללו"ז של חייל',
          '98% מהחיילים ממליצים על המסלול הזה'
        );
        break;
      case 'senior':
      case 'seniorMorning':
        phrases.push(
          'מחיר מיוחד לגיל הזהב',
          'ליווי והדרכה מקצועית מותאמת',
          'תשמור על הבריאות בסביבה תומכת',
          'הצטרף לקהילת המתאמנים המבוגרים שלנו'
        );
        break;
      case 'couple':
        phrases.push(
          'תתאמנו יחד - זה יותר כיף וגם יותר משתלם',
          'מחיר מיוחד לזוגות',
          'תהפכו את האימון לזמן איכות משותף',
          '92% מהזוגות ממשיכים איתנו לשנה נוספת'
        );
        break;
      default:
        if (selectedPlan.includes('family')) {
          phrases.push(
            'כל המשפחה מתאמנת יחד - זה החיסכון המושלם',
            'תבנו הרגלים בריאים לכל המשפחה',
            'פעילות משפחתית בריאה וכיפית',
            'מאות משפחות כבר נהנות מהמסלול הזה'
          );
        }
    }

    // משפט חיסכון מותאם
    if (savings > 1000) {
      phrases.push(`וואו! הצלחתי להשיג לך חיסכון של ${savings.toFixed(0)}₪ - זו הזדמנות שאסור לפספס!`);
    } else if (savings > 0) {
      phrases.push(`הצלחתי להשיג לך חיסכון נחמד של ${savings.toFixed(0)}₪`);
    }

    return phrases;
  };
// חישוב מחיר חכם
  const calculatePrice = () => {
    const plan = BASE_PLANS[selectedPlan];

    // מחיר בסיס לפי תושב
    let basePrice = plan.basePrice;
    if (isGivatShmuel && plan.variations?.givatShmuel) {
      basePrice = plan.variations.givatShmuel.basePrice;
    }

    // חישוב הנחות
    let finalMonthlyPrice = basePrice;
    let registrationFee = waiveRegistration ? 0 : plan.registration;
    let savings = 0;
    let discountDetails = [];

    if (waiveRegistration) {
      savings += plan.registration;
      discountDetails.push(`ביטול דמי רישום: ${plan.registration}₪`);
    }

    // חישוב סופי
    const totalPayment = finalMonthlyPrice * 12 + registrationFee;
    const perDayPrice = (totalPayment / 365).toFixed(2);

    // יצירת משפטי מכירה מותאמים
    const smartPhrases = generateSmartPhrases(basePrice, finalMonthlyPrice, perDayPrice, savings);

    return {
      originalPrice: basePrice,
      finalMonthlyPrice,
      totalPayment,
      registrationFee,
      savings,
      discountDetails,
      perDayPrice,
      smartPhrases
    };
  };

  // עדכון חישובים בכל שינוי
  useEffect(() => {
    setCalculationDetails(calculatePrice());
  }, [selectedPlan, isGivatShmuel, waiveRegistration]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Calculator className="w-6 h-6 ml-2" />
          מחשבון הצעות מחיר
        </h2>
        <p className="text-gray-600">חשב מחירים והנחות בקלות</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* בחירת מסלול */}
          <div>
            <label className="block text-sm font-medium mb-2">סוג מנוי</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full p-3 border rounded-lg"
              dir="rtl"
            >
              {Object.entries(BASE_PLANS)
                .sort((a, b) => b[1].basePrice - a[1].basePrice)
                .map(([key, plan]) => (
                  <option key={key} value={key}>
                    {plan.name} {plan.isPremium && "✨"}
                  </option>
                ))}
            </select>
<div className="mt-2">
              <p className="text-sm text-gray-500">{BASE_PLANS[selectedPlan].description}</p>
              {BASE_PLANS[selectedPlan].requirements && (
                <p className="text-sm text-orange-600 mt-1">
                  <AlertCircle className="w-4 h-4 inline ml-1" />
                  {BASE_PLANS[selectedPlan].requirements}
                </p>
              )}
              {BASE_PLANS[selectedPlan].restrictions && (
                <p className="text-sm text-red-600 mt-1">
                  <AlertCircle className="w-4 h-4 inline ml-1" />
                  {BASE_PLANS[selectedPlan].restrictions}
                </p>
              )}
            </div>
          </div>

          {/* תושב גבעת שמואל */}
          {BASE_PLANS[selectedPlan].variations?.givatShmuel && (
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={isGivatShmuel}
                onChange={(e) => setIsGivatShmuel(e.target.checked)}
                className="ml-2"
              />
              <label className="text-sm">תושב/ת גבעת שמואל</label>
            </div>
          )}

          {/* ביטול דמי רישום */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={waiveRegistration}
              onChange={(e) => setWaiveRegistration(e.target.checked)}
              className="ml-2"
            />
            <label className="text-sm">ביטול דמי רישום</label>
          </div>

          {/* מידע על תוכנית נאמנות */}
          {BASE_PLANS[selectedPlan].hasLoyalty && (
            <div className="mt-4">
              <button
                onClick={() => setShowLoyaltyInfo(!showLoyaltyInfo)}
                className="text-blue-600 text-sm hover:underline flex items-center"
              >
                <Info className="w-4 h-4 ml-1" />
                מידע על תוכנית הנאמנות
              </button>
              {showLoyaltyInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 bg-blue-50 p-3 rounded-lg"
                >
                  <h4 className="font-bold mb-2">תוכנית הנאמנות כוללת:</h4>
                  
                  {/* נקודות */}
                  <div className="mb-4">
                    <div className="text-sm font-bold mb-2">צבירת נקודות:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 ml-2" />
                        <div>
                          <div className="text-sm">{LOYALTY_PROGRAM.pointsSystem.weeklyWorkout} נקודות</div>
                          <div className="text-xs text-gray-600">לשבוע אימון</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 ml-2" />
                        <div>
                          <div className="text-sm">{LOYALTY_PROGRAM.pointsSystem.monthlyActive} נקודות</div>
                          <div className="text-xs text-gray-600">לחודש פעיל</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 ml-2" />
                        <div>
                          <div className="text-sm">{LOYALTY_PROGRAM.pointsSystem.renewal} נקודות</div>
                          <div className="text-xs text-gray-600">לחידוש מנוי</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 ml-2" />
                        <div>
                          <div className="text-sm">{LOYALTY_PROGRAM.pointsSystem.referral} נקודות</div>
                          <div className="text-xs text-gray-600">להמלצת חבר</div>
                        </div>
                      </div>
                    </div>
                  </div>
{/* רמות */}
                  <div className="space-y-3">
                    <div className="text-sm font-bold mb-2">רמות והטבות:</div>
                    {Object.entries(LOYALTY_PROGRAM.levels).map(([key, level]) => (
                      <div key={key} className="bg-white p-2 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">{level.name}</span>
                          <span className="text-sm text-blue-600">{level.points} נקודות</span>
                        </div>
                        <ul className="text-xs space-y-1">
                          {level.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-green-500 ml-1">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* תצוגת חישוב */}
        {calculationDetails && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">סיכום הצעת מחיר</h3>
              <button
                onClick={() => setShowSectionCode(!showSectionCode)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {showSectionCode ? `קוד סעיף: ${BASE_PLANS[selectedPlan].section}` : 'הצג קוד סעיף'}
              </button>
            </div>
            
            <div className="space-y-4">
               {/* מחירים */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between text-gray-500">
                  <span>מחיר מקורי:</span>
                  <span className="line-through">{calculationDetails.originalPrice}₪</span>
                </div>

                <div className="flex justify-between text-lg font-bold mt-2">
                  <span>מחיר לחודש:</span>
                  <span className="text-green-600">{calculationDetails.finalMonthlyPrice.toFixed(2)}₪</span>
                </div>

                <div className="flex justify-between mt-2">
                  <span>דמי רישום:</span>
                  <span>{calculationDetails.registrationFee}₪</span>
                </div>
              </div>
{/* פירוט הנחות */}
              {calculationDetails.discountDetails.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">פירוט הנחות:</h4>
                  <ul className="space-y-1">
                    {calculationDetails.discountDetails.map((detail, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="text-green-500 ml-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <div className="flex justify-between font-bold">
                      <span>סה"כ חיסכון:</span>
                      <span className="text-green-600">{calculationDetails.savings.toFixed(2)}₪</span>
                    </div>
                  </div>
                </div>
              )}

              {/* תשלום חודשי */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between text-xl font-bold">
                  <span>תשלום חודשי:</span>
                  <span className="text-blue-600">{(calculationDetails.totalPayment / 12).toFixed(2)}₪</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 text-center">
                  (כ-{calculationDetails.perDayPrice}₪ ליום)
                </div>
              </div>

{/* משפטי מכירה */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">משפטי מכירה מומלצים:</h4>
                <ul className="text-sm space-y-2">
                  {calculationDetails.smartPhrases.map((phrase, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-purple-500 ml-2">💡</span>
                      {phrase}
                    </li>
                  ))}
                </ul>
              </div>

              {/* דמי ביטול */}
              {BASE_PLANS[selectedPlan].commitment && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">דמי ביטול:</h4>
                  {selectedPlan.includes('soldier') ? (
                    <div className="text-sm">
                      <div className="flex justify-between mb-2">
                        <span>דמי ביטול קבועים:</span>
                        <span className="font-bold">150₪</span>
                      </div>
                      <p className="text-gray-600">*בנוסף לחודש התראה מראש</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>4 חודשים ראשונים:</span>
                        <span>{(calculationDetails.totalPayment * 0.25).toFixed(0)}₪</span>
                      </div>
                      <div className="flex justify-between">
                        <span>חודשים 5-8:</span>
                        <span>{(calculationDetails.totalPayment * 0.20).toFixed(0)}₪</span>
                      </div>
                      <div className="flex justify-between">
                        <span>חודשים 9-12:</span>
                        <span>{(calculationDetails.totalPayment * 0.17).toFixed(0)}₪</span>
                      </div>
                      <p className="text-gray-600 mt-2">*בנוסף לחודש התראה מראש</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* זכויות יוצרים */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Omri Shefi 
      </div>
    </div>
  );
};

export default PriceCalculator;