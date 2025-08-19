import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tradeService, calculatorService, analyticsService } from '../services/tradingService'

// Trade hooks
export const useTrades = (filters?: { status?: string; pair?: string; limit?: number }) => {
  return useQuery({
    queryKey: ['trades', filters],
    queryFn: () => tradeService.getTrades(filters),
  })
}

export const useTrade = (tradeId: string) => {
  return useQuery({
    queryKey: ['trade', tradeId],
    queryFn: () => tradeService.getTrade(tradeId),
    enabled: !!tradeId,
  })
}

export const useCreateTrade = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tradeService.createTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] })
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export const useUpdateTrade = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ tradeId, data }: { tradeId: string; data: any }) =>
      tradeService.updateTrade(tradeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] })
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export const useDeleteTrade = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tradeService.deleteTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] })
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

// Calculator hooks
export const usePositionSizeCalculator = () => {
  return useMutation({
    mutationFn: calculatorService.calculatePositionSize,
  })
}

export const useRiskRewardCalculator = () => {
  return useMutation({
    mutationFn: calculatorService.calculateRiskReward,
  })
}

export const usePipValue = (pair: string) => {
  return useQuery({
    queryKey: ['pip-value', pair],
    queryFn: () => calculatorService.getPipValue(pair),
    enabled: !!pair,
  })
}

// Analytics hooks
export const useAnalyticsOverview = () => {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: analyticsService.getOverview,
  })
}

export const useWinsByTag = () => {
  return useQuery({
    queryKey: ['analytics', 'wins-by-tag'],
    queryFn: analyticsService.getWinsByTag,
  })
}

export const useMonthlyPerformance = (months: number = 12) => {
  return useQuery({
    queryKey: ['analytics', 'monthly-performance', months],
    queryFn: () => analyticsService.getMonthlyPerformance(months),
  })
}
