import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
    Clock, Calendar, Users, Target, Star,
    TrendingUp, Heart, Dumbbell, Flame,
    Sparkles, Check, Sun, Moon, Timer,
    Award, Gift, Zap, ArrowLeft, ArrowRight,
    DollarSign, MapPin, ThumbsUp, Shield,
    Smile, Percent, Package, Crown
} from 'lucide-react';
import { CLIENT_PROFILE } from '../config/profiles';

const SummaryStep = ({ profile = CLIENT_PROFILE.defaultProfile, onUpdate }) => {    // בדיקה שיש לנו פרופיל תקין
    if (!profile) {
        return <div>טוען...</div>;
    }
    const [dealStatus, setDealStatus] = useState(null);
    const [rejectionReason, setRejectionReason] = useState(null);
    const [monthlyPrice, setMonthlyPrice] = useState(0);
    const [savedDealData, setSavedDealData] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ minutes: 30, seconds: 0 });
    const [showDiscountBadge, setShowDiscountBadge] = useState(false);
    const [specialOffer, setSpecialOffer] = useState({
        active: false,
        discount: 0,
        expires: null
    });

    // טיימר יורד לFOMO
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.minutes === 0 && prev.seconds === 0) {
                    clearInterval(timer);
                    return prev;
                }
                if (prev.seconds === 0) {
                    return { minutes: prev.minutes - 1, seconds: 59 };
                }
                return { ...prev, seconds: prev.seconds - 1 };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // הצעה מיוחדת אחרי זמן מסוים
    useEffect(() => {
        const offerTimer = setTimeout(() => {
            if (!dealStatus && !rejectionReason) {
                setSpecialOffer({
                    active: true,
                    discount: 10,
                    expires: new Date(Date.now() + 10 * 60000) // 10 דקות
                });
            }
        }, 45000); // מופיע אחרי 45 שניות

        return () => clearInterval(offerTimer);
    }, [dealStatus, rejectionReason]);

    // אפקט הבהוב להצעה המיוחדת
    useEffect(() => {
        if (specialOffer.active) {
            const blinkInterval = setInterval(() => {
                setShowDiscountBadge(prev => !prev);
            }, 1000);

            return () => clearInterval(blinkInterval);
        }
    }, [specialOffer.active]);

    // מערך הטקסטים המכירתיים המלא
    const salesTexts = useMemo(() => ({
        student: {
            mainPitch: "השקעה מושלמת בעתיד שלך!",
            subPitch: "מחיר סטודנטיאלי מיוחד שמתאים לכל כיס",
            benefits: [
                "גמישות מקסימלית בזמני האימונים",
                "אפשרות להקפאה בתקופת מבחנים",
                "מסלול מותאם לסטודנטים עם לו\"ז עמוס",
                "חיסכון משמעותי לעומת מנוי רגיל"
            ],
            fomo: [
                "מספר המקומות במחיר סטודנט מוגבל!",
                "הטבה מיוחדת לסמסטר הקרוב",
                "97% מהסטודנטים מרוצים מהבחירה"
            ]
        },
        soldier: {
            mainPitch: "מגיע לך הכי טוב!",
            subPitch: "מחיר מיוחד לחיילים בשירות סדיר",
            benefits: [
                "גמישות מלאה בהגעה לאימונים",
                "התחשבות באילוצי שירות",
                "אפשרות להקפאת מנוי",
                "הנחה משמעותית במחיר"
            ],
            fomo: [
                "הצעה מיוחדת לחיילים בלבד!",
                "כולל הטבות ייחודיות",
                "מצטרפים עכשיו ונהנים מהמחיר המיוחד"
            ]
        },
        senior: {
            mainPitch: "איכות חיים בכל גיל!",
            subPitch: "תוכנית מותאמת במיוחד לגיל השלישי",
            benefits: [
                "מגוון פעילויות מותאמות",
                "יחס אישי ומקצועי",
                "מחיר מיוחד לגיל השלישי",
                "סביבה נעימה ותומכת"
            ],
            fomo: [
                "הצטרפו לקהילה המובילה",
                "תוכנית ייחודית לגיל השלישי",
                "המקומות מוגבלים!"
            ]
        },
        regular: {
            mainPitch: "הזמן שלך להצלחה!",
            subPitch: "השקעה שמשתלמת בכל יום מחדש",
            benefits: [
                "גישה מלאה לכל המתקנים",
                "מגוון רחב של פעילויות",
                "שעות פעילות נרחבות",
                "ציוד מקצועי ומתקדם"
            ],
            fomo: [
                "המחיר המיוחד בתוקף לזמן מוגבל",
                "נשארו מקומות אחרונים במחיר הזה",
                "98% מהמצטרפים ממליצים"
            ]
        }
    }), []);

    // טקסטים מותאמים אישית לפי מטרות
    const goalSpecificTexts = useMemo(() => ({
        "חיזוק הגב": {
            equipmentHighlight: "מכשירים מתקדמים לחיזוק שרירי הגב",
            mainBenefit: "שיפור היציבה והקלה על כאבים",
            expertTip: "שילוב של שחייה ותרגילים מותאמים",
            timelineText: "שיפור משמעותי תוך 4-6 שבועות",
            successStory: {
                name: "דני",
                text: "הכאבים נעלמו כמעט לגמרי אחרי חודשיים",
                achievement: "חיזוק משמעותי של שרירי הגב"
            }
        },
        "הורדת משקל": {
            equipmentHighlight: "ציוד קרדיו מתקדם ומגוון",
            mainBenefit: "שריפת קלוריות מוגברת",
            expertTip: "שילוב אימוני כוח וקרדיו",
            timelineText: "תוצאות נראות לעין תוך 3-4 שבועות",
            successStory: {
                name: "מיכל",
                text: "ירדתי 12 קילו בשלושה חודשים",
                achievement: "שינוי באורח החיים"
            }
        },
        "חיטוב והידוק": {
            equipmentHighlight: "מכשירים לכל קבוצות השרירים",
            mainBenefit: "עיצוב וחיטוב הגוף",
            expertTip: "אימונים פונקציונליים משולבים",
            timelineText: "תוצאות נראות לעין תוך 4-8 שבועות",
            successStory: {
                name: "רונית",
                text: "הגוף שלי השתנה לחלוטין",
                achievement: "חיטוב והידוק משמעותי"
            }
        },
        "שיפור כושר": {
            equipmentHighlight: "מגוון ציוד לאימוני סיבולת",
            mainBenefit: "העלאת הכושר הגופני",
            expertTip: "אימונים מדורגים ומתקדמים",
            timelineText: "שיפור מורגש תוך 2-3 שבועות",
            successStory: {
                name: "אבי",
                text: "היום אני רץ 5 ק\"מ בקלות",
                achievement: "שיפור משמעותי בסיבולת"
            }
        }
    }), []);

    // מערך הטיפול בהתנגדויות
    const rejectionResponses = useMemo(() => {
        const genderSuffix = profile.gender === 'female' ? 'ה' : '';
        const dailyPrice = Math.round(monthlyPrice / 30);
        
        return {
            price: {
                title: `${profile.name}, בוא${genderSuffix} נדבר על ההשקעה שתשתלם לך`,
                mainPoints: [
                    {
                        title: `רק ${dailyPrice}₪ ליום!`,
                        description: "פחות ממנת פלאפל",
                        icon: "💰",
                        subPoints: [
                            "כולל גישה לכל המתקנים",
                            "ציוד מקצועי ללא הגבלה",
                            "שווה ערך ל-3 קפה ביום"
                        ]
                    },
                    {
                        title: "חיסכון משמעותי",
                        description: `${Math.round(monthlyPrice * 0.3)}₪ פחות ממנוי רגיל`,
                        icon: "🎯",
                        subPoints: [
                            "הנחה בלעדית למצטרפים היום",
                            "כולל כל השירותים והמתקנים",
                            "ללא עלויות נסתרות"
                        ]
                    },
                    {
                        title: "גמישות בתשלום",
                        description: "אפשרויות תשלום נוחות",
                        icon: "💳",
                        subPoints: [
                            "פריסה עד 12 תשלומים",
                            "ללא ריבית והצמדה",
                            "אפשרות לביטול בכל עת"
                        ]
                    }
                ],
                comparisons: [
                    {
                        title: "מנוי בחדר כושר רגיל",
                        price: `${Math.round(monthlyPrice * 1.3)}₪`,
                        limitations: [
                            "ללא בריכה",
                            "ציוד בסיסי",
                            "שעות מוגבלות"
                        ]
                    },
                    {
                        title: "בריכה בלבד",
                        price: `${Math.round(monthlyPrice * 1.2)}₪`,
                        limitations: [
                            "ללא חדר כושר",
                            "ללא מתקנים נוספים",
                            "שעות קבועות"
                        ]
                    },
                    {
                        title: "המחיר שלנו",
                        price: `${monthlyPrice}₪`,
                        benefits: [
                            "הכל כלול",
                            "ציוד מתקדם",
                            "גמישות מלאה"
                        ],
                        highlight: true
                    }
                ],
                urgencyMessages: [
                    {
                        text: `המחיר עולה בעוד ${timeLeft.minutes}:${String(timeLeft.seconds).padStart(2, '0')} דקות!`,
                        icon: "⏰",
                        emphasis: "high"
                    },
                    {
                        text: "נשארו רק 3 מקומות במחיר הזה",
                        icon: "🎯",
                        emphasis: "medium"
                    },
                    {
                        text: "97% מהנרשמים מרוצים מההחלטה",
                        icon: "⭐",
                        emphasis: "low"
                    }
                ],
                specialOffers: [
                    {
                        title: "הצטרפות היום",
                        benefit: "חודש ראשון בהנחה של 50%",
                        condition: "בתוקף לנרשמים היום בלבד"
                    },
                    {
                        title: "הבא חבר",
                        benefit: "שניכם מקבלים 20% הנחה",
                        condition: "מוגבל ל-10 הנרשמים הראשונים"
                    }
                ],
                valueProposition: [
                    {
                        title: "השקעה יומית",
                        amount: `${dailyPrice}₪`,
                        comparison: "פחות מארוחת בוקר בחוץ"
                    },
                    {
                        title: "חיסכון חודשי",
                        amount: `${Math.round(monthlyPrice * 0.3)}₪`,
                        comparison: "לעומת מנוי רגיל"
                    },
                    {
                        title: "חיסכון שנתי",
                        amount: `${Math.round(monthlyPrice * 0.3 * 12)}₪`,
                        comparison: "סכום משמעותי לחופשה"
                    }
                ]
            },
            time: {
                title: `${profile.name}, יש לנו בדיוק את הגמישות שחיפשת`,
                mainPoints: [
                    {
                        title: "שעות פעילות נרחבות",
                        description: "פתוח מ-6:00 עד 23:00",
                        icon: "⏰",
                        subPoints: [
                            "17 שעות פעילות ביום",
                            "פתוח גם בסופי שבוע",
                            "גמישות מקסימלית"
                        ]
                    },
                    {
                        title: "התאמה אישית",
                        description: "בחירת זמנים לפי הנוחות שלך",
                        icon: "📅",
                        subPoints: [
                            "אפשרות להגיע בכל שעה",
                            "ללא התחייבות לשעות קבועות",
                            "גמישות בימי האימון"
                        ]
                    },
                    {
                        title: profile.gender === 'female' ? "שעות נפרדות לנשים" : "זמינות גבוהה",
                        description: profile.gender === 'female' ? "שעות ייעודיות לנשים" : "מגוון שעות פעילות",
                        icon: profile.gender === 'female' ? "👥" : "✨",
                        subPoints: profile.gender === 'female' ? [
                            "שעות בוקר נפרדות",
                            "שעות ערב נפרדות",
                            "אווירה נעימה ותומכת"
                        ] : [
                            "פחות עומס בשעות מסוימות",
                            "זמינות גבוהה של מתקנים",
                            "אווירה נעימה תמיד"
                        ]
                    }
                ],
                scheduleBreakdown: {
                    morning: {
                        title: "יתרונות אימון בוקר",
                        hours: "6:00-12:00",
                        benefits: [
                            "פחות עומס במתקנים",
                            "אנרגיה ליום שלם",
                            "חניה זמינה תמיד",
                            "אווירה שקטה ונעימה"
                        ],
                        popularity: "מועדף על 40% מהמתאמנים"
                    },
                    afternoon: {
                        title: "יתרונות אימון צהריים",
                        hours: "12:00-17:00",
                        benefits: [
                            "הפסקת צהריים אנרגטית",
                            "פיזור עומסים נוח",
                            "שילוב מושלם ביום העבודה",
                            "זמינות גבוהה של מתקנים"
                        ],
                        popularity: "מועדף על 25% מהמתאמנים"
                    },
                    evening: {
                        title: "יתרונות אימון ערב",
                        hours: "17:00-23:00",
                        benefits: [
                            "סיום יום מושלם",
                            "מגוון שיעורים",
                            "אווירה אנרגטית",
                            "גמישות בשעות ההגעה"
                        ],
                        popularity: "מועדף על 35% מהמתאמנים"
                    }
                },
                flexibility: {
                    title: "גמישות מקסימלית",
                    mainFeatures: [
                        "הגעה בכל שעה שנוחה לך",
                        "ללא התחייבות לשעות קבועות",
                        "אפשרות להקפאת מנוי",
                        "התחשבות באילוצים אישיים"
                    ],
                    additionalPerks: [
                        "אפשרות להשלמת אימונים",
                        "גמישות בימי ההגעה",
                        "התאמה לשינויים בלו\"ז"
                    ]
                },
                urgencyMessages: [
                    {
                        text: "המחיר המיוחד בתוקף לזמן מוגבל",
                        icon: "⏰",
                        emphasis: "high"
                    },
                    {
                        text: "הבטיחו את המקום שלכם בשעות המבוקשות",
                        icon: "🎯",
                        emphasis: "medium"
                    },
                    {
                        text: "95% מצליחים להתמיד באימונים",
                        icon: "⭐",
                        emphasis: "low"
                    }
                ],
                testimonials: [
                    {
                        name: "יוסי",
                        age: 35,
                        text: "מתאמן בשעות הבוקר, מרגיש אנרגטי כל היום",
                        schedule: "6:00-7:30"
                    },
                    {
                        name: "מיכל",
                        age: 28,
                        text: "משלבת אימונים בהפסקת הצהריים",
                        schedule: "13:00-14:00"
                    },
                    {
                        name: "דני",
                        age: 42,
                        text: "מגיע אחרי העבודה, זמן איכות לעצמי",
                        schedule: "19:00-20:30"
                    }
                ]
            },
            location: {
                title: `${profile.name}, המיקום הרבה יותר נוח ממה שחשבת`,
                mainPoints: [
                    {
                        title: "נגישות מושלמת",
                        description: "הגעה קלה מכל מקום",
                        icon: "🚗",
                        subPoints: [
                            "חניה חינם וזמינה",
                            "תחבורה ציבורית נוחה",
                            "גישה נוחה מהכביש הראשי"
                        ]
                    },
                    {
                        title: "מיקום מרכזי",
                        description: "3 דקות מהתחנה המרכזית",
                        icon: "📍",
                        subPoints: [
                            "קרוב למרכזי קניות",
                            "מסעדות בסביבה",
                            "אזור פעיל ונגיש"
                        ]
                    },
                    {
                        title: profile.gender === 'female' ? "סביבה בטוחה" : "סביבה נוחה",
                        description: "אזור מואר ומטופח",
                        icon: "✨",
                        subPoints: [
                            "אבטחה 24/7",
                            "תאורה היקפית",
                            "סביבה נעימה"
                        ]
                    }
                ],
                transportation: {
                    car: {
                        title: "הגעה ברכב פרטי",
                        benefits: [
                            "חניה חינם לכל היום",
                            "כ-100 מקומות חניה",
                            "גישה ישירה למתחם",
                            "אבטחה בחניון"
                        ]
                    },
                    public: {
                        title: "תחבורה ציבורית",
                        benefits: [
                            "8 קווי אוטובוס ישירים",
                            "תחנת רכבת במרחק הליכה",
                            "תחנות אוטובוס צמודות",
                            "שירות תדיר כל היום"
                        ]
                    },
                    walking: {
                        title: "הגעה ברגל/אופניים",
                        benefits: [
                            "שבילי הליכה נוחים",
                            "חניית אופניים מאובטחת",
                            "תאורה לכל האורך",
                            "נגישות מכל הכיוונים"
                        ]
                    }
                },
                surroundings: {
                    title: "בסביבת המתחם",
                    amenities: [
                        {
                            type: "חניה",
                            details: "חניון מקורה ומאובטח",
                            availability: "24/7",
                            distance: "צמוד"
                        },
                        {
                            type: "קניות",
                            details: "מרכז קניות ומסעדות",
                            availability: "7:00-23:00",
                            distance: "2 דקות הליכה"
                        },
                        {
                            type: "תחבורה",
                            details: "תחנה מרכזית",
                            availability: "5:00-24:00",
                            distance: "3 דקות הליכה"
                        }
                    ]
                },
                urgencyMessages: [
                    {
                        text: "הצטרפו למאות המתאמנים מהאזור",
                        icon: "👥",
                        emphasis: "high"
                    },
                    {
                        text: "המחיר המיוחד לאזור שלך בתוקף לזמן מוגבל",
                        icon: "⏰",
                        emphasis: "medium"
                    },
                    {
                        text: "95% מרוצים מהמיקום",
                        icon: "⭐",
                        emphasis: "low"
                    }
                ],
                testimonials: [
                    {
                        name: "רונית",
                        area: "שכונה סמוכה",
                        text: "5 דקות הליכה והגעתי, מושלם!",
                        frequency: "מתאמנת 4 פעמים בשבוע"
                    },
                    {
                        name: "אבי",
                        area: "מרחק 10 דקות נסיעה",
                        text: "החניה החינם שווה זהב",
                        frequency: "מתאמן 3 פעמים בשבוע"
                    },
                    {
                        name: "דנה",
                        area: "מגיעה בתחבורה ציבורית",
                        text: "התחבורה הציבורית ממש נוחה",
                        frequency: "מתאמנת כל יום"
                    }
                ]
            },
            think: {
                title: `${profile.name}, בוא${genderSuffix} נראה למה זה הזמן המושלם`,
                mainPoints: [
                    {
                        title: "למה דווקא עכשיו?",
                        description: "הזדמנות שלא תחזור",
                        icon: "🎯",
                        subPoints: [
                            "מחיר השקה מיוחד",
                            "הטבות בלעדיות למצטרפים",
                            "תוצאות מהירות"
                        ]
                    },
                    {
                        title: "למה דווקא אצלנו?",
                        description: "יתרונות בולטים",
                        icon: "⭐",
                        subPoints: [
                            "ציוד מתקדם ומקצועי",
                            "מגוון רחב של פעילויות",
                            "אווירה תומכת ומקצועית"
                        ]
                    },
                    {
                        title: "מה מקבלים?",
                        description: "הכל במקום אחד",
                        icon: "🎁",
                        subPoints: [
                            "גישה לכל המתקנים",
                            "חניה חינם",
                            "גמישות מלאה"
                        ]
                    }
                ],
                statistics: [
                    {
                        title: "שביעות רצון",
                        value: "95%",
                        description: "מהמתאמנים מרוצים",
                        icon: "😊"
                    },
                    {
                        title: "התמדה",
                        value: "87%",
                        description: "ממשיכים מעבר לחודש הראשון",
                        icon: "💪"
                    },
                    {
                        title: "תוצאות",
                        value: "92%",
                        description: "רואים תוצאות תוך חודש",
                        icon: "🎯"
                    }
                ],
                successStories: [
                    {
                        name: "רונית",
                        age: 35,
                        before: "חששה להתחיל",
                        after: "היום לא מפספסת אף אימון",
                        quote: "ההחלטה הכי טובה שעשיתי",
                        timeframe: "מתאמנת כבר 6 חודשים"
                    },
                    {
                        name: "יוסי",
                        age: 42,
                        before: "דחה שוב ושוב",
                        after: "ירד 15 קילו",
                        quote: "חבל שלא התחלתי קודם",
                        timeframe: "מתאמן כבר שנה"
                    },
                    {
                        name: "מיכל",
                        age: 28,
                        before: "חיפשה מקום מתאים",
                        after: "מצאה בית שני",
                        quote: "האווירה פה מדהימה",
                        timeframe: "מתאמנת כבר 3 חודשים"
                    }
                ],
                guarantees: [
                    {
                        title: "הבטחת שביעות רצון",
                        description: "14 ימי התנסות",
                        icon: "✅"
                    },
                    {
                        title: "גמישות בביטול",
                        description: "ללא קנסות",
                        icon: "📝"
                    },{
                        title: "תמיכה מלאה",
                        description: "ליווי מקצועי",
                        icon: "🤝"
                    }
                ],
                urgencyMessages: [
                    {
                        text: `המחיר המיוחד פג תוקף בעוד ${timeLeft.minutes}:${String(timeLeft.seconds).padStart(2, '0')} דקות!`,
                        icon: "⏰",
                        emphasis: "high"
                    },
                    {
                        text: "נשארו רק 3 מקומות במחיר הזה",
                        icon: "🎯",
                        emphasis: "medium"
                    },
                    {
                        text: "המחיר יעלה ב-15% בשבוע הבא",
                        icon: "💰",
                        emphasis: "low"
                    }
                ],
                timeline: [
                    {
                        phase: "התחלה",
                        time: "מיד",
                        benefits: [
                            "גישה מלאה למתקנים",
                            "אווירה תומכת",
                            "תוכנית התחלתית"
                        ]
                    },
                    {
                        phase: "שבוע ראשון",
                        time: "7 ימים",
                        benefits: [
                            "הכרת כל המתקנים",
                            "בניית שגרת אימונים",
                            "תחושת התקדמות ראשונית"
                        ]
                    },
                    {
                        phase: "חודש ראשון",
                        time: "30 יום",
                        benefits: [
                            "שיפור בכושר",
                            "תוצאות ראשונות",
                            "הרגלים חדשים"
                        ]
                    }
                ]
            }
        };
    }, [profile.gender, monthlyPrice, timeLeft]);

    // חישוב המחיר ובדיקת זכאות להנחות
    useEffect(() => {
        const calculatePrice = () => {
            let basePrice = {
                student: 322,
                soldier: 211,
                senior: 312,
                regular: 393
            }[profile.status] || 393;

            // הנחות נוספות
            if (profile.referralCode) basePrice *= 0.9; // 10% הנחת חבר מביא חבר
            if (specialOffer.active) basePrice *= (1 - specialOffer.discount / 100);

            setMonthlyPrice(Math.round(basePrice));
        };

        calculatePrice();
    }, [profile.status, profile.referralCode, specialOffer]);

    const handleCloseDeal = () => {
        // שמירת פרטי העסקה
        const dealData = {
            name: profile.name,
            gender: profile.gender,
            status: profile.status,
            goals: profile.subGoals,
            price: monthlyPrice,
            dateTime: new Date().toISOString(),
            sectionCode: {
                student: '489',
                soldier: '842',
                senior: '894',
                regular: '721'
            }[profile.status] || '721',
            discounts: {
                hasReferral: !!profile.referralCode,
                specialOffer: specialOffer.active ? specialOffer.discount : 0
            }
        };

        setDealStatus('closed');
        setSavedDealData(dealData);
dealStorage.saveDeal(dealData);
        // אפקט ויזואלי לסגירת עסקה
        try {
            const confettiContainer = document.createElement('div');
            confettiContainer.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden';
            document.body.appendChild(confettiContainer);

            const colors = ['#FFD700', '#FFA500', '#FF4500', '#87CEEB', '#90EE90'];
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'absolute w-2 h-2 rounded-full';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = -10 + 'px';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
                confettiContainer.appendChild(confetti);
            }

            setTimeout(() => {
                document.body.removeChild(confettiContainer);
            }, 3000);
        } catch (error) {
            console.log('Visual effect not available');
        }
    };

    return (
        <AnimatePresence mode="wait">
            {!rejectionReason ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg rounded-xl">
                        <div className="p-6">
                            <SummaryHeader 
                                profile={profile} 
                                timeLeft={timeLeft}
                                salesTexts={salesTexts}
                            />
                            
                            <RecommendedClasses 
                                profile={profile}
                                goalTexts={goalSpecificTexts}
                            />

                            <FacilitiesSection 
                                profile={profile}
                                salesTexts={salesTexts}
                            />

                            <PriceSection 
                                monthlyPrice={monthlyPrice}
                                status={profile.status}
                                timeLeft={timeLeft}
                                specialOffer={specialOffer}
                                salesTexts={salesTexts}
                            />

                            <MembershipBenefits 
                                profile={profile}
                                salesTexts={salesTexts}
                            />
          
                            <ActionButtons 
                                onClose={handleCloseDeal}
                                onReject={setRejectionReason}
                                timeLeft={timeLeft}
                            />
                        </div>
                    </div>
                </motion.div>
            ) : (
                <RejectionResponseCard 
                    reason={rejectionReason}
                    response={rejectionResponses[rejectionReason]}
                    onBack={() => setRejectionReason(null)}
                    profile={profile}
                    timeLeft={timeLeft}
                    specialOffer={specialOffer}
                />
            )}
        </AnimatePresence>
    );
};

