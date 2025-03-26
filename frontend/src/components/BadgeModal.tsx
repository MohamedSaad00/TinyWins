import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';
import { Badge as BadgeType } from '../services/api';

interface BadgeModalProps {
  badge: BadgeType | null;
  open: boolean;
  onClose: () => void;
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    return '';
  }
};

const BadgeModal: React.FC<BadgeModalProps> = ({ badge, open, onClose }) => {
  if (!badge) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{badge.name}</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body1">{badge.description}</Typography>
          {badge.earned && badge.earned_date && (
            <Typography variant="body2" color="primary">
              Earned on {formatDate(badge.earned_date)}
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeModal;
