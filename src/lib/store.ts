import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { ACTIVITY_MULTIPLIERS } from './constants'

export interface EmissionLog {
  id: string
  category: string
  amount_kg_co2: number
  action_description: string
  logged_date: string
  created_at: string
}

export interface UserProfile {
  green_score: number
}

interface AppState {
  emissions: EmissionLog[]
  profile: UserProfile
  logEmission: (activityType: string, quantity: number, dateStr: string) => { success: boolean, amountKgCo2: number, pointsAwarded: number }
  resetStore: () => void
}

const getDemoEmissions = (): EmissionLog[] => {
  const now = new Date()
  const logs: EmissionLog[] = []
  
  // A realistic, emotional 14-day history for the demo
  const activities = [
    { type: 'Car (Gasoline)', qty: 15, daysAgo: 0 },
    { type: 'Vegetarian Meal', qty: 1, daysAgo: 0 },
    { type: 'Bus', qty: 10, daysAgo: 1 },
    { type: 'Air Conditioning', qty: 4, daysAgo: 1 },
    { type: 'Flight (Short Haul)', qty: 400, daysAgo: 2 }, // High impact event
    { type: 'Beef Meal', qty: 2, daysAgo: 3 },
    { type: 'Car (Gasoline)', qty: 12, daysAgo: 4 },
    { type: 'Vegetarian Meal', qty: 3, daysAgo: 5 },
    { type: 'Air Conditioning', qty: 6, daysAgo: 5 },
    { type: 'Clothing / Apparel', qty: 1, daysAgo: 7 }, // High impact event
    { type: 'Bus', qty: 8, daysAgo: 8 },
    { type: 'Car (Gasoline)', qty: 20, daysAgo: 10 },
    { type: 'Vegetarian Meal', qty: 2, daysAgo: 12 },
  ]

  activities.forEach(act => {
    const d = new Date()
    d.setDate(now.getDate() - act.daysAgo)
    const dateStr = d.toISOString().split('T')[0]
    
    const def = ACTIVITY_MULTIPLIERS[act.type]
    if (def) {
      const amountKgCo2 = def.multiplier * act.qty
      logs.push({
        id: uuidv4(),
        category: def.category,
        amount_kg_co2: amountKgCo2,
        action_description: `${act.type} (${act.qty} ${def.unit})`,
        logged_date: dateStr,
        created_at: d.toISOString()
      })
    }
  })
  
  return logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export const useEmissionsStore = create<AppState>()(
  persist(
    (set, get) => ({
      emissions: getDemoEmissions(),
      profile: { green_score: 145 },
      logEmission: (activityType: string, quantity: number, dateStr: string) => {
        const activityDef = ACTIVITY_MULTIPLIERS[activityType]
        if (!activityDef) throw new Error('Unknown activity type')

        const amountKgCo2 = activityDef.multiplier * quantity
        const description = `${activityType} (${quantity} ${activityDef.unit})`

        const newLog: EmissionLog = {
          id: uuidv4(),
          category: activityDef.category,
          amount_kg_co2: amountKgCo2,
          action_description: description,
          logged_date: dateStr,
          created_at: new Date().toISOString()
        }

        let pointsAwarded = 0
        if (amountKgCo2 === 0) pointsAwarded = 20
        else if (amountKgCo2 < 2) pointsAwarded = 5

        set((state) => ({
          emissions: [newLog, ...state.emissions],
          profile: {
            green_score: state.profile.green_score + pointsAwarded
          }
        }))

        return { success: true, amountKgCo2, pointsAwarded }
      },
      resetStore: () => {
        set({ emissions: getDemoEmissions(), profile: { green_score: 145 } })
      }
    }),
    {
      name: 'carbon-aware-storage',
    }
  )
)
