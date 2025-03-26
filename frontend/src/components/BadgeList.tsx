import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Badge from './Badge';
import { Badge as BadgeType } from '../services/api';

interface BadgeListProps {
  badges: BadgeType[];
  onBadgeClick?: (badge: BadgeType) => void;
}

const BadgeList: React.FC<BadgeListProps> = ({ badges, onBadgeClick }) => {
  return (
    <Grid container spacing={2}>
      {badges.map((badge) => (
        <Grid item xs={12} sm={6} md={4} key={badge.id}>
          <Badge
            badge={badge}
            onClick={() => onBadgeClick?.(badge)}
          />
        </Grid>
      ))}
      {badges.length === 0 && (
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography variant="body1" color="textSecondary">
              No badges yet
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BadgeList; 
