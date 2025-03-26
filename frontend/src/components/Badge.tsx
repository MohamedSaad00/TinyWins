import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Badge as BadgeType } from '../services/api';

interface BadgeProps {
  badge: BadgeType;
  onClick?: () => void;
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    return '';
  }
};

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
            Earned on {formatDate(badge.earned_date)}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Badge; 
