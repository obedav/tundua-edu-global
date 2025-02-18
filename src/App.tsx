import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/components/context/AuthContext';
import { useAuth } from '@/hooks/auth/useAuth';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/common/Footer';
import Login from '@/hooks/auth/Login';
import Registration from '@/hooks/auth/Registration';
import UserDashboard from '@/components/common/dashboard/UserDashboard';
import About from '@/components/pages/About';
import ContactUs from '@/components/pages/ContactUs';
import CourseDetail from '@/components/pages/CourseDetail';
import Courses from '@/components/pages/courses';
import Home from '@/components/pages/Home';
import SearchResults from '@/components/pages/SearchResults';
import Profile from '@/components/pages/Profile';
import Universities from '@/components/pages/Universities';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/search" element={<SearchResults />} /> {/* Added search route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;