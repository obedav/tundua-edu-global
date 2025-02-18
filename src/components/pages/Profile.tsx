import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  BookOpen,
  Calendar,
  Edit 
} from 'lucide-react';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  enrolledCourses: number;
  joinDate: string;
}

const Profile: React.FC = () => {
  useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock profile data - replace with actual user data
  const [profileData] = useState<ProfileData>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    education: 'Bachelor of Science',
    enrolledCourses: 3,
    joinDate: 'January 2024'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add your save logic here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="bg-indigo-600 rounded-t-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-500 rounded-full p-3">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{profileData.fullName}</h1>
                <p className="text-indigo-200">Student</p>
              </div>
            </div>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="px-4 py-2 bg-white text-indigo-600 rounded-md flex items-center space-x-2 hover:bg-indigo-50 transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{profileData.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">{profileData.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Educational Details</h2>
              
              <div className="flex items-center space-x-3">
                <School className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Education Level</p>
                  <p className="text-gray-900">{profileData.education}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Enrolled Courses</p>
                  <p className="text-gray-900">{profileData.enrolledCourses} courses</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">{profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">Current Courses</h3>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">{profileData.enrolledCourses}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">Completed Courses</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">2</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">Certificates Earned</h3>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;