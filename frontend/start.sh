#!/bin/bash

# Set environment variables
export PORT=3000
export NODE_ENV=production

# Print environment for debugging
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"

# Install serve if not already installed
npm install -g serve

# Start the application using serve
exec serve -s build -l $PORT 
