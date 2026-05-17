import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Shield, CheckCircle, ArrowLeft, Phone, MessageCircle, Navigation, ChevronLeft, ChevronRight, Heart, GitCompare, Zap, Users, UtensilsCrossed, AlertTriangle, HelpCircle, Camera } from 'lucide-react';
import { useHostelById } from '../hooks/useHostels';
import { reviewsApi, enquiriesApi, qaApi, grievancesApi } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import AIChatbot from '../components/AIChatbot';
import styles from './HostelDetailsPage.module.css';

const FACILITY_ICONS = { ac:'❄️', wifi:'📶', food:'🍽️', laundry:'👕', security:'🔒', gym:'💪', library:'📚', parking:'🚗', pool:'🏊', balcony:'🌿', 'study table':'📖' };
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const STATIC_REVIEWS = [
  { id:1, profiles:{full_name:'Rahul K.'}, college:'JNTUH CSE', rating:5, created_at:'2024-03-01', body:'Best hostel experience! Wi-Fi is lightning fast and food is great.', pros:['Wi-Fi','Food'], cons:[] },
  { id:2, profiles:{full_name:'Priya S.'}, college:'JNTUH IT', rating:4, created_at:'2024-01-15', body:'Very safe and clean. Warden is cooperative. Slightly far from bus stop.', pros:['Safety','Cleanliness'], cons:['Distance from bus stop'] },
  { id:3, profiles:{full_name:'Aditya M.'}, college:'JNTUH ECE', rating:5, created_at:'2023-12-20', body:'Gym and study room make it perfect. Highly recommended!', pros:['Gym','Study room'], cons:[] },
];

function Stars({ n }) {
  return <div style={{display:'flex',gap:'2px'}}>{[1,2,3,4,5].map(i=><Star key={i} size={14} fill={i<=n?'#F59E0B':'none'} color={i<=n?'#F59E0B':'#D1D5DB'}/>)}</div>;
}

function Tab({ label, active, onClick, count }) {
  return (
    <button className={`${styles.tab} ${active?styles.tabActive:''}`} onClick={onClick}>
      {label}{count!=null && <span className={styles.tabCount}>{count}</span>}
    </button>
  );
}

