// src/services/auth.ts
interface User {
  id: string;
  email: string;
}

interface LoginResponse {
  user: User;
  token: string;  // Making token required since we're using token-based auth
}

interface AuthError extends Error {
  code?: string;
  status?: number;
}

class CustomAuthError extends Error implements AuthError {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
      super(message);
      this.name = 'CustomAuthError';
      this.code = code;
      this.status = status;

      // Ensures proper prototype chain for instanceof checks
      Object.setPrototypeOf(this, CustomAuthError.prototype);
  }
}

interface AuthService {
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
}

const TOKEN_KEY = 'auth_token';

const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const authService: AuthService = {
  login: async (email: string, password: string): Promise<User> => {
      try {
          const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
              throw new CustomAuthError(
                  'Login failed',
                  'AUTH_ERROR',
                  response.status
              );
          }

          const data = await response.json() as LoginResponse;
          setAuthToken(data.token);
          return data.user;

      } catch (error) {
          if (error instanceof CustomAuthError) {
              throw error;
          }
          if (error instanceof Error) {
              throw new CustomAuthError(
                  `Login failed: ${error.message}`,
                  'AUTH_ERROR'
              );
          }
          throw new CustomAuthError(
              'An unexpected error occurred during login',
              'UNKNOWN_ERROR'
          );
      }
  },

  logout: async (): Promise<void> => {
      const token = getAuthToken();
      
      try {
          const response = await fetch('/api/auth/logout', {
              method: 'POST',
              headers: {
                  ...(token && { Authorization: `Bearer ${token}` })
              }
          });

          if (!response.ok && response.status !== 401) {
              throw new CustomAuthError(
                  'Logout failed',
                  'AUTH_ERROR',
                  response.status
              );
          }

      } catch (error) {
          // Log error but don't rethrow - we want to remove token regardless
          console.error('Logout error:', error);
      } finally {
          removeAuthToken();
      }
  },

  getCurrentUser: async (): Promise<User | null> => {
      const token = getAuthToken();

      if (!token) {
          return null;
      }

      try {
          const response = await fetch('/api/auth/me', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

          if (!response.ok) {
              if (response.status === 401) {
                  removeAuthToken();
                  return null;
              }
              throw new CustomAuthError(
                  'Failed to get current user',
                  'AUTH_ERROR',
                  response.status
              );
          }

          const user = await response.json() as User;
          return user;

      } catch (error) {
          removeAuthToken();
          return null;
      }
  }
};