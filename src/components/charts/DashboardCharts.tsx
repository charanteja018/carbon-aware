'use client'

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function TrendChart({ data }: { data: any[] }) {
  // data should be an array like [{ name: 'Mon', kg: 12 }, { name: 'Tue', kg: 15 }]
  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            itemStyle={{ color: '#0d631b', fontWeight: 'bold' }}
          />
          <Line 
            type="monotone" 
            dataKey="kg" 
            stroke="#0d631b" 
            strokeWidth={4}
            dot={{ fill: '#0d631b', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const COLORS = ['#012d1d', '#0e6c4a', '#3a2017', '#e1e3e4']

export function BreakdownChart({ data }: { data: any[] }) {
  // data should be an array like [{ name: 'Transport', value: 40 }, ...]
  return (
    <div className="relative w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[10px] font-bold text-on-surface-variant tracking-widest">TOTAL</span>
        <span className="text-xl font-bold text-primary">
          {data.reduce((sum, item) => sum + item.value, 0).toFixed(1)}kg
        </span>
      </div>
    </div>
  )
}
