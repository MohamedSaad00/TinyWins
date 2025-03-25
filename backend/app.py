from flask import Flask
from flask_cors import CORS
from database import init_db
from routes import api
from scheduler import init_scheduler
from migrations import init_migrations
import os

def create_app():
    app = Flask(__name__)
    
    # Configure CORS with specific origins and methods
    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",  # React development server
                "https://tinywins.up.railway.app",  # Production frontend URL
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
    # Set secret key
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    
    # Initialize database
    init_db(app)
    
    # Initialize migrations
    init_migrations(app)
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    # Initialize scheduler
    scheduler = init_scheduler(app)
    
    # Add scheduler to app context
    app.scheduler = scheduler
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 
