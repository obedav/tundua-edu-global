import React, { useEffect, useState } from 'react';
import { Award, Clock, BookOpen, ChevronRight, BookMarked } from 'lucide-react';

// Interface for Course structure
interface Course {
  id: string;
  title: string;
  university: string;
  imageUrl: string;
  progress: number;
  lastAccessed?: Date;
}

// Mock authentication context (replace with actual implementation)
const useAuth = () => {
  // Simulated user object
  const user = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  return { user };
};

const UserDashboard: React.FC = () => {
  // State to manage user courses
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use authentication hook
  const { user } = useAuth();

  // Fetch user courses effect
  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) {
        setError('User not authenticated');
        setIsLoading(false);
        return;
      }

      try {
        // Mock course data
        const mockCourses: Course[] = [
          {
            id: 'course1',
            title: 'Introduction to Computer Science',
            university: 'Tech University',
            imageUrl: '/api/placeholder/400/250',
            progress: 45,
            lastAccessed: new Date()
          },
          {
            id: 'course2',
            title: 'Data Structures and Algorithms',
            university: 'Code Academy',
            imageUrl: '/api/placeholder/400/250',
            progress: 75,
            lastAccessed: new Date()
          }
        ];

        setCourses(mockCourses);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // Render empty state
  if (courses.length === 0) {
    return (
      <div className="p-6 text-center">
        <BookOpen className="mx-auto w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No Courses Yet</h2>
        <p className="text-gray-600">Explore and enroll in courses to get started!</p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  // Render courses
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Course Image */}
            <div className="relative">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              {/* Progress Overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200"
                aria-label="Course Progress"
              >
                <div 
                  className="bg-blue-500 h-full" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Course Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.university}</p>

              {/* Course Stats */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{course.progress}% Complete</span>
                </div>
                
                <button 
                  className="flex items-center text-blue-500 hover:text-blue-600"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Dashboard Insights */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {/* Achievements */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <Award className="mx-auto w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold">Achievements</h3>
          <p className="text-gray-600">0 Badges Earned</p>
        </div>

        {/* Completed Courses */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <BookMarked className="mx-auto w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-gray-600">0 Courses</p>
        </div>

        {/* Learning Time */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <Clock className="mx-auto w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold">Learning Time</h3>
          <p className="text-gray-600">0 Hours</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;