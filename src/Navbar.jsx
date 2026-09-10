import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-brand">🍽️ Subbu Restaurant</div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className={isOpen ? 'bar open' : 'bar'}></span>
        <span className={isOpen ? 'bar open' : 'bar'}></span>
        <span className={isOpen ? 'bar open' : 'bar'}></span>
      </div>

      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/biryanis" onClick={toggleMenu}>Biryanis</Link></li>
        <li><Link to="/veg-curries" onClick={toggleMenu}>Veg Curries</Link></li>
        <li><Link to="/non-veg-curries" onClick={toggleMenu}>Non-Veg Curries</Link></li>
        <li><Link to="/juices" onClick={toggleMenu}>Juices</Link></li>
        <li><Link to="/rates" onClick={toggleMenu}>Rates</Link></li>
        <Link to="/admin-login" className="order-btn" onClick={toggleMenu}>
          Order list
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;

