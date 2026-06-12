import { getDashboardData } from '@/app/actions/emissions'
import { TrendChart, BreakdownChart } from '@/components/charts/DashboardCharts'

import Link from 'next/link'

export default async function DashboardPage({ searchParams }: { searchParams: { filter?: string } }) {
  const { emissions, profile } = await getDashboardData()
  const filter = searchParams.filter || 'week'

  // Filter emissions
  const now = new Date()
  let filteredEmissions = emissions
  if (filter === 'week') {
    const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7)
    filteredEmissions = emissions.filter((e: any) => new Date(e.logged_date) >= weekAgo)
  } else if (filter === 'month') {
    const monthAgo = new Date(); monthAgo.setMonth(now.getMonth() - 1)
    filteredEmissions = emissions.filter((e: any) => new Date(e.logged_date) >= monthAgo)
  } else if (filter === 'year') {
    const yearAgo = new Date(); yearAgo.setFullYear(now.getFullYear() - 1)
    filteredEmissions = emissions.filter((e: any) => new Date(e.logged_date) >= yearAgo)
  }

  // Calculate total footprint
  const totalKg = filteredEmissions.reduce((sum: number, log: any) => sum + Number(log.amount_kg_co2), 0)

  // Calculate breakdown
  const breakdown = filteredEmissions.reduce((acc: any, log: any) => {
    acc[log.category] = (acc[log.category] || 0) + Number(log.amount_kg_co2)
    return acc
  }, { Transport: 0, Food: 0, Electricity: 0, Purchases: 0 })

  const score = profile?.green_score || 0

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8">
      {/* Header Content */}
      <section className="space-y-2 max-w-md mx-auto text-center md:text-left md:mx-0">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">My Carbon Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Here is your current impact and what matters most right now.</p>

        <div className="flex bg-surface-container-low p-1 rounded-xl mt-4">
          <Link href="/dashboard?filter=week" className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md ${filter === 'week' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'}`}>This Week</Link>
          <Link href="/dashboard?filter=month" className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md ${filter === 'month' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'}`}>This Month</Link>
          <Link href="/dashboard?filter=year" className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md ${filter === 'year' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'}`}>This Year</Link>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Top Summary Cards (Bento) */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-primary space-y-1">
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Total Footprint</p>
              <h3 className="font-headline-md text-headline-md text-primary truncate" title={`${totalKg.toFixed(1)} kg`}>{totalKg.toFixed(1)} kg</h3>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-secondary space-y-1">
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Activities Logged</p>
              <h3 className="font-headline-md text-headline-md text-secondary truncate">{filteredEmissions.length}</h3>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-primary space-y-1">
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Green Score</p>
              <h3 className="font-headline-md text-headline-md text-primary truncate">{score} pts</h3>
              <div className="h-1.5 w-full bg-secondary-container/30 rounded-full mt-2">
                <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (score % 20) * 5)}%` }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-tertiary space-y-1">
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Streak</p>
              <h3 className="font-headline-md text-headline-md text-tertiary truncate">{filteredEmissions.length > 0 ? 'Active' : 'None'}</h3>
              <p className="font-label-sm text-on-surface-variant truncate">Keep Logging!</p>
            </div>
          </section>

          {/* Impact Story Card */}
          <section>
            <div className="bg-primary-container text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden group">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed">auto_awesome</span>
                  <h2 className="font-headline-md text-headline-md text-surface-bright">Your Carbon Story</h2>
                </div>
                <p className="font-body-md text-body-md text-primary-fixed leading-relaxed max-w-xl">
                    You have logged {filteredEmissions.length} activities this {filter}. Transport emissions total {breakdown.Transport.toFixed(1)}kg. Continue making smart choices to improve your score!
                </p>
                <div className="pt-4 overflow-hidden rounded-xl h-48">
                  <img 
                    alt="Sustainable lifestyle" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_-Gvwcm-24KtL8rnzkLNkk2Nuszq0OWb7RVm2ghtcVnXPx9KnqnT6paa2l_Y_pX5zO0FNfRvJ1rSnXCHNRSsyZ_7vlvqT9doSLVxRJglc4CFsx_4d5-ofowJhBpzi1JqMkoPNS1v0bGlC2YP6bSe6TqnBylcLWRs4ackJMplrfk46zLfgID1Mn3wqFTXu7iLlunzOdhXqXlcemX1qfQ1TMdfcdLoPzgOUiKIFongy3eI2lCko1gSyJLzJ7Z8hwbnm4jVyqO6CIxqG"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Trend Analysis */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-headline-md text-primary">Trend Analysis</h2>
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
            </div>
            <div className="bg-surface-container-lowest rounded-2xl divide-y divide-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30">
              {emissions.length === 0 ? (
                <div className="p-4 text-center text-on-surface-variant">No activities logged yet.</div>
              ) : (
                emissions.slice(0, 10).map((log: any) => (
                  <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-surface-container-lowest/80 transition-colors">
                    <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        {log.category === 'Transport' ? 'directions_bus' : log.category === 'Food' ? 'restaurant' : log.category === 'Purchases' ? 'shopping_bag' : 'bolt'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-label-md text-on-surface font-bold">{log.action_description}</h4>
                      <p className="font-label-sm text-on-surface-variant">{log.logged_date}</p>
                    </div>
                    <span className="font-label-md font-bold text-error">+{Number(log.amount_kg_co2).toFixed(1)} kg</span>
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
