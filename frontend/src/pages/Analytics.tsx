import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const Analytics = () => {
  const winRateByTag = [
    { tag: 'Reversal', wins: 15, total: 22, winRate: 68.2 },
    { tag: 'Breakout', wins: 8, total: 15, winRate: 53.3 },
    { tag: 'H&S', wins: 12, total: 16, winRate: 75.0 },
    { tag: 'Support', wins: 9, total: 12, winRate: 75.0 },
    { tag: 'Resistance', wins: 6, total: 10, winRate: 60.0 },
    { tag: 'Trend', wins: 18, total: 25, winRate: 72.0 },
  ]

  const monthlyPerformance = [
    { month: 'Jan', profit: 450, trades: 25 },
    { month: 'Feb', profit: 320, trades: 18 },
    { month: 'Mar', profit: -120, trades: 22 },
    { month: 'Apr', profit: 680, trades: 28 },
    { month: 'May', profit: 540, trades: 24 },
    { month: 'Jun', profit: 750, trades: 30 },
    { month: 'Jul', profit: 620, trades: 26 },
    { month: 'Aug', profit: 890, trades: 32 },
  ]

  const winLossData = [
    { name: 'Wins', value: 87, color: '#10b981' },
    { name: 'Losses', value: 40, color: '#ef4444' },
  ]

  const COLORS = ['#10b981', '#ef4444']

  const stats = [
    { label: 'Total Trades', value: '127', period: 'All Time' },
    { label: 'Win Rate', value: '68.5%', period: 'Last 30 Days' },
    { label: 'Profit Factor', value: '1.85', period: 'All Time' },
    { label: 'Avg Win', value: '$67.30', period: 'All Time' },
    { label: 'Avg Loss', value: '$-32.50', period: 'All Time' },
    { label: 'Max Drawdown', value: '8.2%', period: 'All Time' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Trading Analytics</h1>
        <p className="text-gray-600">Analyze your trading performance and patterns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Win Rate by Tag */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Win Rate by Trading Pattern</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winRateByTag}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tag" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'winRate' ? `${value}%` : value,
                  name === 'winRate' ? 'Win Rate' : name
                ]}
              />
              <Bar dataKey="winRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Win/Loss Pie Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Win/Loss Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={winLossData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {winLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Trades']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Wins (87)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-danger-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Losses (40)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Performance</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'profit' ? `$${value}` : value,
                name === 'profit' ? 'Profit' : 'Trades'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trading Pattern Analysis */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pattern Performance Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pattern</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Trades</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Win Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Best Trade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {winRateByTag.map((pattern, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                      {pattern.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{pattern.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{pattern.wins}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      pattern.winRate >= 70 ? 'text-success-600' : 
                      pattern.winRate >= 60 ? 'text-warning-600' : 'text-danger-600'
                    }`}>
                      {pattern.winRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${(Math.random() * 100 + 20).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-success-600 font-medium">
                    +${(Math.random() * 200 + 50).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sharpe Ratio</span>
              <span className="text-sm font-medium text-gray-900">1.42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sortino Ratio</span>
              <span className="text-sm font-medium text-gray-900">1.89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Calmar Ratio</span>
              <span className="text-sm font-medium text-gray-900">0.95</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Recovery Factor</span>
              <span className="text-sm font-medium text-gray-900">2.1</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
              <p className="text-sm text-success-800">
                <strong>Best Pattern:</strong> Head & Shoulders (75% win rate)
              </p>
            </div>
            <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
              <p className="text-sm text-warning-800">
                <strong>Needs Work:</strong> Breakout trades (53% win rate)
              </p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Trend:</strong> Performance improving over last 3 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
