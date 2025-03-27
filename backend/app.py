from flask import Flask, jsonify
from flask_cors import CORS
from database import init_db, db
from routes import api
from scheduler import init_scheduler
from migrations import init_migrations
import os
from datetime import datetime

def create_app():
    app = Flask(__name__)
    
    # Get allowed origins from environment variable
    allowed_origins = os.getenv('ALLOWED_ORIGINS', '').split(',')
    if not allowed_origins[0]:  # If ALLOWED_ORIGINS is empty
        allowed_origins = ['http://localhost:3000']  # Default to localhost
    
    print('Allowed origins:', allowed_origins)  # Debug log
    
    # Configure CORS with specific origins and methods
    CORS(app, resources={
        r"/api/*": {
            "origins": allowed_origins,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "send_wildcard": False
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
    
    # Register health check route
    @app.route('/api/health')
    def health_check():
        try:
            # Check database connection
            db.session.execute('SELECT 1')
            return jsonify({
                'status': 'healthy',
                'database': 'connected',
                'timestamp': datetime.utcnow().isoformat(),
                'allowed_origins': allowed_origins,  # Include in response for debugging
                'current_config': app.config.get('CORS_ORIGINS', [])
            }), 200
        except Exception as e:
            return jsonify({
                'status': 'unhealthy',
                'error': str(e)
            }), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 
