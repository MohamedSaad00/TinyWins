import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import History from './components/History';
import Leaderboard from './components/Leaderboard';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  const { userId, username, isLoading, login, logout, isAuthenticated } = useAuth();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');

  const handleLogin = async () => {
    if (!usernameInput.trim()) {
      toast.error('Please enter a username');
      return;
    }

    const success = await login(usernameInput);
    if (success) {
      setLoginDialogOpen(false);
      setUsernameInput('');
      toast.success('Welcome to TinyWins!');
    } else {
      toast.error('Failed to create account');
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
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
                Login
              </Button>
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
                    <Navigate to="/leaderboard" replace />
                  )
                } 
              />
              <Route 
                path="/history" 
                element={
                  isAuthenticated ? (
                    <History userId={userId!} />
                  ) : (
                    <Navigate to="/leaderboard" replace />
                  )
                } 
              />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </Box>
        </Container>

        <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
          <DialogTitle>Welcome to TinyWins</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLoginDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogin} color="primary">
              Start Tracking Wins
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
