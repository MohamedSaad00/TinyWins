import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';
import { Badge as BadgeType } from '../services/api';

interface BadgeProgressProps {
  badge: BadgeType;
}

const BadgeProgress: React.FC<BadgeProgressProps> = ({ badge }) => {
  const progress = (badge.current_progress / badge.required_progress) * 100;

  return (
    <Box>
      <Typography variant="subtitle1">{badge.name}</Typography>
      <Box display="flex" alignItems="center" mt={1}>
        <Box flexGrow={1} mr={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progress === 100 ? 'success' : 'primary'}
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          {badge.current_progress}/{badge.required_progress}
        </Typography>
      </Box>
      <Typography variant="caption" color="textSecondary">
        {badge.description}
      </Typography>
    </Box>
  );
};

export default BadgeProgress; 
