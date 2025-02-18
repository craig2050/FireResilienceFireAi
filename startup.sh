#!/bin/bash

# Exit on error
set -e

# Directory setup
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "🔥 Starting FireAI Development Environment..."

# Backend setup
echo "📦 Setting up backend..."
cd "$BACKEND_DIR"

# Create and activate virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "🐍 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install backend dependencies
echo "📚 Installing backend dependencies..."
pip install -r requirements.txt

# Initialize database
echo "🗄️ Initializing database..."
python -c "from app.database import init_db; init_db()"

# Start backend server in the background
echo "🚀 Starting backend server..."
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Frontend setup
echo "📦 Setting up frontend..."
cd "$FRONTEND_DIR"

# Install frontend dependencies
echo "📚 Installing frontend dependencies..."
npm install

# Start frontend server
echo "🚀 Starting frontend server..."
npm start &
FRONTEND_PID=$!

# Trap SIGINT and SIGTERM signals and kill child processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

echo "✨ FireAI development environment is ready!"
echo "📝 Backend running at: http://localhost:8000"
echo "🎨 Frontend running at: http://localhost:3000"
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait
