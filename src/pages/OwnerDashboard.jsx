import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Building, PlusCircle, MessageSquare, Star,
  LogOut, Sun, Moon, Menu, X, Eye, TrendingUp, Users, Bell
} from 'lucide-react';
import styles from './OwnerDashboard.module.css';

// --- Dummy Data ---
const OWNER_HOSTELS = [
  { id: '1', name: 'Sunrise Premium Boys Hostel', address: 'Near JNTUH, Kukatpally', price: 8500, status: 'active', views: 342, enquiries: 18, rating: 4.8, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400' },
  { id: '3', name: 'Elite Unisex Co-living', address: 'Gachibowli, Near CBIT', price: 12000, status: 'active', views: 521, enquiries: 29, rating: 4.9, image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=400' },
  { id: '6', name: 'Budget Boys PG', address: 'Medchal, Near CMRIT', price: 4500, status: 'pending', views: 89, enquiries: 4, rating: 3.5, image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=400' },
];

const ENQUIRIES = [
  { id: 1, studentName: 'Rahul Kumar', college: 'JNTUH', hostel: 'Sunrise Premium Boys Hostel', message: 'Hi, is there any room available from June? Please share details.', time: '2 hours ago', unread: true },
  { id: 2, studentName: 'Priya Sharma', college: 'CBIT', hostel: 'Elite Unisex Co-living', message: 'Can I schedule a visit this weekend to check the room?', time: '5 hours ago', unread: true },
  { id: 3, studentName: 'Aditya Mehta', college: 'CMRIT', hostel: 'Budget Boys PG', message: 'What are the monthly charges including food?', time: '1 day ago', unread: false },
  { id: 4, studentName: 'Sneha Reddy', college: 'VNR VJIET', hostel: 'Elite Unisex Co-living', message: 'Is the AC included in the rent or charged separately?', time: '2 days ago', unread: false },
];

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'My Properties', icon: Building },
  { id: 'add', label: 'Add Property', icon: PlusCircle },
  { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: 2 },
  { id: 'reviews', label: 'Reviews', icon: Star },
];

function StatCard({ icon: Icon, label, value, color, trend }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ backgroundColor: `${color}18`, color }}>
        <Icon size={24} />
      </div>
      <div className={styles.statInfo}>
        <p className={styles.statLabel}>{label}</p>
        <h3 className={styles.statValue}>{value}</h3>
        {trend && <p className={styles.statTrend}>{trend}</p>}
      </div>
    </div>
  );
}

