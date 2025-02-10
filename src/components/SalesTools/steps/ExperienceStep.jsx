// src/components/SalesTools/steps/ExperienceStep.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Check, Medal, Star, Activity } from 'lucide-react';
import { CLIENT_PROFILE } from '../config/profiles';

const ExperienceStep = ({ profile, onUpdate }) => {
    const getIcon = (level) => {
        switch(level) {
            case 'beginner': return { icon: Star, color: 'text-yellow-500' };
            case 'intermediate': return { icon: Activity, color: 'text-blue-500' };
            case 'advanced': return { icon: Medal, color: 'text-purple-500' };
            default: return { icon: Dumbbell, color: 'text-gray-500' };
        }
    };

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-bold mb-6">
                {profile.gender === 'female' ? 'מה הניסיון שלך באימונים?' : 'מה הניסיון שלך באימונים?'}
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {Object.entries(CLIENT_PROFILE.experience).map(([key, exp]) => {
                    const { icon: IconComponent, color } = getIcon(key);
                    return (
                        <motion.button
                            key={key}
                            onClick={() => onUpdate('experience', key)}
                            className={`p-6 rounded-lg border-2 text-right transition-all ${
                                profile.experience === key
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex justify-between items-start">
                                <IconComponent className={`w-6 h-6 ${color}`} />
                                <div className="flex-grow text-right mr-4">
                                    <div className="font-bold text-lg mb-2">{exp.text}</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {exp.approach.map((approach, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <Check className="w-4 h-4 text-blue-500 ml-2" />
                                                {approach}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {profile.experience === key && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 pt-4 border-t border-blue-200"
                                >
                                    {/* השיעורים המומלצים */}
                                    <div className="mb-4">
                                        <div className="font-bold text-blue-600 mb-2">
                                            {profile.gender === 'female' ? 'שיעורים מומלצים עבורך:' : 'שיעורים מומלצים עבורך:'}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {CLIENT_PROFILE.availability[profile.availability[0] || 'morning'].activities
                                                .slice(0, 4)
                                                .map((className, idx) => (
                                                    <motion.span
                                                        key={idx}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200"
                                                    >
                                                        {className}
                                                    </motion.span>
                                                ))}
                                        </div>
                                    </div>

                                    {/* נקודות מכירה */}
                                    <div className="text-blue-600">
                                        {exp.sellingPoints.map((point, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className="flex items-center text-sm mb-1"
                                            >
                                                <Check className="w-4 h-4 text-green-500 ml-2" />
                                                {point}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* חיזוקים והמלצות */}
            {profile.experience && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-green-50 rounded-lg"
                >
                    <div className="flex items-start space-x-4">
                        <div>
                            <div className="font-bold mb-2">
                                {profile.gender === 'female' ? 'מעולה! בחרת את הרמה המתאימה לך' : 'מעולה! בחרת את הרמה המתאימה לך'}
                            </div>
                            <p className="text-gray-600">
                                {profile.experience === 'beginner' ? 
                                    'אל דאגה! הצוות המקצועי שלנו ילווה אותך צעד אחר צעד עד שתרגישי בטוחה לגמרי' :
                                    profile.experience === 'advanced' ?
                                    'נהדר! יש לנו מגוון שיעורים ברמה מתקדמת שיאתגרו אותך' :
                                    'מצוין! יש לנו בדיוק את השיעורים שיעזרו לך להתקדם לרמה הבאה'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ExperienceStep;