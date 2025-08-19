import { useState } from 'react'
import { Calculator as CalculatorIcon, DollarSign, Target, TrendingUp } from 'lucide-react'

const Calculator = () => {
  const [formData, setFormData] = useState({
    accountBalance: 10000,
    riskPercentage: 2,
    entryPrice: 1.0850,
    stopLoss: 1.0800,
    pair: 'EUR/USD'
  })

  const [result, setResult] = useState<any>(null)

  const calculatePosition = () => {
    const { accountBalance, riskPercentage, entryPrice, stopLoss } = formData
    
    const riskAmount = (accountBalance * riskPercentage) / 100
    const pipsAtRisk = Math.abs(entryPrice - stopLoss) * 10000 // for EUR/USD
    const pipValue = 10 // Standard lot pip value for EUR/USD
    const lotSize = riskAmount / (pipsAtRisk * pipValue)
    const positionValue = lotSize * 100000 * entryPrice // Standard lot = 100,000 units
    
    setResult({
      lotSize: Number(lotSize.toFixed(2)),
      riskAmount: Number(riskAmount.toFixed(2)),
      positionValue: Number(positionValue.toFixed(2)),
      pipValue,
      pipsAtRisk: Number(pipsAtRisk.toFixed(1))
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pair' ? value : Number(value)
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <CalculatorIcon className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Position Size Calculator</h1>
          <p className="text-gray-600">Calculate optimal position size based on risk management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Trade Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency Pair
              </label>
              <select
                name="pair"
                value={formData.pair}
                onChange={handleInputChange}
                className="input"
              >
                <option value="EUR/USD">EUR/USD</option>
                <option value="GBP/USD">GBP/USD</option>
                <option value="USD/JPY">USD/JPY</option>
                <option value="AUD/USD">AUD/USD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Balance ($)
              </label>
              <input
                type="number"
                name="accountBalance"
                value={formData.accountBalance}
                onChange={handleInputChange}
                className="input"
                placeholder="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Percentage (%)
              </label>
              <input
                type="number"
                name="riskPercentage"
                value={formData.riskPercentage}
                onChange={handleInputChange}
                step="0.1"
                className="input"
                placeholder="2.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Price
              </label>
              <input
                type="number"
                name="entryPrice"
                value={formData.entryPrice}
                onChange={handleInputChange}
                step="0.0001"
                className="input"
                placeholder="1.0850"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop Loss
              </label>
              <input
                type="number"
                name="stopLoss"
                value={formData.stopLoss}
                onChange={handleInputChange}
                step="0.0001"
                className="input"
                placeholder="1.0800"
              />
            </div>

            <button
              onClick={calculatePosition}
              className="w-full btn btn-primary mt-6"
            >
              Calculate Position Size
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Calculation Results</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-gray-900">Lot Size</span>
                  </div>
                  <span className="text-lg font-bold text-primary-600">{result.lotSize}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Risk Amount</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">${result.riskAmount}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Position Value</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">${result.positionValue.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Pips at Risk</p>
                    <p className="text-lg font-semibold text-gray-900">{result.pipsAtRisk}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Pip Value</p>
                    <p className="text-lg font-semibold text-gray-900">${result.pipValue}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Management Tips */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Management Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Never risk more than 2-3% of your account on a single trade</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Always set your stop loss before entering a trade</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Maintain a risk-to-reward ratio of at least 1:2</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Consider market volatility when setting position sizes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
