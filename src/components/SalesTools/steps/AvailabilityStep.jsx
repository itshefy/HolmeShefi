// src/components/SalesTools/steps/AvailabilityStep.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, Target } from 'lucide-react';
import { CLIENT_PROFILE } from '../config/profiles';

const AvailabilityStep = ({ profile, onUpdate }) => {
    const [activeTimeSlot, setActiveTimeSlot] = useState(null);

    const timeSlots = {
        morning: {
            icon: '🌅',
            title: 'בוקר (06:00-12:00)',
            activities: CLIENT_PROFILE.availability.morning.activities,
            benefits: CLIENT_PROFILE.availability.morning.benefits
        },
        noon: {
            icon: '☀️',
            title: 'צהריים (12:00-16:00)',
            activities: CLIENT_PROFILE.availability.noon.activities,
            benefits: CLIENT_PROFILE.availability.noon.benefits
        },
        evening: {
            icon: '🌙',
            title: 'ערב (16:00-23:00)',
            activities: CLIENT_PROFILE.availability.evening.activities,
            benefits: CLIENT_PROFILE.availability.evening.benefits
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6">
                {profile.gender === 'female' ? 'מתי נוח לך להתאמן?' : 'מתי נוח לך להתאמן?'}
            </h3>

            <div className="space-y-4">
                {Object.entries(timeSlots).map(([key, slot]) => (
                    <motion.div
                        key={key}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            profile.availability.includes(key)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200'
                        }`}
                        whileHover={{ scale: 1.01 }}
                    >
                        <label className="flex items-start cursor-pointer w-full">
                            <input
                                type="checkbox"
                                checked={profile.availability.includes(key)}
                                onChange={(e) => {
                                    const newAvailability = e.target.checked
                                        ? [...profile.availability, key]
                                        : profile.availability.filter(t => t !== key);
                                    onUpdate('availability', newAvailability);
                                    setActiveTimeSlot(e.target.checked ? key : null);
                                }}
                                className="mt-1 ml-3"
                            />
                            <div className="flex-grow">
                                <div className="flex items-center mb-2">
                                    <span className="text-2xl ml-2">{slot.icon}</span>
                                    <span className="font-bold text-lg">{slot.title}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {slot.activities.map((activity, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm"
                                        >
                                            {activity}
                                        </span>
                                    ))}
                                </div>

                                {profile.availability.includes(key) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3 pt-3 border-t border-blue-200"
                                    >
                                        <div className="text-blue-600 text-sm space-y-1">
                                            {slot.benefits.map((benefit, index) => (
                                                <div key={index} className="flex items-center">
                                                    <Check className="w-4 h-4 text-green-500 ml-2" />
                                                    {benefit}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </label>
                    </motion.div>
                ))}
            </div>

            {profile.availability.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-green-50 rounded-lg"
                >
                    <div className="font-bold mb-2">המלצות מותאמות לשעות שבחרת:</div>
                    <ul className="space-y-2">
                        {profile.availability.includes('morning') && (
                            <li className="flex items-center">
                                <Target className="w-4 h-4 text-green-500 ml-2" />
                                שעות הבוקר מושלמות להתחלת היום באנרגיה. המון מתאמנים מעידים שאימון בוקר משפר את כל היום!
                            </li>
                        )}
                        {profile.status === 'senior' && profile.availability.includes('morning') && (
                            <li className="flex items-center">
                                <Target className="w-4 h-4 text-green-500 ml-2" />
                                בשעות הבוקר יש שיעורים מותאמים במיוחד כמו בונה עצם, פלדנקרייז והתעמלות בריאותית
                            </li>
                        )}
                        {profile.gender === 'female' && (
                            <li className="flex items-center">
                                <Target className="w-4 h-4 text-purple-500 ml-2" />
                                שימי לב לשעות השחייה לנשים בימי שלישי 09:00-10:30 וחמישי 21:15-22:45
                            </li>
                        )}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default AvailabilityStep;