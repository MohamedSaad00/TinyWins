import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  useTheme,
  Button
} from '@mui/material';
import { 
  EmojiEvents, 
  NotificationsActive, 
  Refresh, 
  History, 
  Leaderboard, 
  Login, 
  Code, 
  Lightbulb, 
  DarkMode, 
  Share,
  GitHub,
  Language,
  LinkedIn
} from '@mui/icons-material';

const Blog: React.FC = () => {
  const theme = useTheme();

  const features = [
    { icon: <EmojiEvents />, title: 'Streak System', description: 'Earn badges for maintaining daily win streaks. Complete 7 days in a row? You get a weekly badge. Keep it up for a month? You\'re on fire! 🔥' },
    { icon: <NotificationsActive />, title: 'Instant Notifications', description: 'Every time you hit a milestone, a pop-up congratulates you, reinforcing positive habits.' },
    { icon: <Refresh />, title: 'Monthly Reset', description: 'At the start of each month, the scoreboard resets, giving you a fresh start to set new records.' },
    { icon: <History />, title: 'History Page', description: 'A dedicated section to track past achievements and reflect on your progress.' },
    { icon: <Leaderboard />, title: 'Leaderboard', description: 'A fun, competitive way to see how you rank among other users based on your streaks and achievements.' },
    { icon: <Login />, title: 'No Login Required', description: 'Just open the app and start tracking. No unnecessary sign-ups or complicated setups!' }
  ];

  const futureFeatures = [
    { icon: <EmojiEvents />, title: 'Customizable Achievements', description: 'Set your own milestones and earn personalized rewards.' },
    { icon: <DarkMode />, title: 'Dark Mode', description: 'Because, let\'s be honest, everything looks cooler in dark mode. 😎' },
    { icon: <Share />, title: 'Social Sharing', description: 'Share your progress with friends and inspire them to start their own TinyWins journey.' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          TinyWins: Celebrate Small Wins, Build Big Momentum
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Track, celebrate, and build momentum through small daily achievements
        </Typography>
      </Box>

      {/* Introduction */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Introduction
        </Typography>
        <Typography paragraph>
          In a world that moves fast, we often forget to celebrate the small victories that push us forward. Whether it's finishing a book, sticking to an exercise routine, or learning a new skill, these little wins fuel our motivation. That's where TinyWins comes in—a simple yet powerful app designed to help you track, celebrate, and build momentum through small daily achievements.
        </Typography>
      </Paper>

      {/* Problem Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          The Problem: Why Tiny Wins Matter
        </Typography>
        <Typography paragraph>
          Many productivity tools focus on big goals, long-term planning, and overwhelming to-do lists. While setting major objectives is important, research shows that recognizing small progress boosts motivation and increases the likelihood of long-term success. TinyWins shifts the focus from overwhelming goals to consistent, daily wins, making success feel achievable and rewarding.
        </Typography>
      </Paper>

      {/* Features Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Key Features That Make TinyWins Special
        </Typography>
        <Typography paragraph>
          TinyWins is designed with simplicity and motivation in mind. Here's what makes it stand out:
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    {feature.icon}
                  </ListItemIcon>
                  <Typography variant="h6">{feature.title}</Typography>
                </Box>
                <Typography>{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Technical Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Behind the Scenes: How TinyWins Was Built
        </Typography>
        <Typography paragraph>
          TinyWins is powered by React (Frontend) and Flask (Backend), ensuring a smooth and fast experience. The backend handles data efficiently, while the frontend delivers a clean, user-friendly interface. The project was carefully structured to balance performance, simplicity, and functionality, making it easy to use without unnecessary complexity.
        </Typography>
      </Paper>

      {/* Challenges Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Challenges & Overcoming Them
        </Typography>
        <Typography paragraph>
          Every project comes with challenges, and TinyWins was no different. One of the biggest hurdles was designing a system that keeps users engaged without feeling overwhelming. By prioritizing a clean UI and focusing on positive reinforcement through badges and streaks, TinyWins ensures that tracking progress is rewarding, not stressful.
        </Typography>
      </Paper>

      {/* Future Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          The Future of TinyWins
        </Typography>
        <Typography paragraph>
          This is just the beginning! Future updates may include:
        </Typography>
        <Grid container spacing={3}>
          {futureFeatures.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    {feature.icon}
                  </ListItemIcon>
                  <Typography variant="h6">{feature.title}</Typography>
                </Box>
                <Typography>{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Start Your TinyWins Journey Today!
        </Typography>
        <Typography variant="h6" paragraph>
          Tracking small wins has never been easier. Whether you're building a habit, learning a skill, or just looking for a motivation boost, TinyWins is here to help. Celebrate your progress, one step at a time.
        </Typography>
        <Typography variant="h5">
          👉 Check out TinyWins now and start tracking your wins today!
        </Typography>
      </Paper>

      {/* Links Section */}
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Connect With Us
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              href="https://github.com/MohamedSaad00/TinyWins"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Project
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Language />}
              href="https://tinywins-production.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deployed Project
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Language />}
              href="https://tinywins-production.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Landing Page
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LinkedIn />}
              href="https://www.linkedin.com/in/mohamedsaadx/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Blog; 
