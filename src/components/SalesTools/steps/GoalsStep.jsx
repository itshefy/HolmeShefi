// src/components/SalesTools/steps/GoalsStep.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Check } from 'lucide-react';
import { CLIENT_PROFILE } from '../config/profiles';

const GoalsStep = ({ profile, onUpdate }) => {
    const [showSubGoals, setShowSubGoals] = useState(false);
    const [selectedGoalDetails, setSelectedGoalDetails] = useState(null);

    const handleGoalSelect = (key, goal) => {
        onUpdate('goal', key);
        setShowSubGoals(true);
        setSelectedGoalDetails(goal);
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-4">
                    {profile.gender === 'female' ? 'מה המטרה העיקרית שלך?' : 'מה המטרה העיקרית שלך?'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(CLIENT_PROFILE.goals).map(([key, goal]) => (
                        <motion.button
                            key={key}
                            onClick={() => handleGoalSelect(key, goal)}
                            className={`p-6 rounded-lg border-2 text-right transition-all ${
                                profile.goal === key 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center justify-between">
                                <Target className="w-6 h-6 text-blue-500" />
                                <div className="flex-grow text-right mr-4">
                                    <div className="font-bold text-lg mb-2">{goal.text}</div>
                                    <div className="text-sm text-gray-600">
                                        {goal.subGoals.slice(0, 2).join(', ')}...
                                    </div>
                                </div>
                            </div>
                            
                            {profile.goal === key && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-3 pt-3 border-t border-blue-200"
                                >
                                    <div className="text-sm text-blue-600">
                                        {goal.sellingPoints[0]}
                                    </div>
                                </motion.div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {showSubGoals && selectedGoalDetails && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                >
                    <h4 className="font-bold text-lg mb-4">
                        {profile.gender === 'female' ? 'בואי נדייק את המטרות שלך:' : 'בוא נדייק את המטרות שלך:'}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedGoalDetails.subGoals.map((subGoal) => (
                            <motion.label
                                key={subGoal}
                                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                                    profile.subGoals.includes(subGoal)
                                        ? 'bg-green-50 border-green-500'
                                        : 'hover:bg-gray-50'
                                }`}
                                whileHover={{ scale: 1.01 }}
                            >
                                <input
                                    type="checkbox"
                                    checked={profile.subGoals.includes(subGoal)}
                                    onChange={(e) => {
                                        const newSubGoals = e.target.checked
                                            ? [...profile.subGoals, subGoal]
                                            : profile.subGoals.filter(g => g !== subGoal);
                                        onUpdate('subGoals', newSubGoals);
                                    }}
                                    className="ml-3"
                                />
                                <span>{subGoal}</span>
                                {profile.subGoals.includes(subGoal) && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="mr-auto text-green-500"
                                    >
                                        <Check className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </motion.label>
                        ))}
                    </div>

                    {profile.subGoals.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 p-4 bg-blue-50 rounded-lg"
                        >
                            <div className="font-bold mb-2">
                                {profile.gender === 'female' ? 'מעולה! בחרת:' : 'מעולה! בחרת:'}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {profile.subGoals.map((goal) => (
                                    <span key={goal} className="bg-white px-3 py-1 rounded-full text-sm text-blue-600">
                                        {goal}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default GoalsStep;