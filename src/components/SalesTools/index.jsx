// src/components/SalesTools/index.jsx
import React, { useState } from 'react';
import PriceCalculator from './PriceCalculator';
import ClosingGenerator from './ClosingGenerator';
import UrgencyTools from './UrgencyTools';
import ComparisonTools from './ComparisonTools';

const SalesDashboard = () => {

  const [activeTab, setActiveTab] = useState('calculator');

  const tabs = [
    { id: 'calculator', name: 'מחשבון מחירים', icon: '💰' },
    { id: 'closing', name: 'משפטי סגירה', icon: '🎯' },
    { id: 'urgency', name: 'כלי דחיפות', icon: '⏰' },
    { id: 'comparison', name: 'השוואת מתחרים', icon: '📊' }
  ];

  // רק פונקציה אחת render
  const renderActiveTab = () => {
    console.log("Rendering tab:", activeTab);
    switch (activeTab) {
      case 'calculator':
        return <PriceCalculator />;
      case 'closing':
        return <ClosingGenerator />;
      case 'urgency':
        return <UrgencyTools />;
      case 'comparison':
        return <ComparisonTools />;
      default:
        return <PriceCalculator />;
    }
  };
return (
    <div className="min-h-screen bg-gray-100 p-3" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* כותרת */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">כלי מכירות הולמס פלייס</h1>
            <p className="text-gray-600 text-sm">כל הכלים שצריך בשביל לסגור מכירה</p>
          </div>

          {/* טאבים */}
          <div className="flex overflow-x-auto mb-4 border-b tab-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 ml-4 text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <span className="text-lg ml-1">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {/* תוכן */}
          <div className="bg-gray-50 rounded-lg p-3">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;