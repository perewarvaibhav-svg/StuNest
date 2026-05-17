import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Heart, GitCompare, Users, LayoutDashboard, LogOut, LogIn, UserPlus, Menu, X, ChevronDown, Bell, Bookmark, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;
  const ownerOrAdmin = profile?.role === 'owner' || profile?.role === 'admin';

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🏠</span>
          Stu<span className={styles.logoBold}>Nest</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}>
            <Home size={16} /> Home
          </Link>
          <Link to="/search" className={`${styles.navLink} ${isActive('/search') ? styles.navLinkActive : ''}`}>
            <Search size={16} /> Find Hostels
          </Link>
          <Link to="/compare" className={`${styles.navLink} ${isActive('/compare') ? styles.navLinkActive : ''}`}>
            <GitCompare size={16} /> Compare
          </Link>
          <Link to="/roommate" className={`${styles.navLink} ${isActive('/roommate') ? styles.navLinkActive : ''}`}>
            <Users size={16} /> Roommates
          </Link>
        </div>

        {/* Right Actions */}
        <div className={styles.navActions}>
          {user ? (
            <>
              <Link to="/shortlist" className={styles.iconBtn} title="Shortlist">
                <Heart size={20} />
              </Link>
              <div className={styles.profileWrap}>
                <button className={styles.profileBtn} onClick={() => setProfileOpen(p => !p)}>
                  <div className={styles.avatarSmall}>
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className={styles.profileName}>{profile?.full_name?.split(' ')[0] || 'Account'}</span>
                  <ChevronDown size={16} />
                </button>
                {profileOpen && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.dropdownHeader}>
                      <div className={styles.avatarMed}>{profile?.full_name?.charAt(0) || 'U'}</div>
                      <div>
                        <p className={styles.dropdownName}>{profile?.full_name || 'Student'}</p>
                        <p className={styles.dropdownEmail}>{user.email}</p>
                        <span className={styles.roleBadge}>{profile?.role || 'student'}</span>
                      </div>
                    </div>
                    <div className={styles.dropdownDivider} />
                    {ownerOrAdmin && (
                      <Link to="/owner" className={styles.dropdownItem}>
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    )}
                    <Link to="/student" className={styles.dropdownItem}>
                      <Bookmark size={16} /> My Bookings
                    </Link>
                    <Link to="/shortlist" className={styles.dropdownItem}>
                      <Heart size={16} /> Shortlist
                    </Link>
                    <div className={styles.dropdownDivider} />
                    <button className={`${styles.dropdownItem} ${styles.signOutItem}`} onClick={handleSignOut}>
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn}>
                <LogIn size={16} /> Login
              </Link>
              <Link to="/signup" className={styles.signupBtn}>
                <UserPlus size={16} /> Sign Up
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button className={styles.menuBtn} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <Link to="/" className={styles.mobileLink}><Home size={18} /> Home</Link>
        <Link to="/search" className={styles.mobileLink}><Search size={18} /> Find Hostels</Link>
        <Link to="/compare" className={styles.mobileLink}><GitCompare size={18} /> Compare</Link>
        <Link to="/roommate" className={styles.mobileLink}><Users size={18} /> Roommates</Link>
        {user && (
          <>
            <Link to="/shortlist" className={styles.mobileLink}><Heart size={18} /> Shortlist</Link>
            {ownerOrAdmin && <Link to="/owner" className={styles.mobileLink}><LayoutDashboard size={18} /> Dashboard</Link>}
            <button className={`${styles.mobileLink} ${styles.mobileSignOut}`} onClick={handleSignOut}>
              <LogOut size={18} /> Sign Out
            </button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className={styles.mobileLink}><LogIn size={18} /> Login</Link>
            <Link to="/signup" className={`${styles.mobileLink} ${styles.mobileSignUp}`}><UserPlus size={18} /> Sign Up Free</Link>
          </>
        )}
      </div>

      {/* Overlay */}
      {(menuOpen || profileOpen) && (
        <div className={styles.overlay} onClick={() => { setMenuOpen(false); setProfileOpen(false); }} />
      )}
    </nav>
  );
}
