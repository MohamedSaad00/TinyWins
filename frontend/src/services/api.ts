import axios, { AxiosResponse, AxiosError } from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface Badge {
  id: number;
  name: string;
  description: string;
  earned: boolean;
  earned_date?: string;
  current_progress: number;
  required_progress: number;
  progress_description?: string;
}

export interface User {
  id: number;
  username: string;
  current_streak: number;
  highest_streak: number;
  total_wins: number;
  badges: string[];
}

export interface Streak {
  streak_count: number;
  month: number;
  year: number;
}

export interface LoginResponse {
  token: string;
  userId: number;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

interface ErrorResponse {
  error?: string;
  message?: string;
}

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data?.error || error.response.data?.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    } else {
      // Request setup error
      console.error('Request Error:', error.message);
      throw new Error('Failed to make request. Please try again later.');
    }
  }
);

const apiService = {
  // Auth endpoints
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // User endpoints
  createUser: async (username: string, password: string): Promise<RegisterResponse> => {
    try {
      const response = await api.post('/auth/register', { username, password });
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  getUser: async (userId: number): Promise<User> => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },

  updateUser: async (userId: number, data: { username: string }): Promise<User> => {
    const response = await api.put(`/user/${userId}`, data);
    return response.data;
  },

  // Win logging
  logWin: async (userId: number) => {
    const response = await api.post('/win', { user_id: userId });
    return response.data;
  },

  // Get user streaks
  getStreaks: async (userId: number) => {
    const response = await api.get(`/streaks/${userId}`);
    return response.data;
  },

  // Get leaderboard
  getLeaderboard: async () => {
    const response = await api.get('/leaderboard');
    return response.data;
  }
};

export default apiService; 
