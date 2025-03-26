#!/bin/bash
export PATH=$PATH:/usr/local/bin
cd /app/backend
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --timeout 120 "app:create_app()" 
