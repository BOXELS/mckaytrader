# McKay Trader Project Structure

## 🏗️ Project Overview
A comprehensive forex trading analytics platform with position sizing calculator and trade tagging system.

## 📁 Directory Structure

```
mckaytrader/
├── 📄 README.md                    # Project documentation
├── 📄 package.json                 # Root package.json with scripts
├── 📄 netlify.toml                 # Netlify deployment config
├── 📄 .gitignore                   # Git ignore file
├── 📄 setup.sh                     # Development setup script
│
├── 🎨 frontend/                    # React + TypeScript frontend
│   ├── 📄 package.json             # Frontend dependencies
│   ├── 📄 vite.config.ts           # Vite configuration
│   ├── 📄 tailwind.config.js       # Tailwind CSS config
│   ├── 📄 postcss.config.js        # PostCSS config
│   ├── 📄 tsconfig.json            # TypeScript config
│   ├── 📄 index.html               # HTML template
│   ├── 📄 .env.example             # Environment variables template
│   │
│   └── src/
│       ├── 📄 main.tsx              # App entry point
│       ├── 📄 App.tsx               # Main App component
│       ├── 📄 index.css             # Global styles
│       │
│       ├── 📁 components/           # Reusable components
│       │   └── 📄 Navbar.tsx        # Navigation component
│       │
│       ├── 📁 pages/                # Page components
│       │   ├── 📄 Dashboard.tsx     # Dashboard page
│       │   ├── 📄 Calculator.tsx    # Position calculator page
│       │   ├── 📄 TradeLog.tsx      # Trade logging page
│       │   └── 📄 Analytics.tsx     # Analytics page
│       │
│       ├── 📁 types/                # TypeScript type definitions
│       │   └── 📄 index.ts          # Trading-related types
│       │
│       ├── 📁 services/             # API services
│       │   ├── 📄 api.ts            # Base API client
│       │   └── 📄 tradingService.ts # Trading API functions
│       │
│       └── 📁 hooks/                # Custom React hooks
│           └── 📄 useTrading.ts     # Trading-related hooks
│
└── ⚙️ backend/                     # FastAPI Python backend
    ├── 📄 requirements.txt          # Python dependencies
    ├── 📄 .env.example             # Environment variables template
    │
    └── app/
        ├── 📄 main.py               # FastAPI app entry point
        │
        ├── 📁 models/               # Pydantic models
        │   └── 📄 __init__.py       # Trading data models
        │
        ├── 📁 routers/              # API route handlers
        │   ├── 📄 trades.py         # Trade CRUD operations
        │   ├── 📄 calculator.py     # Position sizing calculations
        │   └── 📄 analytics.py      # Trading analytics
        │
        └── 📁 services/             # Business logic services
            └── 📄 firebase_service.py # Firebase/Firestore integration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/BOXELS/mckaytrader.git
cd mckaytrader

# Run setup script
chmod +x setup.sh
./setup.sh
```

### Development
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Access Points
- **Frontend**: http://localhost:3127
- **Backend API**: http://localhost:8127  
- **API Documentation**: http://localhost:8127/docs

## 🔧 Key Features

### 📊 Position Size Calculator
- Risk-based position sizing
- Support for major forex pairs
- Real-time pip value calculations
- Risk-to-reward ratio analysis

### 📝 Trade Logging
- Comprehensive trade entry forms
- Flexible tagging system for trade patterns
- Real-time profit/loss calculations
- Trade status management (open/closed)

### 📈 Analytics Dashboard
- Win rate analysis by trading patterns
- Monthly performance tracking
- Risk metrics calculation
- Pattern-based insights

### 🏷️ Trade Tagging System
- Pattern recognition tags (H&S, Reversal, Breakout, etc.)
- Win rate analysis by tag
- Custom tag creation
- Performance tracking by strategy

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Query** - Data fetching
- **React Router** - Navigation
- **Recharts** - Data visualization

### Backend
- **FastAPI** - Python web framework
- **Pydantic** - Data validation
- **Firebase Firestore** - Database
- **Uvicorn** - ASGI server

### Deployment
- **Netlify** - Frontend hosting (auto-deploy from GitHub)
- **Railway/Render** - Backend hosting options
- **Firebase** - Database and authentication

## 📱 Pages & Features

### Dashboard
- Trading statistics overview
- Quick action buttons
- Recent trades table
- Performance metrics

### Calculator
- Position size calculation
- Risk management parameters
- Real-time calculations
- Risk management tips

### Trade Log
- Add/edit/delete trades
- Tag assignment
- Trade filtering
- Status management

### Analytics
- Win rate by pattern
- Monthly performance charts
- Risk metrics
- Trading insights

## 🔒 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8127/api
VITE_APP_NAME=McKay Trader
```

### Backend (.env)
```
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
FIRESTORE_EMULATOR_HOST=localhost:8080
SECRET_KEY=your-secret-key
```

## 🚀 Deployment

### Netlify (Frontend)
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Auto-deploys on push to main branch

### Backend Hosting Options
- **Railway**: Connect GitHub, auto-deploy
- **Render**: Connect GitHub, auto-deploy  
- **Google Cloud Run**: Docker deployment

## 📊 Database Schema

### Trades Collection
```typescript
{
  id: string
  user_id: string
  pair: string
  entry_price: number
  exit_price?: number
  lot_size: number
  direction: 'long' | 'short'
  open_time: Date
  close_time?: Date
  tags: string[]
  profit?: number
  status: 'open' | 'closed'
  stop_loss?: number
  take_profit?: number
  notes?: string
}
```

## 🎯 Future Enhancements
- Real-time price feeds
- Advanced charting
- Portfolio management
- Mobile app (React Native)
- Social trading features
- Risk management alerts

## 🐛 Development Notes
- Backend includes mock Firebase client for development
- Frontend uses React Query for efficient data management
- Responsive design works on desktop and mobile
- Type-safe API integration with TypeScript
