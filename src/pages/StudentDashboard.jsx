import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DUMMY_BOOKINGS = [
  { id:'b1', hostel:'Sunrise Premium Boys Hostel', address:'Near JNTUH, Kukatpally', image:'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400', roomType:'Single AC', moveIn:'2025-06-01', status:'confirmed', token:200 },
  { id:'b2', hostel:'Elite Unisex Co-living', address:'Gachibowli, Near CBIT', image:'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=400', roomType:'Double Non-AC', moveIn:'2025-07-15', status:'pending', token:200 },
];

const STATUS_CONFIG = {
  confirmed: { label:'Confirmed', color:'#10B981', bg:'rgba(16,185,129,0.1)', icon: CheckCircle },
  pending: { label:'Pending', color:'#F59E0B', bg:'rgba(245,158,11,0.1)', icon: Clock },
  cancelled_by_student: { label:'Cancelled', color:'#EF4444', bg:'rgba(239,68,68,0.1)', icon: XCircle },
};

const STATS = [
  ['My Bookings', 2],
  ['Shortlisted', 3],
  ['Enquiries', 2],
  ['Reviews', 1],
];

export default function StudentDashboard() {
  const { user, profile } = useAuth();
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Student';

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-background)' }}>
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome, {displayName}</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Manage your bookings and saved hostels.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {STATS.map(([label, val]) => (
            <div key={label} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>{val}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <h2 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.2rem' }}>Token Bookings</h2>
        {DUMMY_BOOKINGS.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)', background: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <Bookmark size={40} style={{ marginBottom: '0.75rem', opacity: 0.2 }} />
            <p>No bookings yet.</p>
            <Link to="/search" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.65rem 1.5rem', background: 'var(--color-primary)', color: '#fff', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>
              Find Hostels
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {DUMMY_BOOKINGS.map(b => {
              const st = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
              const StatusIcon = st.icon;
              return (
                <div key={b.id} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <img src={b.image} alt={b.hostel} style={{ width: '110px', height: '75px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{b.hostel}</h3>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: st.bg, color: st.color, fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '100px', flexShrink: 0 }}>
                        <StatusIcon size={12} /> {st.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} /> {b.address}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      <span>{b.roomType}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={12} /> Move-in: {new Date(b.moveIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span>Token paid: &#8377;{b.token}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/search" style={{ padding: '0.7rem 1.5rem', background: 'var(--color-primary)', color: '#fff', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>Find Hostels</Link>
          <Link to="/shortlist" style={{ padding: '0.7rem 1.5rem', background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>My Shortlist</Link>
        </div>
      </div>
    </div>
  );
}
