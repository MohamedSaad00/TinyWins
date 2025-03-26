import React from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Streak as StreakType } from '../services/api';

interface StreakProps {
  streak: StreakType;
}

const Streak: React.FC<StreakProps> = ({ streak }) => {
  return (
    <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        {new Date(2000, streak.month - 1, 1).toLocaleString('default', { month: 'long' })} {streak.year}
      </Typography>
      <Box position="relative" display="inline-flex" my={2}>
        <CircularProgress
          variant="determinate"
          value={(streak.streak_count / 30) * 100}
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
            {streak.streak_count}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="textSecondary">
        days
      </Typography>
    </Paper>
  );
};

export default Streak; 
