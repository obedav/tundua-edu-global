// Home.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService, Course } from '../../services/courseServices';
import '../../styles/pages/home.css'; // Add this import

const Home: React.FC = () => {

  
 const [courses, setCourses] = useState<Course[]>([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
   const fetchCourses = async () => {
     try {
       const fetchedCourses = await courseService.getMyCourses();
       setCourses(fetchedCourses as Course[]);
     } catch (error) {
       console.error('Error fetching courses:', error);
     } finally {
       setLoading(false);
     }
   };
   fetchCourses();
 }, []);

 return (
   <div className="bg-gray-50">
     {/* Hero Section */}
     <section className="bg-white py-16">
       <div className="max-w-7xl mx-auto px-4">
         <div className="grid md:grid-cols-2 gap-8 items-center">
           <div>
             <h1 className="text-4xl md:text-5xl font-bold mb-6">
               Empowering You with <span className="text-orange-500">Digital Skills</span>
             </h1>
             <p className="text-gray-600 mb-8">Our platform makes education flexible and convenient.</p>
             <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
               Join Our Course
             </button>
             <div className="flex items-center mt-8 gap-4">
               <div className="flex -space-x-2">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                 ))}
               </div>
               <div className="text-sm">
                 <div>1000+ Reviews</div>
                 <div className="text-yellow-400">★★★★★ (4.5)</div>
               </div>
             </div>
           </div>
           <div className="rounded-lg overflow-hidden pt-16">
             <img src="src/img/img1a.jpg" alt="Student" className="w-full rounded-t-lg" />
           </div>
         </div>
       </div>
     </section>

     {/* Course Listings */}
     {loading ? (
       <div className="text-center py-12">Loading courses...</div>
     ) : (
       <section className="py-16">
         <div className="max-w-7xl mx-auto px-4">
           <div className="flex justify-between items-center mb-8">
             <h2 className="text-3xl font-bold">Explore Our <span className="text-teal-600">Courses</span></h2>
             <button className="text-teal-600">View More</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {courses.map((course) => (
               <div
                 key={course.id}
                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => navigate(`/courses/${course.id}`)}
               >
                 <img
                   src={course.imageUrl}
                   alt={course.title}
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-6">
                   <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                   <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                   <div className="flex justify-between items-center">
                     <span className="text-teal-600 font-medium">${course.price}</span>
                     <span className="text-sm text-gray-500">{course.duration}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>
     )}
   </div>
 );
};

export default Home;