'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { ACTIVITY_MULTIPLIERS } from '@/lib/constants'

export async function logEmission(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in to log activities.')
  }

  const activityType = formData.get('activity_type') as string
  const quantity = parseFloat(formData.get('quantity') as string)
  const dateStr = formData.get('date') as string || new Date().toISOString().split('T')[0]

  if (!activityType || isNaN(quantity)) {
    throw new Error('Invalid input.')
  }

  const activityDef = ACTIVITY_MULTIPLIERS[activityType]
  if (!activityDef) {
    throw new Error('Unknown activity type.')
  }

  const amountKgCo2 = activityDef.multiplier * quantity
  const description = `${activityType} (${quantity} unit${quantity > 1 ? 's' : ''})`

  const { error } = await supabase
    .from('emissions_logs')
    .insert({
      user_id: user.id,
      category: activityDef.category,
      amount_kg_co2: amountKgCo2,
      action_description: description,
      logged_date: dateStr,
    })

  if (error) {
    console.error('Error logging emission:', error)
    throw new Error('Failed to log activity to database.')
  }

  // Award points based on low-carbon choices (Gamification simple logic)
  let pointsAwarded = 0
  if (amountKgCo2 === 0) pointsAwarded = 20
  else if (amountKgCo2 < 2) pointsAwarded = 5

  if (pointsAwarded > 0) {
    // Increment score
    const { data: profile } = await supabase.from('profiles').select('green_score').eq('id', user.id).single()
    if (profile) {
      await supabase.from('profiles').update({ green_score: profile.green_score + pointsAwarded }).eq('id', user.id)
    }
  }

  revalidatePath('/dashboard')
  revalidatePath('/activity')
  revalidatePath('/insights')
  revalidatePath('/leaderboard')

  return { success: true, amountKgCo2, pointsAwarded }
}

export async function getDashboardData() {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { emissions: [], profile: null }
    }

    const { data: emissions } = await supabase
      .from('emissions_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_date', { ascending: false })

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return { emissions: emissions || [], profile }
  } catch (err) {
    console.error('Error fetching dashboard data:', err)
    return { emissions: [], profile: null }
  }
}

export async function getLeaderboardData() {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    // Fetch top 10 profiles by green_score
    const { data: topProfiles, error } = await supabase
      .from('profiles')
      .select('id, green_score')
      .order('green_score', { ascending: false })
      .limit(10)

    if (error) throw error

    return { 
      profiles: topProfiles || [], 
      currentUserId: user?.id || null 
    }
  } catch (err) {
    console.error('Error fetching leaderboard data:', err)
    return { profiles: [], currentUserId: null }
  }
}
