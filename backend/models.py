from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    current_streak = db.Column(db.Integer, default=0)
    highest_streak = db.Column(db.Integer, default=0)
    last_win_date = db.Column(db.DateTime, nullable=True)
    badges = db.Column(db.String(200), default="[]")  # JSON string of earned badges
    streaks = db.relationship('Streak', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

class Streak(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    streak_count = db.Column(db.Integer, default=0)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Streak {self.streak_count} - {self.month}/{self.year}>' 
