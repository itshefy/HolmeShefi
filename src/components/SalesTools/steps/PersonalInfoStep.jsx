// src/components/SalesTools/steps/PersonalInfoStep.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Info } from 'lucide-react';

const PersonalInfoStep = ({ profile, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="max-w-lg">
        <h3 className="text-xl font-bold mb-4">בוא/י נכיר אותך טוב יותר</h3>
        
        {/* בחירת מגדר */}
        <div className="mb-6">
          <label className="block text-lg font-bold mb-3">מגדר</label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'male', label: 'זכר', icon: '👨' },
              { id: 'female', label: 'נקבה', icon: '👩' }
            ].map(gender => (
              <motion.button
                key={gender.id}
                onClick={() => onUpdate('gender', gender.id)}
                className={`flex items-center justify-center p-4 border-2 rounded-lg ${
                  profile.gender === gender.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl mr-2">{gender.icon}</span>
                <span className="font-medium">{gender.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* שם */}
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2">
            {profile.gender === 'female' ? 'איך קוראים לך?' : 'איך קוראים לך?'}
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder={profile.gender === 'female' ? 'שם מלא' : 'שם מלא'}
          />
        </div>

        {/* סטטוס מיוחד */}
        <div className="space-y-3">
          <label className="block text-lg font-bold">סטטוס מיוחד</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
    { id: 'student', label: 'סטודנט/ית', icon: '🎓' },
    { id: 'soldier', label: 'חייל/ת בשירות סדיר', icon: '🪖' },
    { id: 'senior', label: 'אזרח/ית ותיק/ה', icon: '👴' }
].map(status => (
              <motion.label 
                key={status.id}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer ${
                  profile[status.id] 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <input
                  type="radio"
                  name="status"
                  checked={profile.status === status.id}
                  onChange={() => onUpdate('status', status.id)}
                  className="ml-3 mt-1"
                />
                <div>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{status.icon}</span>
                    <span className="font-medium">{status.label}</span>
                  </div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        {/* מידע לנשים */}
        {profile.gender === 'female' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-purple-50 p-4 rounded-lg"
          >
            <div className="flex items-start">
              <Info className="w-5 h-5 text-purple-500 mt-1 ml-2" />
              <div>
                <p className="font-medium text-purple-700">
                   חדר נשים עם מתקנים בהפרדה לפרטיות מלאה!
                </p>
                <p className="text-sm text-purple-600 mt-1">
                  שעות שחייה לנשים:
                  <br />• יום שלישי: 09:00-10:30
                  <br />• יום חמישי: 21:15-22:45
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoStep;