import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../services/api';
import { User } from '../services/api';

interface ProfileProps {
  userId: number;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.getUser(userId);
        setUser(data);
        setUsername(data.username);
      } catch (error) {
        toast.error('Failed to fetch user profile');
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateUser(userId, { username });
      toast.success('Profile updated successfully');
      setUser(prev => prev ? { ...prev, username } : null);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper elevation={3} style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <form onSubmit={handleUpdateProfile}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Current Streak: {user.current_streak} days
            </Typography>
            <Typography variant="body1">
              Highest Streak: {user.highest_streak} days
            </Typography>
            <Typography variant="body1">
              Total Wins: {user.total_wins}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Profile; 
