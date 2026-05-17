import { Link, useNavigate } from 'react-router-dom';
import { Shield, MapPin, Users, Star, ArrowRight, CheckCircle, Home, Map, Search } from 'lucide-react';
import HostelCard from '../components/HostelCard';
import styles from './LandingPage.module.css';

const FEATURED_HOSTELS = [
  { id: '1', name: 'Sunrise Premium Boys Hostel', address: 'Near JNTUH, Kukatpally', price: 8500, category: 'boys', type: 'hostel', rating: 4.8, reviews: 124, isPremium: true, distance: 0.5, facilities: ['ac', 'wifi', 'food'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800' },
  { id: '5', name: 'Royal Heritage Girls Hostel', address: 'Kompally, Near CMRIT', price: 15000, category: 'girls', type: 'hostel', rating: 4.7, reviews: 320, isPremium: true, distance: 0.2, facilities: ['ac', 'wifi', 'security'], image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800' },
  { id: '3', name: 'Elite Unisex Co-living', address: 'Gachibowli, Near CBIT', price: 12000, category: 'both', type: 'hostel', rating: 4.9, reviews: 210, isPremium: true, distance: 2.0, facilities: ['ac', 'wifi', 'pool'], image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800' },
  { id: '7', name: 'Green View Co-living', address: 'Dundigal, Near MLRIT', price: 10500, category: 'both', type: 'pg', rating: 4.5, reviews: 156, isPremium: true, distance: 0.3, facilities: ['ac', 'wifi', 'balcony'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800' },
  { id: '2', name: 'Cozy Living PG for Girls', address: 'KPHB Colony, Near JNTUH', price: 6000, category: 'girls', type: 'pg', rating: 4.2, reviews: 89, isPremium: false, distance: 1.2, facilities: ['wifi', 'food', 'security'], image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800' },
  { id: '4', name: 'Student Nest PG', address: 'Gandipet, Near CBIT', price: 5500, category: 'boys', type: 'pg', rating: 3.9, reviews: 45, isPremium: false, distance: 0.8, facilities: ['wifi', 'food'], image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d96674?q=80&w=800' },
];

const WHY_ITEMS = [
  { icon: <MapPin size={28} />, title: 'Nearby Campus Hostels', desc: 'Sorted by walking distance from your college gate.' },
  { icon: <Shield size={28} />, title: 'Verified Properties', desc: 'Every listing is personally checked by our team.' },
  { icon: <Users size={28} />, title: 'Boys, Girls & Co-living', desc: 'Options for all genders with safe environments.' },
  { icon: <Star size={28} />, title: 'Budget & Premium Stays', desc: 'From ₹4,000 budget rooms to ₹15,000 premium suites.' },
  { icon: <Map size={28} />, title: 'Google Maps Directions', desc: 'One-tap navigation from campus to your hostel.' },
];

const HOW_STEPS = [
  { step: '01', title: 'Explore Hostels', desc: 'Search by your college name to discover all nearby verified accommodations.' },
  { step: '02', title: 'Compare & Filter', desc: 'Filter by distance, price, gender, and amenities to find your perfect match.' },
  { step: '03', title: 'Contact Owner', desc: 'WhatsApp or call the owner directly — no brokerage, no hidden fees.' },
  { step: '04', title: 'Move In Easily', desc: 'Schedule a visit, sign the agreement, and settle into your new home.' },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.landing}>

      {/* ============ HERO ============ */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.gridTexture} />

        <div className={`container ${styles.heroContainer}`}>
          {/* Left: Text + CTA only */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>✨ India's #1 Student Housing Platform</div>
            <h1 className={styles.heroTitle}>
              Find Your Perfect <br />
              <span className={styles.gradientText}>Student Stay</span><br />
              Near Campus
            </h1>
            <p className={styles.heroSubtitle}>
              Discover verified hostels and PGs near your college with distance, facilities, safety, and student-friendly pricing.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/search" className={styles.primaryBtn}>
                Explore Hostels <ArrowRight size={20} />
              </Link>
              <Link to="/owner" className={styles.outlineBtn}>
                List Your Property
              </Link>
            </div>
            <div className={styles.trustRow}>
              <div className={styles.trustItem}><CheckCircle size={16} /> Verified Listings</div>
              <div className={styles.trustItem}><CheckCircle size={16} /> No Brokerage</div>
              <div className={styles.trustItem}><CheckCircle size={16} /> Free to Use</div>
            </div>
          </div>

          {/* Right: Photo collage */}
          <div className={styles.heroVisuals}>
            <div className={styles.photoComposition}>
              {/* Main large image */}
              <div className={styles.mainPhoto}>
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=900"
                  alt="Premium student room"
                  className={styles.mainPhotoImg}
                />
                <div className={styles.mainPhotoOverlay}>
                  <div className={styles.photoTag}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" /> 4.9 · Premium Stay
                  </div>
                </div>
              </div>

              {/* Floating card: top-right smaller image */}
              <div className={styles.floatCardTR}>
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400"
                  alt="Boys hostel"
                  className={styles.floatImg}
                />
                <div className={styles.floatLabel}>
                  <span className={styles.floatLabelName}>Boys Hostel</span>
                  <span className={styles.floatLabelPrice}>₹8,500/mo</span>
                </div>
              </div>

              {/* Floating card: bottom-left smaller image */}
              <div className={styles.floatCardBL}>
                <img
                  src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=400"
                  alt="Girls PG"
                  className={styles.floatImg}
                />
                <div className={styles.floatLabel}>
                  <span className={styles.floatLabelName}>Girls PG</span>
                  <span className={styles.floatLabelPrice}>₹6,000/mo</span>
                </div>
              </div>

              {/* Distance badge */}
              <div className={styles.distanceBadge}>
                <MapPin size={16} color="#FF5A6E" />
                <div>
                  <p className={styles.distanceBadgeTitle}>0.3 km from campus</p>
                  <p className={styles.distanceBadgeSub}>5 min walk</p>
                </div>
              </div>

              {/* Rating badge */}
              <div className={styles.ratingBadge}>
                <span className={styles.ratingBadgeScore}>4.9</span>
                <div>
                  <p className={styles.ratingBadgeTitle}>Student Rating</p>
                  <p className={styles.ratingBadgeSub}>320+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}><h3>500+</h3><p>Verified Hostels</p></div>
            <div className={styles.statCard}><h3>50+</h3><p>Colleges Covered</p></div>
            <div className={styles.statCard}><h3>10K+</h3><p>Students Helped</p></div>
            <div className={styles.statCard}><h3>24/7</h3><p>Student Support</p></div>
          </div>
        </div>
      </section>

      {/* ============ WHY STUNEST ============ */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why StuNest?</h2>
            <p>Everything students need to find their perfect home near college</p>
          </div>
          <div className={styles.whyGrid}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED STAYS ============ */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeaderFlex}>
            <div>
              <h2>Featured Student Stays</h2>
              <p>Handpicked premium accommodations loved by students</p>
            </div>
            <Link to="/search" className={styles.viewAllLink}>
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className={styles.featuredGrid}>
            {FEATURED_HOSTELS.map(hostel => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>How It Works</h2>
            <p>Find your new home in four simple steps</p>
          </div>
          <div className={styles.stepsGrid}>
            {HOW_STEPS.map((s, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNumber}>{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow1} />
            <div className={styles.ctaGlow2} />
            <div className={styles.ctaContent}>
              <h2>Have a hostel or PG?</h2>
              <p>List your property and reach students looking for accommodation near colleges every day.</p>
              <Link to="/owner" className={styles.ctaBtn}>List Your Property</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;
