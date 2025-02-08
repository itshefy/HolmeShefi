// src/components/SalesTools/ClosingGenerator.jsx
import React, { useState, useEffect } from 'react';

const CLIENT_PROFILE = {
  goals: {
    health: {
      text: "בריאות ואיכות חיים",
      subGoals: [
        "הורדת כאבים",
        "שיפור גמישות",
        "חיזוק הגב",
        "העלאת אנרגיה"
      ]
    },
    shape: {
      text: "חיטוב וכוח",
      subGoals: [
        "חיטוב הבטן",
        "חיזוק שרירים",
        "העלאת מסת שריר",
        "הורדת אחוזי שומן"
      ]
    },
    weight: {
      text: "ירידה במשקל",
      subGoals: [
        "הורדת משקל",
        "שינוי הרגלי אכילה",
        "שריפת שומנים",
        "עיצוב הגוף"
      ]
    },
    stress: {
      text: "הפגת מתחים",
      subGoals: [
        "שיפור איכות שינה",
        "הפחתת מתח",
        "איזון נפשי",
        "זמן לעצמי"
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
        "ספינינג בוקר"
      ]
    },
    noon: {
      text: "צהריים (12:00-16:00)",
      activities: [
        "הפסקת צהריים אקטיבית",
        "אימון מהיר וממוקד",
        "שחייה בצהריים",
        "יוגה צהריים"
      ]
    },
    evening: {
      text: "ערב (16:00-23:00)",
      activities: [
        "אימוני ערב אנרגטיים",
        "שיעורי סטודיו",
        "אימון כוח מתקדם",
        "שחייה ערב"
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
        "תמיכה מקצועית"
      ]
    },
    intermediate: {
      text: "יש קצת ניסיון",
      approach: [
        "שדרוג הטכניקה",
        "העלאת אינטנסיביות",
        "מגוון תרגילים",
        "אתגרים חדשים"
      ]
    },
    advanced: {
      text: "מתאמן מנוסה",
      approach: [
        "אימונים מתקדמים",
        "טכניקות מקצועיות",
        "אתגרים ברמה גבוהה",
        "תוכניות מותאמות"
      ]
    }
  }
};

