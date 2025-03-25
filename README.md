# TinyWins - Daily Achievement Tracker

TinyWins is a simple streak tracker that helps users log their daily wins and maintain motivation through achievement badges and leaderboards.

## Features

- 📝 Daily win logging
- 🏆 Achievement badges (7-day and 15-day streaks)
- 📊 Monthly streak tracking
- 📈 History view of past achievements
- 🏅 Leaderboard ranking
- 🔔 Badge earning notifications

## Tech Stack

- Frontend: React with TypeScript
- Backend: Flask (Python)
- Database: SQLite
- UI Framework: Material-UI
- State Management: React Hooks + Local Storage
- API Communication: Axios

## Project Structure

```
TinyWins/
│── backend/                  # Flask backend
│   ├── app.py               # Main Flask app
│   ├── database.py          # Database setup
│   ├── models.py            # DB models
│   ├── routes.py            # API routes
│   ├── scheduler.py         # Monthly reset logic
│   ├── requirements.txt     # Python dependencies
│   ├── .env                # Environment variables
│── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/      # API services
│   │   ├── App.tsx        # Main app component
│   ├── package.json       # Frontend dependencies
│   ├── .env              # Frontend environment variables
```

## Setup Instructions

### Backend Setup

1. Create a Python virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update variables as needed

4. Run the Flask server:
   ```bash
   flask run
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update variables as needed

3. Start the development server:
   ```bash
   npm start
   ```

## Deployment

The application is configured for deployment on Railway:

1. Create a new Railway project
2. Connect your GitHub repository
3. Configure environment variables in Railway dashboard
4. Deploy both frontend and backend services

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 
