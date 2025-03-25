import { useState, useEffect } from 'react';
import api from '../services/api';

interface AuthState {
  userId: number | null;
  username: string | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    userId: null,
    username: null,
    isLoading: true
  });

  useEffect(() => {
    // Check local storage on mount
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    
    if (storedUserId && storedUsername) {
      setAuthState({
        userId: parseInt(storedUserId),
        username: storedUsername,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (username: string) => {
    try {
      const user = await api.createUser(username);
      
      // Store in local storage
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('username', user.username);
      
      setAuthState({
        userId: user.id,
        username: user.username,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    
    // Reset state
    setAuthState({
      userId: null,
      username: null,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout,
    isAuthenticated: !!authState.userId
  };
};

export default useAuth; 
