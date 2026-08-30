import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    navigate('/');
  };

  const linkClass = ({ isActive }) => isActive ? 'active' : '';

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav__logo">WU NEN<span>.</span></Link>
      <button className="nav__toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
        <span></span><span></span><span></span>
      </button>
      <div className={`nav__links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <NavLink to="/" className={linkClass} end>Home</NavLink>
        <NavLink to="/videos" className={linkClass}>Music Videos</NavLink>
        <NavLink to="/gallery" className={linkClass}>Photos</NavLink>
        <NavLink to="/events" className={linkClass}>Past Work</NavLink>
        <NavLink to="/booking" className={linkClass}>Book Us</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        {session ? (
          <>
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <a href="#" onClick={handleLogout}>Logout</a>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        )}
      </div>
    </nav>
  );
}
