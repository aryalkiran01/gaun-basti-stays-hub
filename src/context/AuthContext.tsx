
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User } from "../types";
import { dummyUsers, PASSWORD } from "../lib/dummy-data";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const foundUser = dummyUsers.find(u => u.email === email);
      
      if (foundUser && password === PASSWORD) {
        setUser(foundUser);
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Try guest@example.com / password",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const register = (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const existingUser = dummyUsers.find(u => u.email === email);
      
      if (existingUser) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Email already in use. Please try another one.",
        });
      } else if (password.length < 6) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Password must be at least 6 characters long.",
        });
      } else {
        // In a real app, we would save this to a database
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: "guest",
        };
        
        // Simulate saving and logging in the new user
        setUser(newUser);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        
        toast({
          title: "Registration successful",
          description: `Welcome to Gaun Basti, ${name}!`,
        });
      }
      
      setIsLoading(false);
    }, 1000);
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
