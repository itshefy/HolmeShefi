import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Save, 
    Share2, 
    ChevronRight, 
    ChevronLeft, 
    Info,
    Star,
    Flag,
    Diamond,
    Target,
    Dumbbell,
    Award,
    TrendingUp,
    Users,
    Check,
    Clock,
    Calendar,
    ThumbsUp,
    ThumbsDown,
    Activity,
    Medal
} from 'lucide-react';

import PersonalInfoStep from './steps/PersonalInfoStep';
import GoalsStep from './steps/GoalsStep';
import AvailabilityStep from './steps/AvailabilityStep';
import ExperienceStep from './steps/ExperienceStep';
import SummaryStep from './steps/SummaryStep';

const BASE_PLANS = {
    multiPass: {
        id: 'multiPass',
        name: "מנוי מולטי לכל הסניפים",
        basePrice: 484,
        registration: 399,
        cancellationFee: "legal",
        sectionCode: "710",
        features: [
            "כניסה לכל הסניפים",
            "תוכנית נאמנות מלאה",
            "אפשרות הקפאה",
            "גישה לכל המתקנים",
            "שעות פעילות מלאות"
        ],
        commitment: true,
        hasLoyalty: true,
        hasFreeze: true,
        isPremium: true,
        restrictions: [],
        requirements: [],
        description: "המסלול המקיף ביותר שלנו",
        marketingPoints: [
            "הגמישות המקסימלית - תתאמן בכל סניף שתרצה",
            "כל המתקנים והשירותים במחיר אחד",
            "חווית VIP מלאה"
        ]
    },

localNoCommitment: {
        id: 'localNoCommitment',
        name: "מנוי מקומי ללא התחייבות",
        basePrice: 454,
        registration: 299,
        cancellationFee: "none",
        sectionCode: "947",
        features: [
            "ללא התחייבות",
            "תוכנית נאמנות",
            "אפשרות הקפאה",
            "גמישות מקסימלית"
        ],
        commitment: false,
        hasLoyalty: true,
        hasFreeze: true,
        restrictions: [],
        requirements: [],
        description: "חופש מקסימלי - מנוי גמיש",
        marketingPoints: [
            "חופש מלא לבחור את משך המנוי",
            "גמישות בתנאים",
            "אפס התחייבות"
        ]
    },
    regular: {
        id: 'regular',
        name: "מנוי רגיל",
        basePrice: 393,
        registration: 299,
        cancellationFee: "legal",
        sectionCode: "721",
        features: [
            "תוכנית נאמנות מלאה",
            "אפשרות הקפאה",
            "גישה לכל המתקנים",
            "שעות פעילות מלאות"
        ],
        commitment: true,
        hasLoyalty: true,
        hasFreeze: true,
        marketingPoints: [
            "המסלול המושלם למתאמנים קבועים",
            "כל היתרונות במחיר משתלם",
            "גמישות מלאה בשעות האימון"
        ]
    }
};

const CLIENT_PROFILE = {
    goals: {
        health: {
            text: "בריאות ואיכות חיים",
            subGoals: [
                "הורדת כאבים",
                "שיפור גמישות",
                "חיזוק הגב",
                "העלאת אנרגיה",
                "שיפור היציבה"
            ],
            recommendedPlans: ['regular', 'multiPass'],
            sellingPoints: [
                "התוכנית שלנו מותאמת אישית למטרות הבריאות שלך",
                "יש לנו צוות מקצועי שילווה אותך",
                "הציוד המתקדם ביותר לאימון בריא"
            ]
        },
        shape: {
            text: "חיטוב וכוח",
            subGoals: [
                "חיטוב הבטן",
                "חיזוק שרירים",
                "העלאת מסת שריר",
                "הורדת אחוזי שומן",
                "עיצוב הגוף"
            ],
            recommendedPlans: ['multiPass', 'regular'],
            sellingPoints: [
                "מגוון רחב של ציוד לאימוני כוח",
                "שיעורי סטודיו ממוקדי חיטוב",
                "מאמנים מוסמכים לבניית שריר"
            ]
        }
    }
};

const ClosingGenerator = () => {
    const progressSteps = [
        { title: 'פרטים אישיים', icon: '👤', component: PersonalInfoStep },
        { title: 'מטרות', icon: '🎯', component: GoalsStep },
        { title: 'זמינות', icon: '⏰', component: AvailabilityStep },
        { title: 'ניסיון', icon: '💪', component: ExperienceStep },
        { title: 'סיכום', icon: '✨', component: SummaryStep }
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [profile, setProfile] = useState({
        name: '',
        gender: '',
        goal: '',
        subGoals: [],
        availability: [],
        experience: '',
        status: '',
        specificNeeds: '',
        healthConditions: false
    });

    const handleStepChange = (direction) => {
        setActiveStep(prev => Math.max(0, Math.min(4, prev + direction)));
    };

    const handleProfileUpdate = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isStepValid = (step) => {
        switch (step) {
            case 0:
                return profile.name.length > 0 && profile.gender;
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6" dir="rtl">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            מחולל משפטי סגירה
                            <Diamond className="w-6 h-6 text-yellow-500 inline ml-2" />
                        </h1>
                        <p className="text-gray-600">בניית הצעה מותאמת אישית למקסום הסגירה</p>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between relative">
                        {progressSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                className={`flex flex-col items-center ${
                                    index <= activeStep ? 'text-blue-600' : 'text-gray-400'
                                }`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl
                                    ${index < activeStep ? 'bg-blue-100' : 
                                    index === activeStep ? 'bg-blue-600 text-white' : 
                                    'bg-gray-100'}`}
                                >
                                    {step.icon}
                                </div>
                                <span className="mt-2 text-sm font-medium">{step.title}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[400px] bg-gray-50 rounded-xl p-6"
                    >
                        {React.createElement(progressSteps[activeStep].component, {
                            profile,
                            onUpdate: handleProfileUpdate
                        })}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => handleStepChange(-1)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                            activeStep === 0 ? 'invisible' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                        הקודם
                    </button>
                    <button
                        onClick={() => handleStepChange(1)}
                        disabled={!isStepValid(activeStep)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                            isStepValid(activeStep)
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        {activeStep === progressSteps.length - 1 ? 'סיים' : 'הבא'}
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-center text-sm text-gray-500 mt-8">
                    © {new Date().getFullYear()} Omri Shefi - כל הזכויות שמורות
                </div>
            </div>
        </div>
    );
};

export default ClosingGenerator;