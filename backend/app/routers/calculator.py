from fastapi import APIRouter, HTTPException
from app.models import PositionSizingRequest, PositionSizingResponse, ApiResponse
import math

router = APIRouter()

@router.post("/position-size", response_model=ApiResponse)
async def calculate_position_size(request: PositionSizingRequest):
    """Calculate optimal position size based on risk management"""
    try:
        # Calculate risk amount
        risk_amount = (request.account_balance * request.risk_percentage) / 100
        
        # Calculate pips at risk
        pips_at_risk = abs(request.entry_price - request.stop_loss) * get_pip_multiplier(request.pair)
        
        # Get pip value for the pair
        pip_value = get_pip_value(request.pair)
        
        # Calculate lot size
        if pips_at_risk > 0:
            lot_size = risk_amount / (pips_at_risk * pip_value)
        else:
            raise ValueError("Stop loss must be different from entry price")
        
        # Calculate position value
        position_value = lot_size * 100000 * request.entry_price  # Standard lot = 100,000 units
        
        result = PositionSizingResponse(
            lot_size=round(lot_size, 2),
            risk_amount=round(risk_amount, 2),
            position_value=round(position_value, 2),
            pip_value=pip_value,
            pips_at_risk=round(pips_at_risk, 1)
        )
        
        return ApiResponse(
            success=True,
            message="Position size calculated successfully",
            data=result.dict()
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/pip-value/{pair}")
async def get_pair_pip_value(pair: str):
    """Get pip value for a currency pair"""
    try:
        pip_value = get_pip_value(pair)
        pip_multiplier = get_pip_multiplier(pair)
        
        return ApiResponse(
            success=True,
            data={
                "pair": pair,
                "pip_value": pip_value,
                "pip_multiplier": pip_multiplier
            }
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/risk-reward", response_model=ApiResponse)
async def calculate_risk_reward(
    entry_price: float,
    stop_loss: float,
    take_profit: float,
    pair: str = "EUR/USD"
):
    """Calculate risk-to-reward ratio"""
    try:
        pip_multiplier = get_pip_multiplier(pair)
        
        risk_pips = abs(entry_price - stop_loss) * pip_multiplier
        reward_pips = abs(take_profit - entry_price) * pip_multiplier
        
        if risk_pips == 0:
            raise ValueError("Risk cannot be zero")
        
        risk_reward_ratio = reward_pips / risk_pips
        
        return ApiResponse(
            success=True,
            data={
                "risk_pips": round(risk_pips, 1),
                "reward_pips": round(reward_pips, 1),
                "risk_reward_ratio": round(risk_reward_ratio, 2),
                "is_favorable": risk_reward_ratio >= 2.0
            }
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

def get_pip_value(pair: str) -> float:
    """Get pip value for different currency pairs"""
    # Standard pip values for major pairs (per standard lot)
    pip_values = {
        "EUR/USD": 10.0,
        "GBP/USD": 10.0,
        "AUD/USD": 10.0,
        "NZD/USD": 10.0,
        "USD/CAD": 10.0,
        "USD/CHF": 10.0,
        "USD/JPY": 10.0,  # Simplified - actual calculation is more complex
        "EUR/GBP": 10.0,
        "EUR/JPY": 10.0,
        "GBP/JPY": 10.0,
    }
    
    return pip_values.get(pair.upper(), 10.0)

def get_pip_multiplier(pair: str) -> int:
    """Get pip multiplier for different currency pairs"""
    # Most pairs have 4 decimal places, JPY pairs have 2
    if "JPY" in pair.upper():
        return 100  # 2 decimal places
    else:
        return 10000  # 4 decimal places
