import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { courseService, Course } from '../../services/courseServices';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface CourseSection {
  id: string;
  title: string;
  duration: string;
  lectures: {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'quiz' | 'assignment';
  }[];
}

interface CourseDetailProps {}

const CourseDetail: React.FC<CourseDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  const [showAllSections, setShowAllSections] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
  
      try {
        setLoading(true);
        const fetchedCourse = await courseService.getCourseById(id) as Course;
        setCourse(fetchedCourse);
        setSections(fetchedCourse?.sections ?? []);
        setReviews(fetchedCourse?.reviews ?? []);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login', { state: { returnUrl: `/courses/${id}` } });
      return;
    }

    if (!id) return;

    try {
      setEnrolling(true);
      await courseService.enrollInCourse(id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!course) {
    return <div className="text-center py-8">Course not found</div>;
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600">{course.description}</p>
      
      {course.learningObjectives?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.learningObjectives.map((objective: string, index: number) => (
              <div key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{objective}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {course.prerequisites?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
          <ul className="list-disc pl-5 space-y-2">
            {course.prerequisites.map((prerequisite: string, index: number) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderCurriculumTab = () => (
    <div className="space-y-4">
      {sections.slice(0, showAllSections ? sections.length : 5).map((section) => (
        <div key={section.id} className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <p className="text-sm text-gray-500">{section.duration}</p>
          <div className="mt-2 space-y-2">
            {section.lectures.map((lecture) => (
              <div key={lecture.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2">{lecture.title}</span>
                  <span className="text-sm text-gray-500">({lecture.type})</span>
                </div>
                <span className="text-sm text-gray-500">{lecture.duration}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {sections.length > 5 && (
        <button
          onClick={() => setShowAllSections(!showAllSections)}
          className="text-indigo-600 hover:text-indigo-500"
        >
          {showAllSections ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{review.userName}</h3>
            <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
          </div>
          <p className="mt-2 text-gray-600">{review.comment}</p>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {course.imageUrl && (
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          )}

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mt-8">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'curriculum', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'curriculum' && renderCurriculumTab()}
            {activeTab === 'reviews' && renderReviewsTab()}
          </div>
        </div>

        {/* Course Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{course.price ? `$${course.price}` : 'Free'}</h2>
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;