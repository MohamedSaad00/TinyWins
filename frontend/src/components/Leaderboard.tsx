import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import api from '../services/api';
import { User } from '../services/api';

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<User[]>([]);

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

      <TableContainer>
        <Table>
          <TableBody>
            {leaders.map((leader, index) => (
              <TableRow key={leader.username}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{leader.username}</TableCell>
                <TableCell>{leader.current_streak} days</TableCell>
                <TableCell>{leader.highest_streak} days</TableCell>
                <TableCell>{leader.badges.length}</TableCell>
              </TableRow>
            ))}
            {leaders.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>No leaders yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Leaderboard; 
