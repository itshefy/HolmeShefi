// src/components/SalesTools/ResponseTemplates.jsx
import React, { useState } from 'react';

const TEMPLATES = {
  openings: {
    title: "פתיחות שיחה",
    templates: [
      {
        title: "פתיחה כללית",
        text: "שלום, אני [שם] מהולמס פלייס. שמעתי שהתעניינת במנוי אצלנו. אשמח לספר לך על המועדון המדהים שלנו, שכולל בריכה חצי אולימפית, חדר כושר מתקדם, וסאונה מפנקת.",
        tags: ["פתיחה", "כללי"]
      },
      {
        title: "פתיחה ממוקדת - בריכה",
        text: "שלום, הבנתי שהתעניינת בעיקר בבריכה שלנו. מדובר בבריכה חצי אולימפית מחוממת, עם מסלולים מסודרים ומציל צמוד. הרבה מהמתאמנים שלנו מתחילים את היום בשחייה מרעננת.",
        tags: ["פתיחה", "בריכה"]
      },
      {
        title: "פתיחה ממוקדת - חדר כושר",
        text: "שלום, שמעתי שאתה מחפש חדר כושר ברמה גבוהה. יש לנו את הציוד הכי מתקדם, מאמנים מוסמכים שילוו אותך, ומגוון עצום של מכשירים.",
        tags: ["פתיחה", "חדר כושר"]
      }
    ]
  },

  benefits: {
    title: "הצגת יתרונות",
    templates: [
      {
        title: "יתרונות כלליים",
        text: "אצלנו תקבל הרבה יותר ממנוי רגיל לחדר כושר - בריכה חצי אולימפית מחוממת, סאונה וג'קוזי מפנקים, מעל 100 שיעורי סטודיו בשבוע, וצוות מקצועי שילווה אותך לאורך כל הדרך.",
        tags: ["יתרונות", "כללי"]
      },
      {
        title: "יתרונות למתאמני בוקר",
        text: "מתאמני הבוקר שלנו נהנים מחניה זמינה תמיד, מקלחות מפנקות עם שמפו, ומתחילים את היום באנרגיות מטורפות. אפשר להתאמן, להתקלח וללכת ישר לעבודה.",
        tags: ["יתרונות", "בוקר"]
      },
      {
        title: "יתרונות למשפחות",
        text: "המועדון שלנו מושלם למשפחות - יש לנו פעילויות לכל הגילאים, הבריכה פתוחה למשפחות בסופ\"ש, וההורים יכולים להתאמן בזמן שהילדים בחוגים.",
        tags: ["יתרונות", "משפחות"]
      }
    ]
  },

  pricing: {
    title: "הצגת מחירים",
    templates: [
      {
        title: "מבצע סטנדרטי",
        text: "יש לנו עכשיו מבצע מיוחד - 349₪ לחודש למנוי שנתי, כולל 3 חודשים מתנה. זה אומר שאתה משלם על 9 חודשים ומקבל 12 חודשים של אימונים.",
        tags: ["מחיר", "מבצע"]
      },
      {
        title: "פריסת תשלומים",
        text: "אפשר לפרוס את התשלום ל-12 תשלומים נוחים בכרטיס אשראי. ככה זה יוצא רק 349₪ בחודש - פחות ממה שאנשים מוציאים על קפה בחודש.",
        tags: ["מחיר", "תשלומים"]
      },
      {
        title: "חישוב עלות יומית",
        text: "בוא נעשה חשבון פשוט - 349₪ לחודש זה בערך 11₪ ליום. תחשוב על זה - פחות ממנה בקפה, ואתה מקבל גישה מלאה לכל המתקנים והשיעורים.",
        tags: ["מחיר", "חישוב"]
      }
    ]
  },

  closing: {
    title: "משפטי סגירה",
    templates: [
      {
        title: "סגירה מיידית",
        text: "בוא נסגור את זה עכשיו ותתחיל כבר מחר. אני אעביר אותך לשיחה קצרה עם יועץ כושר שיבנה לך תוכנית אימונים אישית.",
        tags: ["סגירה", "מיידי"]
      },
      {
        title: "סגירה עם דחיפות",
        text: "המבצע הזה נגמר היום - לא נוכל לשמור את המחיר הזה למחר. בוא נסגור עכשיו ואני אדאג שתקבל גם [הטבה נוספת] כמתנה.",
        tags: ["סגירה", "דחיפות"]
      },
      {
        title: "סגירה רכה",
        text: "נשמע שזה בדיוק מה שחיפשת. אפשר להתחיל כבר מחר - איזה כרטיס אשראי יותר נוח לך לשלם איתו?",
        tags: ["סגירה", "רך"]
      }
    ]
  },

  followup: {
    title: "משפטי המשך",
    templates: [
      {
        title: "המשך לאחר התעניינות",
        text: "חשבתי עליך - המבצע שדיברנו עליו עדיין בתוקף היום. רציתי לוודא שאתה לא מפספס את ההזדמנות הזו. מתי נוח לך להתחיל?",
        tags: ["המשך", "מבצע"]
      },
      {
        title: "המשך אחרי התלבטות",
        text: "היי, רציתי לעדכן שהצלחתי לשריין לך את המחיר המיוחד שדיברנו עליו. אשמח אם נוכל לסגור את זה היום.",
        tags: ["המשך", "מחיר"]
      },
      {
        title: "המשך אחרי סירוב",
        text: "שלום, יש לנו עכשיו מבצע חדש שחשבתי שיכול להתאים לך בול. אשמח לספר לך עליו.",
        tags: ["המשך", "חדש"]
      }
    ]
  }
};

const ResponseTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('openings');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [copiedText, setCopiedText] = useState('');

  const getAllTags = () => {
    const tags = new Set();
    Object.values(TEMPLATES).forEach(category => {
      category.templates.forEach(template => {
        template.tags.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const filterTemplates = (templates) => {
    return templates.filter(template => {
      const matchesSearch = template.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => template.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">תבניות תשובה מוכנות</h2>
        <p className="text-gray-600">בחר קטגוריה, חפש או סנן לפי תגיות</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="חיפוש בתבניות..."
          className="p-3 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          dir="rtl"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border rounded-lg"
          dir="rtl"
        >
          {Object.entries(TEMPLATES).map(([key, category]) => (
            <option key={key} value={key}>{category.title}</option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {getAllTags().map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTags(prev => 
              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            )}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filterTemplates(TEMPLATES[selectedCategory].templates).map((template, index) => (
          <div 
            key={index}
            className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-all cursor-pointer"
            onClick={() => copyToClipboard(template.text)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{template.title}</h3>
              <div className="flex gap-1">
                {template.tags.map(tag => (
                  <span key={tag} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-right text-gray-700">{template.text}</p>
            {copiedText === template.text && (
              <div className="text-green-600 text-sm mt-2">✓ הועתק ללוח</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseTemplates;