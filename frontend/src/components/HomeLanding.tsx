import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Link } from '@mui/material';
import { EmojiEvents, Timeline, Stars, TrendingUp, Rocket, Security, EmojiEvents as Trophy } from '@mui/icons-material';

const HomeLanding: React.FC = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        {/* Hero Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, textAlign: 'center', background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            TinyWins – Track Your Daily Wins & Stay Motivated
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Stay Consistent. Stay Motivated. Keep Winning!
          </Typography>
          <Typography variant="body1" paragraph>
            TinyWins is a simple yet powerful daily achievement tracker designed to help you build positive habits, stay accountable, and celebrate small victories every day.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="https://tinywins-production.up.railway.app/"
              target="_blank"
              sx={{ mr: 2 }}
            >
              Live Demo
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              href="https://github.com/MohamedSaad00/TinyWins"
              target="_blank"
            >
              GitHub Repo
            </Button>
          </Box>
        </Paper>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <Rocket sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Track Your Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Log your daily achievements and watch your streak grow.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <Trophy sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Earn Badges
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get rewarded for consistency and milestones.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Compete with Others
              </Typography>
              <Typography variant="body2" color="text.secondary">
                See where you stand on the leaderboard.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Why TinyWins Section */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Why TinyWins?
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                ✨ Simple & Easy to Use
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No complex setup. Just log in and start tracking.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                💡 Stay Motivated
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visual progress keeps you engaged and accountable.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🔒 Secure & Private
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your data stays safe with JWT authentication.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🌟 Celebrate Milestones
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Earn badges as you build better habits.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* How It Works Section */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          How It Works?
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                1️⃣ Log Your Win
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add a small achievement every day.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                2️⃣ Maintain Your Streak
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stay consistent to earn badges.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                3️⃣ Climb the Leaderboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your progress and compete with others.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)', color: 'white' }}>
          <Typography variant="h4" gutterBottom>
            🚀 Get started today and build your streak!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="https://tinywins-production.up.railway.app/"
            target="_blank"
            sx={{ mt: 2 }}
          >
            Start Tracking Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomeLanding; 
