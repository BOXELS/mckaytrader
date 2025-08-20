#!/bin/bash

# McKay Trader Development Setup Script

echo "🚀 Setting up McKay Trader development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Node.js and Python 3 found"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created frontend .env file"
fi

cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "🐍 Created Python virtual environment"
fi

# Activate virtual environment and install dependencies
source venv/bin/activate
pip install -r requirements.txt

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created backend .env file"
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "1. Start the backend: cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
echo "2. Start the frontend: cd frontend && npm run dev"
echo ""
echo "The app will be available at:"
echo "- Frontend: http://localhost:3127"
echo "- Backend API: http://localhost:8127"
echo "- API Docs: http://localhost:8127/docs"
