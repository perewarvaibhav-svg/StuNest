import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Layouts & Guards
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

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
        {/* Standalone auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Public pages with shared Navbar + Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hostel/:id" element={<HostelDetailsPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="roommate" element={<RoommatePage />} />

          {/* Protected: any logged-in user */}
          <Route path="shortlist" element={
            <ProtectedRoute><ShortlistPage /></ProtectedRoute>
          } />
          <Route path="student" element={
            <ProtectedRoute><StudentDashboard /></ProtectedRoute>
          } />
        </Route>

        {/* Protected dashboards */}
        <Route path="/owner/*" element={
          <ProtectedRoute roles={['owner', 'admin']}><OwnerDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/*" element={
          <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;


