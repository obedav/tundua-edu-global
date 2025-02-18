// src/types/auth.ts
export interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}