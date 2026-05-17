import { useState, useEffect } from 'react';
import { hostelsApi, collegesApi } from '../lib/api';
import supabase from '../lib/supabase';

export const STATIC_HOSTELS = [
  { id: '1', name: 'Sunrise Premium Boys Hostel', address: 'Near JNTUH, Kukatpally', price: 8500, category: 'boys', type: 'hostel', rating: 4.8, review_count: 124, is_premium: true, is_verified: true, distance: 0.5, phone: '+91 98765 43210', vacancy_count: 3, facilities: ['ac', 'wifi', 'food', 'laundry', 'security', 'gym'], images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200','https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200'], lat: 17.4910, lng: 78.3930, description: 'Sunrise Premium Boys Hostel offers a modern and comfortable living experience for B.Tech and engineering students. Located just 0.5 km from JNTUH, the hostel provides fully furnished rooms with high-speed Wi-Fi, 3 meals a day, 24/7 security, and a dedicated study room.' },
  { id: '2', name: 'Cozy Living PG for Girls', address: 'KPHB Colony, Near JNTUH', price: 6000, category: 'girls', type: 'pg', rating: 4.2, review_count: 89, is_premium: false, is_verified: true, distance: 1.2, phone: '+91 91234 56789', vacancy_count: 2, facilities: ['wifi', 'food', 'security', 'study table'], images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200','https://images.unsplash.com/photo-1502672260266-1c1de2d96674?q=80&w=1200'], lat: 17.4850, lng: 78.3900, description: 'A safe, hygienic, and comfortable PG exclusively for girls with strict security protocols and CCTV surveillance.' },
  { id: '3', name: 'Elite Unisex Co-living', address: 'Gachibowli, Near CBIT', price: 12000, category: 'both', type: 'hostel', rating: 4.9, review_count: 210, is_premium: true, is_verified: true, distance: 2.0, phone: '+91 99887 76655', vacancy_count: 0, facilities: ['ac', 'wifi', 'food', 'laundry', 'security', 'parking', 'pool'], images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200','https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200'], lat: 17.4200, lng: 78.3400, description: 'Premium co-living with rooftop pool, world-class gym, and fully air-conditioned rooms.' },
  { id: '4', name: 'Student Nest PG', address: 'Gandipet, Near CBIT', price: 5500, category: 'boys', type: 'pg', rating: 3.9, review_count: 45, is_premium: false, is_verified: false, distance: 0.8, phone: '+91 98000 11111', vacancy_count: 5, facilities: ['wifi', 'food', 'study table'], images: ['https://images.unsplash.com/photo-1502672260266-1c1de2d96674?q=80&w=1200'], lat: 17.3850, lng: 78.3250, description: 'Budget-friendly PG for boys near CBIT with essential amenities.' },
  { id: '5', name: 'Royal Heritage Girls Hostel', address: 'Kompally, Near CMRIT', price: 15000, category: 'girls', type: 'hostel', rating: 4.7, review_count: 320, is_premium: true, is_verified: true, distance: 0.2, phone: '+91 98001 12345', vacancy_count: 1, facilities: ['ac', 'wifi', 'food', 'laundry', 'security', 'gym', 'library'], images: ['https://images.unsplash.com/photo-1596276020587-804acfc1a329?q=80&w=1200','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200'], lat: 17.6000, lng: 78.4900, description: 'Our most prestigious property with personal library, gym, and 24-hour trained security exclusively for girls.' },
  { id: '6', name: 'Budget Boys PG', address: 'Medchal, Near CMRIT', price: 4500, category: 'boys', type: 'pg', rating: 3.5, review_count: 67, is_premium: false, is_verified: false, distance: 1.5, phone: '+91 97000 22222', vacancy_count: 8, facilities: ['wifi'], images: ['https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1200'], lat: 17.6100, lng: 78.4800, description: 'Most affordable PG option for boys near CMRIT campus.' },
  { id: '7', name: 'Green View Co-living', address: 'Dundigal, Near MLRIT', price: 10500, category: 'both', type: 'pg', rating: 4.5, review_count: 156, is_premium: true, is_verified: true, distance: 0.3, phone: '+91 97654 32109', vacancy_count: 4, facilities: ['ac', 'wifi', 'food', 'security', 'balcony'], images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200'], lat: 17.5800, lng: 78.4350, description: 'Lush green campus environment with private balconies and fully air-conditioned rooms.' },
  { id: '8', name: 'Safe Haven Girls PG', address: 'Bachupally, Near VNR', price: 7500, category: 'girls', type: 'pg', rating: 4.1, review_count: 92, is_premium: false, is_verified: true, distance: 0.9, phone: '+91 96000 33333', vacancy_count: 3, facilities: ['wifi', 'food', 'laundry', 'security'], images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200'], lat: 17.5450, lng: 78.3800, description: 'Safe, clean PG for girls with 24/7 CCTV and female warden.' },
];

export const STATIC_COLLEGES = [
  { id: 'c1', name: 'CMRIT Hyderabad', short_name: 'CMRIT', lat: 17.6041, lng: 78.4866 },
  { id: 'c2', name: 'JNTUH', short_name: 'JNTUH', lat: 17.4933, lng: 78.3914 },
  { id: 'c3', name: 'CBIT Hyderabad', short_name: 'CBIT', lat: 17.3916, lng: 78.3193 },
  { id: 'c4', name: 'MLRIT Dundigal', short_name: 'MLRIT', lat: 17.5878, lng: 78.4326 },
  { id: 'c5', name: 'VNR VJIET', short_name: 'VNR', lat: 17.5385, lng: 78.3854 },
  { id: 'c6', name: 'IIIT Hyderabad', short_name: 'IIIT-H', lat: 17.4452, lng: 78.3489 },
  { id: 'c7', name: 'Osmania University', short_name: 'OU', lat: 17.4127, lng: 78.5188 },
];

export function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1);
}

export function useHostels() {
  const [hostels, setHostels] = useState(STATIC_HOSTELS);
  const [colleges, setColleges] = useState(STATIC_COLLEGES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [h, c] = await Promise.all([hostelsApi.getAll(), collegesApi.getAll()]);
        if (h.length) setHostels(h);
        if (c.length) setColleges(c);
      } catch (_) {}
      setLoading(false);
    }
    load();
  }, []);

  return { hostels, colleges, loading };
}

// Real-time enabled hostel detail hook
export function useHostelById(id) {
  const [hostel, setHostel] = useState(() => STATIC_HOSTELS.find(h => h.id === id) || null);
  const [loading, setLoading] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(null); // tracks live vacancy changes

  useEffect(() => {
    if (!id) return;

    // Initial load
    async function load() {
      setLoading(true);
      try {
        const data = await hostelsApi.getById(id);
        if (data) setHostel(data);
      } catch (_) {
        const fallback = STATIC_HOSTELS.find(h => h.id === id);
        if (fallback) setHostel(fallback);
      }
      setLoading(false);
    }
    load();

    // Real-time subscription for vacancy_count & status changes
    const channel = supabase
      .channel(`hostel-${id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'hostels',
        filter: `id=eq.${id}`
      }, (payload) => {
        setHostel(prev => prev ? { ...prev, ...payload.new } : payload.new);
        // Show a flash notification if vacancy changes
        if (payload.old?.vacancy_count !== payload.new?.vacancy_count) {
          setLiveUpdate(`🔴 Live: Vacancy updated to ${payload.new.vacancy_count} rooms`);
          setTimeout(() => setLiveUpdate(null), 4000);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  return { hostel, loading, liveUpdate };
}
