import React from 'react';
import { Grid, Box, Typography, LinearProgress } from '@mui/material';
import BadgeProgressModal from './BadgeProgressModal';
import { Badge as BadgeType } from '../services/api';

interface BadgeProgressModalListProps {
  badges: BadgeType[];
  selectedBadge: BadgeType | null;
  onBadgeSelect: (badge: BadgeType) => void;
  onClose: () => void;
}

const BadgeProgressModalList: React.FC<BadgeProgressModalListProps> = ({
  badges,
  selectedBadge,
  onBadgeSelect,
  onClose
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {badges.map((badge) => (
          <Grid item xs={12} key={badge.id}>
            <Box
              onClick={() => onBadgeSelect(badge)}
              sx={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1">{badge.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {badge.description}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Box flexGrow={1} mr={2}>
                  <LinearProgress
                    variant="determinate"
                    value={(badge.current_progress / badge.required_progress) * 100}
                    color="primary"
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {badge.current_progress}/{badge.required_progress}
                </Typography>
              </Box>
            </Box>
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
      {selectedBadge && (
        <BadgeProgressModal
          badge={selectedBadge}
          open={!!selectedBadge}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default BadgeProgressModalList; 
