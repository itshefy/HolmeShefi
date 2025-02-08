// src/utils/salesUtils.js
export const calculateClosingProbability = (profile) => {
  let score = 0;
  let insights = [];

  // ניקוד לפי כאב
  if (profile.painPoints.includes('health')) score += 30;
  if (profile.painPoints.includes('backPain')) score += 25;
  
  // ניקוד לפי זמינות
  if (profile.schedule === 'flexible') score += 20;
  if (profile.location === 'close') score += 15;

  // ניקוד לפי יכולת החלטה
  if (profile.decisionMaker === 'self') score += 25;

  return {
    score,
    probability: score > 70 ? 'גבוה' : score > 50 ? 'בינוני' : 'נמוך',
    insights: generateInsights(score, profile)
  };
};

export const generateClosingStrategy = (probability, profile) => {
  if (probability === 'גבוה') {
    return {
      approach: 'אגרסיבי',
      techniques: ['assumptive', 'urgency'],
      script: "בוא נסגור עכשיו ותתחיל כבר מחר"
    };
  }
  
  if (profile.objections.includes('price')) {
    return {
      approach: 'ערך',
      techniques: ['future_pacing', 'social_proof'],
      script: "בוא נדבר על ההשקעה בעצמך"
    };
  }

  return {
    approach: 'רך',
    techniques: ['agreement', 'future_pacing'],
    script: "אני רואה שאתה עדיין מתלבט"
  };
};

export const personalizePitch = (baseScript, profile) => {
  return baseScript
    .replace('[שם]', profile.name)
    .replace('[כאב]', profile.painPoints[0])
    .replace('[מטרה]', profile.goals[0]);
};