// קומפוננטות המשנה - כל אחת עם האנימציות והסטיילינג שלה
const SummaryHeader = ({ profile, timeLeft, salesTexts }) => {
    const genderSuffix = profile?.gender === 'female' ? 'ה' : '';
    const statusTexts = salesTexts?.[profile?.status] || salesTexts?.regular;
    
    if (!statusTexts) return null;  // הגנה מפני undefined

    return (
        <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2 
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                whileHover={{ scale: 1.02 }}
            >
                {profile.name}, {statusTexts.mainPitch} 🎯
            </motion.h2>
            
            <p className="text-gray-600 mb-2">
                {statusTexts.subPitch}
            </p>

            <motion.div 
                className="flex flex-wrap gap-2 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {statusTexts.benefits.map((benefit, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center gap-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                    >
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{benefit}</span>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div 
                className="mt-4 space-y-2"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {statusTexts.fomo.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="text-sm text-red-500 font-medium flex items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * idx }}
                    >
                        <Timer className="w-4 h-4" />
                        <span>{item}</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

const RecommendedClasses = ({ profile, goalTexts = {} }) => {
    // הוספת בדיקת הגנה וערכי ברירת מחדל
    const selectedGoal = profile?.subGoals?.[0] ? goalTexts[profile.subGoals[0]] : null;
    
    // אם אין מטרה נבחרת, נציג תצוגת ברירת מחדל
    if (!selectedGoal) {
        return (
            <motion.div 
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-xl font-semibold mb-4">
                    השיעורים המומלצים בשבילך:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                        className="bg-white rounded-lg shadow-sm p-4"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">💪</div>
                            <div>
                                <h4 className="font-medium text-blue-600">
                                    אימוני כושר מותאמים אישית
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    מגוון רחב של אימונים לכל רמה
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="bg-white rounded-lg shadow-sm p-4"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">🏊‍♂️</div>
                            <div>
                                <h4 className="font-medium text-blue-600">
                                    שחייה ופעילות במים
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    פעילות מהנה לכל הגילאים
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    // המשך הקוד המקורי רק אם יש מטרה נבחרת
    return (
        <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <h3 className="text-xl font-semibold mb-4">
                {selectedGoal.equipmentHighlight}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                    className="bg-white rounded-lg shadow-sm p-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">💪</div>
                        <div>
                            <h4 className="font-medium text-blue-600">
                                {selectedGoal.mainBenefit}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {selectedGoal.expertTip}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="bg-white rounded-lg shadow-sm p-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">⭐</div>
                        <div>
                            <h4 className="font-medium text-blue-600">
                                {selectedGoal.successStory?.name || 'סיפור הצלחה'}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                "{selectedGoal.successStory?.text || 'מתאמנים מספרים על תוצאות מדהימות'}"
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                                ✓ {selectedGoal.successStory?.achievement || 'שיפור משמעותי'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div 
                className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                whileHover={{ scale: 1.01 }}
            >
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <Clock className="w-5 h-5" />
                    <span>{selectedGoal.timelineText || 'תוצאות נראות תוך זמן קצר'}</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const FacilitiesSection = ({ profile, salesTexts }) => {
    const facilities = [
        {
            title: "חדר כושר",
            description: "ציוד חדיש ומקצועי",
            features: [
                "מכשירי כוח מתקדמים",
                "אזור משקולות חופשיות",
                "ציוד קרדיו מגוון"
            ],
            icon: "💪"
        },
        {
            title: "בריכה מקורה",
            description: "בריכה מחוממת כל השנה",
            features: [
                "מסלולי שחייה",
                "מים בטמפרטורה נעימה",
                profile.gender === 'female' ? "שעות נפרדות לנשים" : "שעות פעילות נוחות"
            ],
            icon: "🏊‍♂️"
        }
    ];

    return (
        <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <h3 className="text-xl font-semibold mb-3">המתקנים שלנו:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((facility, idx) => (
                    <motion.div 
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{facility.icon}</span>
                            <h4 className="font-medium">{facility.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{facility.description}</p>
                        <ul className="space-y-1">
                            {facility.features.map((feature, fidx) => (
                                <li key={fidx} className="text-xs text-gray-500 flex items-center gap-1">
                                    <Check className="w-3 h-3 text-green-500" />
                                    {feature}
                                </li>
                            ))}</ul>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const PriceSection = ({ monthlyPrice, status, timeLeft, specialOffer, salesTexts }) => {
    const dailyPrice = Math.round((monthlyPrice || 0) / 30);
    const statusText = salesTexts?.[status] || salesTexts?.regular;
    
    if (!statusText) return null;
    
    return (
        <motion.div 
            className="relative overflow-hidden text-center p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            
            <div className="relative z-10">
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3 className="text-xl mb-2">המסלול המומלץ עבורך</h3>
                    <div className="text-4xl font-bold mb-1">
                        ₪{monthlyPrice}/חודש
                    </div>
                    <div className="text-lg opacity-90">
                        פחות מ-₪{dailyPrice} ליום! 🎯
                    </div>
                </motion.div>

                <motion.div 
                    className="space-y-2 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {specialOffer.active && (
                        <motion.div
                            className="bg-red-500/30 px-4 py-2 rounded-lg"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="font-bold">מבצע מיוחד!</span>
                            <br />
                            <span className="text-sm">
                                {specialOffer.discount}% הנחה בהרשמה עכשיו
                            </span>
                        </motion.div>
                    )}

                    <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                        <Timer className="w-4 h-4 inline-block mr-1" />
                        המחיר בתוקף ל-{timeLeft.minutes}:{String(timeLeft.seconds).padStart(2, '0')} דקות!
                    </div>
                    
                    <div className="inline-block bg-red-400/30 px-3 py-1 rounded-full text-sm">
                        <Users className="w-4 h-4 inline-block mr-1" />
                        נשארו רק {Math.floor(Math.random() * 3) + 2} מקומות במחיר הזה!
                    </div>
                </motion.div>

                {status !== 'regular' && (
                    <motion.div
                        className="mt-4 space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {statusText.benefits.map((benefit, idx) => (
                            <div 
                                key={idx}
                                className="text-sm bg-white/20 px-3 py-1 rounded-full inline-block mx-1"
                            >
                                {benefit}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const RejectionResponseCard = ({ reason, response, onBack, profile, timeLeft, specialOffer }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
            <div className="p-6 space-y-6">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                        {response.title}
                    </h3>
                </motion.div>

                <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Main Content Points */}
                    <div className="grid gap-4">
                        {response.mainPoints.map((point, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{point.icon}</span>
                                    <div>
                                        <h4 className="font-medium text-blue-600">
                                            {point.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {point.description}
                                        </p>
                                        <ul className="mt-2 space-y-1">
                                            {point.subPoints.map((subPoint, sidx) => (
                                                <li 
                                                    key={sidx}
                                                    className="text-xs text-gray-500 flex items-center gap-1"
                                                >
                                                    <Check className="w-3 h-3 text-green-500" />
                                                    {subPoint}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Content Based on Rejection Reason */}
                    {reason === 'price' && (
                        <PriceRejectionContent 
                            response={response}
                            timeLeft={timeLeft}
                            specialOffer={specialOffer}
                        />
                    )}

                    {reason === 'time' && (
                        <TimeRejectionContent 
                            response={response}
                            profile={profile}
                        />
                    )}

                    {reason === 'location' && (
                        <LocationRejectionContent 
                            response={response}
                            profile={profile}
                        />
                    )}

                    {reason === 'think' && (
                        <ThinkingRejectionContent 
                            response={response}
                            timeLeft={timeLeft}
                        />
                    )}

                    {/* Urgency Messages */}
                    <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {response.urgencyMessages.map((message, idx) => (
                            <motion.div
                                key={idx}
                                className={`
                                    p-3 rounded-lg flex items-center gap-2
                                    ${message.emphasis === 'high' ? 'bg-red-50 text-red-700' :
                                      message.emphasis === 'medium' ? 'bg-orange-50 text-orange-700' :
                                      'bg-blue-50 text-blue-700'}
                                `}
                                animate={message.emphasis === 'high' ? {
                                    scale: [1, 1.02, 1]
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-xl">{message.icon}</span>
                                <span className="text-sm font-medium">{message.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium shadow-lg relative overflow-hidden"
                            onClick={onBack}
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-500/30"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <span>מעולה! אני רוצה להצטרף</span>
                                <Sparkles className="w-5 h-5" />
                            </span>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="py-3 px-6 bg-gray-100 text-gray-700 rounded-lg"
                            onClick={onBack}
                        >
                            חזרה
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// תת-קומפוננטות לטיפול בהתנגדויות ספציפיות
const PriceRejectionContent = ({ response, timeLeft, specialOffer }) => {
    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            {/* Price Comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {response.comparisons.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className={`
                            p-4 rounded-lg text-center relative overflow-hidden
                            ${item.highlight ? 
                                'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200' : 
                                'bg-white border border-gray-100'}
                        `}
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        {item.highlight && (
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
                                מומלץ!
                            </div>
                        )}
                        
                        <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                        <div className="text-2xl font-bold text-blue-600 mb-3">
                            {item.price}
                        </div>
                        
                        <div className="space-y-2">
                            {(item.highlight ? item.benefits : item.limitations).map((point, pidx) => (
                                <div 
                                    key={pidx}
                                    className="text-sm text-gray-600 flex items-center gap-1 justify-center"
                                >
                                    {item.highlight ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <motion.span>•</motion.span>
                                    )}
                                    {point}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">💡 שווה לדעת:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {response.valueProposition.map((value, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="text-sm text-gray-600">{value.title}</div>
                            <div className="text-xl font-bold text-blue-600 my-1">
                                {value.amount}
                            </div>
                            <div className="text-xs text-gray-500">{value.comparison}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Special Offers */}
            {specialOffer.active && (
                <motion.div
                    className="bg-red-50 border border-red-100 p-4 rounded-lg"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <h4 className="font-semibold text-red-800 mb-2">
                        🎁 הצעה מיוחדת!
                    </h4>
                    <div className="space-y-2">
                        {response.specialOffers.map((offer, idx) => (
                            <div key={idx} className="text-red-700 text-sm">
                                <div className="font-medium">{offer.title}</div>
                                <div>{offer.benefit}</div>
                                <div className="text-xs opacity-75">{offer.condition}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

const TimeRejectionContent = ({ response, profile }) => {
    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            {/* Schedule Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(response.scheduleBreakdown).map(([timeSlot, data], idx) => (
                    <motion.div
                        key={timeSlot}
                        className="bg-white p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            {timeSlot === 'morning' && <Sun className="w-5 h-5 text-orange-500" />}
                            {timeSlot === 'afternoon' && <Sun className="w-5 h-5 text-yellow-500" />}
                            {timeSlot === 'evening' && <Moon className="w-5 h-5 text-blue-500" />}
                            <h4 className="font-medium">{data.title}</h4>
                        </div>
                        
                        <div className="text-sm text-blue-600 mb-2">{data.hours}</div>
                        
                        <ul className="space-y-2">
                            {data.benefits.map((benefit, bidx) => (
                                <li 
                                    key={bidx}
                                    className="text-sm text-gray-600 flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4 text-green-500" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                        
                        <div className="mt-3 text-xs text-gray-500">
                            {data.popularity}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Flexibility Features */}
            <motion.div
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
            >
                <h4 className="font-semibold mb-3">{response.flexibility.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 className="text-sm font-medium mb-2">יתרונות עיקריים:</h5>
                        <ul className="space-y-2">
                            {response.flexibility.mainFeatures.map((feature, idx) => (
                                <li 
                                    key={idx}
                                    className="text-sm text-gray-600 flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-sm font-medium mb-2">הטבות נוספות:</h5>
                        <ul className="space-y-2">
                            {response.flexibility.additionalPerks.map((perk, idx) => (
                                <li 
                                    key={idx}
                                    className="text-sm text-gray-600 flex items-center gap-2"
                                >
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    {perk}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {response.testimonials.map((testimonial, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex gap-3 items-start">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                {testimonial.name[0]}
                            </div>
                            <div>
                                <h5 className="font-medium">{testimonial.name}</h5>
                                <div className="text-sm text-gray-500">{testimonial.age} שנים</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">"{testimonial.text}"</p>
                        <div className="mt-2 text-xs text-blue-600">{testimonial.schedule}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const LocationRejectionContent = ({ response, profile }) => {
    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            {/* Transportation Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(response.transportation).map(([type, data], idx) => (
                    <motion.div
                        key={type}
                        className="bg-white p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <h4 className="font-medium mb-3">{data.title}</h4>
                        <ul className="space-y-2">
                            {data.benefits.map((benefit, bidx) => (
                                <li 
                                    key={bidx}
                                    className="text-sm text-gray-600 flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4 text-green-500" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Surroundings */}
            <motion.div
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
            >
                <h4 className="font-semibold mb-3">{response.surroundings.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {response.surroundings.amenities.map((amenity, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white/50 p-3 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h5 className="font-medium text-sm">{amenity.type}</h5>
                            <p className="text-sm text-gray-600">{amenity.details}</p>
                            <div className="mt-2 flex justify-between text-xs">
                                <span className="text-blue-600">{amenity.availability}</span>
                                <span className="text-gray-500">{amenity.distance}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {response.testimonials.map((testimonial, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex gap-3 items-start">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                {testimonial.name[0]}
                            </div>
                            <div>
                                <h5 className="font-medium">{testimonial.name}</h5>
                                <div className="text-sm text-gray-500">{testimonial.area}</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">"{testimonial.text}"</p>
                        <div className="mt-2 text-xs text-blue-600">{testimonial.frequency}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const ThinkingRejectionContent = ({ response, timeLeft }) => {
    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {response.statistics.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg text-center"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.description}</div>
                    </motion.div>
                ))}
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {response.timeline.map((phase, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.01 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                {idx + 1}
                            </div>
                            <div>
                                <h5 className="font-medium">{phase.phase}</h5>
                                <div className="text-sm text-gray-500">{phase.time}</div>
                            </div>
                        </div>
                        <ul className="mt-3 space-y-2">
                            {phase.benefits.map((benefit, bidx) => (
                                <li 
                                    key={bidx}
                                    className="text-sm text-gray-600 flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4 text-green-500" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Success Stories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {response.successStories.map((story, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex gap-3 items-start">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                {story.name[0]}
                            </div>
                            <div>
                                <h5 className="font-medium">{story.name}, {story.age}</h5>
                                <div className="text-sm text-gray-500">{story.timeframe}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-2">
                            <div className="text-sm text-red-500">לפני: {story.before}</div>
                            <div className="text-sm text-green-500">אחרי: {story.after}</div>
                            <p className="text-sm text-gray-600 mt-2">"{story.quote}"</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {response.guarantees.map((guarantee, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="text-2xl mb-2">{guarantee.icon}</div>
                        <h5 className="font-medium">{guarantee.title}</h5>
                        <p className="text-sm text-gray-600">{guarantee.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Timeline Timer */}
            <motion.div
                className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-100"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="text-center">
                    <h4 className="text-red-800 font-semibold mb-2">⏰ חשוב לדעת!</h4>
                    <div className="text-red-700 text-lg font-medium">
                        ההצעה המיוחדת פגה בעוד:
                    </div>
                    <div className="text-3xl font-bold text-red-600 mt-1">
                        {timeLeft.minutes}:{String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Utility Components
const LoadingSpinner = () => (
    <motion.div
        className="flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <motion.div
            className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    </motion.div>
);

const ErrorMessage = ({ message }) => (
    <motion.div
        className="text-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="text-red-500 text-xl mb-2">😕 אופס!</div>
        <div className="text-gray-600">{message}</div>
    </motion.div>
);

// CSS Animations
const styles = `
    @keyframes fall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .gradient-text {
        background: linear-gradient(45deg, #4F46E5, #7C3AED, #EC4899);
        background-size: 200% 200%;
        animation: gradientShift 3s ease infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .shine-effect {
        position: relative;
        overflow: hidden;
    }

    .shine-effect::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
            to right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.3) 50%,
            rgba(255,255,255,0) 100%
        );
        transform: rotate(45deg);
        animation: shine 3s infinite;
    }

    @keyframes shine {
        0% { transform: translateX(-100%) rotate(45deg); }
        100% { transform: translateX(100%) rotate(45deg); }
    }

    .pulse-effect {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .float-effect {
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// יש להוסיף את הקומפוננטה הזו ממש לפני export default SummaryStep
const MembershipBenefits = ({ profile, salesTexts }) => {
    // אם אין פרופיל או טקסטים, החזר תצוגת ברירת מחדל
    if (!profile?.status || !salesTexts) {
        return (
            <motion.div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">הטבות חברות</h3>
                {/* תוכן ברירת מחדל */}
            </motion.div>
        );
    }    const statusText = salesTexts?.[profile?.status] || salesTexts?.regular;
    const genderSuffix = profile?.gender === 'female' ? 'ה' : '';
    
    if (!statusText) return null;
    
    const specialBenefits = {
        student: [
            { icon: "📚", text: "הטבות סטודנט", highlight: true },
            { icon: "⏰", text: "גמישות מלאה בשעות" },
            { icon: "💰", text: "מחיר מיוחד לסטודנטים" }
        ],
        soldier: [
            { icon: "🎖️", text: "הטבות לחיילים", highlight: true },
            { icon: "⚡", text: "גמישות בזמני האימון" },
            { icon: "💰", text: "מחיר מיוחד לחיילים" }
        ],
        senior: [
            { icon: "👑", text: "הטבות לגיל השלישי", highlight: true },
            { icon: "🌟", text: "שעות פעילות נוחות" },
            { icon: "💪", text: "מתקנים מותאמים" }
        ],
        regular: [
            { icon: "🎯", text: "גישה לכל המתקנים" },
            { icon: "⭐", text: "שעות פעילות נרחבות" },
            { icon: "💪", text: "מגוון אפשרויות אימון" }
        ]
    };

    return (
        <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    ההטבות המיוחדות שלך
                </h3>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {specialBenefits[profile.status].map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            className={`bg-white rounded-lg p-4 shadow-sm ${benefit.highlight ? 'border-2 border-blue-200' : ''}`}
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{benefit.icon}</span>
                                <span className="text-sm font-medium">{benefit.text}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Regular Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {statusText.benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white/60 rounded-lg p-3"
                            whileHover={{ scale: 1.01 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-sm">{benefit}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FOMO Messages */}
                <motion.div 
                    className="mt-6 space-y-2"
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {statusText.fomo.map((message, idx) => (
                        <motion.div
                            key={idx}
                            className="text-sm text-red-500 flex items-center gap-2 bg-white/40 p-2 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                            <Timer className="w-4 h-4" />
                            <span>{message}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Special Status Message */}
                {profile.status !== 'regular' && (
                    <motion.div
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm">
                            {profile.status === 'student' && '🎓 מחיר מיוחד לסטודנטים'}
                            {profile.status === 'soldier' && '🎖️ מחיר מיוחד לחיילים'}
                            {profile.status === 'senior' && '👑 מחיר מיוחד לגיל השלישי'}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const ActionButtons = ({ onClose, onReject, timeLeft }) => {
    return (
        <div className="space-y-4">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium shadow-lg group relative overflow-hidden"
                onClick={onClose}
            >
                <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-500/30"
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>מעולה! אני רוצה להצטרף</span>
                    <Sparkles className="w-5 h-5" />
                </span>
            </motion.button>
            
            <div className="grid grid-cols-2 gap-3">
                {[
                    { id: 'price', icon: '💰', text: 'המחיר גבוה' },
                    { id: 'time', icon: '⏰', text: 'הזמנים לא מתאימים' },
                    { id: 'location', icon: '📍', text: 'המיקום רחוק' },
                    { id: 'think', icon: '🤔', text: 'צריך/ה לחשוב' }
                ].map((reason) => (
                    <motion.button
                        key={reason.id}
                        whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                        whileTap={{ scale: 0.98 }}
                        className="py-3 px-4 bg-white rounded-lg text-gray-700 text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 border border-gray-100"
                        onClick={() => onReject(reason.id)}
                    >
                        <span>{reason.icon}</span>
                        <span>{reason.text}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default SummaryStep;