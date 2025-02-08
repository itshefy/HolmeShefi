// src/data/profilingQuestions.js
export const PROFILING_QUESTIONS = {
  pain_points: [
    {
      id: "current_state",
      question: "מה הכי מפריע לך היום בהרגשה הכללית שלך?",
      options: [
        "חוסר אנרגיה",
        "עייפות מתמדת",
        "כאבי גב",
        "חוסר כושר",
        "עודף משקל"
      ],
      followUp: {
        "חוסר אנרגיה": "תאר לי איך זה משפיע על היום-יום שלך",
        "כאבי גב": "כמה זמן אתה סובל מזה?"
      }
    },
    {
      id: "motivation",
      question: "מה יגרום לך להרגיש שהצלחת?",
      options: [
        "לרדת במשקל",
        "להרגיש חזק יותר",
        "לישון טוב יותר",
        "להיראות טוב יותר",
        "להרגיש אנרגטי"
      ]
    }
  ],

  lifestyle: [
    {
      id: "schedule",
      question: "איך נראה היום שלך?",
      subQuestions: [
        "מתי אתה קם?",
        "באיזה שעות אתה עובד?",
        "מתי הכי נוח לך להתאמן?"
      ]
    },
    {
      id: "experience",
      question: "יש לך ניסיון קודם באימונים?",
      options: [
        "אף פעם לא התאמנתי",
        "התאמנתי בעבר",
        "מתאמן לפעמים",
        "מתאמן באופן קבוע"
      ]
    }
  ],

  preferences: [
    {
      id: "activity",
      question: "איזה סוג פעילות הכי מדבר אליך?",
      options: [
        "שחייה",
        "אימון כוח",
        "שיעורי סטודיו",
        "אימון משולב"
      ]
    }
  ],

  commitment: [
    {
      id: "investment",
      question: "כמה אתה מוכן להשקיע בבריאות שלך בחודש?",
      note: "לא לשאול ישירות - לבדוק דרך שאלות עקיפות על הוצאות אחרות"
    }
  ]
};