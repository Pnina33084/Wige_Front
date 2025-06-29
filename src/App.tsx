import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentList from './components/AppointmentList';
import CustomerList from './components/CustomerList';
import EmployeeList from './components/EmployeeList';
import ServiceList from './components/ServiceList';
import ChatBot from './components/ChatBot';
import ContactPage from './components/ContactPage';
import './styles/App.css';
import './styles/HomePage.css';

// Layout component with admin login button and nav
const Layout: React.FC<{ isAdmin: boolean; onAdminClick: () => void; onAdminLogout: () => void }> = ({ isAdmin, onAdminClick, onAdminLogout }) => (
  <div>
    <header className="app-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#a259c6', fontWeight: 'bold', fontSize: '1.7rem' }}>
          Nitza Wigs
        </Link>
        <nav className="main-nav">
          <Link to="/">דף הבית</Link>
          {isAdmin ? (
            <>
              <Link to="/appointments">תורים</Link>
              <Link to="/customers">לקוחות</Link>
              <Link to="/employees">עובדות</Link>
              <Link to="/services">שירותים</Link>
              {/* לא מציגים יצירת קשר למנהלת */}
            </>
          ) : (
            <>
              <Link to="/contact">יצירת קשר</Link>
            </>
          )}
        </nav>
      </div>
      {!isAdmin && (
        <button
          onClick={onAdminClick}
          style={{
            background: '#a259c6',
            color: '#fff',
            border: 'none',
            borderRadius: '0.7rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '0.6rem 1.5rem'
          }}
        >
          כניסה כמנהלת
        </button>
      )}
      {isAdmin && (
        <span style={{ color: '#a259c6', marginRight: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          את מחוברת כמנהלת
          <button
            onClick={onAdminLogout}
            style={{
              background: '#fff',
              color: '#a259c6',
              border: '1px solid #a259c6',
              borderRadius: '0.7rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '0.4rem 1.1rem'
            }}
          >
            התנתקות
          </button>
        </span>
      )}
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCode === '33084') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminCode('');
    } else {
      alert('קוד שגוי');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Admin login modal */}
        {showAdminModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <form
              onSubmit={handleAdminLogin}
              style={{
                background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 32px #0002',
                padding: '2.5rem 2rem', minWidth: 320, display: 'flex', flexDirection: 'column', gap: '1.2rem'
              }}
            >
              <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                קוד מנהלת:
                <input
                  type="password"
                  value={adminCode}
                  onChange={e => setAdminCode(e.target.value)}
                  style={{ marginTop: '0.5rem', padding: '0.7rem', borderRadius: '0.5rem', border: '1.5px solid #a259c6', fontSize: '1.1rem', width: '100%' }}
                  autoFocus
                />
              </label>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  style={{
                    background: '#eee', color: '#333', border: 'none', borderRadius: '0.7rem',
                    fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', padding: '0.6rem 1.5rem'
                  }}
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#a259c6', color: '#fff', border: 'none', borderRadius: '0.7rem',
                    fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', padding: '0.6rem 1.5rem'
                  }}
                >
                  כניסה
                </button>
              </div>
            </form>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isAdmin={isAdmin}
                onAdminClick={() => setShowAdminModal(true)}
                onAdminLogout={handleAdminLogout}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="contact" element={<ContactPage />} />
            {isAdmin && (
              <>
                <Route path="appointments" element={<AppointmentList />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="services" element={<ServiceList />} />
              </>
            )}
            {/* אם לא מנהלת, כל ניסיון לכניסה לנתיב אחר יעביר לדף הבית */}
            {!isAdmin && <Route path="*" element={<Navigate to="/" replace />} />}
          </Route>
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
