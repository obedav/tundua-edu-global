import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import { Menu, X, Search } from 'lucide-react';
import '../styles/components/navbar.css';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  children, 
  className = '', 
  onClick 
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`nav-link ${isActive ? 'nav-link-active' : ''} ${className}`}
    >
      {children}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { name: 'Courses', path: '/courses' },
    { name: 'Universities', path: '/universities' }
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeMobileMenu();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Desktop Navigation */}
        <Link to="/" className="navbar-brand">
          Tundua Edu Global
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navigationItems.map(({ name, path }) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center max-w-xs relative"
        >
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search"
          />
          <button
            type="submit"
            className="search-button"
            aria-label="Submit search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Desktop Authentication */}
        <div className="hidden md:block">
          {user ? (
            <div className="auth-buttons">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button 
                onClick={logout}
                className="login-button"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                Login
              </Link>
              <Link to="/register" className="signup-button">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
              Tundua EDU
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mobile-search-container">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
              aria-label="Search"
            />
            <button
              type="submit"
              className="mobile-search-button"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <div className="mobile-menu-links">
            {navigationItems.map(({ name, path }) => (
              <NavLink 
                key={path} 
                to={path}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {name}
              </NavLink>
            ))}
            
            {user ? (
              <>
                <NavLink 
                  to="/dashboard" 
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
                <button 
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="mobile-nav-link text-left w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="signup-button w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;