import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { Badge as BadgeType } from '../services/api';

interface BadgeModalProps {
  badge: BadgeType;
  open: boolean;
  onClose: () => void;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ badge, open, onClose }) => {
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
          {badge.earned && (
            <Typography variant="body2" color="primary">
              Earned on {new Date(badge.earned_date).toLocaleDateString()}
            </Typography>
          )}
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

export default BadgeModal; 
