from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import trades, analytics, calculator
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="McKay Trader API",
    description="Forex trading analytics and position sizing API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://mckaytrader.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(trades.router, prefix="/api/trades", tags=["trades"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(calculator.router, prefix="/api/calculator", tags=["calculator"])

@app.get("/")
async def root():
    return {"message": "McKay Trader API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "McKay Trader API"}
