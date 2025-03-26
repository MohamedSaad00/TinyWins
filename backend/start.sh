#!/bin/bash
set -e

export PATH=/usr/local/bin:$PATH
export PYTHONPATH=/app/backend:$PYTHONPATH

cd /app/backend

echo "Starting Gunicorn server..."
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --timeout 120 "app:create_app()" 
