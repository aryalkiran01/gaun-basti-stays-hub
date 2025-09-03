import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User } from "../types";
import { authAPI } from "../lib/api";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in by fetching profile
    const initializeAuth = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        // Token might be invalid or expired
        authAPI.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        setUser(response.data.user);
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.data.user.name}!`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: response.message || "Invalid email or password",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.register(name, email, password);
      
      if (response.success) {
        setUser(response.data.user);
        toast({
          title: "Registration successful",
          description: `Welcome to Gaun Basti, ${response.data.user.name}!`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: response.message || "Registration failed",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};