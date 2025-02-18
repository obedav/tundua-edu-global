// src/pages/About.tsx
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Tundua EDU</h1>
        <p className="text-xl text-gray-600">Empowering global education through accessible online learning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At Tundua EDU, we believe that quality education should be accessible to everyone, 
            regardless of their location or background. Our platform connects students with top 
            universities and instructors worldwide, creating opportunities for personal and 
            professional growth.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a world where geographical and economic barriers no longer limit access 
            to quality education. Through technology and innovation, we're building bridges 
            between learners and educational institutions globally.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">100K+</div>
            <div className="text-gray-600">Active Students</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Courses Available</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-gray-600">Partner Universities</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Education</h3>
          <p className="text-gray-600">
            Partner with leading universities and industry experts to deliver high-quality courses.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Global Access</h3>
          <p className="text-gray-600">
            Make education accessible to students worldwide through our online platform.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
          <p className="text-gray-600">
            Utilize cutting-edge technology to create engaging learning experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;