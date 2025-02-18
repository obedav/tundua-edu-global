// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from "react";
import { authService } from "@/services/auth";

interface User {
    name: string;
    id: string;
    email: string;
    // Add other user properties as needed
}

interface AuthContextType {
    error: string | null;
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Auth initialization failed:', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const user = await authService.login(email, password);
            setUser(user);
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            throw new Error('Logout failed: ' + error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};