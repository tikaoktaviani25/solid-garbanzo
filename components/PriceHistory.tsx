'use client';

import { PriceHistoryPoint } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PriceHistoryProps {
  history: PriceHistoryPoint[];
}

export default function PriceHistory({ history }: PriceHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  // Group by date and get average price per day
  const groupedData = history.reduce((acc, point) => {
    const date = point.date;
    if (!acc[date]) {
      acc[date] = { date, prices: [] };
    }
    acc[date].prices.push(point.price);
    return acc;
  }, {} as Record<string, { date: string; prices: number[] }>);

  const chartData = Object.values(groupedData).map(({ date, prices }) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    avgPrice: Math.round((prices.reduce((sum, p) => sum + p, 0) / prices.length) * 100) / 100,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices)
  }));

  // Get unique retailers
  const retailers = [...new Set(history.map(h => h.retailer))];
  const colors = ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Price History (Last 30 Days)</h3>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Legend 
              wrapperStyle={{ color: '#94a3b8' }}
            />
            <Line 
              type="monotone" 
              dataKey="avgPrice" 
              stroke="#a855f7" 
              strokeWidth={3}
              name="Average Price"
              dot={{ fill: '#a855f7', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="minPrice" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Lowest Price"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="maxPrice" 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Highest Price"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">Current Avg</p>
            <p className="text-2xl font-bold text-purple-400">
              ${chartData[chartData.length - 1]?.avgPrice.toFixed(2)}
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">30-Day Low</p>
            <p className="text-2xl font-bold text-green-400">
              ${Math.min(...chartData.map(d => d.minPrice)).toFixed(2)}
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">30-Day High</p>
            <p className="text-2xl font-bold text-red-400">
              ${Math.max(...chartData.map(d => d.maxPrice)).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {retailers.map((retailer, index) => (
            <span
              key={retailer}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${colors[index % colors.length]}20`,
                color: colors[index % colors.length]
              }}
            >
              {retailer}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
