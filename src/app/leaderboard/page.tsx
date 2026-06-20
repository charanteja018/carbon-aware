'use client'

import { useEmissionsStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import Link from 'next/link'



export default function LeaderboardPage() {
  const { profile } = useEmissionsStore()
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

  const userScore = profile?.green_score && Number.isFinite(profile.green_score) ? profile.green_score : 0
  
  const allLeaders = [
    { id: 'me', display_name: 'You', green_score: userScore }
  ].sort((a, b) => b.green_score - a.green_score)

  const top3 = allLeaders.slice(0, 3)
  const rest = allLeaders.slice(3, 10)

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-12 animate-[fadeIn_0.5s_ease-out]">
      <section className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/30 pb-6">
        <div className="max-w-2xl text-left">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">Global Climate Leaders</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            See who is making the biggest impact. Compete not just for points, but for a sustainable future. Every point is a kilogram of carbon kept out of the atmosphere.
          </p>
        </div>
        <Link href="/activity" className="shrink-0 bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 self-center md:self-end">
          <span className="material-symbols-outlined">add_circle</span>
          Earn Points
        </Link>
      </section>

      {/* Top 3 Podium */}
      <section className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 pt-12 pb-8">
        {/* Rank 2 */}
        {top3[1] && (
          <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-1/4 hover-lift">
            <div className="w-20 h-20 bg-surface-container-high rounded-full mb-4 flex items-center justify-center shadow-md relative">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 w-full rounded-t-2xl p-6 text-center shadow-[0_16px_40px_-12px_rgba(0,0,0,0.05)] h-40 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C0C0C0]"></div>
              <div className="absolute inset-0 bg-[#C0C0C0]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="font-headline-md font-bold text-on-surface mb-1 truncate">{top3[1].display_name}</h3>
              <p className="font-headline-sm text-primary font-bold">{top3[1].green_score} pts</p>
              <div className="mt-2 text-[#C0C0C0] font-headline-lg opacity-50">2</div>
            </div>
          </div>
        )}

        {/* Rank 1 */}
        {top3[0] && (
          <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-1/3 hover-lift z-10">
            <div className="w-28 h-28 bg-primary rounded-full mb-4 flex items-center justify-center shadow-lg shadow-primary/20 relative">
              {top3[0].id === 'me' && <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-1 rounded-full font-bold">YOU</span>}
              <span className="material-symbols-outlined text-5xl text-white">workspace_premium</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 w-full rounded-t-2xl p-8 text-center shadow-[0_20px_50px_-12px_rgba(46,125,50,0.15)] h-48 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFD700]"></div>
              <div className="absolute inset-0 bg-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="font-headline-lg font-bold text-on-surface mb-1 truncate">{top3[0].display_name}</h3>
              <p className="font-headline-md text-primary font-bold">{top3[0].green_score} pts</p>
              <div className="mt-2 text-[#FFD700] font-headline-xl opacity-50 drop-shadow-md">1</div>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {top3[2] && (
          <div className="order-3 flex flex-col items-center w-full md:w-1/4 hover-lift">
            <div className="w-20 h-20 bg-surface-container-high rounded-full mb-4 flex items-center justify-center shadow-md relative">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 w-full rounded-t-2xl p-6 text-center shadow-[0_16px_40px_-12px_rgba(0,0,0,0.05)] h-32 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#CD7F32]"></div>
              <div className="absolute inset-0 bg-[#CD7F32]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="font-headline-md font-bold text-on-surface mb-1 truncate">{top3[2].display_name}</h3>
              <p className="font-headline-sm text-primary font-bold">{top3[2].green_score} pts</p>
              <div className="mt-2 text-[#CD7F32] font-headline-lg opacity-50">3</div>
            </div>
          </div>
        )}
      </section>

      {/* Rest of the Leaderboard */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden min-h-[100px] flex items-center justify-center">
        {rest.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            <p className="font-bold text-lg mb-2">It&apos;s lonely at the top!</p>
            <p>Invite your friends to compete for a sustainable future.</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/20 w-full">
            {rest.map((leader, index) => (
              <div 
                key={leader.id} 
                className="p-4 sm:p-6 flex items-center gap-4 hover:bg-surface-container-low transition-colors"
              >
                <div className="w-8 text-center font-bold text-on-surface-variant opacity-60">
                  {index + 4}
                </div>
                <div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">eco</span>
                </div>
                <div className="flex-1 font-bold text-on-surface flex items-center gap-2">
                  {leader.display_name}
                </div>
                <div className="font-bold text-primary text-lg">
                  {leader.green_score} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
