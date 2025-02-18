// src/services/api.ts
import axios from 'axios';
import {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios';

// Constants
const TOKEN_KEY = 'auth_token';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'; // Change port

// Types
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}

// API instance configuration
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(handleApiError(error))
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        
        // Only redirect to login if we're not already there
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login')) {
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
      }
      return Promise.reject(handleApiError(error));
    }
  );

  return instance;
};

const api = createApiInstance();

// Error handler
const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const typedError = error as AxiosError<ApiResponse<never>>;
    
    if (typedError.response) {
      return {
        message: typedError.response.data?.message || 'An error occurred',
        status: typedError.response.status,
        data: typedError.response.data
      };
    }
    
    if (typedError.request) {
      return {
        message: 'No response received from server',
        status: 503
      };
    }
    
    return {
      message: typedError.message || 'Request configuration error',
      status: 500
    };
  }
  
  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    status: 500
  };
};

// Auth API methods
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', {
        email,
        password
      });
      const authResponse = response.data.data;
      localStorage.setItem(TOKEN_KEY, authResponse.token);
      return authResponse;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  register: async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', {
        email,
        password,
        name
      });
      const authResponse = response.data.data;
      localStorage.setItem(TOKEN_KEY, authResponse.token);
      return authResponse;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  validateToken: async (): Promise<User> => {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/validate');
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', handleApiError(error));
    } finally {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

// User API methods
export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<ApiResponse<User>>('/users/me');
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put<ApiResponse<User>>('/users/me', userData);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Export types and API instance
export type { User, AuthResponse, ApiResponse, ApiError };
export { api };