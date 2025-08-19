# MckayTrader

A comprehensive forex trading analytics platform with position sizing calculator and trade tagging system.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Deployment**: Netlify (Frontend) + Railway/Render (Backend)

## Features
- 📊 Position sizing calculator
- 🏷️ Trade tagging system
- 📈 Win rate analytics by patterns
- 💹 EUR/USD focus with expandable pairs
- 📱 Responsive web design

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Deployment
- Frontend auto-deploys to Netlify on push to main
- Backend can be deployed to Railway or Render

## Project Structure
```
mckaytrader/
├── frontend/           # React TypeScript app
├── backend/           # FastAPI Python server
└── docs/             # Documentation
```
