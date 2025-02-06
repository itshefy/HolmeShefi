// src/components/SalesFlow/index.jsx
import React, { useState } from 'react';
import ProfilingQuestions from './ProfilingQuestions';
import CustomizedPitch from './CustomizedPitch';
import ObjectionHandler from './ObjectionHandler';
import ClosingStage from './ClosingStage';

const SalesFlow = () => {
  const [stage, setStage] = useState('initial');
  const [profile, setProfile] = useState({});

  const renderInitialPitch = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        בוא להיות בכושר! 💪
      </h1>
      
      <div className="space-y-6">
        <div className="text-xl flex items-center">
          <span className="text-2xl ml-3">🏊‍♂️</span>
          <span>בריכה חצי אולימפית מחוממת - תשחה כמו דולפין</span>
        </div>
        <div className="text-xl flex items-center">
          <span className="text-2xl ml-3">💪</span>
          <span>חדר כושר ענק עם ציוד מתקדם - תתאמן כמו מקצוען</span>
        </div>
        <div className="text-xl flex items-center">
          <span className="text-2xl ml-3">🎯</span>
          <span>מעל 100 שיעורים בשבוע - תמיד תמצא משהו שמתאים לך</span>
        </div>
        <div className="text-xl flex items-center">
          <span className="text-2xl ml-3">🧖‍♂️</span>
          <span>סאונה וג'קוזי מפנקים - תרגיש כמו בספא</span>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg">
        <div className="text-lg font-medium flex items-center mb-2">
          <span className="text-2xl ml-3">✨</span>
          <span>אלפי מתאמנים כבר שינו את החיים שלהם אצלנו</span>
        </div>
        <div className="text-lg font-medium flex items-center">
          <span className="text-2xl ml-3">🌟</span>
          <span>פתוח מ-6 בבוקר עד 23:00 - בלי תירוצים</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-100 to-red-50 p-6 rounded-lg mt-8 animate-pulse">
        <div className="text-xl font-bold flex items-center mb-2">
          <span className="text-2xl ml-3">🔥</span>
          <span>מבצע מטורף לזמן מוגבל!</span>
        </div>
        <div className="text-lg font-bold">349₪ לחודש + 3 חודשים מתנה</div>
        <div className="text-sm text-red-600 mt-2">* המבצע לזמן מוגבל</div>
      </div>

      <button 
        onClick={() => setStage('profiling')}
        className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg text-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
      >
        בוא נמצא את המסלול המושלם בשבילך! 🎯
      </button>
    </div>
  );

  const handleProfilingComplete = (answers) => {
    setProfile(answers);
    setStage('customized');
  };

  const renderContent = () => {
    switch(stage) {
      case 'initial':
        return renderInitialPitch();
      case 'profiling':
        return <ProfilingQuestions onComplete={handleProfilingComplete} />;
      case 'customized':
        return (
          <CustomizedPitch 
            profile={profile}
            onNext={() => setStage('closing')}
            onObjection={() => setStage('objections')}
          />
        );
      case 'objections':
        return (
          <ObjectionHandler 
            onClose={() => setStage('closing')}
          />
        );
      case 'closing':
        return (
          <ClosingStage 
            profile={profile}
            onComplete={() => setStage('completed')}
          />
        );
      default:
        return renderInitialPitch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default SalesFlow;