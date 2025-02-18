import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, GraduationCap } from 'lucide-react';

interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  description: string;
  studentCount: string;
  programs: string[];
  ranking: string;
}

const sampleUniversities: University[] = [
  {
    id: '1',
    name: 'University of Technology',
    location: 'New York',
    country: 'United States',
    image: '/api/placeholder/400/300',
    description: 'Leading institution in technology and engineering education with state-of-the-art facilities.',
    studentCount: '25,000+',
    programs: ['Engineering', 'Computer Science', 'Business Technology'],
    ranking: '#15 in Technical Universities'
  },
  {
    id: '2',
    name: 'Global Business School',
    location: 'London',
    country: 'United Kingdom',
    image: '/api/placeholder/400/300',
    description: 'Premier business school known for innovative programs and global industry connections.',
    studentCount: '15,000+',
    programs: ['Business Administration', 'Finance', 'Marketing'],
    ranking: '#8 in Business Education'
  },
  // Add more sample universities as needed
];

const Universities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const filteredUniversities = sampleUniversities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         university.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || university.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const countries = [...new Set(sampleUniversities.map(uni => uni.country))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Partner Universities</h1>
        <p className="text-gray-600">Explore our network of prestigious educational institutions worldwide.</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search universities..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="all">All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <div
            key={university.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={university.image}
              alt={university.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{university.name}</h3>
              
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{university.location}, {university.country}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">{university.studentCount} Students</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{university.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Featured Programs:</h4>
                <div className="flex flex-wrap gap-2">
                  {university.programs.map((program, index) => (
                    <span
                      key={index}
                      className="inline-block bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{university.ranking}</span>
                <Link
                  to={`/universities/${university.id}`}
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No universities found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Universities;