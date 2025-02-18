// src/services/courseService.ts
import { api } from './api';

export interface Course {
 sections: never[];
 reviews: never[];
 learningObjectives: any;
 prerequisites: any;
 id: string;
 title: string;
 description: string;
 university: string;
 instructor: string;
 duration: string;
 level: 'Beginner' | 'Intermediate' | 'Advanced';
 price: number;
 rating: number;
 enrollmentCount: number;
 imageUrl: string;
}

interface CourseFilters {
 search?: string;
 university?: string;
 level?: string;
 minPrice?: number;
 maxPrice?: number;
}

export const courseService = {
 async getAllCourses(filters?: CourseFilters) {
   const response = await api.get('/courses', { params: filters });
   return response.data;
 },

 async getCourseById(id: string) {
   const response = await api.get(`/courses/${id}`);
   return response.data;
 },

 async enrollInCourse(courseId: string) {
   const response = await api.post(`/courses/${courseId}/enroll`);
   return response.data;
 },

 async getMyCourses() {
  try {
    const response = await api.get('/courses/enrolled');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
 },
};