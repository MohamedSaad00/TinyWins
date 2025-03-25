import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface User {
  id: number;
  username: string;
  current_streak: number;
  badges: string[];
}

export interface Streak {
  streak_count: number;
  month: number;
  year: number;
}

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.error || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      throw new Error('Network error - please check your connection');
    } else {
      // Request setup error
      console.error('Request Error:', error.message);
      throw new Error('Failed to make request');
    }
  }
);

const apiService = {
  // User endpoints
  createUser: async (username: string): Promise<User> => {
    const response = await api.post('/user', { username });
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
