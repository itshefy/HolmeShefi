import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Calendar, Users, Target, Star,
    TrendingUp, Heart, Dumbbell, Flame,
    Sparkles, Check, Sun, Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLIENT_PROFILE } from '../config/profiles';

const SummaryStep = ({ profile, onUpdate }) => {
    const [dealStatus, setDealStatus] = useState(null);
    const [rejectionReason, setRejectionReason] = useState(null);
    const [monthlyPrice, setMonthlyPrice] = useState(0);
    const [savedDealData, setSavedDealData] = useState(null);

    // מערך ההמלצות המלא - ממויין לפי מטרות
    const goalRecommendations = useMemo(() => ({
        "חיזוק הגב": [
            { 
                activity: "שחייה",
                reason: "פעילות המחזקת את שרירי הגב באופן טבעי",
                icon: "🏊‍♂️",
                benefits: [
                    "פעילות ללא עומס על המפרקים",
                    "שיפור טווח תנועה",
                    "חיזוק שרירי הגב"
                ]
            },
            { 
                activity: "חדר כושר",
                reason: "מכשירים מקצועיים לחיזוק שרירי הגב",
                icon: "💪",
                benefits: [
                    "מכשירים מותאמים",
                    "חיזוק שרירי התמיכה",
                    "שיפור היציבה"
                ]
            }
        ],
        "הורדת כאבים": [
            { 
                activity: "שחייה",
                reason: "תנועה במים מקלה על העומס במפרקים",
                icon: "🏊‍♂️",
                benefits: [
                    "תנועה ללא עומס",
                    "שחרור שרירים",
                    "הקלה על כאבים"
                ]
            },
            { 
                activity: "חדר כושר",
                reason: "חיזוק מבוקר של קבוצות שרירים",
                icon: "💪",
                benefits: [
                    "חיזוק הדרגתי",
                    "מכשירים מותאמים",
                    "בניית כוח ויציבות"
                ]
            }
        ],
        "שיפור גמישות": [
            { 
                activity: "שחייה",
                reason: "תנועה במים לשיפור טווחי תנועה",
                icon: "🏊‍♂️",
                benefits: [
                    "תנועה בכל המישורים",
                    "שיפור טווח תנועה",
                    "גמישות מוגברת"
                ]
            },
            { 
                activity: "חדר כושר",
                reason: "מתיחות ותרגילים לשיפור גמישות",
                icon: "💪",
                benefits: [
                    "אזור מתיחות מרווח",
                    "ציוד עזר לגמישות",
                    "שיפור טווחי תנועה"
                ]
            }
        ],
        "חיטוב והידוק": [
            { 
                activity: "חדר כושר",
                reason: "מגוון מכשירים לעיצוב הגוף",
                icon: "💪",
                benefits: [
                    "מכשירי כוח מתקדמים",
                    "אזורי משקולות חופשיות",
                    "ציוד קרדיו מגוון"
                ]
            },
            { 
                activity: "שחייה",
                reason: "אימון גוף כולל להידוק ועיצוב",
                icon: "🏊‍♂️",
                benefits: [
                    "התנגדות המים",
                    "אימון גוף מלא",
                    "שריפת קלוריות"
                ]
            }
        ],
        "העלאת אנרגיה": [
            { 
                activity: "חדר כושר",
                reason: "אימוני כוח וקרדיו להעלאת המרץ",
                icon: "💪",
                benefits: [
                    "שיפור סיבולת",
                    "העלאת כושר",
                    "חיזוק כללי"
                ]
            },
            { 
                activity: "שחייה",
                reason: "פעילות אירובית מהנה",
                icon: "🏊‍♂️",
                benefits: [
                    "שיפור סיבולת לב-ריאה",
                    "אימון מהנה",
                    "רעננות"
                ]
            }
        ]
    }), []);

    // חישוב מחיר
    useEffect(() => {
        const basePrice = {
            student: 322,
            soldier: 211,
            senior: 312,
            regular: 393
        }[profile.status] || 393;
        
        setMonthlyPrice(basePrice);
    }, [profile.status]);

    const handleCloseDeal = async () => {
        const triggerConfetti = (options = {}) => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFA500', '#FF4500'],
                ...options
            });
        };

        triggerConfetti();
        
        setTimeout(() => {
            triggerConfetti({
                particleCount: 50,
                spread: 90,
                origin: { y: 0.7 }
            });
        }, 500);

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
            recommendedClasses: getRecommendedClasses(profile.subGoals)
        };

        setDealStatus('closed');
        setSavedDealData(dealData);
        localStorage.setItem('lastDeal', JSON.stringify(dealData));
    };

    const getRecommendedClasses = (goals) => {
        return goals
            .map(goal => (goalRecommendations[goal] || []))
            .flat()
            .map(r => r.activity)
            .filter((v, i, a) => a.indexOf(v) === i)
            .slice(0, 4);
    };

    const generateRejectionResponse = (reason) => {
        const genderSuffix = profile.gender === 'female' ? 'ה' : '';
        const dailyPrice = Math.round(monthlyPrice / 30);
        
        const responses = {
            price: {
                title: `${profile.name}, בוא${genderSuffix} נדבר על ההשקעה בבריאות שלך`,
                mainContent: [
                    `${dailyPrice}₪ ליום - פחות מארוחת בוקר בחוץ!`,
                    `גישה למתקנים מקצועיים ומגוונים`,
                    `בריכה מקורה ומחוממת`,
                    `חדר כושר מאובזר`
                ],
                comparison: [
                    {
                        title: 'חדר כושר רגיל',
                        price: `${Math.round(monthlyPrice * 1.3)}₪`,
                        note: 'לחודש, בלי בריכה'
                    },
                    {
                        title: 'בריכה בלבד',
                        price: `${Math.round(monthlyPrice * 1.1)}₪`,
                        note: 'לחודש, בלי חדר כושר'
                    },
                    {
                        title: 'המחיר שלנו',
                        price: `${monthlyPrice}₪`,
                        note: 'לחודש, הכל כלול!'
                    }
                ],
                savings: [
                    `חיסכון של ${Math.round(monthlyPrice * 0.3)}₪ לעומת מנוי נפרד`,
                    `${dailyPrice}₪ ליום לכל המתקנים`,
                    `כולל חדר כושר ובריכה`
                ]
            },
            time: {
                title: `${profile.name}, יש לנו שעות פעילות נוחות`,
                mainContent: [
                    `פתוח ${profile.availability.includes('morning') ? 'מ-6:00 בבוקר' : ''}${profile.availability.includes('evening') ? ' עד 23:00 בלילה' : ''}`,
                    `בריכה פעילה לאורך כל היום`,
                    `חדר כושר זמין בכל שעות הפעילות`,
                    profile.gender === 'female' ? 'שעות שחייה נפרדות לנשים' : 'שעות פעילות נוחות'
                ],
                schedule: {
                    morning: {
                        title: 'שעות הבוקר',
                        benefits: [
                            'פחות עומס במתקנים',
                            'חניה זמינה',
                            'אווירה רגועה'
                        ]
                    },
                    afternoon: {
                        title: 'שעות הצהריים',
                        benefits: [
                            'זמין אחרי העבודה',
                            'מתקנים מגוונים',
                            'אווירה נעימה'
                        ]
                    },
                    evening: {
                        title: 'שעות הערב',
                        benefits: [
                            'פתוח עד מאוחר',
                            'גמישות בזמנים',
                            'נגיש בסוף היום'
                        ]
                    }
                }
            },
            location: {
                title: `${profile.name}, המיקום נוח ונגיש`,
                mainContent: [
                    'חניה חינם וזמינה',
                    '3 דקות הליכה מהתחנה המרכזית',
                    'נגיש בתחבורה ציבורית',
                    profile.gender === 'female' ? 'סביבה בטוחה ומוארת' : 'סביבה נוחה ונגישה'
                ],
                facilities: [
                    '🅿️ חניה חינם',
                    '🚌 תחבורה ציבורית',
                    '🏊‍♂️ בריכה מקורה',
                    '💪 חדר כושר מאובזר'
                ]
            },
            think: {
                title: `${profile.name}, בוא${genderSuffix} נראה למה כדאי להתחיל`,
                mainContent: [
                    'מתקנים מקצועיים ומגוונים',
                    'בריכה מקורה ומחוממת',
                    'חדר כושר מאובזר היטב',
                    profile.gender === 'female' ? 'שעות שחייה נפרדות לנשים' : 'שעות פעילות נוחות'
                ],
                facilities: {
                    pool: [
                        'בריכה מקורה ומחוממת',
                        'מסלולי שחייה',
                        profile.gender === 'female' ? 'שעות נפרדות לנשים' : 'שעות פעילות נוחות'
                    ],
                    gym: [
                        'ציוד חדיש ומקצועי',
                        'מגוון מכשירים',
                        'אזורי אימון שונים'
                    ]
                }
            }
        };

        return responses[reason];
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
                            <SummaryHeader profile={profile} />
                            <RecommendedActivities 
                                profile={profile} 
                                recommendations={goalRecommendations} 
                            />
                            <FacilitiesSection 
                                profile={profile}
                            />
                            <PriceSection 
                                monthlyPrice={monthlyPrice} 
                                status={profile.status}
                            />
                            <ActionButtons 
                                onClose={handleCloseDeal}
                                onReject={setRejectionReason}
                            />
                        </div>
                    </div>
                </motion.div>
            ) : (
                <RejectionResponseCard 
                    reason={rejectionReason}
                    response={generateRejectionResponse(rejectionReason)}
                    onBack={() => setRejectionReason(null)}
                    profile={profile}
                />
            )}
        </AnimatePresence>
    );
};

