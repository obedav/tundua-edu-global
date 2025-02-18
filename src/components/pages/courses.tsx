import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  university: string;
  level: string;
  duration: string;
  image: string;
  description: string;
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Computer Science',
    university: 'University of Technology',
    level: "Bachelor's Degree",  // Changed to double quotes
    duration: '4 years',
    image: '/api/placeholder/400/300',
    description: 'Comprehensive program covering programming, algorithms, and software development.'
  },
  {
    id: '2',
    title: 'Business Administration',
    university: 'Business School International',
    level: "Master's Degree",  // Changed to double quotes
    duration: '2 years',
    image: '/api/placeholder/400/300',
    description: 'Advanced study of business management and organizational leadership.'
  }
];

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Courses</h1>
        <p className="text-gray-600">Discover your perfect educational path with our diverse range of courses.</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="all">All Levels</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="Doctorate">Doctorate</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.university}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
              <p className="mt-4 text-gray-600 text-sm line-clamp-2">{course.description}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-indigo-600 text-sm font-medium">Learn more →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;