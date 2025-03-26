import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import BadgeProgress from './BadgeProgress';
import { Badge as BadgeType } from '../services/api';

interface BadgeProgressListProps {
  badges: BadgeType[];
}

const BadgeProgressList: React.FC<BadgeProgressListProps> = ({ badges }) => {
  return (
    <Grid container spacing={2}>
      {badges.map((badge) => (
        <Grid item xs={12} key={badge.id}>
          <BadgeProgress badge={badge} />
        </Grid>
      ))}
      {badges.length === 0 && (
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography variant="body1" color="textSecondary">
              No badges in progress
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BadgeProgressList; 
