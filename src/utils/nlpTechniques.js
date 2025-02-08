// src/utils/nlpTechniques.js
export const generateNLPResponse = (type, context) => {
  const techniques = {
    assumptive: {
      pattern: "מתי [אפשרות א] או [אפשרות ב]?",
      examples: [
        "מתי יותר נוח להתחיל - בוקר או ערב?",
        "איזה כרטיס - ויזה או מאסטרקארד?"
      ]
    },
    
    agreement: {
      pattern: "תסכים איתי ש[עובדה]...",
      examples: [
        "תסכים איתי שבריאות זה הדבר הכי חשוב?",
        "תסכים איתי שאי אפשר לדחות את זה יותר?"
      ]
    },

    socialProof: {
      pattern: "[מספר/כמות] אנשים כבר [פעולה]",
      examples: [
        "אלפי אנשים כבר בחרו בנו - הם לא יכולים לטעות",
        "90% מהמתאמנים שלנו מחדשים מנוי"
      ]
    },

    urgency: {
      pattern: "רק [זמן/כמות] נשאר",
      examples: [
        "המבצע נגמר היום בחצות",
        "נשארו רק 3 מקומות במחיר הזה"
      ]
    },

    futurePacing: {
      pattern: "תחשוב איך [תוצאה חיובית] בעוד [זמן]",
      examples: [
        "תחשוב איך תרגיש עוד חודש כשתהיה מלא באנרגיה",
        "תאר לעצמך איך תיראה בקיץ הקרוב"
      ]
    }
  };

  return techniques[type].examples[
    Math.floor(Math.random() * techniques[type].examples.length)
  ];
};