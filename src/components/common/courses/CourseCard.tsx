// src/components/courses/CourseCard.tsx
import { Link } from 'react-router-dom';
import { Course } from '../../../services/courseServices';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{course.university}</p>
        <div className="mt-2">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
            {course.level}
          </span>
          <span className="ml-2 text-sm text-gray-600">
            {course.duration}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${course.price}
          </span>
          <Link
            to={`/courses/${course.id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

// src/components/courses/CourseSearch.tsx
import React, { useState } from 'react';

interface CourseSearchProps {
  onSearch: (filters: {
    search: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
}

export const CourseSearch: React.FC<CourseSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    minPrice: undefined,
    maxPrice: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="flex-1 p-2 border rounded-md"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="p-2 border rounded-md"
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};