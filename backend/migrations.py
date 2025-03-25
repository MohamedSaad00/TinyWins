from flask_migrate import Migrate
from models import db

def init_migrations(app):
    migrate = Migrate(app, db)
    return migrate 
