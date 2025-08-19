import apiClient from './api'
import { Trade, TradeFormData, PositionSizeResult, Analytics } from '../types'

export const tradeService = {
  // Get all trades
  getTrades: async (filters?: { status?: string; pair?: string; limit?: number }) => {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.pair) params.append('pair', filters.pair)
    if (filters?.limit) params.append('limit', filters.limit.toString())
    
    const response = await apiClient.get(`/trades?${params}`)
    return response.data
  },

  // Create new trade
  createTrade: async (tradeData: TradeFormData) => {
    const response = await apiClient.post('/trades', tradeData)
    return response.data
  },

  // Update trade
  updateTrade: async (tradeId: string, updateData: Partial<TradeFormData>) => {
    const response = await apiClient.put(`/trades/${tradeId}`, updateData)
    return response.data
  },

  // Delete trade
  deleteTrade: async (tradeId: string) => {
    const response = await apiClient.delete(`/trades/${tradeId}`)
    return response.data
  },

  // Get specific trade
  getTrade: async (tradeId: string) => {
    const response = await apiClient.get(`/trades/${tradeId}`)
    return response.data
  },
}

export const calculatorService = {
  // Calculate position size
  calculatePositionSize: async (params: {
    accountBalance: number
    riskPercentage: number
    entryPrice: number
    stopLoss: number
    pair: string
  }) => {
    const response = await apiClient.post('/calculator/position-size', params)
    return response.data
  },

  // Calculate risk-reward ratio
  calculateRiskReward: async (params: {
    entryPrice: number
    stopLoss: number
    takeProfit: number
    pair: string
  }) => {
    const response = await apiClient.post('/calculator/risk-reward', params)
    return response.data
  },

  // Get pip value for pair
  getPipValue: async (pair: string) => {
    const response = await apiClient.get(`/calculator/pip-value/${pair}`)
    return response.data
  },
}

export const analyticsService = {
  // Get overall analytics
  getOverview: async () => {
    const response = await apiClient.get('/analytics/overview')
    return response.data
  },

  // Get wins by tag
  getWinsByTag: async () => {
    const response = await apiClient.get('/analytics/wins-by-tag')
    return response.data
  },

  // Get monthly performance
  getMonthlyPerformance: async (months: number = 12) => {
    const response = await apiClient.get(`/analytics/monthly-performance?months=${months}`)
    return response.data
  },
}
