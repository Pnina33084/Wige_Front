import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPage.css';

const SERVICE_ID = 'service_fowa5nq';
const TEMPLATE_ID = 'template_3p883qv';
const USER_ID = 'IWwBJ3Mp1m6H1wXN0';

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!form.current) return;
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
      .then(
        () => {
          setSent(true);
          setLoading(false);
        },
        () => {
          alert('שליחה נכשלה, נסי שוב');
          setLoading(false);
        }
      );
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>צור קשר</h2>
        <p>נשמח לשמוע ממך! מלאי את הפרטים ונחזור אלייך למייל בהקדם.</p>
        {sent ? (
          <div className="contact-success">
            ההודעה נשלחה בהצלחה! נחזור אלייך למייל בקרוב.
          </div>
        ) : (
          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <label>
              שם מלא:
              <input type="text" name="name" required />
            </label>
            <label>
              טלפון:
              <input type="tel" name="phone" required />
            </label>
            <label>
              מייל לחזרה:
              <input type="email" name="email" required />
            </label>
            <label>
              פירוט הפנייה:
              <textarea name="message" rows={5} required />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'שולח...' : 'שלח/י פנייה'}
            </button>
          </form>
        )}
        <div className="contact-details">
          <div>
            אפשר גם לפנות ישירות למייל:{' '}
            <a href="mailto:pnina0032@gmail.com">pnina0032@gmail.com</a>
          </div>
          <div>
            או בטלפון: <a href="tel:0583233084">058-3233084</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;