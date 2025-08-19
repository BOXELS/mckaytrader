from fastapi import APIRouter, HTTPException
from app.models import AnalyticsResponse, ApiResponse
from app.services.firebase_service import get_firestore_client
from collections import defaultdict
import statistics
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/overview", response_model=ApiResponse)
async def get_analytics_overview(user_id: str = "demo_user"):
    """Get overall trading analytics"""
    try:
        db = get_firestore_client()
        trades = db.collection("trades").where("user_id", "==", user_id).get()
        
        if not trades:
            return ApiResponse(
                success=True,
                data=AnalyticsResponse(
                    total_trades=0,
                    win_rate=0.0,
                    total_profit=0.0,
                    average_win=0.0,
                    average_loss=0.0,
                    profit_factor=0.0,
                    max_drawdown=0.0,
                    best_trade=0.0,
                    worst_trade=0.0,
                    wins_by_tag={}
                ).dict()
            )
        
        # Process trades data
        trade_data = []
        for trade in trades:
            data = trade.to_dict()
            if data.get("status") == "closed" and "profit" in data:
                trade_data.append(data)
        
        if not trade_data:
            return ApiResponse(
                success=True,
                data=AnalyticsResponse(
                    total_trades=len(trades),
                    win_rate=0.0,
                    total_profit=0.0,
                    average_win=0.0,
                    average_loss=0.0,
                    profit_factor=0.0,
                    max_drawdown=0.0,
                    best_trade=0.0,
                    worst_trade=0.0,
                    wins_by_tag={}
                ).dict()
            )
        
        # Calculate metrics
        profits = [t["profit"] for t in trade_data]
        wins = [p for p in profits if p > 0]
        losses = [p for p in profits if p < 0]
        
        total_trades = len(trade_data)
        win_count = len(wins)
        win_rate = (win_count / total_trades * 100) if total_trades > 0 else 0
        total_profit = sum(profits)
        average_win = statistics.mean(wins) if wins else 0
        average_loss = statistics.mean(losses) if losses else 0
        best_trade = max(profits) if profits else 0
        worst_trade = min(profits) if profits else 0
        
        # Profit factor
        gross_profit = sum(wins) if wins else 0
        gross_loss = abs(sum(losses)) if losses else 0
        profit_factor = gross_profit / gross_loss if gross_loss > 0 else 0
        
        # Calculate max drawdown
        max_drawdown = calculate_max_drawdown(trade_data)
        
        # Calculate wins by tag
        wins_by_tag = calculate_wins_by_tag(trade_data)
        
        analytics = AnalyticsResponse(
            total_trades=total_trades,
            win_rate=round(win_rate, 2),
            total_profit=round(total_profit, 2),
            average_win=round(average_win, 2),
            average_loss=round(average_loss, 2),
            profit_factor=round(profit_factor, 2),
            max_drawdown=round(max_drawdown, 2),
            best_trade=round(best_trade, 2),
            worst_trade=round(worst_trade, 2),
            wins_by_tag=wins_by_tag
        )
        
        return ApiResponse(success=True, data=analytics.dict())
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/wins-by-tag", response_model=ApiResponse)
async def get_wins_by_tag(user_id: str = "demo_user"):
    """Get win rates broken down by trading tags/patterns"""
    try:
        db = get_firestore_client()
        trades = db.collection("trades").where("user_id", "==", user_id).where("status", "==", "closed").get()
        
        trade_data = []
        for trade in trades:
            data = trade.to_dict()
            if "profit" in data:
                trade_data.append(data)
        
        wins_by_tag = calculate_wins_by_tag(trade_data)
        
        return ApiResponse(
            success=True,
            data={"wins_by_tag": wins_by_tag}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/monthly-performance", response_model=ApiResponse)
async def get_monthly_performance(user_id: str = "demo_user", months: int = 12):
    """Get monthly trading performance"""
    try:
        db = get_firestore_client()
        
        # Calculate date range
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=months * 30)
        
        trades = (db.collection("trades")
                 .where("user_id", "==", user_id)
                 .where("status", "==", "closed")
                 .where("close_time", ">=", start_date)
                 .where("close_time", "<=", end_date)
                 .get())
        
        # Group trades by month
        monthly_data = defaultdict(lambda: {"profit": 0, "trades": 0})
        
        for trade in trades:
            data = trade.to_dict()
            if "profit" in data and "close_time" in data:
                close_time = data["close_time"]
                if isinstance(close_time, str):
                    close_time = datetime.fromisoformat(close_time.replace('Z', '+00:00'))
                
                month_key = close_time.strftime("%Y-%m")
                monthly_data[month_key]["profit"] += data["profit"]
                monthly_data[month_key]["trades"] += 1
        
        # Convert to list format
        performance_data = []
        for month_key, data in sorted(monthly_data.items()):
            performance_data.append({
                "month": month_key,
                "profit": round(data["profit"], 2),
                "trades": data["trades"]
            })
        
        return ApiResponse(
            success=True,
            data={"monthly_performance": performance_data}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def calculate_max_drawdown(trades):
    """Calculate maximum drawdown from trade data"""
    if not trades:
        return 0.0
    
    # Sort trades by close time
    sorted_trades = sorted(trades, key=lambda x: x.get("close_time", datetime.min))
    
    running_profit = 0
    peak = 0
    max_drawdown = 0
    
    for trade in sorted_trades:
        running_profit += trade.get("profit", 0)
        if running_profit > peak:
            peak = running_profit
        
        drawdown = (peak - running_profit) / peak if peak > 0 else 0
        max_drawdown = max(max_drawdown, drawdown)
    
    return max_drawdown * 100  # Return as percentage

def calculate_wins_by_tag(trades):
    """Calculate win rates by trading tags"""
    tag_stats = defaultdict(lambda: {"wins": 0, "total": 0})
    
    for trade in trades:
        tags = trade.get("tags", [])
        profit = trade.get("profit", 0)
        is_win = profit > 0
        
        for tag in tags:
            tag_stats[tag]["total"] += 1
            if is_win:
                tag_stats[tag]["wins"] += 1
    
    # Calculate win rates
    wins_by_tag = {}
    for tag, stats in tag_stats.items():
        if stats["total"] > 0:
            win_rate = (stats["wins"] / stats["total"]) * 100
            wins_by_tag[tag] = {
                "wins": stats["wins"],
                "total": stats["total"],
                "win_rate": round(win_rate, 2)
            }
    
    return wins_by_tag
