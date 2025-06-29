import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../styles/HomePage.css';
import logoImage from '../Photos/logo.png';

const MANAGER_CODE = '33084';

const Layout: React.FC = () => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // בכל מעבר לנתיב עובדות - דרשי קוד מחדש
  React.useEffect(() => {
    if (location.pathname.startsWith('/employees')) {
      setShowCodeInput(true);
      setAccessGranted(false);
      setCode('');
    } else {
      setShowCodeInput(false);
      setAccessGranted(false);
      setCode('');
    }
  }, [location]);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === MANAGER_CODE) {
      setAccessGranted(true);
      setShowCodeInput(false);
    } else {
      alert('קוד שגוי');
    }
  };

  return (
    <div className="homepage-root">
      <header className="homepage-header">
        <nav className="homepage-nav">
          <Link to="/">דף הבית</Link>
          <Link to="/appointments">ניהול תורים</Link>
          <Link to="/customers">לקוחות</Link>
          <Link
            to="/employees"
            onClick={e => {
              // תמיד דורש קוד, לא שומר הרשאה
              setShowCodeInput(true);
              setAccessGranted(false);
              setCode('');
            }}
          >
            עובדות
          </Link>
          <Link to="/services">שירותים</Link>
          <Link to="/contact">יצירת קשר</Link>
        </nav>
        <div className="homepage-logo-area">
          <img src={logoImage} alt="לוגו" className="homepage-logo" />
        </div>
      </header>
      <main className="homepage-main">
        {showCodeInput && !accessGranted ? (
          <form
            onSubmit={handleCodeSubmit}
            style={{
              margin: '3rem auto',
              maxWidth: 350,
              background: '#fff',
              border: '2px solid #e67e22',
              borderRadius: 12,
              padding: 24,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.3rem', marginBottom: 16 }}>
              כניסה לאזור מנהלת
            </div>
            <input
              type="password"
              placeholder="הכניסי קוד מנהלת"
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{
                padding: '0.7rem 1rem',
                border: '1.5px solid #e67e22',
                borderRadius: 8,
                fontSize: '1.1rem',
                marginBottom: 16,
                width: '90%',
                textAlign: 'center',
              }}
              autoFocus
            />
            <br />
            <button
              type="submit"
              style={{
                background: '#a259c6',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.7rem 1.7rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              כניסה
            </button>
          </form>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;
