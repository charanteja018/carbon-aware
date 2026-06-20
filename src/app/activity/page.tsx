'use client'

import { useState } from 'react'
import { useEmissionsStore } from '@/lib/store'
import { ACTIVITY_MULTIPLIERS } from '@/lib/constants'
import Link from 'next/link'

export default function ActivityPage() {
  const { logEmission } = useEmissionsStore()
  const [activityType, setActivityType] = useState('Car (Gasoline)')
  const [quantity, setQuantity] = useState(15)
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{ activityType: string, quantity: number, totalCo2e: number, pointsAwarded: number } | null>(null)

  const currentDef = ACTIVITY_MULTIPLIERS[activityType]
  const estimatedImpact = currentDef ? (currentDef.multiplier * (quantity || 0)).toFixed(1) : '0.0'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessData(null)

    if (!quantity || quantity <= 0) {
      setErrorMsg("Quantity must be greater than zero.")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate slight network delay for emotional suspense
      await new Promise(r => setTimeout(r, 600))
      
      const res = logEmission(activityType, quantity, date)
      if (res.success) {
        setSuccessData({
          activityType,
          quantity,
          totalCo2e: res.amountKgCo2,
          pointsAwarded: res.pointsAwarded
        })
        setQuantity(0)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message)
      } else {
        setErrorMsg("An unexpected error occurred.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleQuickAdd(type: string, qty: number) {
    setActivityType(type)
    setQuantity(qty)
  }

  function closeResult() {
    setSuccessData(null)
  }

  return (
    <main className="relative min-h-screen">
      {successData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Dimming Background */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={closeResult}></div>
          
          {/* Footprint Animation Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes floatUp {
                0% { transform: translateY(100vh) scale(0.5) rotate(-15deg); opacity: 0; }
                20% { opacity: ${successData.totalCo2e > 15 ? '0.3' : '0.8'}; }
                100% { transform: translateY(-100px) scale(1.5) rotate(15deg); opacity: 0; }
              }
              .footprint {
                position: absolute;
                color: ${successData.totalCo2e > 15 ? 'rgba(186, 26, 26, 0.6)' : 'rgba(13, 99, 27, 0.6)'};
                pointer-events: none;
                animation: floatUp 4s ease-in forwards;
                font-size: 4rem;
              }
              @media (prefers-reduced-motion: reduce) {
                .footprint { animation: none; display: none; }
              }
            `}} />
            {[...Array(successData.totalCo2e > 15 ? 24 : 12)].map((_, i, arr) => (
              <span 
                key={i} 
                className="material-symbols-outlined footprint" 
                style={{
                  left: `${5 + (i * (90 / arr.length))}%`,
                  animationDelay: `${(i % 3) * 0.5}s`,
                  animationDuration: `${3 + (i % 2)}s`,
                  transform: `scale(${0.8 + ((i % 5) * 0.1)})`
                }}
              >
                footprint
              </span>
            ))}
          </div>

          {/* Result Modal Content */}
          <div className={`relative z-10 w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-[fadeIn_0.3s_ease-out] ${successData.totalCo2e > 15 ? 'bg-error text-white' : 'bg-surface-container-lowest text-on-surface'}`}>
            <button aria-label="Close modal" onClick={closeResult} className={`absolute top-6 right-6 ${successData.totalCo2e > 15 ? 'text-white/70 hover:text-white' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">close</span>
            </button>

            <div className="text-center space-y-6">
              <span className="material-symbols-outlined text-6xl">
                {successData.totalCo2e > 40 ? 'warning' : successData.totalCo2e > 15 ? 'priority_high' : 'eco'}
              </span>
              
              <div>
                <h2 className="font-headline-lg font-bold mb-2">Activity Logged</h2>
                <div className="flex items-end justify-center gap-2">
                  <span className="font-display-lg text-6xl font-bold">+{successData.totalCo2e.toFixed(1)}</span>
                  <span className="text-2xl font-bold mb-2 opacity-80">kg CO2</span>
                </div>
              </div>

              {successData.totalCo2e > 40 ? (
                <div className="bg-black/20 p-4 rounded-xl border border-white/20 text-left">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><span className="material-symbols-outlined">public</span> 2026 Severe Impact Warning</h4>
                  <p className="text-sm opacity-90">Emissions at this scale directly accelerate ongoing extreme weather volatility. This single action consumes a massive portion of your remaining carbon budget. Please explore zero-emission alternatives immediately.</p>
                </div>
              ) : successData.totalCo2e > 15 ? (
                <div className="bg-black/20 p-4 rounded-xl border border-white/20 text-left">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><span className="material-symbols-outlined">trending_up</span> High Impact Activity</h4>
                  <p className="text-sm opacity-90">This is a significant emission event. As 2026 climate targets tighten, offsetting this impact by reducing meat consumption or adopting public transit for the week is critical.</p>
                </div>
              ) : (
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 text-left">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><span className="material-symbols-outlined">psychology</span> Climate Positive Choice</h4>
                  <p className="text-sm text-on-surface-variant">By choosing low-emission options in 2026, you actively help preserve vulnerable ecosystems and freshwater sources. Keep it up!</p>
                </div>
              )}

              <div className={`text-sm text-left p-4 rounded-xl border ${successData.totalCo2e > 15 ? 'bg-black/10 border-white/10' : 'bg-surface-container-low border-outline-variant/30'}`}>
                <p className={`font-mono text-xs mb-1 ${successData.totalCo2e > 15 ? 'text-white/80' : 'text-on-surface-variant'}`}>
                  Calculation: {successData.quantity} {ACTIVITY_MULTIPLIERS[successData.activityType]?.unit} × {ACTIVITY_MULTIPLIERS[successData.activityType]?.multiplier}
                </p>
                <p className={`text-xs flex items-center gap-1 ${successData.totalCo2e > 15 ? 'text-white/80' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-xs">info</span>
                  Data: {ACTIVITY_MULTIPLIERS[successData.activityType]?.source}
                </p>
              </div>
              
              {successData.pointsAwarded > 0 && (
                <p className={`font-bold text-lg ${successData.totalCo2e > 15 ? 'text-white' : 'text-primary'}`}>
                  Green Choice! +{successData.pointsAwarded} pts.
                </p>
              )}

              <div className="pt-4 flex gap-4">
                <Link href="/dashboard" className={`flex-1 text-center font-bold py-3 rounded-xl transition-colors ${successData.totalCo2e > 15 ? 'bg-white text-error hover:bg-white/90' : 'bg-primary text-white hover:bg-secondary'}`}>
                  View Dashboard
                </Link>
                <button onClick={closeResult} className={`flex-1 font-bold py-3 rounded-xl transition-colors ${successData.totalCo2e > 15 ? 'border-2 border-white/30 text-white hover:bg-white/10' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}>
                  Log Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
        {/* Header Section */}
      <section className="text-center md:text-left">
        <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Log Your Activities</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Track your daily actions to see their real-time impact on your carbon footprint. Every small choice adds up.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Categories */}
          <section>
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">Select Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                type="button"
                onClick={() => setActivityType('Car (Gasoline)')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${currentDef?.category === 'Transport' ? 'bg-primary/10 border-2 border-primary text-primary' : 'bg-surface-container-lowest border border-outline-variant/30 hover:border-primary text-on-surface-variant hover:text-primary'}`}>
                <span className="material-symbols-outlined text-4xl mb-2">directions_car</span>
                <span className="font-bold">Transport</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setActivityType('Vegetarian Meal')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${currentDef?.category === 'Food' ? 'bg-secondary/10 border-2 border-secondary text-secondary' : 'bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary text-on-surface-variant hover:text-secondary'}`}>
                <span className="material-symbols-outlined text-4xl mb-2">restaurant</span>
                <span className="font-bold">Diet</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setActivityType('Air Conditioning')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${currentDef?.category === 'Electricity' ? 'bg-tertiary/10 border-2 border-tertiary text-tertiary' : 'bg-surface-container-lowest border border-outline-variant/30 hover:border-tertiary text-on-surface-variant hover:text-tertiary'}`}>
                <span className="material-symbols-outlined text-4xl mb-2">home</span>
                <span className="font-bold">Energy</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setActivityType('Clothing / Apparel')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${currentDef?.category === 'Purchases' ? 'bg-primary-container border-2 border-primary text-primary-fixed' : 'bg-surface-container-lowest border border-outline-variant/30 hover:border-primary hover:bg-primary/5 text-on-surface-variant hover:text-primary'}`}>
                <span className="material-symbols-outlined text-4xl mb-2">shopping_bag</span>
                <span className="font-bold">Shopping</span>
              </button>
            </div>
          </section>

          {/* Activity Input Form */}
          <section className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">Activity Details</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Activity Type Dropdown */}
              <div>
                <label className="block text-label-md font-bold text-on-surface-variant mb-2">Activity Type</label>
                <div className="relative">
                  <select 
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    {Object.keys(ACTIVITY_MULTIPLIERS).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>

              {/* Distance Input */}
              <div>
                <label className="block text-label-md font-bold text-on-surface-variant mb-2">Quantity ({currentDef?.category === 'Transport' ? 'Miles' : currentDef?.category === 'Food' ? 'Servings' : currentDef?.category === 'Purchases' ? 'Items' : 'Hours'})</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    value={quantity || ''}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    placeholder="e.g. 15" 
                    step="0.1"
                    className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-label-md font-bold text-on-surface-variant mb-2">Date</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">calendar_today</span>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              {errorMsg && (
                <div role="alert" className="p-4 rounded-xl bg-error/10 border border-error text-error text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span>
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl shadow-md hover:shadow-primary/20 transition-all flex justify-center items-center gap-2 group disabled:opacity-50"
              >
                <span className="material-symbols-outlined">{isSubmitting ? 'hourglass_empty' : 'add_circle'}</span>
                <span>{isSubmitting ? 'Calculating Impact...' : 'Log Activity'}</span>
              </button>
            </form>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Impact Preview */}
          <section className={`p-6 rounded-2xl shadow-lg transition-colors duration-500 ${parseFloat(estimatedImpact) > 40 ? 'bg-error text-white' : parseFloat(estimatedImpact) > 15 ? 'bg-[#d97706] text-white' : 'bg-primary-container text-white'}`}>
            <h3 className="font-headline-md text-headline-md text-surface-bright mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">
                {parseFloat(estimatedImpact) > 40 ? 'warning' : 'info'}
              </span>
              Estimated Impact
            </h3>
            <p className={`font-body-md mb-6 ${parseFloat(estimatedImpact) > 15 ? 'text-white/90' : 'text-primary-fixed'}`}>
              Logging this activity will add approximately:
            </p>
            <div className="flex items-end gap-2 mb-4">
              <span className="font-display-lg text-5xl font-bold">{estimatedImpact}</span>
              <span className="text-xl font-bold mb-1 opacity-80">kg CO2</span>
            </div>
            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (parseFloat(estimatedImpact) / 15) * 100)}%` }}></div>
            </div>
            <p className={`text-xs mt-2 text-right ${parseFloat(estimatedImpact) > 15 ? 'text-white/90' : 'text-primary-fixed'}`}>
              {parseFloat(estimatedImpact) > 15 ? 'Exceeds strict 15kg daily target' : 'Within 15kg daily target'}
            </p>
          </section>

          {/* Quick Add Suggestions */}
          <section className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md text-on-background mb-4">Quick Add</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleQuickAdd('Bus', 10)}
                className="w-full flex items-center justify-between p-3 bg-surface-container-lowest hover:bg-white rounded-xl border border-outline-variant/50 hover:border-primary transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">directions_bus</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-on-surface text-sm">Daily Commute (Bus)</p>
                    <p className="text-xs text-on-surface-variant">10 miles</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">add</span>
              </button>

              <button 
                onClick={() => handleQuickAdd('Vegetarian Meal', 1)}
                className="w-full flex items-center justify-between p-3 bg-surface-container-lowest hover:bg-white rounded-xl border border-outline-variant/50 hover:border-secondary transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">restaurant</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-on-surface text-sm">Vegetarian Meal</p>
                    <p className="text-xs text-on-surface-variant">1 serving</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary">add</span>
              </button>

              <button 
                onClick={() => handleQuickAdd('Air Conditioning', 4)}
                className="w-full flex items-center justify-between p-3 bg-surface-container-lowest hover:bg-white rounded-xl border border-outline-variant/50 hover:border-tertiary transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-on-surface text-sm">Air Conditioning</p>
                    <p className="text-xs text-on-surface-variant">4 hours</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-tertiary">add</span>
              </button>
            </div>
          </section>
        </div>
      </div>
      </div>
    </main>
  )
}
