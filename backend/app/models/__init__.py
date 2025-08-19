from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class TradeDirection(str, Enum):
    LONG = "long"
    SHORT = "short"

class TradeStatus(str, Enum):
    OPEN = "open"
    CLOSED = "closed"

class TradeBase(BaseModel):
    pair: str = Field(..., description="Currency pair (e.g., EUR/USD)")
    entry_price: float = Field(..., gt=0, description="Entry price")
    lot_size: float = Field(..., gt=0, description="Position size in lots")
    direction: TradeDirection = Field(..., description="Trade direction")
    stop_loss: Optional[float] = Field(None, gt=0, description="Stop loss price")
    take_profit: Optional[float] = Field(None, gt=0, description="Take profit price")
    tags: List[str] = Field(default=[], description="Trade tags/patterns")
    notes: Optional[str] = Field(None, description="Trade notes")

class TradeCreate(TradeBase):
    pass

class TradeUpdate(BaseModel):
    exit_price: Optional[float] = Field(None, gt=0, description="Exit price")
    close_time: Optional[datetime] = Field(None, description="Close time")
    notes: Optional[str] = Field(None, description="Updated notes")
    tags: Optional[List[str]] = Field(None, description="Updated tags")

class Trade(TradeBase):
    id: str = Field(..., description="Trade ID")
    user_id: str = Field(..., description="User ID")
    exit_price: Optional[float] = Field(None, description="Exit price")
    open_time: datetime = Field(..., description="Open time")
    close_time: Optional[datetime] = Field(None, description="Close time")
    profit: Optional[float] = Field(None, description="Trade profit/loss")
    status: TradeStatus = Field(..., description="Trade status")
    created_at: datetime = Field(..., description="Created timestamp")
    updated_at: datetime = Field(..., description="Updated timestamp")

    class Config:
        from_attributes = True

class PositionSizingRequest(BaseModel):
    account_balance: float = Field(..., gt=0, description="Account balance")
    risk_percentage: float = Field(..., gt=0, le=100, description="Risk percentage")
    entry_price: float = Field(..., gt=0, description="Entry price")
    stop_loss: float = Field(..., gt=0, description="Stop loss price")
    pair: str = Field(..., description="Currency pair")

class PositionSizingResponse(BaseModel):
    lot_size: float = Field(..., description="Recommended lot size")
    risk_amount: float = Field(..., description="Amount at risk")
    position_value: float = Field(..., description="Total position value")
    pip_value: float = Field(..., description="Pip value")
    pips_at_risk: float = Field(..., description="Number of pips at risk")

class TradeTag(BaseModel):
    id: str = Field(..., description="Tag ID")
    name: str = Field(..., description="Tag name")
    color: str = Field(..., description="Tag color")
    description: Optional[str] = Field(None, description="Tag description")
    created_at: datetime = Field(..., description="Created timestamp")

class AnalyticsResponse(BaseModel):
    total_trades: int = Field(..., description="Total number of trades")
    win_rate: float = Field(..., description="Overall win rate percentage")
    total_profit: float = Field(..., description="Total profit/loss")
    average_win: float = Field(..., description="Average winning trade")
    average_loss: float = Field(..., description="Average losing trade")
    profit_factor: float = Field(..., description="Profit factor")
    max_drawdown: float = Field(..., description="Maximum drawdown percentage")
    best_trade: float = Field(..., description="Best single trade")
    worst_trade: float = Field(..., description="Worst single trade")
    wins_by_tag: dict = Field(..., description="Win rates by tag")

class ApiResponse(BaseModel):
    success: bool = Field(..., description="Request success status")
    message: Optional[str] = Field(None, description="Response message")
    data: Optional[dict] = Field(None, description="Response data")
    error: Optional[str] = Field(None, description="Error message")
