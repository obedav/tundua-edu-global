import { AuthContext } from '@/components/context/AuthContext';
import { useContext } from 'react';

// Type for the hook return value
interface AuthHookReturn {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// User type
interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

export const useAuth = (): AuthHookReturn => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {
    user: context.user,
    login: context.login,
    logout: context.logout,
    loading: context.loading,
    error: context.error
  };
};