// src/components/SalesTools/PriceCalculator.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, AlertCircle, Tag, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

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
    type: "premium"
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
    commitment: false,
    type: "flexible"
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
    type: "regular",
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
    commitment: true,
    type: "basic"
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
    requirements: "בהצגת תעודת סטודנט בתוקף",
    type: "special"
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
    restrictions: "אין כניסה בין השעות 17:00-20:00",
    type: "special"
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
    restrictions: "אין כניסה בין השעות 17:00-20:00",
    type: "special"
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
    requirements: "גברים מגיל 67, נשים מגיל 62",
    type: "special"
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
    restrictions: "כניסה עד השעה 16:00",
    type: "special"
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
    type: "family",
    variations: {
      givatShmuel: {
        basePrice: 631,
        name: "מסלול זוגי - תושבי גבעת שמואל"
      }
    },
    notes: "הקפאה זוגית בלבד"
  }
};

// מבצעים מיוחדים
const SPECIAL_OFFERS = {
  givatShmuelLocal: {
    name: "מבצע מקומי לגבעת שמואל",
    basePrice: 349,
    originalPrice: 454,
    registration: 49,
    originalRegistration: 299,
    description: "מנוי ללא התחייבות, ניתן לבטל בהתראה של חודש מראש",
    features: [
      "ללא דמי ביטול",
      "אפשרות לחודש חינם",
      "דמי רישום מוזלים",
      "ללא תוכנית נאמנות"
    ],
    conditions: ["לתושבי גבעת שמואל בלבד", "ללא התחייבות"]
  },
  threeMonthsFree: {
    name: "3 חודשים חינם",
    basePrice: 393,
    freeMonths: ["מרץ", "יולי", "נובמבר"],
    registration: 149,
    originalRegistration: 299,
    description: "מנוי בהתחייבות לשנה עם 3 חודשים חינם",
    features: [
      "3 חודשים חינם",
      "דמי רישום מוזלים",
      "כולל תוכנית נאמנות"
    ],
    averagePrice: 295,
    conditions: [
      "בהתחייבות לשנה",
      "ללא אפשרות הקפאה",
      "החזר שווי הטבה בביטול"
    ]
  }
};

// אפשרויות תשלום
const PAYMENT_OPTIONS = {
  full: {
    name: "תשלום מלא מראש",
    discount: 5,
    description: "5% הנחה בתשלום מראש"
  },
  credit12: {
    name: "12 תשלומים",
    description: "פריסה ל-12 תשלומים ללא ריבית"
  },
  credit6: {
    name: "6 תשלומים",
    description: "פריסה ל-6 תשלומים ללא ריבית"
  }
};

// חישוב דמי ביטול לפי תקופה
const calculateCancellationFee = (totalPayment, monthsPassed) => {
  if (monthsPassed <= 4) { // שליש ראשון
    return totalPayment * 0.25;
  } else if (monthsPassed <= 8) { // שליש שני
    return totalPayment * 0.2;
  } else { // שליש שלישי
    return totalPayment * 0.17;
  }
};

const PriceCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState('regular');
  const [selectedOffer, setSelectedOffer] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('credit12');
  const [isGivatShmuel, setIsGivatShmuel] = useState(false);
  const [showLoyaltyInfo, setShowLoyaltyInfo] = useState(false);
  const [customDiscount, setCustomDiscount] = useState(0);
  const [calculationDetails, setCalculationDetails] = useState(null);

  // חישוב מחיר חכם
  const calculatePrice = () => {
    const plan = BASE_PLANS[selectedPlan];
    const offer = SPECIAL_OFFERS[selectedOffer];
    const payment = PAYMENT_OPTIONS[selectedPayment];

    // מחיר בסיס לפי תושב
    let basePrice = plan.basePrice;
    if (isGivatShmuel && plan.variations?.givatShmuel) {
      basePrice = plan.variations.givatShmuel.basePrice;
    }

    // חישוב הנחות ומבצעים
    let finalMonthlyPrice = basePrice;
    let registrationFee = plan.registration;
    let totalMonths = 12;
    let freeMonths = 0;
    let savings = 0;
    let discountDetails = [];

    // הנחות מבצע
    if (offer) {
      if (offer.basePrice) {
        savings += (basePrice - offer.basePrice) * 12;
        finalMonthlyPrice = offer.basePrice;
        discountDetails.push(`הנחת מבצע: ${(basePrice - offer.basePrice).toFixed(0)}₪ לחודש`);
      }
      
      if (offer.freeMonths) {
        freeMonths = offer.freeMonths.length;
        savings += finalMonthlyPrice * freeMonths;
        discountDetails.push(`${freeMonths} חודשים חינם: ${(finalMonthlyPrice * freeMonths).toFixed(0)}₪`);
      }

      if (offer.registration) {
        savings += plan.registration - offer.registration;
        registrationFee = offer.registration;
        discountDetails.push(`הנחה בדמי רישום: ${(plan.registration - offer.registration).toFixed(0)}₪`);
      }
    }

    // הנחת תשלום מראש
    if (payment.discount) {
      const paymentDiscount = finalMonthlyPrice * (payment.discount / 100);
      finalMonthlyPrice -= paymentDiscount;
      savings += paymentDiscount * (12 - freeMonths);
      discountDetails.push(`הנחת תשלום מראש: ${paymentDiscount.toFixed(0)}₪ לחודש`);
    }

    // חישוב סופי
    const totalPayment = (finalMonthlyPrice * (12 - freeMonths)) + registrationFee;
    const monthlyPayment = selectedPayment === 'full' ? 
      totalPayment : totalPayment / parseInt(selectedPayment.replace('credit', ''));

    return {
      originalPrice: basePrice,
      finalMonthlyPrice,
      totalPayment,
      monthlyPayment,
      registrationFee,
      freeMonths,
      savings,
      discountDetails,
      perDayPrice: (totalPayment / (365)).toFixed(2),
      cancellationFees: {
        firstPeriod: calculateCancellationFee(totalPayment, 3),
        secondPeriod: calculateCancellationFee(totalPayment, 6),
        thirdPeriod: calculateCancellationFee(totalPayment, 9)
      }
    };
  };

  // עדכון חישובים בכל שינוי
  useEffect(() => {
    setCalculationDetails(calculatePrice());
  }, [selectedPlan, selectedOffer, selectedPayment, isGivatShmuel, customDiscount]);

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
                    {plan.name} - {plan.basePrice}₪
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

          {/* בחירת מבצע */}
          <div>
            <label className="block text-sm font-medium mb-2">מבצע מיוחד</label>
            <select
              value={selectedOffer}
              onChange={(e) => setSelectedOffer(e.target.value)}
              className="w-full p-3 border rounded-lg"
              dir="rtl"
            >
              <option value="">ללא מבצע</option>
              {Object.entries(SPECIAL_OFFERS).map(([key, offer]) => (
                <option key={key} value={key}>
                  {offer.name}
                </option>
              ))}
            </select>
            {selectedOffer && (
              <div className="mt-2 bg-blue-50 p-3 rounded-lg">
                <ul className="text-sm space-y-1">
                  {SPECIAL_OFFERS[selectedOffer].features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Tag className="w-4 h-4 ml-2 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* אפשרות תשלום */}
          <div>
            <label className="block text-sm font-medium mb-2">אפשרות תשלום</label>
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-full p-3 border rounded-lg"
              dir="rtl"
            >
              {Object.entries(PAYMENT_OPTIONS).map(([key, option]) => (
                <option key={key} value={key}>
                  {option.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              {PAYMENT_OPTIONS[selectedPayment].description}
            </p>
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
                  <ul className="text-sm space-y-1">
                    <li>• 10 נקודות על כל שבוע של אימון</li>
                    <li>• 40 נקודות על כל חודש פעיל</li>
                    <li>• 100 נקודות על חידוש מנוי</li>
                    <li>• 200 נקודות על המלצת חבר</li>
                  </ul>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* תצוגת חישוב */}
        {calculationDetails && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">סיכום הצעת מחיר</h3>
            
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

                {calculationDetails.freeMonths > 0 && (
                  <div className="flex justify-between mt-2">
                    <span>חודשים חינם:</span>
                    <span className="text-blue-600 font-bold">{calculationDetails.freeMonths}</span>
                  </div>
                )}

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
                  <span className="text-blue-600">{calculationDetails.monthlyPayment.toFixed(2)}₪</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 text-center">
                  (כ-{calculationDetails.perDayPrice}₪ ליום)
                </div>
              </div>

              {/* דמי ביטול */}
              {BASE_PLANS[selectedPlan].commitment && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">דמי ביטול בהתחייבות:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>4 חודשים ראשונים:</span>
                      <span>{calculationDetails.cancellationFees.firstPeriod.toFixed(0)}₪</span>
                    </div>
                    <div className="flex justify-between">
                      <span>חודשים 5-8:</span>
                      <span>{calculationDetails.cancellationFees.secondPeriod.toFixed(0)}₪</span>
                    </div>
                    <div className="flex justify-between">
                      <span>חודשים 9-12:</span>
                      <span>{calculationDetails.cancellationFees.thirdPeriod.toFixed(0)}₪</span>
                    </div>
                  </div>
                </div>
              )}

              {/* משפטי מכירה */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">משפטי מכירה מומלצים:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <span className="text-purple-500 ml-2">💰</span>
                    חיסכון של {calculationDetails.savings.toFixed(0)}₪ במבצע הזה!
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 ml-2">⭐</span>
                    פחות מ-{calculationDetails.perDayPrice}₪ ליום על הבריאות שלך
                  </li>
                  {calculationDetails.freeMonths > 0 && (
                    <li className="flex items-center">
                      <span className="text-purple-500 ml-2">🎁</span>
                      {calculationDetails.freeMonths} חודשים במתנה!
                    </li>
                  )}
                  {calculationDetails.registrationFee === 0 && (
                    <li className="flex items-center">
                      <span className="text-purple-500 ml-2">✨</span>
                      פטור מדמי רישום!
                    </li>
                  )}
                </ul>
              </div>

              {/* כפתור הדפסה */}
              <button
                onClick={() => window.print()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                <CreditCard className="w-5 h-5 inline ml-2" />
                הדפס הצעת מחיר
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;