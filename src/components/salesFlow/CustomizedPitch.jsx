// src/components/SalesFlow/CustomizedPitch.jsx
import React from 'react';

const getPersonalizedContent = (profile) => {
  const content = {
    goal: {
      health: {
        title: "בוא נשנה את החיים שלך לגמרי! 🚀",
        subtitle: "הבריאות שלך שווה הכל",
        benefits: [
          "תתעורר כל בוקר עם אנרגיות מטורפות 💪",
          "תרגיש 10 שנים צעיר יותר",
          "תראה שינוי דרמטי כבר תוך חודש"
        ],
        features: [
          "תוכנית אימונים אישית שתשנה לך את החיים",
          "ציוד חדשני שיקפיץ אותך קדימה",
          "צוות מקצועי שידחוף אותך להצלחה"
        ],
        facilities: [
          "בריכה מחוממת לשחייה בריאותית",
          "סאונה להורדת מתחים",
          "חדר כושר עם ציוד מתקדם"
        ]
      },
      shape: {
        title: "בוא נבנה לך גוף חדש! 💪",
        subtitle: "התוצאות שתמיד רצית",
        benefits: [
          "תראה תוצאות מטורפות תוך חודש",
          "תקבל ביטחון עצמי ברמות אחרות",
          "תיכנס לג'ינס שחיכה בארון"
        ],
        features: [
          "אזור משקולות ענק עם ציוד מתקדם",
          "שיעורי HIIT לשריפת שומן מטורפת",
          "תוכנית אימונים ממוקדת תוצאות"
        ],
        facilities: [
          "מתחם משקולות חופשיות ענק",
          "מכשירי קרדיו מתקדמים",
          "סטודיו לאימוני HIIT"
        ]
      },
      stress: {
        title: "הגיע הזמן לשחרר את כל הלחץ! 😌",
        subtitle: "המקום שלך להירגע ולהתחדש",
        benefits: [
          "תצא מכל אימון עם ראש נקי לגמרי",
          "תישן טוב יותר בלילה",
          "תרגיש יותר רגוע ומאוזן"
        ],
        features: [
          "סאונה וג'קוזי מפנקים אחרי אימון",
          "שיעורי יוגה להורדת מתחים",
          "בריכה מחוממת לשחרור מושלם"
        ],
        facilities: [
          "סאונה יבשה ורטובה",
          "ג'קוזי מפנק",
          "סטודיו שקט ליוגה ומדיטציה"
        ]
      },
      swimming: {
        title: "בוא נכבוש את הבריכה! 🏊‍♂️",
        subtitle: "חווית שחייה ברמה אחרת",
        benefits: [
          "בריכה חצי אולימפית ברמה הכי גבוהה",
          "מים קריסטליים בטמפרטורה מושלמת",
          "אימון שלם לכל הגוף בלי עומס"
        ],
        features: [
          "מסלולים ייעודיים לשחייה ספורטיבית",
          "בריכה מחוממת פתוחה כל השנה",
          "מציל מקצועי תמיד נוכח"
        ],
        facilities: [
          "בריכה חצי אולימפית באורך 25 מטר",
          "בריכה מחוממת כל השנה",
          "מלתחות מפנקות"
        ]
      }
    },
    schedule: {
      morning: {
        pitch: "🌅 תתחיל את היום בטורבו!",
        perks: [
          "חניה זמינה תמיד בבוקר",
          "מקלחת במועדון וישר לעבודה",
          "הכי טוב להצליח באימונים על הבוקר"
        ],
        services: [
          "שיעורי בוקר אנרגטיים",
          "ארוחת בוקר בריאה בקפיטריה",
          "התחלה מושלמת ליום"
        ]
      },
      evening: {
        pitch: "🌙 תסיים את היום בשיא!",
        perks: [
          "תפרוק את כל הלחץ של היום",
          "תעשה ריסט מושלם לגוף",
          "תלך הביתה עם אנרגיות חדשות"
        ],
        services: [
          "שיעורי ערב מגוונים",
          "אווירה אנרגטית",
          "חניה זמינה"
        ]
      },
      flexible: {
        pitch: "⚡ תתאמן מתי שבא לך!",
        perks: [
          "פתוח מ-6 בבוקר עד 23:00",
          "מגוון שיעורים לאורך כל היום",
          "תמיד תמצא זמן שמתאים לך"
        ],
        services: [
          "גמישות מלאה בשעות",
          "מגוון שיעורים",
          "צוות זמין תמיד"
        ]
      }
    }
  };

  return {
    goalContent: content.goal[profile.goal.id] || content.goal.health,
    scheduleContent: content.schedule[profile.schedule.id] || content.schedule.flexible
  };
};

const CustomizedPitch = ({ profile, onNext, onObjection }) => {
  const { goalContent, scheduleContent } = getPersonalizedContent(profile);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
          {goalContent.title}
        </h2>
        <p className="text-xl text-gray-600">
          {goalContent.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">למה זה מושלם בשבילך:</h3>
          {goalContent.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center mb-3 animate-slide-in" style={{ animationDelay: `${index * 200}ms` }}>
              <span className="text-2xl ml-3">🎯</span>
              <span className="text-lg">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">{scheduleContent.pitch}</h3>
          {scheduleContent.perks.map((perk, index) => (
            <div key={index} className="flex items-center mb-3 animate-slide-in" style={{ animationDelay: `${index * 200}ms` }}>
              <span className="text-2xl ml-3">✨</span>
              <span className="text-lg">{perk}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">מה מחכה לך אצלנו:</h3>
          {goalContent.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-3 animate-slide-in" style={{ animationDelay: `${index * 200}ms` }}>
              <span className="text-2xl ml-3">💪</span>
              <span className="text-lg">{feature}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">המתקנים שלנו:</h3>
          {goalContent.facilities.map((facility, index) => (
            <div key={index} className="flex items-center mb-3">
              <span className="text-2xl ml-3">🌟</span>
              <span className="text-lg">{facility}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl animate-pulse">
          <div className="text-xl font-bold mb-2">🔥 מבצע מיוחד!</div>
          <div className="text-lg mb-2">349₪ לחודש + 3 חודשים מתנה</div>
          <div className="text-red-600 font-medium">* המבצע נגמר היום - אי אפשר לדחות את זה יותר!</div>
        </div>
      </div>

      <div className="flex space-x-4 mt-8">
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl text-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
        >
          רוצה להתחיל! 🚀
        </button>
        
        <button
          onClick={onObjection}
          className="flex-1 border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl text-xl hover:bg-blue-50 transition-all"
        >
          יש לי עוד שאלות
        </button>
      </div>
    </div>
  );
};

export default CustomizedPitch;