from flask import Blueprint, jsonify, request, current_app
from datetime import datetime, timedelta
import json
from models import db, User, Streak
from werkzeug.security import generate_password_hash
import jwt

api = Blueprint('api', __name__)

def generate_token(user_id):
    """Generate a JWT token for the user"""
    secret_key = current_app.config['SECRET_KEY']
    token = jwt.encode(
        {'user_id': user_id, 'exp': datetime.utcnow() + timedelta(days=1)},
        secret_key,
        algorithm='HS256'
    )
    return token

@api.route('/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        user = User(username=username)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        token = generate_token(user.id)
        
        return jsonify({
            'user': {
                'id': user.id,
                'username': user.username
            },
            'token': token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/health', methods=['GET'])
def health_check():
    try:
        # Test database connection
        db.session.execute('SELECT 1')
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'database': 'connected',
            'environment': current_app.config.get('FLASK_ENV', 'unknown'),
            'debug_mode': current_app.debug
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500

def check_and_award_badges(user):
    """Check and award badges based on streak count"""
    current_badges = json.loads(user.badges)
    streak = user.current_streak
    new_badges = []
    
    if streak >= 7 and "7_day" not in current_badges:
        current_badges.append("7_day")
        new_badges.append("7_day")
    
    if streak >= 15 and "15_day" not in current_badges:
        current_badges.append("15_day")
        new_badges.append("15_day")
    
    user.badges = json.dumps(current_badges)
    return new_badges

@api.route('/win', methods=['POST'])
def log_win():
    data = request.get_json()
    user_id = data.get('user_id')
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    now = datetime.utcnow()
    
    # Check if this is the first win or if it's a consecutive day
    if not user.last_win_date:
        user.current_streak = 1
    else:
        last_win = user.last_win_date
        if (now.date() - last_win.date()) == timedelta(days=1):
            user.current_streak += 1
        elif (now.date() - last_win.date()) > timedelta(days=1):
            user.current_streak = 1
    
    user.last_win_date = now
    
    # Update highest streak if necessary
    if user.current_streak > user.highest_streak:
        user.highest_streak = user.current_streak
    
    # Check for new badges
    new_badges = check_and_award_badges(user)
    
    db.session.commit()
    
    return jsonify({
        'current_streak': user.current_streak,
        'highest_streak': user.highest_streak,
        'new_badges': new_badges,
        'badges': json.loads(user.badges)
    })

@api.route('/streaks/<int:user_id>', methods=['GET'])
def get_streaks(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    streaks = Streak.query.filter_by(user_id=user_id).order_by(Streak.year.desc(), Streak.month.desc()).all()
    
    return jsonify({
        'current_streak': user.current_streak,
        'highest_streak': user.highest_streak,
        'badges': json.loads(user.badges),
        'history': [{
            'streak_count': s.streak_count,
            'month': s.month,
            'year': s.year
        } for s in streaks]
    })

@api.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    users = User.query.order_by(User.current_streak.desc()).limit(10).all()
    
    return jsonify([{
        'username': user.username,
        'current_streak': user.current_streak,
        'highest_streak': user.highest_streak,
        'badges': json.loads(user.badges)
    } for user in users]) 
