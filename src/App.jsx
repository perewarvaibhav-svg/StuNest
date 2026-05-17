import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import HostelDetailsPage from './pages/HostelDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ShortlistPage from './pages/ShortlistPage';
import ComparePage from './pages/ComparePage';
import RoommatePage from './pages/RoommatePage';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Standalone full-screen auth pages (no navbar/footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* All other pages with shared Navbar + Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hostel/:id" element={<HostelDetailsPage />} />
          <Route path="shortlist" element={<ShortlistPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="roommate" element={<RoommatePage />} />
          <Route path="student" element={<StudentDashboard />} />
        </Route>

        {/* Dashboards with their own layouts */}
        <Route path="/owner/*" element={<OwnerDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
