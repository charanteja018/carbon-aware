'use client'

import { useEmissionsStore } from '@/lib/store'
import { TrendChart, BreakdownChart } from '@/components/charts/DashboardCharts'
import { DATA_LAST_UPDATED } from '@/lib/constants'
import { useState, useEffect } from 'react'

export default function InsightsPage() {
  const { emissions } = useEmissionsStore()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
  )

  const totalKg = emissions.reduce((sum, log) => {
    const amount = Number(log.amount_kg_co2)
    return sum + (Number.isNaN(amount) ? 0 : amount)
  }, 0)
  const breakdown = emissions.reduce((acc: Record<string, number>, log) => {
    const amount = Number(log.amount_kg_co2)
    acc[log.category] = (acc[log.category] || 0) + (Number.isNaN(amount) ? 0 : amount)
    return acc
  }, { Transport: 0, Food: 0, Electricity: 0, Purchases: 0 })

  const transportPercent = totalKg > 0 && Number.isFinite(totalKg) ? ((breakdown.Transport / totalKg) * 100).toFixed(0) : '0'
  const foodPercent = totalKg > 0 && Number.isFinite(totalKg) ? ((breakdown.Food / totalKg) * 100).toFixed(0) : '0'
  const electricityPercent = totalKg > 0 && Number.isFinite(totalKg) ? ((breakdown.Electricity / totalKg) * 100).toFixed(0) : '0'
  const purchasesPercent = totalKg > 0 && Number.isFinite(totalKg) ? (((breakdown.Purchases || 0) / totalKg) * 100).toFixed(0) : '0'

  // Group emissions by month for the Trend Chart
  const trendDataMap = new Map<string, number>()
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = d.toLocaleString('en-US', { month: 'short' })
    trendDataMap.set(monthName, 0)
  }

  emissions.forEach((log) => {
    const d = new Date(log.logged_date)
    const monthDiff = (now.getFullYear() - d.getFullYear()) * 12 + now.getMonth() - d.getMonth()
    if (monthDiff >= 0 && monthDiff < 6) {
      const monthName = d.toLocaleString('en-US', { month: 'short' })
      if (trendDataMap.has(monthName)) {
        trendDataMap.set(monthName, trendDataMap.get(monthName)! + Number(log.amount_kg_co2))
      }
    }
  })

  const trendData = Array.from(trendDataMap.entries()).map(([name, kg]) => ({ name, kg }))

  return (
    <main className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <section className="text-center md:text-left">
        <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Deep Insights</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Analyze your carbon footprint trends and discover where you can make the biggest difference.
        </p>
        <p className="text-xs font-bold text-on-surface-variant opacity-70 flex items-center justify-center md:justify-start gap-1 mt-2">
          <span className="material-symbols-outlined text-[14px]">verified</span> Data Verified: {DATA_LAST_UPDATED}
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Carbon Breakdown */}
        <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 space-y-8">
          <h2 className="font-headline-md text-headline-md text-primary">Carbon Breakdown</h2>
          <div className="flex flex-col items-center gap-8">
            <BreakdownChart data={[
              { name: 'Transport', value: breakdown.Transport },
              { name: 'Food', value: breakdown.Food },
              { name: 'Electricity', value: breakdown.Electricity },
              { name: 'Purchases', value: breakdown.Purchases || 0 }
            ].filter(item => item.value > 0)} />

            <div className="w-full space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <span className="flex items-center gap-3 font-bold"><span className="w-4 h-4 rounded-full bg-[#012d1d]"></span> Transport</span>
                <span className="font-bold text-lg">{transportPercent}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <span className="flex items-center gap-3 font-bold"><span className="w-4 h-4 rounded-full bg-[#0e6c4a]"></span> Food</span>
                <span className="font-bold text-lg">{foodPercent}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <span className="flex items-center gap-3 font-bold"><span className="w-4 h-4 rounded-full bg-[#3a2017]"></span> Electricity</span>
                <span className="font-bold text-lg">{electricityPercent}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <span className="flex items-center gap-3 font-bold"><span className="w-4 h-4 rounded-full bg-[#6a3010]"></span> Purchases</span>
                <span className="font-bold text-lg">{purchasesPercent}%</span>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          {/* Trend Analysis */}
          <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 space-y-6">
            <h2 className="font-headline-md text-headline-md text-primary">6-Month Trend Analysis</h2>
            
            <div className="relative w-full pt-4">
              <TrendChart data={trendData} />
            </div>
            
            <p className="font-label-sm text-on-surface-variant p-4 bg-surface-container-low rounded-xl italic border-l-2 border-primary">
              &quot;Every peak in this chart represents real environmental cost. Pay attention to sudden spikes in your emissions.&quot;
            </p>
          </section>

          {/* Actionable Recommendations */}
          <section className="bg-primary-container text-white p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] space-y-6 group overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="font-headline-md text-headline-md text-surface-bright flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">tips_and_updates</span>
                2026 AI Climate Coach
              </h2>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-4 transform hover:translate-x-2 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-secondary-fixed mt-1">eco</span>
                  <div>
                    <h4 className="font-bold text-lg text-primary-fixed">Protect 2026 Biodiversity</h4>
                    <p className="opacity-90">Agricultural emissions are the leading driver of biodiversity loss and water scarcity. Shifting to plant-based meals 3 days a week immediately preserves critical fresh water.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 transform hover:translate-x-2 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-secondary-fixed mt-1">health_and_safety</span>
                  <div>
                    <h4 className="font-bold text-lg text-primary-fixed">Reduce Health Impacts</h4>
                    <p className="opacity-90">Fossil fuel combustion directly contributes to the respiratory crisis. Swapping 20 miles of driving for public transit removes toxic particulate matter from your local air.</p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Background design elements to make it less static */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none transform group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 right-10 w-16 h-16 bg-white/10 rounded-t-full pointer-events-none"></div>
          </section>
        </div>
      </div>
    </main>
  )
}
