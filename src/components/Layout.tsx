import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/HomePage.css';
import logoImage from '../Photos/logo.png'; // ← ייבוא התמונה

const Layout: React.FC = () => (
  <div className="homepage-root">
    <header className="homepage-header">
      <nav className="homepage-nav">
        <Link to="/">דף הבית</Link>
        <Link to="/appointments">ניהול תורים</Link>
        <Link to="/customers">לקוחות</Link>
        <Link to="/employees">עובדים</Link>
        <Link to="/services">שירותים</Link>
      </nav>
      <div className="homepage-logo-area">
        <img src={logoImage} alt="לוגו" className="homepage-logo" />
      </div>
    </header>
    <main className="homepage-main">
      <Outlet />
    </main>
  </div>
);

export default Layout;
