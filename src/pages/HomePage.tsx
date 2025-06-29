import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../styles/HomePage.css';
import screenshotImg from '../Photos/p.png';
import pic1 from '../Photos/pic1.png';
import pic2 from '../Photos/pic2.png';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- אנימציה מחזורית לכותרת ---
  const [brandAnimKey, setBrandAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBrandAnimKey(k => k + 1);
    }, 3500); // כל 3.5 שניות
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    "הפאה מורכבת, טבעית, נוחה וקלילה! אין עליך, פשוט אלופה!",
    "אני כל כך שמחה שבחרתי בך – כבר לפאת חלומותיי, ולגמרי עמדת בציפיות!",
    "שירות מדהים ונדיר! שיער מאפרקף, לייס טבעי והצבע פשוט וואו",
    "את אלופה ממש פעם ראשונה שאני אוהבת על עצמי פאה!",
    "פאה מושלמת! אני מקבלת עליה כל יום הרבה מחמאות... תודה!",
  ];

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

  const handleNextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 1));
  };

  const handlePrevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  return (
    <div className="homepage-root">
      <div className="homepage-content">
        <div className="homepage-logo-big">
          <span role="img" aria-label="logo" style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>♡</span>
          <AnimatedText
            key={brandAnimKey}
            text={brand}
            className="homepage-brand"
            delay={0}
            dir="ltr"
          />
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

      {/* בלוק רוחבי עם תמונה וטקסט מעל */}
      <div
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          marginTop: '4rem',
          marginBottom: '0',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* התמונה ברקע */}
        <img
          src={screenshotImg}
          alt="Nitza Wigs"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)', // כהות
            opacity: 0.7, // שקיפות
            zIndex: 1,
          }}
        />
        {/* שכבת overlay כהה נוספת (אם רוצים עוד יותר כהות) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.35)',
            zIndex: 2,
          }}
        />
        {/* הטקסט מעל הכל */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: 900,
            width: '90vw',
            textAlign: 'center',
            color: '#fff',
            padding: '3rem 0 2.5rem 0',
            margin: '0 auto',
          }}
        >
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2.7rem', margin: 0, letterSpacing: 2 }}>
            Nitza WIGS
          </h1>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem', margin: '1.2rem 0 1.7rem 0' }}>
            ברוכה הבאה לסלון הפאות ניצה
          </h2>
          <div style={{ color: '#fff', fontSize: '1.15rem', lineHeight: 2, marginBottom: '1.2rem' }}>
            קולקציית פאות היוקרה האופנתיות שלנו, בנויה בעבודת יד ובהתאמה אישית מדויקת במיוחד עבורך.<br />
            במבחר הפאות שלנו תוכלי למצוא: פאות בסטיילינג אישי, פאות בעיצוב קלאסי, פאות לכלות, פאות רפואיות ותוספות שיער.
          </div>
          <div style={{ color: '#a259c6', fontWeight: 900, fontSize: '1.25rem' }}>
            בואי להתחדש בפאה מעוצבת ומחמיאה
          </div>
        </div>
      </div>

      {/* גלריית תמונות עם כותרות ותיאורים */}
      <div className="gallery-arches">
        <div className="gallery-arch">
          <img src={pic1} alt="תוספות שיער" className="gallery-arch-img" />
          <div className="gallery-arch-overlay"></div>
          <div className="gallery-arch-text">
            תוספות שיער
            <div className="gallery-arch-desc">
              תוספות טופ לייס<br />
              תוספות אחוריות<br />
              תוספות כיפה
            </div>
          </div>
        </div>
        <div className="gallery-arch">
          <img src={pic2} alt="פאות" className="gallery-arch-img" />
          <div className="gallery-arch-overlay"></div>
          <div className="gallery-arch-text">
            פאות
            <div className="gallery-arch-desc">
              פאות טופ לייס<br />
              פאות פרונט לייס<br />
              פאות רפואיות
            </div>
          </div>
        </div>
      </div>

      {/* קרוסלת תגובות */}
      <div className="testimonials-section">
        <h2 className="testimonials-title">לקוחות הסלון משתפות</h2>
        <div className="testimonials-carousel">
          <button className="arrow-btn" onClick={handlePrevTestimonial}>&lt;</button>
          <div className="testimonials-list">
            {testimonials.slice(currentIndex, currentIndex + 3).map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-header">
                  <span className="testimonial-icon">♡</span>
                  <span className="testimonial-menu">...</span>
                </div>
                <div className="testimonial-content">{t}</div>
              </div>
            ))}
          </div>
          <button className="arrow-btn" onClick={handleNextTestimonial}>&gt;</button>
        </div>
      </div>

      {/* בלוק מידע על הסלון */}
      <div className="salon-info-section">
        <div className="salon-info-content">
          <h2 className="salon-info-title">צרי קשר</h2>
          <div className="salon-info-details">
            פאנית ניצה בע"מ<br />
            0583233084<br />
            <br />
          
          </div>
          <button
            className="salon-info-btn"
            onClick={() => window.location.href = '/contact'}
          >
            מעבר לדף יצירת קשר
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;