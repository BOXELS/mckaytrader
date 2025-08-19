#!/bin/bash

# McKay Trader Development Helper

show_help() {
    echo "McKay Trader Development Helper"
    echo ""
    echo "Usage: ./dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup     - Initial project setup"
    echo "  frontend  - Start frontend development server"
    echo "  backend   - Start backend development server"
    echo "  install   - Install all dependencies"
    echo "  clean     - Clean node_modules and Python cache"
    echo "  build     - Build frontend for production"
    echo "  deploy    - Deploy to production (requires setup)"
    echo "  help      - Show this help message"
}

case "$1" in
    setup)
        echo "🚀 Setting up McKay Trader..."
        ./setup.sh
        ;;
    frontend)
        echo "🎨 Starting frontend development server..."
        cd frontend && npm run dev
        ;;
    backend)
        echo "⚙️ Starting backend development server..."
        cd backend && source venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0
        ;;
    install)
        echo "📦 Installing dependencies..."
        cd frontend && npm install
        cd ../backend && source venv/bin/activate && pip install -r requirements.txt
        ;;
    clean)
        echo "🧹 Cleaning project..."
        rm -rf frontend/node_modules
        rm -rf frontend/dist
        rm -rf backend/venv
        find . -name "__pycache__" -type d -exec rm -rf {} +
        echo "✅ Project cleaned"
        ;;
    build)
        echo "🔨 Building frontend..."
        cd frontend && npm run build
        ;;
    deploy)
        echo "🚀 Deploying to production..."
        echo "Frontend will auto-deploy via Netlify on git push"
        echo "Backend deployment requires manual setup on Railway/Render"
        ;;
    help|*)
        show_help
        ;;
esac
