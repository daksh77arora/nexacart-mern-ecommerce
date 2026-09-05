import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/NexaCartLogo.png" alt="NexaCart" style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }} />
          NexaCart
        </Link>
      </div>
      <button className="navbar-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
        <span /><span /><span />
      </button>
      <ul className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`}>
        <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
        <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart <span className="cart-badge">{cartItems.length}</span></Link></li>
        {user ? (
          <>
            <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Hi, {user.name}</Link></li>
            <li><Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link></li>
            {user.role === 'admin' && <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>}
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
