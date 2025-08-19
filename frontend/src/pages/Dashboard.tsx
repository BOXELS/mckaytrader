import { TrendingUp, Calculator, BarChart3, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const stats = [
    { label: 'Total Trades', value: '127', change: '+12', icon: TrendingUp },
    { label: 'Win Rate', value: '68.5%', change: '+2.3%', icon: Target },
    { label: 'Total Profit', value: '$2,847', change: '+$234', icon: TrendingUp },
    { label: 'Active Trades', value: '3', change: '0', icon: BarChart3 },
  ]

  const recentTrades = [
    { pair: 'EUR/USD', type: 'Long', profit: '+$45.20', status: 'Closed', tags: ['Reversal'] },
    { pair: 'EUR/USD', type: 'Short', profit: '-$23.10', status: 'Closed', tags: ['Breakout'] },
    { pair: 'EUR/USD', type: 'Long', profit: '+$67.30', status: 'Open', tags: ['H&S'] },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Trading Dashboard</h1>
        <Link to="/calculator" className="btn btn-primary">
          <Calculator className="w-4 h-4 mr-2" />
          Position Calculator
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success-600' : 'text-gray-500'}`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/calculator" className="card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Position Calculator</h3>
              <p className="text-sm text-gray-600">Calculate optimal position size</p>
            </div>
          </div>
        </Link>

        <Link to="/trades" className="card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Log New Trade</h3>
              <p className="text-sm text-gray-600">Record and tag your trades</p>
            </div>
          </div>
        </Link>

        <Link to="/analytics" className="card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600">Analyze your trading patterns</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Trades */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Trades</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P&L</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTrades.map((trade, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{trade.pair}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{trade.type}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${trade.profit.startsWith('+') ? 'text-success-600' : 'text-danger-600'}`}>
                    {trade.profit}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${trade.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {trade.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded">
                          {tag}
                        </span>
                      ))}
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

export default Dashboard
