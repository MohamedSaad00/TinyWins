import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, CircularProgress, Box } from '@material-ui/core';
import { toast } from 'react-toastify';
import api from '../services/api';

interface HomeProps {
  userId: number;
  onBadgeEarned: (badge: string) => void;
}

const Home: React.FC<HomeProps> = ({ userId, onBadgeEarned }) => {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStreak = async () => {
    try {
      const data = await api.getStreaks(userId);
      setStreak(data.current_streak);
    } catch (error) {
      toast.error('Failed to fetch streak');
    }
  };

  useEffect(() => {
    fetchStreak();
  }, [userId]);

  const handleLogWin = async () => {
    setLoading(true);
    try {
      const response = await api.logWin(userId);
      setStreak(response.current_streak);
      
      // Check for new badges
      if (response.new_badges && response.new_badges.length > 0) {
        response.new_badges.forEach((badge: string) => {
          onBadgeEarned(badge);
          toast.success(`🏆 Congratulations! You've earned the ${badge} badge!`);
        });
      }
    } catch (error) {
      toast.error('Failed to log win');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <Typography variant="h4" gutterBottom>
        Daily Wins
      </Typography>
      
      <Box my={4} textAlign="center">
        <Typography variant="h6" gutterBottom>
          Current Streak: {streak} days
        </Typography>
        
        <Box position="relative" display="inline-flex" my={2}>
          <CircularProgress
            variant="determinate"
            value={(streak % 7) * (100 / 7)}
            size={80}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textSecondary">
              {7 - (streak % 7)} to go
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogWin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Log Today\'s Win'}
      </Button>
    </Paper>
  );
};

export default Home; 
