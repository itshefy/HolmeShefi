// src/components/SalesTools/config/profiles.js

export const CLIENT_PROFILE = {
    goals: {
        health: {
            text: "בריאות ואיכות חיים",
            subGoals: [
                "הורדת כאבים",
                "שיפור גמישות",
                "חיזוק הגב",
                "העלאת אנרגיה",
                "שיפור היציבה",
                "חיזוק שרירי הליבה",
                "יציבה נכונה",
                "שיפור סיבולת לב ריאה"
            ],
            recommendedPlans: ['regular', 'multiPass'],
            sellingPoints: [
                "התוכנית שלנו מותאמת אישית למטרות הבריאות שלך",
                "יש לנו צוות מקצועי שילווה אותך לאורך כל הדרך",
                "הציוד המתקדם ביותר לאימון בריא ובטוח"
            ],
            recommendedClasses: [
                "פילאטיס",
                "יוגה",
                "התעמלות בריאותית",
                "בונה עצם"
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
                "שיפור הקומפוזיציה",
                "פיתוח כוח",
                "שיפור ביצועים"
            ],
            recommendedPlans: ['multiPass', 'regular'],
            sellingPoints: [
                "מגוון רחב של ציוד לאימוני כוח",
                "שיעורי סטודיו ממוקדי חיטוב",
                "מאמנים מוסמכים לבניית שריר"
            ],
            recommendedClasses: [
                "BODY PUMP",
                "עיצוב דינאמי",
                "HIIT",
                "קיקבוקס"
            ]
        },
        weight_loss: {
            text: "ירידה במשקל",
            subGoals: [
                "הרזיה בריאה",
                "שריפת שומנים",
                "חיטוב והידוק",
                "שינוי הרכב גוף",
                "שיפור חילוף חומרים",
                "תזונה נכונה",
                "אורח חיים בריא",
                "העלאת מסת שריר רזה"
            ],
            recommendedPlans: ['regular', 'multiPass'],
            sellingPoints: [
                "תוכנית אימונים מותאמת אישית לירידה במשקל",
                "שילוב מנצח של אימוני כוח וקרדיו",
                "מעקב והדרכה צמודה לאורך כל הדרך"
            ],
            recommendedClasses: [
                "ספינינג",
                "אירובי",
                "HIIT",
                "עיצוב וחיטוב"
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
                "הפחתת חרדה",
                "מדיטציה",
                "שלווה נפשית"
            ],
            recommendedPlans: ['localNoCommitment', 'regular'],
            sellingPoints: [
                "מגוון שיעורי יוגה ופילאטיס",
                "סאונה להרגעה ושחרור",
                "אווירה נעימה ורגועה"
            ],
            recommendedClasses: [
                "יוגה",
                "מדיטציה",
                "פילאטיס",
                "BODY BALANCE"
            ]
        }
    },
    availability: {
        morning: {
            text: "בוקר (6:00-12:00)",
            activities: [
                "התעמלות בריאותית",
                "פילאטיס",
                "בונה עצם",
                "יוגה",
                "פלדנקרייז",
                "התעמלות במים"
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
                "התעמלות במים",
                "יוגה צהריים",
                "פילאטיס",
                "TRX מהיר",
                "אימון טאבטה",
                "הפסקת צהריים אקטיבית"
            ],
            recommendedPlans: ['regular', 'student'],
            benefits: [
                "הפסקה מרעננת באמצע היום",
                "אימונים קצרים ואפקטיביים",
                "זמן איכות לעצמך"
            ]
        },
        evening: {
            text: "ערב (16:00-23:00)",
            activities: [
                "עיצוב דינאמי",
                "ספינינג",
                "HIIT",
                "זומבה",
                "קיקבוקס",
                "יוגה אשטנגה"
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
            text: "מתחיל/ה לגמרי",
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
            text: "מתאמן/ת מנוסה",
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