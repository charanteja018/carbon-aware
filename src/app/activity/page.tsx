'use client'

import { useState } from 'react'
import { logEmission } from '@/app/actions/emissions'
import { ACTIVITY_MULTIPLIERS } from '@/lib/constants'

export default function ActivityPage() {
  const [activityType, setActivityType] = useState('Car (Gasoline)')
  const [quantity, setQuantity] = useState(15)
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const currentDef = ACTIVITY_MULTIPLIERS[activityType]
  const estimatedImpact = currentDef ? (currentDef.multiplier * (quantity || 0)).toFixed(1) : '0.0'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMsg('')

    try {
      const formData = new FormData()
      formData.append('activity_type', activityType)
      formData.append('quantity', quantity.toString())
      formData.append('date', date)

      const res = await logEmission(formData)
      if (res.success) {
        setSuccessMsg(`Successfully logged! +${res.pointsAwarded} points.`)
        // Optionally reset form
        setQuantity(0)
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleQuickAdd(type: string, qty: number) {
    setActivityType(type)
    setQuantity(qty)
  }

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8">
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
                <label className="block text-label-md font-bold text-on-surface-variant mb-2">Quantity ({currentDef?.category === 'Transport' ? 'Miles' : currentDef?.category === 'Food' ? 'Servings' : 'Hours'})</label>
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

              {successMsg && (
                <div className="bg-primary/10 text-primary p-4 rounded-xl border border-primary/20 font-bold">
                  {successMsg}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl shadow-md hover:shadow-primary/20 transition-all flex justify-center items-center gap-2 group disabled:opacity-50"
              >
                <span className="material-symbols-outlined">{isSubmitting ? 'hourglass_empty' : 'add_circle'}</span>
                <span>{isSubmitting ? 'Logging...' : 'Log Activity'}</span>
              </button>
            </form>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
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

          {/* Impact Preview */}
          <section className="bg-primary-container text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-headline-md text-headline-md text-surface-bright mb-2">Estimated Impact</h3>
            <p className="font-body-md text-primary-fixed mb-6">Logging this activity will add approximately:</p>
            <div className="flex items-end gap-2 mb-4">
              <span className="font-display-lg text-5xl font-bold">{estimatedImpact}</span>
              <span className="text-xl font-bold mb-1 opacity-80">kg CO2</span>
            </div>
            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary-fixed rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (parseFloat(estimatedImpact) / 20) * 100)}%` }}></div>
            </div>
            <p className="text-xs mt-2 text-primary-fixed text-right">Based on daily target of 20kg</p>
          </section>
        </div>
      </div>
    </div>
  )
}
