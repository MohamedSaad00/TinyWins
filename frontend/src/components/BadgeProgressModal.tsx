import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, LinearProgress } from '@mui/material';
import { Badge as BadgeType } from '../services/api';

interface BadgeProgressModalProps {
  badge: BadgeType;
  open: boolean;
  onClose: () => void;
}

const BadgeProgressModal: React.FC<BadgeProgressModalProps> = ({ badge, open, onClose }) => {
  const progress = (badge.current_progress / badge.required_progress) * 100;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5">{badge.name}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Typography variant="body1" paragraph>
            {badge.description}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
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
          <Typography variant="caption" color="textSecondary" display="block" mt={1}>
            {badge.progress_description}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BadgeProgressModal; 
