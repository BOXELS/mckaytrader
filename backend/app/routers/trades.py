from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from app.models import Trade, TradeCreate, TradeUpdate, ApiResponse
from app.services.firebase_service import get_firestore_client
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=ApiResponse)
async def create_trade(trade: TradeCreate, user_id: str = "demo_user"):
    """Create a new trade"""
    try:
        db = get_firestore_client()
        
        trade_id = str(uuid.uuid4())
        trade_data = {
            "id": trade_id,
            "user_id": user_id,
            **trade.dict(),
            "status": "open",
            "open_time": datetime.utcnow(),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        # Calculate profit if exit price is provided
        if hasattr(trade, 'exit_price') and trade.exit_price:
            profit = calculate_trade_profit(trade.entry_price, trade.exit_price, 
                                          trade.lot_size, trade.direction, trade.pair)
            trade_data["profit"] = profit
            trade_data["status"] = "closed"
            trade_data["close_time"] = datetime.utcnow()
        
        db.collection("trades").document(trade_id).set(trade_data)
        
        return ApiResponse(
            success=True,
            message="Trade created successfully",
            data={"trade_id": trade_id}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=ApiResponse)
async def get_trades(
    user_id: str = "demo_user",
    status: Optional[str] = None,
    pair: Optional[str] = None,
    limit: int = 50
):
    """Get user's trades with optional filters"""
    try:
        db = get_firestore_client()
        query = db.collection("trades").where("user_id", "==", user_id)
        
        if status:
            query = query.where("status", "==", status)
        if pair:
            query = query.where("pair", "==", pair)
            
        trades = query.order_by("created_at", direction="DESCENDING").limit(limit).get()
        
        trade_list = []
        for trade in trades:
            trade_data = trade.to_dict()
            trade_data["id"] = trade.id
            trade_list.append(trade_data)
        
        return ApiResponse(
            success=True,
            data={"trades": trade_list, "count": len(trade_list)}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{trade_id}", response_model=ApiResponse)
async def get_trade(trade_id: str, user_id: str = "demo_user"):
    """Get a specific trade"""
    try:
        db = get_firestore_client()
        trade_ref = db.collection("trades").document(trade_id)
        trade = trade_ref.get()
        
        if not trade.exists:
            raise HTTPException(status_code=404, detail="Trade not found")
        
        trade_data = trade.to_dict()
        if trade_data.get("user_id") != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        trade_data["id"] = trade.id
        return ApiResponse(success=True, data={"trade": trade_data})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{trade_id}", response_model=ApiResponse)
async def update_trade(trade_id: str, trade_update: TradeUpdate, user_id: str = "demo_user"):
    """Update a trade (usually to close it)"""
    try:
        db = get_firestore_client()
        trade_ref = db.collection("trades").document(trade_id)
        trade = trade_ref.get()
        
        if not trade.exists:
            raise HTTPException(status_code=404, detail="Trade not found")
        
        trade_data = trade.to_dict()
        if trade_data.get("user_id") != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        update_data = {"updated_at": datetime.utcnow()}
        
        # Add provided updates
        for field, value in trade_update.dict(exclude_unset=True).items():
            if value is not None:
                update_data[field] = value
        
        # Calculate profit if exit price is provided
        if "exit_price" in update_data:
            profit = calculate_trade_profit(
                trade_data["entry_price"], 
                update_data["exit_price"],
                trade_data["lot_size"], 
                trade_data["direction"], 
                trade_data["pair"]
            )
            update_data["profit"] = profit
            update_data["status"] = "closed"
            if "close_time" not in update_data:
                update_data["close_time"] = datetime.utcnow()
        
        trade_ref.update(update_data)
        
        return ApiResponse(
            success=True,
            message="Trade updated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{trade_id}", response_model=ApiResponse)
async def delete_trade(trade_id: str, user_id: str = "demo_user"):
    """Delete a trade"""
    try:
        db = get_firestore_client()
        trade_ref = db.collection("trades").document(trade_id)
        trade = trade_ref.get()
        
        if not trade.exists:
            raise HTTPException(status_code=404, detail="Trade not found")
        
        trade_data = trade.to_dict()
        if trade_data.get("user_id") != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        trade_ref.delete()
        
        return ApiResponse(
            success=True,
            message="Trade deleted successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def calculate_trade_profit(entry_price: float, exit_price: float, 
                          lot_size: float, direction: str, pair: str) -> float:
    """Calculate trade profit based on prices and direction"""
    pip_difference = (exit_price - entry_price) if direction == "long" else (entry_price - exit_price)
    
    # Standard pip values for major pairs (simplified)
    pip_values = {
        "EUR/USD": 10,
        "GBP/USD": 10,
        "AUD/USD": 10,
        "USD/JPY": 10,
    }
    
    pip_value = pip_values.get(pair, 10)
    pips = pip_difference * 10000  # Convert to pips
    
    return round(pips * pip_value * lot_size, 2)
