// src/components/Navigation/PageNavigation.jsx
import React from 'react';

const steps = [
  {
    id: 'welcome',
    title: 'ברוכים הבאים להולמס פלייס',
    subtitle: 'בואו נמצא את המסלול המושלם בשבילך',
    ariaLabel: 'מסך פתיחה והיכרות'
  },
  {
    id: 'profile',
    title: 'בניית פרופיל אישי',
    subtitle: 'ספר לנו קצת על עצמך',
    ariaLabel: 'הזנת פרטים אישיים'
  },
  {
    id: 'goals',
    title: 'המטרות שלך',
    subtitle: 'מה אתה רוצה להשיג?',
    ariaLabel: 'בחירת מטרות אימון'
  },
  {
    id: 'schedule',
    title: 'זמני אימון',
    subtitle: 'מתי נוח לך להתאמן?',
    ariaLabel: 'בחירת זמני אימון מועדפים'
  },
  {
    id: 'summary',
    title: 'סיכום והצעה',
    subtitle: 'בוא נראה מה מתאים לך',
    ariaLabel: 'סיכום והצעת מחיר'
  }
];

const PageNavigation = ({ currentStep, onStepChange, isStepValid }) => {
  return (
    <nav className="mb-8 px-4" role="navigation" aria-label="ניווט בין שלבי ההרשמה">
      {/* כותרת עמוד */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800">
          {steps[currentStep].title}
        </h1>
        <p className="text-gray-600 mt-2">
          {steps[currentStep].subtitle}
        </p>
      </div>

      {/* סרגל התקדמות */}
      <div className="relative">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => isStepValid(index - 1) && onStepChange(index)}
              disabled={!isStepValid(index - 1)}
              className={`flex flex-col items-center relative z-10 ${
                index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              aria-current={index === currentStep ? 'step' : undefined}
              aria-label={step.ariaLabel}
            >
              {/* מספר שלב */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index < currentStep ? 'bg-green-500 text-white' :
                  index === currentStep ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>

              {/* שם השלב */}
              <div className={`absolute -bottom-6 whitespace-nowrap text-sm font-medium ${
                index <= currentStep ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.id}
              </div>
            </button>
          ))}

          {/* קו התקדמות */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
            <div 
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* כפתורי ניווט */}
      <div className="flex justify-between mt-12">
        <button
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            currentStep === 0 
              ? 'opacity-0 cursor-default' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          aria-label="חזור לשלב הקודם"
        >
          חזור
        </button>

        <button
          onClick={() => onStepChange(currentStep + 1)}
          disabled={!isStepValid(currentStep)}
          className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            isStepValid(currentStep)
              ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={
            currentStep === steps.length - 1 
              ? 'סיים את התהליך' 
              : 'המשך לשלב הבא'
          }
        >
          {currentStep === steps.length - 1 ? 'סיים' : 'המשך'}
        </button>
      </div>
    </nav>
  );
};

export default PageNavigation;