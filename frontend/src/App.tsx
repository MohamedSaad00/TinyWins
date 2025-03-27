import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CssBaseline, ThemeProvider, createTheme, Tabs, Tab, Paper, Grid, Card, CardContent } from '@mui/material';
import { EmojiEvents, Timeline, Stars, TrendingUp } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Streak from './components/Streak';
import History from './components/History';
import api from './services/api';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
import useAuth from './hooks/useAuth';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to TinyWins
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Track your daily achievements, build streaks, and celebrate your small wins
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <EmojiEvents sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Daily Wins
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Log your daily achievements and build a positive habit of recognizing your wins, no matter how small they may seem.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Timeline sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Streak Tracking
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Build and maintain streaks to stay motivated. Watch your current and highest streaks grow as you consistently achieve your goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stars sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Achievement Badges
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Earn badges for different milestones and track your progress towards new achievements. Celebrate your growth with visual rewards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Community
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join a community of achievers. Compare your progress on the leaderboard and motivate each other to maintain consistent growth.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Create an account now and begin tracking your daily wins!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const App: React.FC = () => {
  const { userId, username, isLoading, login, logout, isAuthenticated } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setUsernameInput('');
    setPasswordInput('');
    setConfirmPassword('');
  };

  const handleLogin = async () => {
    if (!usernameInput.trim() || !passwordInput.trim()) {
      toast.error('Please enter both username and password');
      return;
    }

    const success = await login(usernameInput, passwordInput);
    if (success) {
      setAuthDialogOpen(false);
      setUsernameInput('');
      setPasswordInput('');
      toast.success('Welcome to TinyWins!');
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async () => {
    if (!usernameInput.trim() || !passwordInput.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (passwordInput !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordInput.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      console.log('Starting registration process...');
      const response = await api.createUser(usernameInput, passwordInput);
      console.log('Registration response received:', response);
      
      if (!response || !response.user || !response.token) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id.toString());
      localStorage.setItem('username', response.user.username);
      
      setAuthDialogOpen(false);
      setUsernameInput('');
      setPasswordInput('');
      setConfirmPassword('');
      toast.success('Registration successful! Welcome to TinyWins!');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      if (errorMessage.toLowerCase().includes('username')) {
        toast.error('This username is already taken. Please choose another one.');
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleBadgeEarned = (badge: string) => {
    // Badge notification is handled by the Home component using toast
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              TinyWins
            </Typography>
            {isAuthenticated ? (
              <>
                <Typography variant="body1" style={{ marginRight: '1rem' }}>
                  Welcome, {username}!
                </Typography>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/history">
                  History
                </Button>
                <Button color="inherit" component={Link} to="/leaderboard">
                  Leaderboard
                </Button>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
                <Button color="inherit" onClick={() => setAuthDialogOpen(true)}>
                  Login / Register
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container>
          <Box my={4}>
            <Routes>
              <Route 
                path="/" 
                element={
                  isAuthenticated ? (
                    <Home userId={userId!} onBadgeEarned={handleBadgeEarned} />
                  ) : (
                    <About />
                  )
                } 
              />
              <Route 
                path="/history" 
                element={
                  isAuthenticated ? (
                    <History userId={userId!} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/leaderboard" 
                element={
                  isAuthenticated ? (
                    <Leaderboard />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </Container>

        <Dialog open={authDialogOpen} onClose={() => setAuthDialogOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (activeTab === 0 ? handleLogin() : handleRegister())}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (activeTab === 0 ? handleLogin() : handleRegister())}
            />
            {activeTab === 1 && (
              <TextField
                margin="dense"
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAuthDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={activeTab === 0 ? handleLogin : handleRegister} 
              color="primary"
            >
              {activeTab === 0 ? 'Login' : 'Register'}
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App; 