function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const totalViews = OWNER_HOSTELS.reduce((a, h) => a + h.views, 0);
  const totalEnquiries = OWNER_HOSTELS.reduce((a, h) => a + h.enquiries, 0);
  const unreadCount = ENQUIRIES.filter(e => e.unread).length;

  return (
    <div className={styles.dashboardLayout}>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.logo}>StuNest<span>.</span></Link>
          <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}><X size={22} /></button>
        </div>

        <div className={styles.ownerProfile}>
          <div className={styles.avatar}>R</div>
          <div>
            <p className={styles.ownerName}>Rajesh Sharma</p>
            <p className={styles.ownerRole}>Property Owner</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={toggleTheme} className={styles.themeBtn}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <Link to="/" className={styles.logoutBtn}>
            <LogOut size={18} /> <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className={styles.mainArea}>

        {/* Top Bar */}
        <header className={styles.topBar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className={styles.topBarTitle}>
            <h2>{NAV_ITEMS.find(n => n.id === activeTab)?.label}</h2>
          </div>
          <div className={styles.topBarActions}>
            <button className={styles.notifBtn}>
              <Bell size={20} />
              {unreadCount > 0 && <span className={styles.notifDot}>{unreadCount}</span>}
            </button>
          </div>
        </header>

        <main className={styles.content}>

          {/* === DASHBOARD TAB === */}
          {activeTab === 'dashboard' && (
            <div className={styles.tabContent}>
              <div className={styles.welcomeBanner}>
                <div>
                  <h1>Good evening, Rajesh! 👋</h1>
                  <p>Here's an overview of your properties and enquiries.</p>
                </div>
                <button className={styles.addBtn} onClick={() => setActiveTab('add')}>
                  <PlusCircle size={18} /> Add Property
                </button>
              </div>

              <div className={styles.statsGrid}>
                <StatCard icon={Building} label="Total Properties" value={OWNER_HOSTELS.length} color="#FF5A6E" trend="+1 this month" />
                <StatCard icon={Eye} label="Total Views" value={totalViews.toLocaleString()} color="#3B82F6" trend="+12% this week" />
                <StatCard icon={MessageSquare} label="Enquiries" value={totalEnquiries} color="#8B5CF6" trend={`${unreadCount} unread`} />
                <StatCard icon={TrendingUp} label="Avg. Rating" value="4.7 ⭐" color="#F59E0B" trend="Based on 3 listings" />
              </div>

              <h2 className={styles.sectionTitle}>Your Properties</h2>
              <div className={styles.propertyList}>
                {OWNER_HOSTELS.map(h => (
                  <div key={h.id} className={styles.propertyRow}>
                    <img src={h.image} alt={h.name} className={styles.propertyImg} />
                    <div className={styles.propertyInfo}>
                      <h4>{h.name}</h4>
                      <p>{h.address}</p>
                      <div className={styles.propertyMeta}>
                        <span>₹{h.price}/mo</span>
                        <span><Eye size={14} /> {h.views} views</span>
                        <span><MessageSquare size={14} /> {h.enquiries} enquiries</span>
                        <span><Star size={14} fill="#F59E0B" color="#F59E0B" /> {h.rating}</span>
                      </div>
                    </div>
                    <div className={styles.propertyActions}>
                      <span className={`${styles.statusBadge} ${h.status === 'active' ? styles.statusActive : styles.statusPending}`}>
                        {h.status}
                      </span>
                      <button className={styles.editBtn}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className={styles.sectionTitle}>Recent Enquiries</h2>
              <div className={styles.enquiryList}>
                {ENQUIRIES.slice(0, 3).map(eq => (
                  <div key={eq.id} className={`${styles.enquiryCard} ${eq.unread ? styles.enquiryUnread : ''}`}>
                    <div className={styles.enquiryAvatar}>{eq.studentName.charAt(0)}</div>
                    <div className={styles.enquiryBody}>
                      <div className={styles.enquiryHeader}>
                        <strong>{eq.studentName}</strong>
                        <span className={styles.enquiryCollege}>{eq.college}</span>
                        <span className={styles.enquiryTime}>{eq.time}</span>
                      </div>
                      <p className={styles.enquiryHostel}>Re: {eq.hostel}</p>
                      <p className={styles.enquiryMsg}>{eq.message}</p>
                    </div>
                    {eq.unread && <span className={styles.unreadDot}></span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === PROPERTIES TAB === */}
          {activeTab === 'properties' && (
            <div className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <div>
                  <h1>My Properties</h1>
                  <p>{OWNER_HOSTELS.length} properties listed</p>
                </div>
                <button className={styles.addBtn} onClick={() => setActiveTab('add')}>
                  <PlusCircle size={18} /> Add New
                </button>
              </div>
              <div className={styles.propertyList}>
                {OWNER_HOSTELS.map(h => (
                  <div key={h.id} className={styles.propertyRow}>
                    <img src={h.image} alt={h.name} className={styles.propertyImg} />
                    <div className={styles.propertyInfo}>
                      <h4>{h.name}</h4>
                      <p>{h.address}</p>
                      <div className={styles.propertyMeta}>
                        <span>₹{h.price}/mo</span>
                        <span><Eye size={14} /> {h.views}</span>
                        <span><MessageSquare size={14} /> {h.enquiries}</span>
                      </div>
                    </div>
                    <div className={styles.propertyActions}>
                      <span className={`${styles.statusBadge} ${h.status === 'active' ? styles.statusActive : styles.statusPending}`}>{h.status}</span>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === ADD PROPERTY TAB === */}
          {activeTab === 'add' && (
            <div className={styles.tabContent}>
              <h1>Add New Property</h1>
              <p className={styles.tabDesc}>Fill in the details below to list your hostel or PG on StuNest.</p>

              <form className={styles.addForm} onSubmit={e => { e.preventDefault(); alert('Property listed! (Connect Supabase to save data.)'); }}>
                <div className={styles.formSection}>
                  <h3>Basic Information</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Property Name *</label>
                      <input type="text" placeholder="e.g. Sunrise Boys Hostel" className={styles.formInput} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Monthly Rent (₹) *</label>
                      <input type="number" placeholder="e.g. 8500" className={styles.formInput} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Full Address *</label>
                      <input type="text" placeholder="Street, Area, City" className={styles.formInput} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="+91 98765 43210" className={styles.formInput} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Property Type *</label>
                      <select className={styles.formInput}>
                        <option value="">Select type</option>
                        <option value="hostel">Hostel</option>
                        <option value="pg">PG</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Gender Category *</label>
                      <select className={styles.formInput}>
                        <option value="">Select category</option>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                        <option value="both">Both (Co-living)</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Latitude (for map)</label>
                      <input type="number" step="any" placeholder="e.g. 17.4910" className={styles.formInput} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Longitude (for map)</label>
                      <input type="number" step="any" placeholder="e.g. 78.3930" className={styles.formInput} />
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h3>Description</h3>
                  <textarea className={styles.formTextarea} rows={5} placeholder="Describe your property — facilities, rules, nearby landmarks..." />
                </div>

                <div className={styles.formSection}>
                  <h3>Facilities Offered</h3>
                  <div className={styles.facilityCheckGrid}>
                    {['AC', 'Wi-Fi', 'Food', 'Laundry', 'Security', 'Gym', 'Parking', 'Study Room', 'Library', 'Balcony'].map(f => (
                      <label key={f} className={styles.facilityCheckLabel}>
                        <input type="checkbox" /> {f}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h3>Category</h3>
                  <div className={styles.facilityCheckGrid}>
                    <label className={styles.facilityCheckLabel}><input type="radio" name="category" value="standard" defaultChecked /> Standard</label>
                    <label className={styles.facilityCheckLabel}><input type="radio" name="category" value="premium" /> Premium</label>
                  </div>
                </div>

                <button type="submit" className={styles.submitPropertyBtn}>
                  <PlusCircle size={20} /> List Property
                </button>
              </form>
            </div>
          )}

          {/* === ENQUIRIES TAB === */}
          {activeTab === 'enquiries' && (
            <div className={styles.tabContent}>
              <h1>Student Enquiries</h1>
              <p className={styles.tabDesc}>{unreadCount} unread · {ENQUIRIES.length} total enquiries</p>
              <div className={styles.enquiryList}>
                {ENQUIRIES.map(eq => (
                  <div key={eq.id} className={`${styles.enquiryCard} ${eq.unread ? styles.enquiryUnread : ''}`}>
                    <div className={styles.enquiryAvatar}>{eq.studentName.charAt(0)}</div>
                    <div className={styles.enquiryBody}>
                      <div className={styles.enquiryHeader}>
                        <strong>{eq.studentName}</strong>
                        <span className={styles.enquiryCollege}>{eq.college}</span>
                        <span className={styles.enquiryTime}>{eq.time}</span>
                      </div>
                      <p className={styles.enquiryHostel}>Re: {eq.hostel}</p>
                      <p className={styles.enquiryMsg}>{eq.message}</p>
                      <div className={styles.enquiryReplyRow}>
                        <input type="text" placeholder="Type a reply..." className={styles.replyInput} />
                        <button className={styles.replyBtn}>Reply</button>
                      </div>
                    </div>
                    {eq.unread && <span className={styles.unreadDot}></span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === REVIEWS TAB === */}
          {activeTab === 'reviews' && (
            <div className={styles.tabContent}>
              <h1>Student Reviews</h1>
              <p className={styles.tabDesc}>Reviews left by students for your properties.</p>
              {[
                { name: 'Rahul K.', hostel: 'Sunrise Premium Boys Hostel', rating: 5, text: 'Best hostel experience! The food is great and Wi-Fi is fast.', date: 'March 2024' },
                { name: 'Aditya M.', hostel: 'Sunrise Premium Boys Hostel', rating: 4, text: 'Nice place, cooperative staff. Would recommend to friends.', date: 'Jan 2024' },
                { name: 'Sneha R.', hostel: 'Elite Unisex Co-living', rating: 5, text: 'Premium and clean. Worth every rupee. Great campus vibe.', date: 'Feb 2024' },
              ].map((r, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewTop}>
                    <div className={styles.reviewAvatar}>{r.name.charAt(0)}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <p className={styles.reviewHostel}>{r.hostel}</p>
                    </div>
                    <div className={styles.reviewRating}>
                      {'⭐'.repeat(r.rating)} <span>{r.date}</span>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default OwnerDashboard;
