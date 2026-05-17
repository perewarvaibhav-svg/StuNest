import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'var(--color-background)' }}>
        <div style={{ width:'40px', height:'40px', border:'3px solid var(--color-border)', borderTopColor:'var(--color-primary)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (!user) {
    // Redirect to login, preserving the intended destination
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(profile?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
