import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/HomePage.css';

const SERVICE_ID = 'service_fowa5nq';
const TEMPLATE_ID = 'template_3p883qv'; // אליך
const CLIENT_TEMPLATE_ID = 'template_hqnke78'; // ללקוחה
const USER_ID = 'IWwBJ3Mp1m6H1wXN0';

const brand = "NItze Wigs";
const desc1 = "סטודיו בוטיק לפאות איכותיות משיער טבעי";
const desc2 = "בהתאמה אישית";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  dir?: "rtl" | "ltr";
}

function AnimatedText({ text, className = "", delay = 0, dir = "rtl" }: AnimatedTextProps) {
  return (
    <div className={className} dir={dir}>
      {text.split('').map((char: string, i: number) => (
        <span
          key={i}
          className="animated-letter"
          style={{
            animationDelay: `${delay + i * 0.07}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

const HomePage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    // שליחת מייל אליך
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
      .then(() => {
        setSent(true);
        form.current?.reset();
        setTimeout(() => setSent(false), 5000);
      })
      .catch((error) => {
        console.error('שגיאה בשליחת מייל אליך:', error);
        alert('שגיאה בשליחה');
      });

    // שליחת מייל ללקוחה
    const formData = new FormData(form.current);
    emailjs.send(SERVICE_ID, CLIENT_TEMPLATE_ID, {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    }, USER_ID)
      .catch((error) => {
        console.error('שגיאה בשליחת מייל ללקוחה:', error);
      });
  };

  return (
    <div className="homepage-content">
      <div className="homepage-logo-big">
        <span role="img" aria-label="logo" style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>♡</span>
        <AnimatedText text={brand} className="homepage-brand" delay={0} dir="ltr" />
      </div>
      <div className="homepage-desc-area">
        <AnimatedText text={desc1} className="homepage-desc" delay={0.7} dir="rtl" />
        <AnimatedText text={desc2} className="homepage-desc homepage-desc-bold" delay={1.7} dir="rtl" />
      </div>

      {/* טופס יצירת קשר */}
      <div className="contact-section">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <h2 className="contact-title">
            השאירי פרטים לפגישת ייעוץ חווייתית הכוללת סטיילינג אישי
          </h2>
          <div className="contact-fields">
            <input type="text" name="name" placeholder="שם מלא" required />
            <input type="text" name="phone" placeholder="טלפון נייד" required />
            <input type="email" name="email" placeholder="מייל" required />
          </div>
          <button type="submit" className="contact-btn">שליחה</button>
          {sent && <div className="contact-success">הפרטים נשלחו בהצלחה!</div>}
        </form>
        <div className="contact-info">
          <div className="contact-info-text">
            <div>סתם בא לך להתייעץ?<br />אנחנו כאן תמיד בשבילך!</div>
            <div className="contact-phone"><b>0583233084</b></div>
          </div>
          <div className="contact-logo">
            <span role="img" aria-label="logo" style={{ fontSize: '3rem', color: '#e67e22' }}>♡</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;