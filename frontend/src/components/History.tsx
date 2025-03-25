import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import api from '../services/api';
import { Streak } from '../services/api';

interface HistoryProps {
  userId: number;
}

const History: React.FC<HistoryProps> = ({ userId }) => {
  const [history, setHistory] = useState<Streak[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getStreaks(userId);
        setHistory(data.history);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  const getMonthName = (month: number) => {
    return new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem', maxWidth: '800px', margin: '2rem auto' }}>
      <Typography variant="h4" gutterBottom>
        Streak History
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Year</TableCell>
              <TableCell align="right">Streak</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((streak, index) => (
              <TableRow key={index}>
                <TableCell>{getMonthName(streak.month)}</TableCell>
                <TableCell>{streak.year}</TableCell>
                <TableCell align="right">{streak.streak_count} days</TableCell>
              </TableRow>
            ))}
            {history.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No streak history yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default History; 
