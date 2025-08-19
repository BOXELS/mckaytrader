import { useState } from 'react'
import { Plus, Filter, Edit, Trash2, Tag } from 'lucide-react'

const TradeLog = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    pair: 'EUR/USD',
    entryPrice: '',
    exitPrice: '',
    lotSize: '',
    direction: 'long',
    tags: [],
    stopLoss: '',
    takeProfit: '',
    notes: ''
  })

  const trades = [
    {
      id: '1',
      pair: 'EUR/USD',
      entryPrice: 1.0850,
      exitPrice: 1.0920,
      lotSize: 0.5,
      direction: 'long',
      openTime: '2024-08-19 09:30',
      closeTime: '2024-08-19 11:15',
      profit: 45.20,
      tags: ['Reversal', 'Support'],
      status: 'Closed'
    },
    {
      id: '2',
      pair: 'EUR/USD',
      entryPrice: 1.0895,
      exitPrice: 1.0865,
      lotSize: 0.3,
      direction: 'short',
      openTime: '2024-08-19 14:20',
      closeTime: '2024-08-19 15:45',
      profit: -23.10,
      tags: ['Breakout', 'Failed'],
      status: 'Closed'
    },
    {
      id: '3',
      pair: 'EUR/USD',
      entryPrice: 1.0875,
      lotSize: 0.4,
      direction: 'long',
      openTime: '2024-08-19 16:30',
      profit: 15.40,
      tags: ['H&S', 'Reversal'],
      status: 'Open'
    }
  ]

  const availableTags = ['Reversal', 'Breakout', 'H&S', 'Support', 'Resistance', 'Trend', 'Failed', 'Scalp']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add trade to database
    console.log('Adding trade:', formData)
    setShowAddForm(false)
    setFormData({
      pair: 'EUR/USD',
      entryPrice: '',
      exitPrice: '',
      lotSize: '',
      direction: 'long',
      tags: [],
      stopLoss: '',
      takeProfit: '',
      notes: ''
    })
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Trade Log</h1>
        <div className="flex space-x-4">
          <button className="btn btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Trade
          </button>
        </div>
      </div>

      {/* Add Trade Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Trade</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pair</label>
                  <select
                    value={formData.pair}
                    onChange={(e) => setFormData(prev => ({ ...prev, pair: e.target.value }))}
                    className="input"
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                  <select
                    value={formData.direction}
                    onChange={(e) => setFormData(prev => ({ ...prev, direction: e.target.value }))}
                    className="input"
                  >
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entry Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.entryPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, entryPrice: e.target.value }))}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exit Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.exitPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, exitPrice: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lot Size</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.lotSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, lotSize: e.target.value }))}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stop Loss</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.stopLoss}
                    onChange={(e) => setFormData(prev => ({ ...prev, stopLoss: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Take Profit</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.takeProfit}
                    onChange={(e) => setFormData(prev => ({ ...prev, takeProfit: e.target.value }))}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        formData.tags.includes(tag)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="input h-20 resize-none"
                  placeholder="Trade analysis, reasons, etc..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Trade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Trades Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Direction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lot Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P&L</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{trade.pair}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      trade.direction === 'long' 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-danger-100 text-danger-800'
                    }`}>
                      {trade.direction.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{trade.entryPrice}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {trade.exitPrice || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{trade.lotSize}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${
                    trade.profit > 0 ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      trade.status === 'Open' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {trade.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-primary-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-danger-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TradeLog
