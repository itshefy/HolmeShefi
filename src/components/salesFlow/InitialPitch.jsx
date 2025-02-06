// src/components/SalesFlow/InitialPitch.jsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { INITIAL_PITCH } from '../../data/initialPitch';

const InitialPitch = ({ onNext }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600">
      <CardContent className="space-y-6 p-8 text-white">
        <div className="text-3xl font-bold mb-8 animate-fade-in">
          {INITIAL_PITCH.opener.impact}
        </div>

        <div className="space-y-4">
          {INITIAL_PITCH.mainBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 animate-slide-in">
              <span className="text-2xl">💪</span>
              <span className="text-xl">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 mt-8">
          {INITIAL_PITCH.socialProof.map((proof, index) => (
            <div key={index} className="text-lg opacity-90">
              ✨ {proof}
            </div>
          ))}
        </div>

        <div className="bg-red-500 p-4 rounded-lg mt-8 animate-pulse">
          <div className="text-xl font-bold">🔥 מבצע מיוחד - מוגבל בזמן!</div>
          <div className="text-lg mt-2">
            349₪ לחודש + 3 חודשים מתנה
          </div>
        </div>

        <Button 
          onClick={onNext}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 text-xl py-6 mt-8"
        >
          רוצה לשמוע עוד? 👋
        </Button>
      </CardContent>
    </Card>
  );
};

export default InitialPitch;