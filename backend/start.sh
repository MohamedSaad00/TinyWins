#!/bin/bash

# Set environment variables
export PATH=/usr/local/bin:/usr/bin:/bin:$PATH
export PYTHONPATH=/app/backend:$PYTHONPATH
export FLASK_APP=app.py
export FLASK_ENV=production

# Print environment for debugging
echo "Current directory: $(pwd)"
echo "Python version: $(python3 --version)"
echo "PYTHONPATH: $PYTHONPATH"
echo "PATH: $PATH"

# Start Gunicorn with proper configuration
exec gunicorn \
    --bind "0.0.0.0:$PORT" \
    --workers 4 \
    --threads 2 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    --log-level info \
    "app:create_app()"
