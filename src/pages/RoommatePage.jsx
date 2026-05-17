import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATIC_HOSTELS } from '../hooks/useHostels';
import { Users } from 'lucide-react';

const DUMMY_PROFILES = [
  { id:1, name:'Arjun K.', hostel:'Sunrise Premium Boys Hostel', branch:'B.Tech CSE', year:2, sleep:'night_owl', study:'silent', dietary:'veg', hobbies:['Gaming','Music'], bio:'Chill guy, keeps room clean, looking for a quiet roommate.' },
  { id:2, name:'Priya M.', hostel:'Royal Heritage Girls Hostel', branch:'B.Tech IT', year:1, sleep:'early_bird', study:'group_study', dietary:'veg', hobbies:['Reading','Yoga'], bio:'First-year student, very organised, loves cooking on weekends.' },
  { id:3, name:'Ravi S.', hostel:'Elite Unisex Co-living', branch:'B.Tech ECE', year:3, sleep:'flexible', study:'music', dietary:'non_veg', hobbies:['Sports','Movies'], bio:'Easy-going, sporty, always up for a cricket match.' },
];

const SLEEP_LABELS = { early_bird:'Early Bird', night_owl:'Night Owl', flexible:'Flexible' };
const STUDY_LABELS = { silent:'Silent Study', music:'With Music', group_study:'Group Study', flexible:'Any Style' };
const DIET_LABELS = { veg:'Vegetarian', non_veg:'Non-Veg', vegan:'Vegan', any:'Any' };

const tagStyle = { fontSize:'0.72rem', background:'var(--color-background)', border:'1px solid var(--color-border)', padding:'0.2rem 0.55rem', borderRadius:'100px', color:'var(--color-text-muted)' };
const inputStyle = { padding:'0.65rem', border:'1px solid var(--color-border)', borderRadius:'8px', fontSize:'0.875rem', background:'var(--color-background)', color:'var(--color-text)', fontFamily:'inherit', width:'100%' };
const selectStyle = { ...inputStyle };

export default function RoommatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:'', branch:'', year:1, hostel:'', sleep:'flexible', study:'flexible', dietary:'any', bio:'' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ paddingTop:'80px', minHeight:'100vh', background:'var(--color-background)' }}>
      <div className="container" style={{ padding:'2rem 1rem' }}>
        <div style={{ marginBottom:'2rem' }}>
          <h1 style={{ fontSize:'1.75rem', fontWeight:800 }}>Find a Roommate</h1>
          <p style={{ color:'var(--color-text-muted)', marginTop:'0.25rem' }}>Match with students based on lifestyle and habits.</p>
        </div>

        {!submitted ? (
          <div style={{ maxWidth:'560px', background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'16px', padding:'1.5rem', marginBottom:'2.5rem' }}>
            <h3 style={{ fontWeight:700, marginBottom:'1rem', fontSize:'1.05rem' }}>Create Your Profile</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.65rem' }}>
              <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e=>set('name',e.target.value)} />
              <input style={inputStyle} placeholder="Branch (e.g. B.Tech CSE)" value={form.branch} onChange={e=>set('branch',e.target.value)} />
              <div style={{ gridColumn:'1/-1' }}>
                <select style={selectStyle} value={form.hostel} onChange={e=>set('hostel',e.target.value)}>
                  <option value="">Select your hostel</option>
                  {STATIC_HOSTELS.map(h=><option key={h.id} value={h.name}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:'0.78rem', color:'var(--color-text-muted)', display:'block', marginBottom:'0.3rem' }}>Sleep Schedule</label>
                <select style={selectStyle} value={form.sleep} onChange={e=>set('sleep',e.target.value)}>
                  <option value="early_bird">Early Bird</option>
                  <option value="night_owl">Night Owl</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:'0.78rem', color:'var(--color-text-muted)', display:'block', marginBottom:'0.3rem' }}>Dietary Preference</label>
                <select style={selectStyle} value={form.dietary} onChange={e=>set('dietary',e.target.value)}>
                  <option value="veg">Vegetarian</option>
                  <option value="non_veg">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="any">Any</option>
                </select>
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={{ fontSize:'0.78rem', color:'var(--color-text-muted)', display:'block', marginBottom:'0.3rem' }}>Study Style</label>
                <select style={selectStyle} value={form.study} onChange={e=>set('study',e.target.value)}>
                  <option value="silent">Silent</option>
                  <option value="music">With Music</option>
                  <option value="group_study">Group Study</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <textarea style={{ ...inputStyle, gridColumn:'1/-1', resize:'vertical' }} placeholder="Short bio — what makes you a good roommate?" value={form.bio} onChange={e=>set('bio',e.target.value)} rows={3}/>
            </div>
            <button onClick={()=>setSubmitted(true)} style={{ marginTop:'1rem', width:'100%', padding:'0.75rem', background:'var(--color-primary)', color:'#fff', border:'none', borderRadius:'10px', fontWeight:700, cursor:'pointer', fontSize:'0.9rem' }}>
              Post Profile
            </button>
          </div>
        ) : (
          <div style={{ padding:'1rem 1.25rem', background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'12px', color:'#059669', fontWeight:600, fontSize:'0.875rem', maxWidth:'560px', marginBottom:'2rem' }}>
            Profile posted. Other students can now find and contact you.
          </div>
        )}

        <h2 style={{ fontWeight:700, marginBottom:'1.25rem', fontSize:'1.1rem' }}>Looking for Roommates</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(270px, 1fr))', gap:'1rem' }}>
          {DUMMY_PROFILES.map(p => (
            <div key={p.id} style={{ background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'16px', padding:'1.25rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.875rem' }}>
                <div style={{ width:'46px', height:'46px', borderRadius:'50%', background:'linear-gradient(135deg, var(--color-primary), #8B5CF6)', color:'#fff', fontWeight:700, fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {p.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight:700, fontSize:'0.95rem' }}>{p.name}</p>
                  <p style={{ fontSize:'0.75rem', color:'var(--color-text-muted)' }}>{p.branch} &middot; Year {p.year}</p>
                </div>
              </div>
              <p style={{ fontSize:'0.82rem', color:'var(--color-text-muted)', fontStyle:'italic', marginBottom:'0.875rem', lineHeight:1.6 }}>"{p.bio}"</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem', marginBottom:'0.75rem' }}>
                <span style={tagStyle}>{SLEEP_LABELS[p.sleep]}</span>
                <span style={tagStyle}>{STUDY_LABELS[p.study]}</span>
                <span style={tagStyle}>{DIET_LABELS[p.dietary]}</span>
              </div>
              <p style={{ fontSize:'0.78rem', color:'var(--color-text-muted)', marginBottom:'0.3rem' }}>{p.hostel}</p>
              <p style={{ fontSize:'0.78rem', color:'var(--color-text-muted)' }}>{p.hobbies.join(', ')}</p>
              <a href={`https://wa.me/?text=Hi ${p.name}, I came across your roommate profile on StuNest!`} target="_blank" rel="noopener noreferrer"
                style={{ display:'block', marginTop:'1rem', padding:'0.6rem', background:'#25D366', color:'#fff', borderRadius:'8px', fontWeight:700, fontSize:'0.82rem', textAlign:'center', textDecoration:'none' }}>
                Connect on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