export default function HostelDetailsPage() {
  const { id } = useParams();
  const { hostel, loading, liveUpdate } = useHostelById(id);
  const { user } = useAuth();

  const [imgIdx, setImgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('about');
  const [shortlisted, setShortlisted] = useState(false);

  // Enquiry form
  const [enqForm, setEnqForm] = useState({ name:'', phone:'', college:'', message:'', moveIn:'' });
  const [enqSent, setEnqSent] = useState(false);
  const [enqLoading, setEnqLoading] = useState(false);

  // Review form
  const [revForm, setRevForm] = useState({ rating:5, body:'', pros:'', cons:'' });
  const [revSent, setRevSent] = useState(false);

  // Grievance form
  const [grvForm, setGrvForm] = useState({ category:'maintenance', title:'', description:'' });
  const [grvSent, setGrvSent] = useState(false);

  // Q&A
  const [question, setQuestion] = useState('');
  const [qaSent, setQaSent] = useState(false);

  if (loading) return <div className={styles.loadingScreen}><div className={styles.spinner}/></div>;

  // Live update toast
  const LiveToast = liveUpdate ? (
    <div style={{ position:'fixed', top:'80px', left:'50%', transform:'translateX(-50%)', background:'#1E293B', color:'#fff', padding:'0.65rem 1.25rem', borderRadius:'100px', fontSize:'0.85rem', fontWeight:600, zIndex:9999, boxShadow:'0 8px 24px rgba(0,0,0,0.2)', animation:'slideDown 0.3s ease' }}>
      {liveUpdate}
    </div>
  ) : null;
  if (!hostel) return <div className={styles.notFound}><h2>Hostel not found</h2><Link to="/search">← Back to Search</Link></div>;

  const images = hostel.images || [hostel.image].filter(Boolean);
  const reviews = STATIC_REVIEWS;
  const avgRating = hostel.rating || (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1);

  const whatsappNum = (hostel.whatsapp||hostel.phone||'').replace(/\D/g,'');
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi, I'm interested in ${hostel.name} on StuNest.`;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hostel.lat},${hostel.lng}`;

  const sendEnquiry = async (e) => {
    e.preventDefault();
    setEnqLoading(true);
    try {
      await enquiriesApi.send({ hostelId:hostel.id, ownerId:hostel.owner_id, studentId:user?.id, studentName:enqForm.name, studentPhone:enqForm.phone, studentCollege:enqForm.college, message:enqForm.message, moveInDate:enqForm.moveIn });
      setEnqSent(true);
    } catch { setEnqSent(true); }
    setEnqLoading(false);
  };

  const sendReview = async (e) => {
    e.preventDefault();
    try {
      await reviewsApi.create({ hostelId:hostel.id, userId:user?.id, rating:revForm.rating, body:revForm.body, pros:revForm.pros.split(',').map(s=>s.trim()).filter(Boolean), cons:revForm.cons.split(',').map(s=>s.trim()).filter(Boolean) });
    } catch {}
    setRevSent(true);
  };

  const sendGrievance = async (e) => {
    e.preventDefault();
    try {
      await grievancesApi.create({ hostelId:hostel.id, studentId:user?.id, ...grvForm, priority:'medium' });
    } catch {}
    setGrvSent(true);
  };

  const sendQuestion = async (e) => {
    e.preventDefault();
    try { await qaApi.askQuestion({ hostelId:hostel.id, userId:user?.id, question }); } catch {}
    setQaSent(true);
  };

  return (
    <div className={styles.page}>
      {LiveToast}
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/search" className={styles.backLink}><ArrowLeft size={16}/> Back to Search</Link>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>

          {/* ======= LEFT ======= */}
          <div className={styles.main}>

            {/* Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImgWrap}>
                <img src={images[imgIdx]} alt={hostel.name} className={styles.mainImg}/>
                {images.length>1 && <>
                  <button onClick={()=>setImgIdx(i=>i===0?images.length-1:i-1)} className={`${styles.navBtn} ${styles.navLeft}`}><ChevronLeft size={20}/></button>
                  <button onClick={()=>setImgIdx(i=>i===images.length-1?0:i+1)} className={`${styles.navBtn} ${styles.navRight}`}><ChevronRight size={20}/></button>
                </>}
                {hostel.is_premium && <div className={styles.premiumBadge}><Star size={12} fill="currentColor"/> Premium</div>}
                {hostel.is_verified && <div className={styles.verifiedBadge}><CheckCircle size={12}/> Verified</div>}
                <div className={styles.imgCounter}>{imgIdx+1}/{images.length}</div>
              </div>
              {images.length>1 && (
                <div className={styles.thumbs}>
                  {images.map((img,i)=>(
                    <img key={i} src={img} onClick={()=>setImgIdx(i)} className={`${styles.thumb} ${imgIdx===i?styles.thumbActive:''}`} alt={`View ${i+1}`}/>
                  ))}
                </div>
              )}
            </div>

            {/* Header Info */}
            <div className={styles.headerInfo}>
              <div className={styles.titleRow}>
                <div>
                  <h1 className={styles.hostelName}>{hostel.name}</h1>
                  <div className={styles.addrRow}><MapPin size={16} color="#FF5A6E"/><span>{hostel.address}</span></div>
                </div>
                <div className={styles.ratingBox}>
                  <Star size={16} fill="#F59E0B" color="#F59E0B"/>
                  <span className={styles.ratingNum}>{avgRating}</span>
                  <span className={styles.ratingCount}>({hostel.review_count||reviews.length})</span>
                </div>
              </div>
              <div className={styles.tagRow}>
                <span className={styles.tag}>{hostel.category==='both'?'Unisex':hostel.category==='boys'?'👦 Boys':'👧 Girls'}</span>
                <span className={styles.tag}>{hostel.type?.toUpperCase()}</span>
                {hostel.distance!=null && <span className={styles.tagDist}><MapPin size={12}/>{hostel.distance} km from college</span>}
                {hostel.vacancy_count!=null && (
                  <span className={`${styles.vacTag} ${hostel.vacancy_count===0?styles.vacFull:hostel.vacancy_count<=2?styles.vacLow:styles.vacOk}`}>
                    {hostel.vacancy_count===0?'Fully Booked':`${hostel.vacancy_count} Rooms Available`}
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              {[['about','About'],['facilities','Facilities & Amenities'],['rooms','Rooms'],['food','Food Menu'],['reviews','Reviews',reviews.length],['qa','Q&A'],['grievance','Grievance'],['emergency','Emergency Contacts']].map(([id,label,count])=>(
                <Tab key={id} label={label} count={count} active={activeTab===id} onClick={()=>setActiveTab(id)}/>
              ))}
            </div>

            {/* About Tab */}
            {activeTab==='about' && (
              <div className={styles.tabContent}>
                <h2 className={styles.secTitle}>About this property</h2>
                <p className={styles.desc}>{hostel.description}</p>

                {/* Map */}
                <h2 className={styles.secTitle} style={{marginTop:'1.5rem'}}>Location</h2>
                <div className={styles.mapBox}>
                  <iframe
                    title="Hostel location"
                    src={`https://maps.google.com/maps?q=${hostel.lat},${hostel.lng}&z=15&output=embed`}
                    width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"
                  />
                </div>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.dirBtn}><Navigation size={16}/> Open in Google Maps</a>
              </div>
            )}

            {/* Facilities Tab */}
            {activeTab==='facilities' && (
              <div className={styles.tabContent}>
                <h2 className={styles.secTitle}>Facilities & Amenities</h2>
                <div className={styles.facGrid}>
                  {(hostel.facilities||[]).map((f,i)=>(
                    <div key={i} className={styles.facItem}>
                      <span className={styles.facEmoji}>{FACILITY_ICONS[f]||'✅'}</span>
                      <span style={{textTransform:'capitalize'}}>{f}</span>
                    </div>
                  ))}
                </div>
                {hostel.deposit_amount>0 && (
                  <div className={styles.infoBox}>
                    <p><strong>Security Deposit:</strong> ₹{hostel.deposit_amount?.toLocaleString('en-IN')}</p>
                    <p><strong>Notice Period:</strong> {hostel.notice_period_days||30} days</p>
                  </div>
                )}
              </div>
            )}

            {/* Rooms Tab */}
            {activeTab==='rooms' && (
              <div className={styles.tabContent}>
                <h2 className={styles.secTitle}>Room Types & Pricing</h2>
                {hostel.room_types?.length>0 ? (
                  <div className={styles.roomGrid}>
                    {hostel.room_types.map(r=>(
                      <div key={r.id} className={styles.roomCard}>
                        <div className={styles.roomHeader}>
                          <h3>{r.name}</h3>
                          <span className={r.available>0?styles.roomAvail:styles.roomFull}>{r.available>0?`${r.available} available`:'Full'}</span>
                        </div>
                        <p className={styles.roomPrice}>₹{r.price?.toLocaleString('en-IN')}<span>/month</span></p>
                        <p className={styles.roomCap}>👥 {r.capacity} person{r.capacity>1?'s':''} per room</p>
                        {r.amenities?.length>0 && <div className={styles.roomFacs}>{r.amenities.map((a,i)=><span key={i}>{a}</span>)}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.roomCard}>
                    <h3>Standard Room</h3>
                    <p className={styles.roomPrice}>₹{hostel.price?.toLocaleString('en-IN')}<span>/month</span></p>
                    <p style={{color:'var(--color-text-muted)',fontSize:'0.875rem'}}>Contact owner for room type details.</p>
                  </div>
                )}
              </div>
            )}

            {/* Food Menu Tab */}
            {activeTab==='food' && (
              <div className={styles.tabContent}>
                <h2 className={styles.secTitle}>Weekly Food Menu</h2>
                {hostel.food_menus?.length>0 ? (
                  <div className={styles.menuGrid}>
                    {DAYS.map((day,di)=>{
                      const dayMenus = hostel.food_menus.filter(m=>m.day_of_week===di);
                      return (
                        <div key={di} className={styles.menuDay}>
                          <div className={styles.menuDayName}>{day}</div>
                          {['breakfast','lunch','dinner'].map(meal=>{
                            const m = dayMenus.find(x=>x.meal_type===meal);
                            return m ? (
                              <div key={meal} className={styles.menuMeal}>
                                <span className={styles.mealType}>{meal}</span>
                                <span>{m.items?.join(', ')}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <UtensilsCrossed size={40} className={styles.emptyIcon}/>
                    <p>Food menu not yet uploaded by owner.</p>
                    <p style={{fontSize:'0.85rem',color:'var(--color-text-muted)'}}>Contact the owner to get the mess schedule.</p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab==='reviews' && (
              <div className={styles.tabContent}>
                <div className={styles.reviewSummary}>
                  <div className={styles.bigRating}>
                    <span className={styles.bigRatingNum}>{avgRating}</span>
                    <Stars n={Math.round(Number(avgRating))}/>
                    <span style={{fontSize:'0.85rem',color:'var(--color-text-muted)'}}>{reviews.length} reviews</span>
                  </div>
                </div>

                <div className={styles.reviewList}>
                  {reviews.map(r=>(
                    <div key={r.id} className={styles.reviewCard}>
                      <div className={styles.revHeader}>
                        <div className={styles.revAvatar}>{r.profiles?.full_name?.charAt(0)||'?'}</div>
                        <div className={styles.revInfo}>
                          <p className={styles.revName}>{r.profiles?.full_name}</p>
                          <p className={styles.revCollege}>{r.college}</p>
                        </div>
                        <div className={styles.revRight}>
                          <Stars n={r.rating}/>
                          <span className={styles.revDate}>{new Date(r.created_at).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</span>
                        </div>
                      </div>
                      <p className={styles.revBody}>{r.body}</p>
                      {r.pros?.length>0 && <div className={styles.revPros}>👍 {r.pros.join(' · ')}</div>}
                      {r.cons?.length>0 && <div className={styles.revCons}>👎 {r.cons.join(' · ')}</div>}
                    </div>
                  ))}
                </div>

                {/* Write a review */}
                {!revSent ? (
                  <form onSubmit={sendReview} className={styles.formCard}>
                    <h3>Write a Review</h3>
                    <div className={styles.starPicker}>
                      {[1,2,3,4,5].map(n=>(
                        <Star key={n} size={28} fill={n<=revForm.rating?'#F59E0B':'none'} color={n<=revForm.rating?'#F59E0B':'#D1D5DB'} style={{cursor:'pointer'}} onClick={()=>setRevForm(f=>({...f,rating:n}))}/>
                      ))}
                    </div>
                    <textarea className={styles.formInput} rows={4} placeholder="Share your experience..." value={revForm.body} onChange={e=>setRevForm(f=>({...f,body:e.target.value}))} required/>
                    <input className={styles.formInput} placeholder="Pros (comma separated)" value={revForm.pros} onChange={e=>setRevForm(f=>({...f,pros:e.target.value}))}/>
                    <input className={styles.formInput} placeholder="Cons (comma separated)" value={revForm.cons} onChange={e=>setRevForm(f=>({...f,cons:e.target.value}))}/>
                    <button type="submit" className={styles.submitBtn}>Submit Review</button>
                  </form>
                ) : <div className={styles.successBox}>✅ Review submitted! Thank you.</div>}
              </div>
            )}

            {/* Q&A Tab */}
            {activeTab==='qa' && (
              <div className={styles.tabContent}>
                <h2 className={styles.secTitle}>Community Q&A</h2>
                <p style={{color:'var(--color-text-muted)',marginBottom:'1rem',fontSize:'0.875rem'}}>Ask current residents or the owner your questions.</p>
                {!qaSent ? (
                  <form onSubmit={sendQuestion} className={styles.formCard}>
                    <h3>Ask a Question</h3>
                    <textarea className={styles.formInput} rows={3} placeholder="e.g. Is food included? Are there visiting hours?" value={question} onChange={e=>setQuestion(e.target.value)} required/>
                    <button type="submit" className={styles.submitBtn}>Post Question</button>
                  </form>
                ) : <div className={styles.successBox}>✅ Question posted! You'll get a notification when answered.</div>}
                <div className={styles.emptyState} style={{marginTop:'1rem'}}>
                  <HelpCircle size={36} className={styles.emptyIcon}/>
                  <p>No questions yet. Be the first to ask!</p>
                </div>
              </div>
            )}

            {/* Grievance Tab */}
            {activeTab==='grievance' && (
              <div className={styles.tabContent}>
                <h2 className={styles.secTitle}>File a Grievance</h2>
                <div className={styles.grievInfo}>
                  <AlertTriangle size={18} color="#F59E0B" style={{flexShrink:0}}/>
                  <p>All complaints are tracked and the hostel owner is notified. Unresolved issues may affect the hostel listing status.</p>
                </div>
                {!grvSent ? (
                  <form onSubmit={sendGrievance} className={styles.formCard}>
                    <select className={styles.formInput} value={grvForm.category} onChange={e=>setGrvForm(f=>({...f,category:e.target.value}))}>
                      {['maintenance','food','cleanliness','security','staff','water','electricity','internet','other'].map(c=>(
                        <option key={c} value={c} style={{textTransform:'capitalize'}}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
                      ))}
                    </select>
                    <input className={styles.formInput} placeholder="Title / Short summary" value={grvForm.title} onChange={e=>setGrvForm(f=>({...f,title:e.target.value}))} required/>
                    <textarea className={styles.formInput} rows={4} placeholder="Describe the issue in detail..." value={grvForm.description} onChange={e=>setGrvForm(f=>({...f,description:e.target.value}))} required/>
                    <button type="submit" className={`${styles.submitBtn} ${styles.submitBtnWarning}`}>Submit Grievance</button>
                  </form>
                ) : <div className={styles.successBox}>✅ Grievance filed! You'll receive updates on its resolution status.</div>}
              </div>
            )}

            {/* Emergency Tab */}
            {activeTab==='emergency' && (
              <div className={styles.tabContent}>
                <h2 className={styles.secTitle}>Emergency Contacts</h2>
                <div className={styles.emergGrid}>
                  {[
                    {label:'Nearest Hospital', name: hostel.emergency_contacts?.nearest_hospital||'Apollo Pharmacy', phone: hostel.emergency_contacts?.hospital_phone||'040-2345-6789'},
                    {label:'Police Station', name: hostel.emergency_contacts?.police_station||'Local Police Station', phone: hostel.emergency_contacts?.police_phone||'100'},
                    {label:'Ambulance', phone:'108'},
                    {label:'Fire Station', phone:'101'},
                    {label:'Warden', name: hostel.emergency_contacts?.warden_name||'Hostel Warden', phone: hostel.emergency_contacts?.warden_phone||hostel.phone},
                  ].map((ec,i)=>(
                    <div key={i} className={styles.emergCard}>
                      <p className={styles.emergLabel}>{ec.label}</p>
                      {ec.name && <p className={styles.emergName}>{ec.name}</p>}
                      <a href={`tel:${ec.phone}`} className={styles.emergPhone}><Phone size={14}/> {ec.phone}</a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ======= SIDEBAR ======= */}
          <aside className={styles.sidebar}>
            {/* Price Card */}
            <div className={styles.sideCard}>
              <div className={styles.priceRow}>
                <span className={styles.priceCur}>₹</span>
                <span className={styles.priceAmt}>{hostel.price?.toLocaleString('en-IN')}</span>
                <span className={styles.pricePer}>/month</span>
              </div>
              {hostel.deposit_amount>0 && <p className={styles.depositNote}>+ ₹{hostel.deposit_amount?.toLocaleString('en-IN')} deposit</p>}
              <div className={styles.featureList}>
                <div className={styles.feature}><CheckCircle size={15} className={styles.checkGreen}/> Free cancellation</div>
                <div className={styles.feature}><CheckCircle size={15} className={styles.checkGreen}/> No brokerage</div>
                {hostel.is_verified && <div className={styles.feature}><Shield size={15} className={styles.checkGreen}/> Verified property</div>}
                {hostel.vacancy_count!=null && (
                  <div className={`${styles.feature} ${hostel.vacancy_count===0?styles.featureRed:hostel.vacancy_count<=2?styles.featureAmber:styles.featureGreen}`}>
                    <Zap size={15}/> {hostel.vacancy_count===0?'Fully Booked':hostel.vacancy_count<=2?`Only ${hostel.vacancy_count} rooms left`:`${hostel.vacancy_count} rooms available`}
                  </div>
                )}
              </div>
              <div className={styles.contactBtns}>
                {whatsappNum && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.waBtn}><MessageCircle size={18}/> WhatsApp Owner</a>}
                {hostel.phone && <a href={`tel:${hostel.phone}`} className={styles.callBtn}><Phone size={18}/> Call Now</a>}
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.dirBtnSm}><Navigation size={18}/> Get Directions</a>
              </div>
              <div className={styles.ownerNote}>Contact the owner directly to schedule a visit or discuss availability.</div>
            </div>

            {/* Quick Info */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Quick Info</h3>
              {[
                ['Type', hostel.type?.charAt(0).toUpperCase()+hostel.type?.slice(1)],
                ['Gender', hostel.category==='both'?'Unisex / Co-living':hostel.category],
                ['Rating', `${avgRating} ⭐ (${hostel.review_count||reviews.length} reviews)`],
                ...(hostel.distance!=null?[['Distance',`${hostel.distance} km from campus`]]:[]),
                ['Category', hostel.is_premium?'⭐ Premium':'Standard'],
                ...(hostel.notice_period_days?[['Notice Period',`${hostel.notice_period_days} days`]]:[]),
              ].map(([k,v])=>(
                <div key={k} className={styles.quickRow}><span>{k}</span><strong>{v}</strong></div>
              ))}
            </div>

            {/* Enquiry Form */}
            {!enqSent ? (
              <div className={styles.sideCard}>
                <h3 className={styles.sideCardTitle}>Send Enquiry</h3>
                <form onSubmit={sendEnquiry} className={styles.enqForm}>
                  <input className={styles.enqInput} placeholder="Your Name" value={enqForm.name} onChange={e=>setEnqForm(f=>({...f,name:e.target.value}))} required/>
                  <input className={styles.enqInput} placeholder="Phone Number" value={enqForm.phone} onChange={e=>setEnqForm(f=>({...f,phone:e.target.value}))} required/>
                  <input className={styles.enqInput} placeholder="Your College" value={enqForm.college} onChange={e=>setEnqForm(f=>({...f,college:e.target.value}))}/>
                  <input className={styles.enqInput} type="date" placeholder="Expected move-in date" value={enqForm.moveIn} onChange={e=>setEnqForm(f=>({...f,moveIn:e.target.value}))}/>
                  <textarea className={styles.enqInput} rows={3} placeholder="Your message..." value={enqForm.message} onChange={e=>setEnqForm(f=>({...f,message:e.target.value}))} required/>
                  <button type="submit" className={styles.enqBtn} disabled={enqLoading}>{enqLoading?'Sending...':'Send Enquiry'}</button>
                </form>
              </div>
            ) : <div className={styles.successBox}>✅ Enquiry sent! The owner will contact you soon.</div>}

            {/* Token Booking */}
            {hostel.vacancy_count>0 && (
              <div className={`${styles.sideCard} ${styles.bookingCard}`}>
                <h3 className={styles.sideCardTitle}>🎟️ Token Booking</h3>
                <p style={{fontSize:'0.85rem',color:'var(--color-text-muted)',marginBottom:'0.75rem'}}>Reserve your room with a ₹200 token. Holds the room for 48 hours.</p>
                <button className={styles.bookBtn} onClick={()=>alert('Connect Supabase + payment gateway to enable token booking.')}>Book with ₹200 Token</button>
              </div>
            )}
          </aside>
        </div>
      </div>
      {/* Hostel-context AI Chatbot */}
      <AIChatbot hostel={hostel} />
    </div>
  );
}
