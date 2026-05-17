/**
 * Google Maps Distance & Hostel Verification Utilities
 *
 * Uses the Maps JavaScript API (for embedding) and
 * Distance Matrix API (for verified road-distance calculation).
 *
 * Required: VITE_GOOGLE_MAPS_API_KEY in .env
 * Enable in Google Cloud Console:
 *   - Maps JavaScript API
 *   - Distance Matrix API
 *   - Places API (optional, for address autocomplete)
 */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Calculate haversine straight-line distance (km) as a fast fallback.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

/**
 * Fetch verified road distance + walk/drive duration via
 * Google Distance Matrix API (returns null if no API key).
 */
export async function fetchRoadDistance(originLat, originLng, destLat, destLng) {
  if (!API_KEY) return null;
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&mode=walking&units=metric&key=${API_KEY}`;
    // Note: Direct client-side calls to Distance Matrix are blocked by CORS.
    // In production, proxy this through a Supabase Edge Function or Vercel API route.
    // For now we return null and fall back to haversine.
    return null;
  } catch {
    return null;
  }
}

/**
 * Build a Google Maps embed URL for displaying the hostel location.
 */
export function buildMapEmbedUrl(lat, lng, zoom = 15) {
  if (API_KEY) {
    return `https://www.google.com/maps/embed/v1/view?key=${API_KEY}&center=${lat},${lng}&zoom=${zoom}&maptype=roadmap`;
  }
  // Fallback: no-key embed (limited to 100k loads/month, no API key shown)
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

/**
 * Build a Google Maps directions embed URL (origin=college → dest=hostel).
 */
export function buildDirectionsEmbedUrl(originLat, originLng, destLat, destLng) {
  if (API_KEY) {
    return `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${originLat},${originLng}&destination=${destLat},${destLng}&mode=walking`;
  }
  return `https://maps.google.com/maps?saddr=${originLat},${originLng}&daddr=${destLat},${destLng}&output=embed`;
}

/**
 * Build an external link to open Google Maps with directions.
 */
export function buildDirectionsUrl(destLat, destLng, originLat, originLng) {
  if (originLat && originLng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=walking`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`;
}

/**
 * Build a Google Maps search URL for a hostel name + address.
 */
export function buildSearchUrl(name, address) {
  const query = encodeURIComponent(`${name}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Compute distances from a college to all hostels.
 * Uses haversine (instant, no API call needed).
 * Returns hostels sorted nearest first with distance attached.
 */
export function sortHostelsByDistance(hostels, collegeLat, collegeLng) {
  return hostels
    .map(h => ({
      ...h,
      distance: h.lat && h.lng
        ? haversineDistance(collegeLat, collegeLng, h.lat, h.lng)
        : null,
    }))
    .sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });
}

/**
 * Verify a hostel's listed distance against the computed haversine distance.
 * Returns { verified: boolean, computedKm: number, listedKm: number, delta: number }
 */
export function verifyHostelDistance(hostel, collegeLat, collegeLng) {
  if (!hostel.lat || !hostel.lng || !collegeLat || !collegeLng) {
    return { verified: false, computedKm: null, listedKm: hostel.distance, delta: null };
  }
  const computed = haversineDistance(collegeLat, collegeLng, hostel.lat, hostel.lng);
  const listed = hostel.distance;
  const delta = listed != null ? Math.abs(computed - listed) : null;
  // Allow up to 0.5 km tolerance between listed and computed distance
  const verified = delta !== null ? delta <= 0.5 : false;
  return { verified, computedKm: computed, listedKm: listed, delta };
}
