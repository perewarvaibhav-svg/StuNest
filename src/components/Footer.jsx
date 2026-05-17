import styles from './Footer.module.css';
import { Home } from 'lucide-react';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <Home className={styles.logoIcon} />
            <span>StuNest</span>
          </div>
          <p className={styles.tagline}>
            The premium platform to find the best hostels and PGs near your college.
          </p>
        </div>
        
        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Quick Links</h4>
            <a href="#" className={styles.link}>Find Hostels</a>
            <a href="#" className={styles.link}>Colleges</a>
            <a href="#" className={styles.link}>List Your Property</a>
          </div>
          
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Support</h4>
            <a href="#" className={styles.link}>Help Center</a>
            <a href="#" className={styles.link}>Contact Us</a>
            <a href="#" className={styles.link}>Terms of Service</a>
            <a href="#" className={styles.link}>Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>© {new Date().getFullYear()} StuNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