// Sub-components
const SummaryHeader = ({ profile }) => {
    const genderSuffix = profile.gender === 'female' ? 'ה' : '';
    
    return (
        <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2 
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                whileHover={{ scale: 1.02 }}
            >
                {profile.name}, המתקנים שלנו מחכים לך! 🎯
            </motion.h2>
            <p className="text-gray-600">
                בחדר הכושר ובבריכה תמצא${genderSuffix} את כל מה שצריך למטרות שבחרת
            </p>
        </motion.div>
    );
};

const RecommendedActivities = ({ profile, recommendations }) => {
    const activities = recommendations[profile.subGoals[0]] || [];
    
    return (
        <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <h3 className="text-xl font-semibold mb-3">הפעילויות המומלצות במיוחד בשבילך:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activities.map((activity, idx) => (
                    <motion.div 
                        key={idx}
                        className="flex items-start space-x-3 rtl:space-x-reverse bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <span className="text-2xl">{activity.icon}</span>
                        <div>
                            <h4 className="font-medium text-blue-600">{activity.activity}</h4>
                            <p className="text-sm text-gray-600">{activity.reason}</p>
                            <ul className="mt-2 space-y-1">
                                {activity.benefits.map((benefit, bidx) => (
                                    <li key={bidx} className="text-xs text-gray-500 flex items-center gap-1">
                                        <Check className="w-3 h-3 text-green-500" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const FacilitiesSection = ({ profile }) => {
    const facilities = [
        {
            title: "חדר כושר",
            description: "ציוד מקצועי ומגוון",
            features: [
                "מכשירי כוח חדישים",
                "אזור משקולות חופשיות",
                "מכשירי קרדיו מתקדמים"
            ],
            icon: "💪"
        },
        {
            title: "בריכה מקורה",
            description: "בריכה מחוממת לאורך כל השנה",
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
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const PriceSection = ({ monthlyPrice, status }) => {
    const dailyPrice = Math.round(monthlyPrice / 30);
    
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
                <h3 className="text-xl mb-2">המסלול המומלץ עבורך</h3>
                <motion.div 
                    className="text-4xl font-bold mb-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ₪{monthlyPrice}/חודש
                </motion.div>
                <div className="text-lg opacity-90">
                    פחות מ-₪{dailyPrice} ליום! 🎯
                </div>
                
                {status === 'student' && (
                    <div className="mt-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-block">
                        מחיר מיוחד לסטודנטים
                    </div>
                )}
                {status === 'soldier' && (
                    <div className="mt-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-block">
                        מחיר מיוחד לחיילים
                    </div>
                )}
                {status === 'senior' && (
                    <div className="mt-2 text-sm bg-white/20 px-3 py-1 rounded-full inline-block">
                        מחיר מיוחד לגיל השלישי
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const ActionButtons = ({ onClose, onReject }) => {
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

const RejectionResponseCard = ({ reason, response, onBack, profile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
            <div className="p-6 space-y-6">
                <motion.h3 
                    className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {response.title}
                </motion.h3>

                <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="grid gap-3">
                        {response.mainContent.map((point, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Check className="text-green-500 flex-shrink-0" />
                                <span>{point}</span>
                            </motion.div>
                        ))}
                    </div>

                    {reason === 'price' && (
                        <motion.div 
                            className="mt-6 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {response.comparison.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg text-center"
                                        whileHover={{ scale: 1.02 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="text-lg font-semibold">{item.title}</div>
                                        <div className="text-2xl font-bold text-blue-600 my-2">{item.price}</div>
                                        <div className="text-sm text-gray-600">{item.note}</div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                                <h4 className="font-semibold text-yellow-800 mb-2">💡 שווה לדעת:</h4>
                                {response.savings.map((saving, idx) => (
                                    <div key={idx} className="text-yellow-700 text-sm mb-1">• {saving}</div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    <div className="flex gap-4 mt-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium"
                            onClick={onBack}
                        >
                            אני רוצה להצטרף!
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

export default SummaryStep;