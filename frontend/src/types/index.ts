// Trading related types
export interface Trade {
  id: string
  userId: string
  pair: string
  entryPrice: number
  exitPrice?: number
  lotSize: number
  direction: 'long' | 'short'
  openTime: Date
  closeTime?: Date
  tags: string[]
  profit?: number
  isOpen: boolean
  stopLoss?: number
  takeProfit?: number
  notes?: string
}

export interface TradeTag {
  id: string
  name: string
  color: string
  description?: string
  createdAt: Date
}

export interface PositionSizing {
  accountBalance: number
  riskPercentage: number
  entryPrice: number
  stopLoss: number
  pair: string
}

export interface PositionSizeResult {
  lotSize: number
  riskAmount: number
  positionValue: number
  pipValue: number
  pipsAtRisk: number
}

export interface Analytics {
  totalTrades: number
  winRate: number
  totalProfit: number
  averageWin: number
  averageLoss: number
  profitFactor: number
  maxDrawdown: number
  bestTrade: number
  worstTrade: number
  winsByTag: Record<string, { wins: number; total: number; winRate: number }>
}

// User types
export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  accountBalance: number
  defaultRiskPercentage: number
  createdAt: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Form types
export interface TradeFormData {
  pair: string
  entryPrice: number
  exitPrice?: number
  lotSize: number
  direction: 'long' | 'short'
  tags: string[]
  stopLoss?: number
  takeProfit?: number
  notes?: string
}

export interface CalculatorFormData {
  accountBalance: number
  riskPercentage: number
  entryPrice: number
  stopLoss: number
  pair: string
}
