// src/components/SalesTools/steps/SummaryStep.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ThumbsUp, 
    ThumbsDown, 
    Award, 
    Check, 
    Info, 
    Clock, 
    Calendar, 
    Users,
    Target,
    Star,
    TrendingUp,
    Heart,
    Dumbbell
} from 'lucide-react';
import { CLIENT_PROFILE } from '../config/profiles';

const SummaryStep = ({ profile, onUpdate }) => {
    const [dealStatus, setDealStatus] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showRejectionResponse, setShowRejectionResponse] = useState(false);
    const [rejectionReason, setRejectionReason] = useState(null);
    const [monthlyPrice, setMonthlyPrice] = useState(0);
    const [savedDealData, setSavedDealData] = useState(null);

    const getRecommendedClasses = (goal, painPoints) => {
        const classRecommendations = {
            health: [
                { name: "שחייה", benefit: "פעילות ללא עומס על המפרקים, מצוינת להקלה על כאבים", forPain: true },
                { name: "התעמלות בריאותית", benefit: "מחזקת את הגוף בצורה מבוקרת ובטוחה" },
                { name: "פלדנקרייז", benefit: "משפרת יציבה ומקלה על כאבים כרוניים", forPain: true },
                { name: "יוגה", benefit: "לגמישות, יציבה ושלווה נפשית" }
            ],
            shape: [
                { name: "BODY PUMP", benefit: "לחיטוב ועיצוב הגוף המושלם" },
                { name: "HIIT", benefit: "לשריפת שומנים מקסימלית" },
                { name: "ספינינג", benefit: "לשיפור סיבולת וכושר" },
                { name: "עיצוב דינאמי", benefit: "לחיטוב והידוק כל הגוף" }
            ],
            stress: [
                { name: "יוגה", benefit: "לאיזון גוף ונפש" },
                { name: "פילאטיס", benefit: "לחיזוק ושליטה" },
                { name: "BODY BALANCE", benefit: "לשלווה פנימית" },
                { name: "מדיטציה", benefit: "להפחתת מתחים" }
            ],
            weight_loss: [
                { name: "HIIT", benefit: "לשריפת קלוריות מוגברת" },
                { name: "ספינינג", benefit: "לשריפת שומן אפקטיבית" },
                { name: "אירובי", benefit: "לבניית סיבולת" },
                { name: "עיצוב", benefit: "לחיטוב והידוק" }
            ]
        };

        const classes = classRecommendations[goal] || classRecommendations.health;
        if (painPoints) {
            return classes.filter(c => c.forPain).concat(classes.filter(c => !c.forPain));
        }
        return classes;
    };

    const generatePersonalizedPitch = () => {
        const genderSuffix = profile.gender === 'female' ? 'ה' : '';
        const goals = CLIENT_PROFILE.goals[profile.goal];
        const recommendedClasses = getRecommendedClasses(profile.goal, profile.painPoints);
        
        let classesText = recommendedClasses
            .map(c => `${c.name} (${c.benefit})`)
            .join(', ');

        return {
            opening: `${profile.name}, בנינו בשבילך תוכנית מדויקת שתעזור לך להשיג את כל המטרות שלך!`,
            personalizedIntro: profile.status === 'student' ? 
                `כסטודנט${genderSuffix}, בחרנו עבורך תוכנית שמשתלבת מושלם עם הלימודים במחיר סטודנטיאלי` :
                profile.status === 'soldier' ? 
                `כחייל${genderSuffix} בשירות סדיר, התאמנו לך מסלול גמיש במחיר מיוחד` :
                profile.status === 'senior' ? 
                `בנינו תוכנית מותאמת במיוחד לגיל השלישי, עם דגש על בריאות ואיכות חיים` :
                `התוכנית שלך מותאמת בדיוק למטרות ולזמנים שבחרת`,
            recommendedClasses: classesText,
            timeRecommendation: profile.availability.includes('morning') ?
                `שעות הבוקר מושלמות להתחלת היום באנרגיות, עם פחות עומס ויותר זמינות של מכשירים` :
                profile.availability.includes('evening') ?
                `בערב יש לנו את מגוון השיעורים הכי גדול - תוכל${genderSuffix} לבחור בדיוק מה שמתאים לך` :
                `בחרת שעות מצוינות שיאפשרו לך להתאמן בנוחות מקסימלית`,
            experienceLevel: profile.experience === 'beginner' ?
                `כמתחיל${genderSuffix}, תקבל${genderSuffix} ליווי צמוד מהצוות המקצועי שלנו. נלמד אותך את כל מה שצריך לדעת, צעד אחר צעד` :
                profile.experience === 'advanced' ?
                `כמתאמן${genderSuffix} מנוס${genderSuffix}, תוכל${genderSuffix} ליהנות מהציוד המתקדם ביותר ומשיעורים ברמה גבוהה` :
                `עם הניסיון שיש לך, תוכל${genderSuffix} להתקדם בקצב המתאים לך עם הצוות המקצועי שלנו`
        };
    };

    const generateRejectionResponse = (reason) => {
        const genderSuffix = profile.gender === 'female' ? 'ה' : '';
        
        const responses = {
            price: {
                title: `${profile.name}, בוא${genderSuffix} נחשוב על זה רגע יחד`,
                points: [
                    `פחות מ-${Math.round(monthlyPrice / 30)}₪ ליום - פחות ממנת פלאפל!`,
                    `כולל גישה חופשית ל-${profile.gender === 'female' ? '50+' : '40+'} שיעורים בשבוע`,
                    `צוות מקצועי שילווה אותך לאורך כל הדרך`,
                    profile.goal === 'health' ? 
                        'שיעורי שחייה, פלדנקרייז והתעמלות בריאותית ללא הגבלה' :
                    profile.goal === 'shape' ? 
                        'כל שיעורי העיצוב, HIIT וספינינג כלולים' :
                        'כל השיעורים והמתקנים כלולים במחיר'
                ],
                comparison: [
                    `במקום לבזבז על קפה ב-15₪ ליום, השקע${genderSuffix} בבריאות שלך`,
                    `חישבנו שעלות ממוצעת לשיעור יוצאת ${Math.round(monthlyPrice / 15)}₪ בלבד`,
                    `כולל שימוש חופשי בכל המתקנים והשיעורים`
                ],
                urgency: [
                    `המחיר הזה בתוקף רק היום`,
                    `נשארו 3 מקומות אחרונים במחיר הזה`,
                    profile.status ? 'מחיר מיוחד למעמד שלך שלא תמיד זמין' : 'מחיר השקה שעומד להסתיים'
                ]
            },
            time: {
                title: `${profile.name}, יש לנו פתרון מושלם בשבילך`,
                points: [
                    `פתוח מ-6:00 בבוקר עד 23:00 בלילה`,
                    `למעלה מ-50 שיעורים שונים בשבוע`,
                    profile.availability.includes('morning') ? 
                        'בשעות הבוקר התפוסה נמוכה במיוחד!' :
                        'שיעורי ערב מגוונים בכל השעות',
                    `אפשרות להקפיא מנוי בעת הצורך`
                ],
                customTimes: profile.availability.map(time => 
                    CLASS_SCHEDULE.timeSlots[time]?.activities || []
                ).flat(),
                urgency: [
                    `השבוע נפתחו שיעורים חדשים בדיוק בשעות שביקשת`,
                    `מספר המקומות בשיעורים מוגבל`,
                    `הרשמה היום מבטיחה את המקום שלך בשיעורים`
                ]
            },
            location: {
                title: `${profile.name}, חשבנו על הכל בשבילך`,
                points: [
                    `חניה חינם לכל המתאמנים`,
                    `ממש ליד תחנת האוטובוס`,
                    `רוב המתאמנים מגיעים תוך פחות מ-15 דקות`,
                    `אפשרות להקפיא מנוי בחודשי הקיץ/חגים`
                ],
                benefits: [
                    `מתקנים חדישים ומתקדמים`,
                    `צוות מקצועי זמין תמיד`,
                    `אווירה ביתית ונעימה`
                ],
                urgency: [
                    `המחיר המיוחד הזה רק לנרשמים היום`,
                    `שווה להתחיל כבר עכשיו ולא לחכות`,
                    `בחודש הבא המחירים עולים`
                ]
            },
            think: {
                title: `${profile.name}, הנה מה שהמתאמנים שלנו אומרים`,
                points: [
                    `92% מהמתאמנים אומרים שהם מצטערים שלא התחילו קודם`,
                    `88% רואים שיפור משמעותי תוך חודש`,
                    profile.goal === 'health' ? 
                        '95% מדווחים על שיפור בכאבים ובתנועתיות' :
                    profile.goal === 'shape' ? 
                        '90% רואים תוצאות תוך חודשיים' :
                        '93% מרגישים שיפור באיכות החיים',
                    `מעל 1,000 מתאמנים קבועים כבר נהנים`
                ],
                testimonials: [
                    `"התחלתי בדיוק כמוך - מהסס${genderSuffix}. היום אני לא מפספס${genderSuffix} אימון"`,
                    `"ההחלטה הכי טובה שעשיתי השנה"`,
                    `"הצוות המקצועי פשוט מדהים"`
                ],
                urgency: [
                    `המחיר המיוחד הזה הוא באמת רק להיום`,
                    `אפשר להתחיל כבר מחר`,
                    `למה לדחות את ההרגשה הטובה?`
                ]
            }
        };

        return responses[reason];
    };

    useEffect(() => {
        calculatePrice();
    }, [profile.status]);

    const calculatePrice = () => {
        const basePrice = profile.status === 'student' ? 322 : 
                         profile.status === 'soldier' ? 211 : 
                         profile.status === 'senior' ? 312 : 393;
        setMonthlyPrice(basePrice);
    };

    const handleCloseDeal = () => {
        const dealData = {
            name: profile.name,
            gender: profile.gender,
            status: profile.status,
            goals: profile.goal,
            subGoals: profile.subGoals,
            price: monthlyPrice,
            dateTime: new Date().toISOString(),
            recommendedClasses: getRecommendedClasses(profile.goal),
            sectionCode: profile.status === 'student' ? '489' : 
                        profile.status === 'soldier' ? '842' :
                        profile.status === 'senior' ? '894' : '721'
        };

        setSavedDealData(dealData);
        setDealStatus('closed');
        localStorage.setItem('lastDeal', JSON.stringify(dealData));
    };

    const handleRejection = (reason) => {
        setRejectionReason(reason);
        setShowRejectionResponse(true);
        onUpdate('rejectionReason', reason);
    };

    const pitch = generatePersonalizedPitch();

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl"
            >
                <h3 className="text-2xl font-bold text-blue-800 mb-4">{pitch.opening}</h3>
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                    >
                        <div className="flex items-start text-gray-700">
                            <Target className="w-5 h-5 ml-2 mt-1 text-blue-500 flex-shrink-0" />
                            <div>
                                <p className="font-medium mb-2">{pitch.personalizedIntro}</p>
                                <div className="text-sm space-y-2">
                                    <p>השיעורים המומלצים במיוחד בשבילך:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                        {getRecommendedClasses(profile.goal).map((classInfo, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-center bg-blue-50 p-2 rounded-lg"
                                            >
                                                <Check className="w-4 h-4 text-blue-500 ml-2 flex-shrink-0" />
                                                <div>
                                                    <span className="font-medium">{classInfo.name}</span>
                                                    <span className="text-sm text-gray-600"> - {classInfo.benefit}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                    >
                        <div className="flex items-start">
                            <Clock className="w-5 h-5 ml-2 mt-1 text-blue-500 flex-shrink-0" />
                            <div>
                                <p className="font-medium mb-2">{pitch.timeRecommendation}</p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {profile.availability.map((time, idx) => (
                                        <div key={idx} className="text-sm bg-green-50 p-2 rounded-lg">
                                            {CLIENT_PROFILE.availability[time].text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                    >
                        <div className="flex items-start">
                            <Dumbbell className="w-5 h-5 ml-2 mt-1 text-blue-500 flex-shrink-0" />
                            <div>
                                <p className="font-medium">{pitch.experienceLevel}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-bold">המסלול המומלץ עבורך</h4>
                    <Award className="w-6 h-6 text-yellow-500" />
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            className="space-y-2"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <div className="text-3xl font-bold text-blue-600">
                                {monthlyPrice}₪
                                <span className="text-lg text-gray-500 mr-2">לחודש</span>
                            </div>
                            <div className="text-sm text-green-600">
                                פחות מ-{Math.round(monthlyPrice / 30)}₪ ליום!
                            </div>
                            <motion.div 
                                className="inline-block bg-red-50 px-2 py-1 rounded-full text-xs text-red-600 font-bold"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                נותרו עוד 3 מקומות במחיר הזה!
                            </motion.div>
                        </motion.div>

                        <div className="space-y-2">
                            {profile.subGoals.map((goal, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center"
                                >
                                    <Check className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
                                    <span className="text-gray-700">{goal}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {profile.gender === 'female' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-purple-50 p-4 rounded-lg"
                        >
                            <div className="flex items-start">
                                <Heart className="w-5 h-5 text-purple-500 mt-1 ml-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-purple-700">
                                        חדר כושר לנשים בהפרדה וזמני שחייה מיוחדים
                                    </p>
                                    <p className="text-sm text-purple-600 mt-1">
                                        שעות שחייה לנשים: יום ג' 09:00-10:30, יום ה' 21:15-22:45
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-orange-50 p-4 rounded-lg"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <Star className="w-5 h-5 text-orange-500 ml-2" />
                                <p className="font-medium text-orange-700">
                                    הטבות למצטרפים
                                </p>
                            </div>
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="space-y-2 text-sm text-orange-600">
                            <p>• שאל/י את הנציג על הטבות מיוחדות למצטרפים חדשים!</p>
                            <p>• אפשרות להתנסות באימון אישי</p>
                            {profile.status && (
                                <p>• הטבות ייחודיות {
                                    profile.status === 'student' ? 'לסטודנטים' :
                                    profile.status === 'soldier' ? 'לחיילים' :
                                    'לגיל השלישי'
                                }</p>
                            )}
                        </div>
                    </motion.div>

                    <motion.div 
                        className="bg-red-50 p-4 rounded-lg"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <p className="text-center text-red-600 font-bold">
                            המחיר הזה בתוקף רק היום! מספר המקומות מוגבל
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {!dealStatus && !showRejectionResponse && (
                <div className="flex justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCloseDeal}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center"
                    >
                        <ThumbsUp className="w-5 h-5 ml-2" />
                        {profile.gender === 'female' ? 'סגרנו! בואי נתחיל' : 'סגרנו! בוא נתחיל'}
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFeedbackForm(true)}
                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold flex items-center"
                    >
                        <ThumbsDown className="w-5 h-5 ml-2" />
                        לא עכשיו
                    </motion.button>
                </div>
            )}

            <AnimatePresence>
                {showFeedbackForm && !showRejectionResponse && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-6 rounded-xl shadow-sm"
                    >
                        <h4 className="text-lg font-bold mb-4">
                            {profile.gender === 'female' ? 'מה מונע ממך להצטרף היום?' : 'מה מונע ממך להצטרף היום?'}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'price', text: 'המחיר גבוה מדי', icon: '💰' },
                                { id: 'time', text: 'הזמנים לא מתאימים', icon: '⏰' },
                                { id: 'location', text: 'המיקום רחוק', icon: '📍' },
                                { id: 'think', text: 'צריך/ה לחשוב על זה', icon: '🤔' }
                            ].map(reason => (
                                <motion.button
                                    key={reason.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 border rounded-lg text-right hover:bg-gray-50"
                                    onClick={() => handleRejection(reason.id)}
                                >
                                    <span className="text-2xl mr-2">{reason.icon}</span>
                                    {reason.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {showRejectionResponse && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-xl shadow-lg space-y-6"
                    >
                        {rejectionReason && (
                            <>
                                <motion.h3 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xl font-bold text-blue-800"
                                >
                                    {generateRejectionResponse(rejectionReason).title}
                                </motion.h3>

                                <div className="space-y-4">
                                    {generateRejectionResponse(rejectionReason).points.map((point, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <Check className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                                            <p className="text-gray-700">{point}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {rejectionReason === 'think' && (
                                    <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
                                        {generateRejectionResponse(rejectionReason).testimonials.map((testimonial, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 + idx * 0.1 }}
                                                className="text-blue-700 italic"
                                            >
                                                {testimonial}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                                    {generateRejectionResponse(rejectionReason).urgency.map((point, idx) => (
                                        <motion.p
                                            key={idx}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 + idx * 0.1 }}
                                            className="text-orange-700"
                                        >
                                            {point}
                                        </motion.p>
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCloseDeal}
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center"
                                    >
                                        <Star className="w-5 h-5 ml-2" />
                                        בוא/י נסגור את זה עכשיו במחיר המיוחד
                                    </motion.button>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {dealStatus === 'closed' && savedDealData && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-50 p-6 rounded-xl"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-green-800">מעולה! המסע שלך מתחיל!</h4>
                        <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                            <span className="font-medium">שם</span>
                            <span>{savedDealData.name}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                            <span className="font-medium">מסלול</span>
                            <span>{savedDealData.status || 'רגיל'}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                            <span className="font-medium">מחיר חודשי</span>
                            <span className="text-green-600 font-bold">{savedDealData.price}₪</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                            <span className="font-medium">קוד סעיף</span>
                            <span className="font-mono">{savedDealData.sectionCode}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                            <span className="font-medium">תאריך הצטרפות</span>
                            <span>{new Date(savedDealData.dateTime).toLocaleDateString('he-IL')}</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default SummaryStep;