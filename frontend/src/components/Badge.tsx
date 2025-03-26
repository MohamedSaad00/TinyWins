import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Badge as BadgeType } from '../services/api';

interface BadgeProps {
  badge: BadgeType;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ badge, onClick }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '1rem',
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'center',
        backgroundColor: badge.earned ? '#f5f5f5' : '#e0e0e0'
      }}
      onClick={onClick}
    >
      <Box>
        <Typography variant="h6">{badge.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {badge.description}
        </Typography>
        {badge.earned && badge.earned_date && (
          <Typography variant="body2" color="primary">
            Earned on {new Date(badge.earned_date).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Badge; 
