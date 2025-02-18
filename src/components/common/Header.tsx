// src/components/common/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth'; // Ensure this path is correct or update it to the correct path
import { Menu, Search, Bell, ChevronDown, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Tundua EDU"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Tundua EDU</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                to="/courses"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/courses')
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Courses
              </Link>
              <Link
                to="/universities"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/universities')
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Universities
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/about')
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/contact')
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Search className="h-5 w-5" />
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50"
                  >
                    <img
                      src={(user as any).avatar || '/default-avatar.png'}
                      alt="User avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Courses
            </Link>
            <Link
              to="/universities"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Universities
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Contact
            </Link>
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <img
                  src={(user as any).avatar || '/default-avatar.png'}
                  alt="User avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{(user as any).name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-4 space-y-2">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setIsSearchOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSearch} className="p-4">
                <div className="flex items-center border-b border-gray-200">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="flex-1 p-2 pl-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;