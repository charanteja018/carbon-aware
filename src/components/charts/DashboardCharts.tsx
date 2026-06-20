'use client'

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-lg border-none text-[#0d631b] font-bold">
        {`${label}: ${payload[0].value}kg`}
      </div>
    );
  }
  return null;
};

export function TrendChart({ data }: { data: { name: string, kg: number }[] }) {
  // data should be an array like [{ name: 'Mon', kg: 12 }, { name: 'Tue', kg: 15 }]

  return (
    <div className="h-48 w-full mt-4" role="figure" aria-label="Line chart showing carbon emissions trend">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
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
      <table className="sr-only">
        <caption>Carbon Emissions Trend</caption>
        <thead>
          <tr>
            <th scope="col">Date/Period</th>
            <th scope="col">Emissions (kg CO2)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.kg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const COLORS = ['#012d1d', '#0e6c4a', '#3a2017', '#e1e3e4']

export function BreakdownChart({ data }: { data: { name: string, value: number }[] }) {
  // data should be an array like [{ name: 'Transport', value: 40 }, ...]

  return (
    <div className="relative w-48 h-48" role="figure" aria-label="Pie chart showing carbon emissions breakdown by category">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" aria-hidden="true">
        <span className="text-[10px] font-bold text-on-surface-variant tracking-widest">TOTAL</span>
        <span className="text-xl font-bold text-primary">
          {data.reduce((sum, item) => sum + item.value, 0).toFixed(1)}kg
        </span>
      </div>
      <table className="sr-only">
        <caption>Carbon Emissions Breakdown by Category</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Emissions (kg CO2)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
