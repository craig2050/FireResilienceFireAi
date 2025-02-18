#!/bin/bash

# Exit on error
set -e

echo "🔧 Setting up Python virtual environment for FireAI..."

# Navigate to the backend directory
cd "$(dirname "$0")/backend"

# Remove existing venv if it exists
if [ -d "venv" ]; then
    echo "🗑️  Removing existing virtual environment..."
    rm -rf venv
fi

# Create new virtual environment
echo "🐍 Creating new virtual environment..."
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "✅ Virtual environment setup complete!"
echo "To activate the virtual environment, run:"
echo "   cd backend && source venv/bin/activate"
