import { useAuth } from "@/components/context/AuthContext";
import { useState, useEffect } from 'react';

interface Course {
  id: string;
  title: string;
  university: string;
  imageUrl: string;
  progress: number;
  lastAccessed: Date;
}

interface DashboardStats {
  coursesInProgress: number;
  coursesCompleted: number;
  certificatesEarned: number;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    coursesInProgress: 0,
    coursesCompleted: 0,
    certificatesEarned: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulated data - replace with actual API call
        const courses: Course[] = [
          {
            id: '1',
            title: 'Introduction to Computer Science',
            university: 'Tech University',
            imageUrl: '/api/placeholder/400/300',
            progress: 65,
            lastAccessed: new Date('2024-02-01')
          },
          {
            id: '2',
            title: 'Data Structures and Algorithms',
            university: 'Tech University',
            imageUrl: '/api/placeholder/400/300',
            progress: 30,
            lastAccessed: new Date('2024-02-03')
          }
        ];

        setEnrolledCourses(courses);
        
        // Calculate stats based on courses
        setStats({
          coursesInProgress: courses.filter(course => course.progress > 0 && course.progress < 100).length,
          coursesCompleted: courses.filter(course => course.progress === 100).length,
          certificatesEarned: courses.filter(course => course.progress === 100).length
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your dashboard</div>;
  }

  const userName = user.name || 'Student';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="bg-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white">
            Welcome back, {userName}!
          </h2>
          <p className="text-indigo-100 mt-2">
            Continue your learning journey
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-xl font-bold">{stats.coursesInProgress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-xl font-bold">{stats.coursesCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Certificates</p>
                  <p className="text-xl font-bold">{stats.certificatesEarned}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Enrolled Courses</h3>
              <ul className="mt-4 space-y-4">
                {enrolledCourses.map(course => (
                  <li key={course.id} className="border-b pb-4">
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.university}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-600">Progress: {course.progress}%</span>
                        <span className="text-sm text-gray-600">
                          Last Accessed: {course.lastAccessed.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;