# TinyWins - Daily Achievement Tracker

A modern web application that helps users track their daily wins and build positive habits. Built with React, TypeScript, and Material-UI v5.

## Features

- 🔐 Secure Authentication
  - User registration with username and password
  - JWT-based authentication
  - Protected routes for authenticated users

- 🏆 Daily Win Tracking
  - Log daily achievements
  - Track current and highest streaks
  - View win history

- 🎯 Achievement System
  - Earn badges for different milestones
  - Track progress towards badges
  - Visual progress indicators

- 📊 Leaderboard
  - Real-time user rankings
  - Display current streaks
  - Show total wins and badges earned

## Tech Stack

### Frontend
- React 18
- TypeScript
- Material-UI v5
- React Router v6
- Axios for API calls
- React Toastify for notifications

### Backend
- Node.js
- Express
- PostgreSQL
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MohamedSaad00/TinyWins.git
cd TinyWins
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
   - Create `.env` files in both backend and frontend directories
   - See `.env.example` files for required variables

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Deployment

The application is deployed on Railway:

- Frontend: https://tinywins.up.railway.app
- API: https://tinywins.up.railway.app/api

### Railway Configuration
- Environment Variables:
  - `REACT_APP_API_URL`: https://tinywins.up.railway.app/api
  - `PORT`: 3000
  - `NODE_ENV`: production

### Build and Deploy
1. Push changes to the master branch
2. Railway automatically builds and deploys the application
3. Build command: `npm install && npm run build`
4. Start command: `npm start`

## Recent Updates

### Authentication System
- Implemented secure JWT-based authentication
- Added user registration with password
- Protected routes for authenticated users
- Token-based session management

### UI/UX Improvements
- Migrated to Material-UI v5
- Added responsive design
- Improved form validation
- Enhanced error handling and user feedback
- Added loading states and transitions

### API Enhancements
- Added proper TypeScript interfaces
- Improved error handling
- Added request/response interceptors
- Implemented proper authentication headers

## Project Structure

```
TinyWins/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── railway.toml
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── middleware/
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI team for the excellent component library
- Railway for the hosting platform
- All contributors who have helped improve the project 
