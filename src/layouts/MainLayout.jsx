import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatbot from '../components/AIChatbot';

function MainLayout() {
  const location = useLocation();
  // Don't show global chatbot on hostel details page (it has its own hostel-aware one)
  const isDetailPage = location.pathname.startsWith('/hostel/');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      {/* Global AI chatbot — shown on all pages except hostel detail (which has its own) */}
      {!isDetailPage && <AIChatbot />}
    </div>
  );
}

export default MainLayout;
