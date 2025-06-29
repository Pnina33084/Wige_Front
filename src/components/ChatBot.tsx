import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

const botSound = new Audio('/sounds/bot-response.mp3');

const faqs = [
  {
    keywords: ['שלום', 'היי', 'הי', 'הייי', 'מה קורה', 'מה נשמע', 'מה העניינים', 'מי את', 'עזרה', 'מי מדבר'],
    a: 'שלום! אני הבוט של Nitza Wigs. אפשר לשאול אותי כל שאלה על הסטודיו :)'
  },
  {
    keywords: ['תודה', 'תודהה', 'תודה רבה', 'התרגשתי', 'מדהים', 'וואו', 'כל הכבוד', 'סחתיין'],
    a: 'תודה לך על הפנייה! שמחות לשרת אותך 💕'
  },
  {
    keywords: ['פתוח', 'סגור', 'שעות', 'באיזה שעה', 'מתי פתוחים', 'שעות פעילות', 'מתי עובדים', 'זמן פתיחה'],
    a: 'הסטודיו פתוח בימים א׳–ה׳ בין 8:30 ל־15:00. מומלץ לקבוע תור מראש.'
  },
  {
    keywords: ['תור', 'קביעה', 'זמן', 'הזמנה', 'איך קובעים', 'רוצה תור', 'מתי פנוי'],
    a: 'ניתן לקבוע תור דרך האתר, בטלפון 058-3233084 או במייל pnina0032@gmail.com.'
  },
  {
    keywords: ['עובדות', 'שיראל', 'דינה', 'מטפלות', 'מי תטפל בי', 'מי תקבל אותי'],
    a: 'שיראל ודינה הן העובדות שלנו. אפשר לציין את ההעדפה בקביעת התור.'
  },
  {
    keywords: ['שירותים', 'מה מציעים', 'מה עושים', 'מה יש', 'טיפולים', 'אפשרויות', 'פאות', 'מה אתם'],
    a: 'אנו מציעות פאות משיער טבעי, עיצוב, תיקון והתאמה אישית מלאה.'
  },
  {
    keywords: ['סטיילינג', 'תסרוקות', 'עיצוב אישי', 'תספורת', 'עיצוב פאה'],
    a: 'בוודאי! אנחנו מציעות גם שירותי סטיילינג ועיצוב אישי לפי הסגנון שלך.'
  },
  {
    keywords: ['תיקון', 'שיפוץ', 'תיקונים', 'חידוש', 'שדרוג', 'תפירה', 'שחזור פאה'],
    a: 'בהחלט. אנו מתמחות בתיקון, חידוש ושדרוג פאות קיימות.'
  },
  {
    keywords: ['שיער', 'שיער טבעי', 'סינתטי', 'סוג שיער', 'איכות השיער'],
    a: 'הפאות שלנו עשויות משיער טבעי איכותי בלבד בהתאמה אישית.'
  },
  {
    keywords: ['טלפון', 'מספר', 'מספר טלפון', 'איך מדברים איתכם'],
    a: 'ניתן ליצור קשר בטלפון 058-3233084'
  },
  {
    keywords: ['מייל', 'אימייל', 'דוא"ל', 'כתובת מייל'],
    a: 'כתובת המייל שלנו: pnina0032@gmail.com'
  },
  {
    keywords: ['מחיר', 'עלות', 'כמה עולה', 'תעריף', 'תמחור', 'מה המחירים', 'כמה תעלה פאה'],
    a: 'המחירים משתנים לפי סוג הפאה, האורך והעיצוב. צרי קשר לייעוץ מותאם.'
  },
  {
    keywords: ['ביטול', 'לבטל', 'שינוי תור', 'החזר', 'מדיניות ביטול'],
    a: 'ניתן לשנות או לבטל תור עד 24 שעות מראש. לאחר מכן, ייתכן חיוב.'
  },
  {
    keywords: ['ייעוץ', 'ייעוץ ראשוני', 'פגישה ראשונה', 'התייעצות'],
    a: 'אנו מציעות פגישת ייעוץ ראשונית ללא התחייבות. נשמח להתאים לך פתרון אישי.'
  },
  {
    keywords: ['חניה', 'איפה חונים', 'יש חניה', 'חנייה'],
    a: 'יש חניה נגישה בסביבה. נוכל להכווין אותך בהתאם לשעת ההגעה.'
  },
  {
    keywords: ['פאה', 'פאות', 'פיאה', 'פאות טבעיות'],
    a: 'אנו מתמחות בפאות טבעיות בהתאמה אישית מלאה.'
  },
  {
    keywords: ['מכירה', 'רכישה', 'אפשר לקנות', 'מוכרים פאות'],
    a: 'ניתן לרכוש אצלנו פאות בהתאמה אישית מלאה לאחר ייעוץ.'
  },
  {
    keywords: ['המלצות', 'המלצה', 'פידבק', 'ביקורות', 'מה אומרות'],
    a: 'לקוחות רבות מרוצות מהשירות שלנו. נשמח לשלוח המלצות.'
  },
  {
    keywords: ['כמה זמן לוקח', 'זמן הכנה', 'תהליך'],
    a: 'משך ההכנה משתנה בהתאם לסוג השירות. לרוב עד שבוע לפאה מותאמת.'
  },
  {
    keywords: ['מתי לחזור', 'מתי תענו', 'יחזרו אליי'],
    a: 'נחזור אלייך בהקדם האפשרי – לרוב תוך יום עסקים אחד.'
  },
  {
    keywords: ['אני חרדית', 'דרישות הלכתיות', 'כיסוי ראש'],
    a: 'אנו מתמחות בפאות צנועות ובהתאמה מלאה לקהל הדתי והחרדי.'
  },
  {
    keywords: ['יש לכן אתר', 'כתובת אתר', 'אתר אינטרנט'],
    a: 'כן! תוכלי לבקר באתר שלנו או ליצור קשר ישירות.'
  },
  {
    keywords: ['אינסטגרם', 'פייסבוק', 'רשתות חברתיות', 'איפה רואים תמונות'],
    a: 'תוכלי לצפות בתמונות והמלצות בדף האינסטגרם והפייסבוק שלנו.'
  },
  {
    keywords: ['שירות', 'יחס', 'מקצועיות', 'אדיבות'],
    a: 'השירות אצלנו אישי, מקצועי וחם במיוחד – באהבה ובכבוד!'
  },
  {
    keywords: [],
    a: 'תודה על פנייתך! נציג שלנו יחזור אליך בהקדם, או התקשרי ל-058-3233084.'
  }
];

