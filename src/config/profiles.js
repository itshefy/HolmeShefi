// src/config/profiles.js

export const CLIENT_PROFILE = {
    goals: {
        health: {
            title: "בריאות",
            description: "שיפור הבריאות הכללית"
        },
        fitness: {
            title: "כושר",
            description: "שיפור הכושר הגופני"
        },
        weight: {
            title: "משקל",
            description: "הורדת משקל וחיטוב"
        },
        strength: {
            title: "כוח",
            description: "חיזוק ובניית שרירים"
        }
    },
    statuses: {
        regular: {
            id: 'regular',
            title: 'רגיל'
        },
        student: {
            id: 'student',
            title: 'סטודנט'
        },
        soldier: {
            id: 'soldier',
            title: 'חייל'
        },
        senior: {
            id: 'senior',
            title: 'גיל שלישי'
        }
    },
    defaultProfile: {
        status: 'regular',
        gender: 'male',
        goals: ['fitness'],
        subGoals: ['חיזוק הגב'],
        availability: ['morning'],
        experience: 'beginner'
    }
};