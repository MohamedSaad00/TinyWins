import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Box } from '@material-ui/core';
import { EmojiEvents as TrophyIcon } from '@material-ui/icons';
import api from '../services/api';

interface LeaderboardEntry {
  username: string;
  current_streak: number;
  highest_streak: number;
  badges: string[];
}

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await api.getLeaderboard();
        setLeaders(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const getIconColor = (index: number): string => {
    switch (index) {
      case 0:
        return '#FFD700'; // Gold
      case 1:
        return '#C0C0C0'; // Silver
      case 2:
        return '#CD7F32'; // Bronze
      default:
        return '#666666'; // Gray
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>

      <List>
        {leaders.map((leader, index) => (
          <ListItem key={leader.username} divider={index !== leaders.length - 1}>
            <ListItemIcon>
              <TrophyIcon style={{ color: getIconColor(index) }} />
            </ListItemIcon>
            <ListItemText
              primary={leader.username}
              secondary={
                <Box component="span">
                  Current Streak: {leader.current_streak} days
                  <br />
                  Highest Streak: {leader.highest_streak} days
                  <br />
                  Badges: {leader.badges.length}
                </Box>
              }
            />
          </ListItem>
        ))}
        {leaders.length === 0 && (
          <ListItem>
            <ListItemText primary="No leaders yet" />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default Leaderboard; 