function getAnswer(question: string): string {
  const lowered = question.toLowerCase();
  for (let i = 0; i < faqs.length - 1; i++) {
    if (faqs[i].keywords.some(k => lowered.includes(k.toLowerCase()))) {
      return faqs[i].a;
    }
  }
  return faqs[faqs.length - 1].a;
}

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('chatbotMessages');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  // גלילה אוטומטית לתחתית בכל הודעה חדשה
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const question = input.trim();
    const answer = getAnswer(question);
    setMessages(prev => [...prev, { from: 'user', text: question }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: answer }]);
      botSound.play().catch(() => {});
    }, 700);
    setInput('');
  };

  const startVoiceInput = () => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert('הדפדפן שלך לא תומך בזיהוי קולי');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'he-IL';
      recognition.interimResults = false;
      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setTimeout(handleSend, 100);
      };
      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  return (
    <>
      <button className="chatbot-fab" onClick={() => setOpen(o => !o)} aria-label="פתח/סגור בוט שיחה">
        <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true" focusable="false">
          <circle cx="40" cy="40" r="40" fill="#e53935" />
          <rect x="24" y="38" width="32" height="5" rx="2.5" fill="#fff" />
          <rect x="24" y="28" width="32" height="5" rx="2.5" fill="#fff" />
          <rect x="24" y="48" width="23" height="5" rx="2.5" fill="#fff" />
        </svg>
      </button>

      {open && (
        <div className="chatbot-modal fade-in" role="dialog" aria-modal="true" aria-labelledby="chatbotTitle">
          <div className="chatbot-header">
            <span id="chatbotTitle">בוט שאלות על Nitza Wigs</span>
            <button onClick={() => setOpen(false)} aria-label="סגור">✖</button>
          </div>
          <div className="chatbot-messages" tabIndex={0} aria-live="polite" aria-relevant="additions">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.from}`} role="article" aria-label={`${msg.from === 'user' ? 'אתה' : 'בוט'} אומר:`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="הקלד שאלה או השתמשי במיקרופון..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              dir="rtl"
              aria-label="שדה קלט לשאלה"
              autoFocus
            />
            <button onClick={handleSend} aria-label="שלח הודעה">📤</button>
            <button onClick={startVoiceInput} title="הקלט קול" aria-label={listening ? "מקליט קול" : "התחל הקלטת קול"}>
              {listening ? '🎙️' : '🎤'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