const ClosingGenerator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [profile, setProfile] = useState({
    goal: '',
    subGoals: [],
    availability: [],
    experience: '',
    name: ''
  });
  const [generatedPitch, setGeneratedPitch] = useState(null);

  const generateCustomPitch = () => {
    const goalData = CLIENT_PROFILE.goals[profile.goal];
    const availData = profile.availability.map(time => CLIENT_PROFILE.availability[time]);
    const expData = CLIENT_PROFILE.experience[profile.experience];

    // בניית פיץ' מותאם אישית
    const pitch = {
      opening: `${profile.name}, בוא נראה איך אנחנו יכולים לעזור לך להשיג את המטרות שלך`,
      goals: `אני רואה שחשוב לך ${goalData.text.toLowerCase()}, ואצלנו תקבל בדיוק את מה שצריך:`,
      availability: `בשעות שנוחות לך יש לנו:`,
      experience: `בהתאם לניסיון שלך, אנחנו נתאים לך:`,
      closing: `בוא נסגור את זה עכשיו ותתחיל כבר מחר!`
    };

    setGeneratedPitch({
      ...pitch,
      goalPoints: profile.subGoals,
      availabilityPoints: availData.flatMap(d => d.activities),
      experiencePoints: expData.approach,
      pricing: {
        monthly: "349₪",
        registration: "פטור מדמי רישום",
        bonus: "3 חודשים מתנה"
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-6 rtl" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8">
          {['פרטים אישיים', 'מטרות', 'זמינות', 'ניסיון', 'סיכום'].map((step, index) => (
            <div 
              key={index}
              className={`flex-1 relative ${index < activeStep ? 'text-green-600' : index === activeStep ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  index < activeStep ? 'bg-green-600' : 
                  index === activeStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  {index + 1}
                </div>
                <div className="mr-2 text-sm font-medium">{step}</div>
              </div>
              {index < 4 && (
                <div className={`absolute top-4 w-full h-0.5 ${
                  index < activeStep ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* תוכן לפי שלב */}
        <div className="mt-8">
          {activeStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">ספר לי קצת על עצמך</h2>
              <input
                type="text"
                placeholder="איך קוראים לך?"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-4 border rounded-lg"
              />
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">מה המטרה העיקרית שלך?</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(CLIENT_PROFILE.goals).map(([key, goal]) => (
                  <button
                    key={key}
                    onClick={() => setProfile({...profile, goal: key})}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      profile.goal === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-bold mb-2">{goal.text}</div>
                    <div className="text-sm text-gray-600">
                      {goal.subGoals.join(', ')}
                    </div>
                  </button>
                ))}
              </div>
              {profile.goal && (
                <div className="mt-6">
                  <h3 className="font-bold mb-3">בחר יעדים ספציפיים:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CLIENT_PROFILE.goals[profile.goal].subGoals.map((subGoal) => (
                      <label key={subGoal} className="flex items-center p-2 border rounded hover:bg-gray-50">
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
                </div>
              )}
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">מתי נוח לך להתאמן?</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(CLIENT_PROFILE.availability).map(([key, timeSlot]) => (
                  <label
                    key={key}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      profile.availability.includes(key) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
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
                        <div className="font-bold">{timeSlot.text}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {timeSlot.activities.join(' • ')}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">מה הניסיון שלך באימונים?</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(CLIENT_PROFILE.experience).map(([key, exp]) => (
                  <button
                    key={key}
                    onClick={() => setProfile({...profile, experience: key})}
                    className={`p-4 rounded-lg border-2 text-right transition-all ${
                      profile.experience === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-bold mb-2">{exp.text}</div>
                    <div className="text-sm text-gray-600">
                      {exp.approach.join(' • ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">מעולה! בוא נסכם את הכל</h2>
              {generatedPitch ? (
                <div className="space-y-6 bg-blue-50 p-6 rounded-xl">
                  <p className="text-xl font-bold">{generatedPitch.opening}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold">{generatedPitch.goals}</p>
                      <ul className="mt-2 space-y-1">
                        {generatedPitch.goalPoints.map((point, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-blue-500 ml-2">✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold">{generatedPitch.availability}</p>
                      <ul className="mt-2 space-y-1">
                        {generatedPitch.availabilityPoints.map((point, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-blue-500 ml-2">✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold">{generatedPitch.experience}</p>
                      <ul className="mt-2 space-y-1">
                        {generatedPitch.experiencePoints.map((point, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-blue-500 ml-2">✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg mt-6">
                      <div className="text-xl font-bold text-center mb-4">מבצע מיוחד!</div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="font-bold text-blue-600">{generatedPitch.pricing.monthly}</div>
                          <div className="text-sm">לחודש בלבד</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-600">{generatedPitch.pricing.registration}</div>
                          <div className="text-sm">חיסכון מיידי</div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-600">{generatedPitch.pricing.bonus}</div>
                          <div className="text-sm">בונוס מיוחד</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg animate-pulse">
                      <p className="text-red-600 font-bold text-center">
                        המבצע בתוקף רק היום! בוא לא נפספס את ההזדמנות
                      </p>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => {/* פונקציית סגירה */}}
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all transform hover:scale-105"
                      >
                        מעולה, בוא נסגור את זה! 🚀
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => generateCustomPitch()}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg hover:bg-blue-700 transition-colors"
                >
                  הכן הצעה מותאמת אישית
                </button>
              )}
            </div>
          )}

          {/* כפתורי ניווט */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              className={`px-6 py-2 rounded-lg ${activeStep === 0 ? 'invisible' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              חזור
            </button>
            <button
              onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
              disabled={!isStepValid(activeStep, profile)}
              className={`px-6 py-2 rounded-lg ${
                isStepValid(activeStep, profile)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {activeStep === 4 ? 'סיים' : 'המשך'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// פונקציית עזר לבדיקת תקינות השלב
const isStepValid = (step, profile) => {
  switch (step) {
    case 0:
      return profile.name.length > 0;
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