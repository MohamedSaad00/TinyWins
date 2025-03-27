import React from 'react';
import { Paper, Typography, Box, Link, Grid, Container } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            🎯 What Inspired TinyWins?
          </Typography>
          <Typography paragraph>
            TinyWins was created with a simple goal: helping users track their daily wins and build positive habits. Many productivity tools focus on big goals, but TinyWins shifts the focus to small, consistent victories—because real progress happens one step at a time.
          </Typography>
          <Typography paragraph>
            By logging daily achievements, users can maintain streaks, earn badges, and stay motivated. Whether it's finishing a task, learning something new, or sticking to a habit, TinyWins ensures that every small success counts.
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            🛠 Tech Stack
          </Typography>
          <Typography paragraph>
            TinyWins is built with modern technologies to ensure a fast, responsive, and seamless user experience:
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Frontend
              </Typography>
              <Typography component="ul" sx={{ pl: 2 }}>
                <li>React 18 (for a dynamic UI)</li>
                <li>TypeScript (for type safety and better code maintainability)</li>
                <li>Material-UI v5 (for a sleek and modern design)</li>
                <li>React Router v6 (for smooth navigation)</li>
                <li>Axios (for API communication)</li>
                <li>React Toastify (for user notifications)</li>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Backend
              </Typography>
              <Typography component="ul" sx={{ pl: 2 }}>
                <li>Node.js (for a scalable and efficient server)</li>
                <li>Express (for handling API requests)</li>
                <li>PostgreSQL (for structured and reliable data storage)</li>
                <li>JWT Authentication (for secure user login and session management)</li>
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            🚀 Project Features
          </Typography>
          <Typography component="ul" sx={{ pl: 2 }}>
            <li>Secure Authentication – User registration and JWT-based authentication</li>
            <li>Daily Win Tracking – Log achievements, maintain streaks, and view history</li>
            <li>Achievement System – Earn badges and track progress visually</li>
            <li>Leaderboard – Real-time rankings based on user streaks and achievements</li>
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            👨‍💻 Meet the Developer
          </Typography>
          <Typography paragraph>
            TinyWins is developed by Mohamed Saad, a passionate backend developer focused on building scalable, secure, and high-performance applications.
          </Typography>

          <Typography variant="h6" gutterBottom>
            🔗 Connect with me:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Link
              href="https://www.linkedin.com/in/mohamed-saad"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <LinkedIn /> LinkedIn: Mohamed Saad
            </Link>
            <Link
              href="https://github.com/MohamedSaad00"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <GitHub /> GitHub: MohamedSaad00
            </Link>
          </Box>
          <Typography sx={{ mt: 2 }}>
            <Link
              href="https://github.com/MohamedSaad00/TinyWins"
              target="_blank"
              rel="noopener noreferrer"
            >
              Project Repository: TinyWins on GitHub
            </Link>
          </Typography>
          <Typography sx={{ mt: 2, fontStyle: 'italic' }}>
            💡 TinyWins is open-source! If you're interested in contributing, check out the GitHub repository.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About; 
