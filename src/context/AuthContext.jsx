import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // User registration
  const register = async (userData) => {
    try {
      // In a real app, this would be an API call
      setLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('All fields are required');
      }
      
      // Create user object
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage (would be JWT token in real app)
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // User login
  const login = async (credentials) => {
    try {
      // In a real app, this would be an API call
      setLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }
      
      // For demo purposes, let's pretend any valid email/password combination works
      // In a real app, this would verify credentials against a backend
      
      // Create user object
      const loggedInUser = {
        id: 'user-' + Date.now().toString(),
        name: credentials.email.split('@')[0], // Use part of email as name
        email: credentials.email,
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage (would be JWT token in real app)
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // User logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('You have been logged out');
  };

  // Auth context value
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;