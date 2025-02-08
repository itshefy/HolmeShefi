// src/components/SalesTools/PriceCalculator.jsx
import React, { useState, useEffect } from 'react';

const BASE_PLANS = {
  regular: {
    name: "מנוי רגיל",
    basePrice: 393,
    months: 9,
    freeMonths: 3,
    registration: 199,
    description: "מנוי מלא לכל המתקנים והשיעורים"
  },
  morning: {
    name: "מנוי בוקר",
    basePrice: 349,
    months: 9,
    freeMonths: 3,
    registration: 199,
    description: "מנוי עד השעה 16:00",
    restrictions: "כניסה עד 16:00"
  },
  student: {
    name: "מנוי סטודנט",
    basePrice: 349,
    months: 9,
    freeMonths: 3,
    registration: 149,
    description: "לסטודנטים בהצגת תעודה",
    requirements: "בהצגת תעודת סטודנט בתוקף"
  },
  senior: {
    name: "מנוי גיל הזהב",
    basePrice: 312,
    months: 9,
    freeMonths: 3,
    registration: 99,
    description: "לגילאי 60 ומעלה",
    requirements: "בהצגת תעודת אזרח ותיק"
  }
};

const SPECIAL_OFFERS = {
  newYear: {
    name: "מבצע שנה חדשה",
    discount: 10,
    freeMonthsBonus: 1,
    description: "מבצע מיוחד לשנה החדשה"
  },
  summerSale: {
    name: "מבצע קיץ",
    discount: 15,
    registrationDiscount: 50,
    description: "כולל 50% הנחה על דמי רישום"
  },
  referral: {
    name: "חבר מביא חבר",
    discount: 5,
    freeMonthsBonus: 1,
    description: "הטבה מיוחדת למצטרפים בהמלצת חבר"
  }
};

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

const PriceCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState('regular');
  const [selectedOffer, setSelectedOffer] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('credit12');
  const [customDiscount, setCustomDiscount] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [calculation, setCalculation] = useState(null);
  const [registrationWaived, setRegistrationWaived] = useState(false);

  const calculatePrice = () => {
    const plan = BASE_PLANS[selectedPlan];
    const offer = SPECIAL_OFFERS[selectedOffer];
    const payment = PAYMENT_OPTIONS[selectedPayment];

    let baseMonthlyPrice = plan.basePrice;
    let totalMonths = plan.months;
    let freeMonths = plan.freeMonths;
    let registrationFee = registrationWaived ? 0 : plan.registration;
    let totalDiscount = 0;
    let savings = 0;

    // חישוב הנחות
    if (offer) {
      totalDiscount += offer.discount;
      freeMonths += offer.freeMonthsBonus || 0;
      if (offer.registrationDiscount) {
        registrationFee -= (registrationFee * offer.registrationDiscount) / 100;
      }
    }

    if (payment.discount) {
      totalDiscount += payment.discount;
    }

    totalDiscount += parseFloat(customDiscount) || 0;

    // חישוב מחיר סופי
    const discountedMonthlyPrice = baseMonthlyPrice * (1 - totalDiscount / 100);
    const totalPayment = (discountedMonthlyPrice * totalMonths) + registrationFee;
    
    // חישוב חיסכון
    const originalTotal = (baseMonthlyPrice * (totalMonths + freeMonths)) + plan.registration;
    savings = originalTotal - totalPayment;

    // חישוב תשלום חודשי
    const monthlyPayment = selectedPayment === 'full' ? 
      totalPayment : totalPayment / parseInt(selectedPayment.replace('credit', ''));

    return {
      originalPrice: baseMonthlyPrice,
      discountedPrice: discountedMonthlyPrice,
      totalPayment,
      monthlyPayment,
      totalMonths: totalMonths + freeMonths,
      freeMonths,
      savings,
      registrationFee,
      perDayPrice: (totalPayment / ((totalMonths + freeMonths) * 30)).toFixed(2)
    };
  };

  useEffect(() => {
    setCalculation(calculatePrice());
  }, [selectedPlan, selectedOffer, selectedPayment, customDiscount, registrationWaived]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">מחשבון הצעות מחיר</h2>
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
              {Object.entries(BASE_PLANS).map(([key, plan]) => (
                <option key={key} value={key}>
                  {plan.name} - {plan.basePrice}₪
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              {BASE_PLANS[selectedPlan].description}
            </p>
          </div>

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
                  {offer.name} - {offer.discount}% הנחה
                </option>
              ))}
            </select>
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
          </div>

          {showAdvanced && (
            <>
              {/* הנחה מותאמת */}
              <div>
                <label className="block text-sm font-medium mb-2">הנחה נוספת (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={customDiscount}
                  onChange={(e) => setCustomDiscount(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* ביטול דמי רישום */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={registrationWaived}
                  onChange={(e) => setRegistrationWaived(e.target.checked)}
                  className="ml-2"
                />
                <label className="text-sm">ביטול דמי רישום</label>
              </div>
            </>
          )}

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600 text-sm hover:underline"
          >
            {showAdvanced ? 'הסתר אפשרויות מתקדמות' : 'הצג אפשרויות מתקדמות'}
          </button>
        </div>

        {calculation && (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">סיכום הצעת מחיר</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>מחיר מקורי:</span>
                <span className="line-through">{calculation.originalPrice}₪</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>מחיר לחודש אחרי הנחות:</span>
                <span className="text-green-600">{calculation.discountedPrice.toFixed(2)}₪</span>
              </div>

              <div className="flex justify-between">
                <span>דמי רישום:</span>
                <span>{calculation.registrationFee}₪</span>
              </div>

              <div className="flex justify-between">
                <span>חודשים חינם:</span>
                <span>{calculation.freeMonths}</span>
              </div>

              <div className="flex justify-between">
                <span>סה"כ חיסכון:</span>
                <span className="text-green-600 font-bold">{calculation.savings.toFixed(2)}₪</span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>תשלום חודשי:</span>
                  <span className="text-blue-600">{calculation.monthlyPayment.toFixed(2)}₪</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  (כ-{calculation.perDayPrice}₪ ליום)
                </div>
              </div>

              <div className="bg-green-100 p-4 rounded-lg mt-4">
                <p className="font-bold">משפטי מכירה מומלצים:</p>
                <ul className="text-sm space-y-2 mt-2">
                  <li>• אתה חוסך {calculation.savings.toFixed(0)}₪ במבצע הזה!</li>
                  <li>• פחות מ-{calculation.perDayPrice}₪ ליום על הבריאות שלך</li>
                  <li>• כולל {calculation.freeMonths} חודשים מתנה</li>
                  {calculation.registrationFee === 0 && (
                    <li>• כולל פטור מדמי רישום!</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;