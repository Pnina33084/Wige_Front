import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => (
  <div>
    <h1>ברוכים הבאים למערכת הניהול</h1>
    <nav>
      <ul>
        <li><Link to="/appointments">ניהול תורים</Link></li>
        <li><Link to="/customers">לקוחות</Link></li>
        <li><Link to="/employees">עובדים</Link></li>
        <li><Link to="/services">שירותים</Link></li>
      </ul>
    </nav>
  </div>
);

export default HomePage;