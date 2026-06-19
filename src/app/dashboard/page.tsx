'use client'

import { useEmissionsStore } from '@/lib/store'
import { TrendChart, BreakdownChart } from '@/components/charts/DashboardCharts'
import Link from 'next/link'
import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function DashboardContent() {
  const searchParams = useSearchParams()
  const { emissions, profile } = useEmissionsStore()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const filter = searchParams.get('filter') || 'week'

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
  )

  // Filter emissions
  const now = new Date()
  let filteredEmissions = emissions
  if (filter === 'week') {
    const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7)
    filteredEmissions = emissions.filter((e) => new Date(e.logged_date) >= weekAgo)
  } else if (filter === 'month') {
    const monthAgo = new Date(); monthAgo.setMonth(now.getMonth() - 1)
    filteredEmissions = emissions.filter((e) => new Date(e.logged_date) >= monthAgo)
  } else if (filter === 'year') {
    const yearAgo = new Date(); yearAgo.setFullYear(now.getFullYear() - 1)
    filteredEmissions = emissions.filter((e) => new Date(e.logged_date) >= yearAgo)
  }

  // Calculate total footprint
  const totalKg = filteredEmissions.reduce((sum, log) => sum + Number(log.amount_kg_co2), 0)

  // Calculate breakdown
  const breakdown = filteredEmissions.reduce((acc: any, log) => {
    acc[log.category] = (acc[log.category] || 0) + Number(log.amount_kg_co2)
    return acc
  }, { Transport: 0, Food: 0, Electricity: 0, Purchases: 0 })

  // Calculate Streak
  const uniqueDates = Array.from(new Set(emissions.map((e) => e.logged_date))).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (uniqueDates.length > 0 && (uniqueDates[0] === today || uniqueDates[0] === yesterday)) {
    currentStreak = 1;
    let expectedDate = new Date(uniqueDates[0]);
    for (let i = 1; i < uniqueDates.length; i++) {
      expectedDate.setDate(expectedDate.getDate() - 1);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      if (uniqueDates[i] === expectedDateStr) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Determine Impact Severity
  let impactLevel = 'Low'
  let impactColor = 'text-primary'
  let impactBg = 'bg-primary/10'
  let impactBorder = 'border-primary'
  
  if (totalKg > 100) {
    impactLevel = 'Critical'
    impactColor = 'text-error'
    impactBg = 'bg-error/10'
    impactBorder = 'border-error'
  } else if (totalKg > 50) {
    impactLevel = 'High'
    impactColor = 'text-[#d97706]' // Orange
    impactBg = 'bg-[#d97706]/10'
    impactBorder = 'border-[#d97706]'
  } else if (totalKg > 20) {
    impactLevel = 'Moderate'
    impactColor = 'text-[#ca8a04]' // Yellow
    impactBg = 'bg-[#ca8a04]/10'
    impactBorder = 'border-[#ca8a04]'
  }

  const score = profile?.green_score || 0

  // Recovery Indicator (e.g. Trees needed to offset this week)
  const treesNeeded = Math.ceil(totalKg / 2) // Assuming 1 tree offsets ~2kg a week roughly for demo

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header Content */}
      <section className="space-y-2 max-w-2xl mx-auto text-center md:text-left md:mx-0">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Live Carbon Tracker</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Your actions shape the world. Review your recent impact and discover paths to improvement.</p>

        <div className="flex bg-surface-container-low p-1 rounded-xl mt-4 max-w-md">
          <Link href="/dashboard?filter=week" className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md ${filter === 'week' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'}`}>This Week</Link>
          <Link href="/dashboard?filter=month" className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md ${filter === 'month' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'}`}>This Month</Link>
          <Link href="/dashboard?filter=year" className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md ${filter === 'year' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'}`}>This Year</Link>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Top Summary Cards */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 ${impactBorder} space-y-1 relative overflow-hidden group`}>
              <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full ${impactBg} opacity-50 group-hover:scale-150 transition-transform`}></div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider relative z-10">Total Footprint</p>
              <h3 className={`font-headline-md text-headline-md truncate relative z-10 ${impactColor}`} title={`${totalKg.toFixed(1)} kg`}>
                {totalKg.toFixed(1)} kg
              </h3>
              <div className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${impactBg} ${impactColor} relative z-10`}>
                {impactLevel} Severity
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-secondary space-y-1 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-secondary/10 opacity-50 group-hover:scale-150 transition-transform"></div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider relative z-10">Recovery Debt</p>
              <h3 className="font-headline-md text-headline-md text-secondary truncate relative z-10">{treesNeeded} Trees</h3>
              <p className="font-label-sm text-on-surface-variant truncate relative z-10">Needed to offset</p>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-primary space-y-1 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-primary/10 opacity-50 group-hover:scale-150 transition-transform"></div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider relative z-10">Green Score</p>
              <h3 className="font-headline-md text-headline-md text-primary truncate relative z-10">{score} pts</h3>
              <div className="h-1.5 w-full bg-secondary-container/30 rounded-full mt-2 relative z-10">
                <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (score % 20) * 5)}%` }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-tertiary space-y-1 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-tertiary/10 opacity-50 group-hover:scale-150 transition-transform"></div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider relative z-10">Consistency</p>
              <h3 className="font-headline-md text-headline-md text-tertiary truncate relative z-10">{currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}</h3>
              <p className="font-label-sm text-on-surface-variant truncate relative z-10">Active Streak</p>
            </div>
          </section>

          {/* Emotional Impact Story Card */}
          <section>
            <div className={`p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden group ${impactLevel === 'Critical' || impactLevel === 'High' ? 'bg-error text-white' : 'bg-primary-container text-white'}`}>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-surface-bright text-3xl">public</span>
                  <h2 className="font-headline-md text-headline-md text-surface-bright">Your Real-World Impact</h2>
                </div>
                
                {impactLevel === 'Critical' || impactLevel === 'High' ? (
                  <>
                    <p className="font-body-md text-lg leading-relaxed max-w-2xl text-white">
                      Your recent footprint of <strong>{totalKg.toFixed(1)}kg</strong> places a heavy burden on our fragile climate system. Emissions at this scale accelerate extreme weather events and threaten global food security.
                    </p>
                    <div className="bg-black/20 p-4 rounded-xl border border-white/20 mt-2 backdrop-blur-sm">
                      <p className="font-body-md font-bold mb-1 flex items-center gap-2"><span className="material-symbols-outlined">warning</span> Action Required:</p>
                      <p>You must drastically reduce your Transport and Food emissions. Consider eliminating flights, reducing meat consumption, and relying on public transit.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-body-md text-lg leading-relaxed max-w-2xl text-primary-fixed">
                      Your footprint of <strong>{totalKg.toFixed(1)}kg</strong> is manageable. By maintaining this trajectory, you help preserve biodiversity and protect vulnerable communities from climate disasters.
                    </p>
                    <div className="bg-surface-container-lowest/10 p-4 rounded-xl border border-surface-bright/20 mt-2 backdrop-blur-sm">
                      <p className="font-body-md font-bold text-surface-bright mb-1 flex items-center gap-2"><span className="material-symbols-outlined">psychology</span> Coach Recommendation:</p>
                      <p className="text-primary-fixed">To reach "Low" severity, try replacing two car trips with biking or adopting a fully plant-based diet for the next three days.</p>
                    </div>
                  </>
                )}
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
          </section>

          {/* Trend Analysis */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <h2 className="font-headline-md text-headline-md text-primary">Emission Velocity</h2>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30">
              <TrendChart data={[
                { name: 'Mon', kg: 12 },
                { name: 'Tue', kg: 15 },
                { name: 'Wed', kg: 8 },
                { name: 'Thu', kg: 24 },
                { name: 'Fri', kg: 10 },
                { name: 'Sat', kg: 5 },
              ]} />
            </div>
          </section>

        </div>

        <div className="space-y-8">
          {/* Carbon Breakdown */}
          <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 space-y-6">
            <h2 className="font-headline-md text-headline-md text-primary">Carbon Breakdown</h2>
            <div className="flex flex-col items-center gap-6">
              <BreakdownChart data={[
                { name: 'Transport', value: breakdown.Transport },
                { name: 'Food', value: breakdown.Food },
                { name: 'Electricity', value: breakdown.Electricity },
                { name: 'Purchases', value: breakdown.Purchases || 0 }
              ].filter(item => item.value > 0)} />

              <div className="w-full space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors">
                  <span className="flex items-center gap-3 font-label-md"><span className="w-3 h-3 rounded-full bg-[#012d1d]"></span> Transport</span>
                  <span className="font-label-md font-bold">{breakdown.Transport.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors">
                  <span className="flex items-center gap-3 font-label-md"><span className="w-3 h-3 rounded-full bg-[#0e6c4a]"></span> Food</span>
                  <span className="font-label-md font-bold">{breakdown.Food.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors">
                  <span className="flex items-center gap-3 font-label-md"><span className="w-3 h-3 rounded-full bg-[#3a2017]"></span> Electricity</span>
                  <span className="font-label-md font-bold">{breakdown.Electricity.toFixed(1)} kg</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-primary">Recent Activity</h2>
              <Link href="/activity" className="text-primary text-sm font-bold hover:underline">Log New</Link>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl divide-y divide-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 max-h-[400px] overflow-y-auto">
              {emissions.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl opacity-50">receipt_long</span>
                  <p>No activities logged yet.</p>
                </div>
              ) : (
                emissions.slice(0, 10).map((log) => (
                  <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-surface-container-lowest/80 transition-colors group">
                    <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary">
                        {log.category === 'Transport' ? 'directions_bus' : log.category === 'Food' ? 'restaurant' : log.category === 'Purchases' ? 'shopping_bag' : 'bolt'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-label-md text-on-surface font-bold truncate">{log.action_description}</h4>
                      <p className="font-label-sm text-on-surface-variant">{log.logged_date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-label-md font-bold ${log.amount_kg_co2 > 20 ? 'text-error' : 'text-primary'}`}>
                        +{Number(log.amount_kg_co2).toFixed(1)} kg
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
