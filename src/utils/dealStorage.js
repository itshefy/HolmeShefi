// src/utils/dealStorage.js

export const dealStorage = {
    saveDeal: (dealData) => {
        try {
            // נקרא את ההיסטוריה הקיימת
            const existingDeals = dealStorage.getDeals();
            // נוסיף את העסקה החדשה
            existingDeals.push({
                ...dealData,
                timestamp: new Date().toISOString()
            });
            // נשמור את המערך המעודכן
            const encryptedData = btoa(JSON.stringify(existingDeals));
            localStorage.setItem('deals_history', encryptedData);
        } catch (error) {
            console.error('Error saving deal:', error);
        }
    },

    getDeals: () => {
        try {
            const encryptedData = localStorage.getItem('deals_history');
            if (!encryptedData) return [];
            return JSON.parse(atob(encryptedData));
        } catch (error) {
            console.error('Error getting deals:', error);
            return [];
        }
    },

    clearDeals: () => {
        localStorage.removeItem('deals_history');
    }
};