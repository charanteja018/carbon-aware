import { getLeaderboardData, getDashboardData } from '@/app/actions/emissions'

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
  const { profiles, currentUserId } = await getLeaderboardData()
  const { emissions, profile: currentUserProfile } = await getDashboardData()

  const totalKgSaved = emissions.reduce((sum: number, log: any) => {
    // Just an example calculation for "saved" vs "emitted"
    // For simplicity we just use the total logged or if it's 0 we count it as saved
    if (Number(log.amount_kg_co2) === 0) return sum + 1.5 // approximate saving
    return sum
  }, 0)

  const greenScore = currentUserProfile?.green_score || 0
  const myRank = profiles.findIndex((p: any) => p.id === currentUserId) + 1

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden pb-24">
      {/* Hero Section */}
      <section className="relative h-[420px] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"></div>
        <div className="relative z-10 px-margin-mobile text-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface drop-shadow-md mb-2">Climate Impact Journey</h2>
          <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-8">Every sustainable choice helps restore your world.</p>
          
          {/* Green Score Card */}
          <div className="bg-surface/90 backdrop-blur-md p-6 rounded-xl shadow-[0_8px_24px_rgba(13,99,27,0.1)] border-b-4 border-secondary max-w-[360px] mx-auto transition-transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <span className="text-label-md text-on-surface-variant block uppercase tracking-wider">Green Score</span>
                <span className="font-headline-xl text-4xl text-primary font-bold">{greenScore}</span>
              </div>
              <div className="h-12 w-px bg-outline-variant/50 mx-4"></div>
              <div className="text-right">
                <span className="text-label-md text-on-surface-variant block uppercase tracking-wider">Estimated Saved</span>
                <span className="font-headline-md text-2xl text-secondary font-bold">{totalKgSaved.toFixed(1)}kg</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-secondary-container/50 px-4 py-3 rounded-lg justify-center">
              <span className="material-symbols-outlined text-primary">eco</span>
              <span className="text-label-md text-on-secondary-container font-bold">
                {greenScore > 100 ? 'Stage 3: Thriving Ecosystem' : (greenScore > 50 ? 'Stage 2: Growing Forest' : 'Stage 1: Planting Seeds')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-12 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="space-y-12">
            {/* Streak Tracker */}
            <section>
              <h3 className="font-headline-md text-on-surface mb-4">Consistency Matters</h3>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b-4 border-error-container hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-error text-4xl">local_fire_department</span>
                  </div>
                  <div>
                    <p className="font-headline-md text-on-surface">{emissions.length > 0 ? 'Active' : 'No logs yet'} Streak</p>
                    <p className="text-on-surface-variant">Log activities to build your streak!</p>
                  </div>
                </div>
                {/* Mock Calendar Heatmap */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-md ${i < Math.min(14, emissions.length) ? 'bg-primary' : (i < 20 ? 'bg-surface-container-high' : 'bg-surface-container')}`}
                      title={i < Math.min(14, emissions.length) ? 'Logged' : 'Future'}
                    ></div>
                  ))}
                </div>
              </div>
            </section>

            {/* Badge Collection */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-headline-md text-on-surface">Achievement Badges</h3>
                <button className="text-label-md text-primary font-bold hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className={`bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b-4 border-primary-container hover:-translate-y-1 transition-transform cursor-pointer ${greenScore >= 20 ? '' : 'grayscale opacity-60'}`}>
                  <div className="w-14 h-14 mb-3 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">steps</span>
                  </div>
                  <span className="text-sm font-bold leading-tight">First Green Step</span>
                </div>
                <div className={`bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b-4 border-primary-container hover:-translate-y-1 transition-transform cursor-pointer ${greenScore >= 50 ? '' : 'grayscale opacity-60'}`}>
                  <div className="w-14 h-14 mb-3 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">commute</span>
                  </div>
                  <span className="text-sm font-bold leading-tight">Sustainable Traveler</span>
                </div>
                <div className={`bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b-4 border-primary-container hover:-translate-y-1 transition-transform cursor-pointer ${greenScore >= 100 ? '' : 'grayscale opacity-60'}`}>
                  <div className="w-14 h-14 mb-3 rounded-full bg-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-3xl">bolt</span>
                  </div>
                  <span className="text-sm font-bold leading-tight">Energy Saver</span>
                </div>
              </div>
            </section>

            {/* Impact Forest Card */}
            <section>
              <div className="bg-primary p-8 rounded-xl shadow-lg text-white relative overflow-hidden border border-primary-container hover:shadow-xl hover:shadow-primary/20 transition-shadow cursor-pointer">
                <div className="absolute -right-8 -bottom-8 opacity-20 transform hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[160px]">forest</span>
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md">Impact Forest</h3>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">Level {Math.floor(greenScore / 20) + 1}</span>
                  </div>
                  <div className="mt-4">
                    <p className="font-headline-xl text-4xl font-bold mb-1">{Math.floor(greenScore / 20)} Trees</p>
                    <p className="opacity-90">{greenScore > 100 ? 'Mini Forest Ecosystem' : 'Growing saplings'}</p>
                  </div>
                  <div className="w-full bg-black/20 h-3 rounded-full mt-2">
                    <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (greenScore % 20) * 5)}%` }}></div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-12">
            {/* Leaderboard */}
            <section>
              <div className="bg-surface-container p-6 md:p-8 rounded-xl border-b-4 border-outline-variant/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline-md text-on-surface">Leaderboard</h3>
                  {myRank > 0 && <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">Rank #{myRank}</div>}
                </div>
                
                <div className="space-y-4">
                  {profiles.length === 0 ? (
                    <div className="text-center text-on-surface-variant p-4">No users found. Start logging activities to be the first!</div>
                  ) : (
                    profiles.map((p: any, index: number) => {
                      const isMe = p.id === currentUserId
                      return (
                        <div key={p.id} className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${isMe ? 'bg-primary/10 border-primary' : 'bg-surface-container-lowest border-outline-variant/20 hover:border-primary shadow-sm'}`}>
                          <span className={`font-bold w-6 text-center text-lg ${isMe ? 'text-primary' : 'text-on-surface'}`}>{index + 1}</span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isMe ? 'bg-primary text-white' : 'bg-secondary-fixed-dim/50 text-secondary border border-secondary/20'}`}>
                            {p.full_name ? p.full_name.substring(0,2).toUpperCase() : 'U'}
                          </div>
                          <span className={`flex-1 font-bold ${isMe ? 'text-primary' : 'text-on-surface'}`}>{isMe ? 'You' : (p.full_name || 'Anonymous')}</span>
                          <span className="font-bold text-primary text-lg">{p.green_score}</span>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </section>

            {/* Challenges Section */}
            <section>
              <h3 className="font-headline-md text-on-surface mb-4">Weekly Green Challenges</h3>
              <div className="space-y-4">
                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-6 border-b-4 border-tertiary hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-tertiary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary text-3xl">directions_walk</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface text-lg">Walk Instead of Drive</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-tertiary rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-on-surface-variant">2/3 Days</span>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full hover:bg-tertiary/10 text-tertiary flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-6 border-b-4 border-secondary hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-3xl">eco</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface text-lg">Plant-Based Week</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="w-1/5 h-full bg-secondary rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-on-surface-variant">1/5 Meals</span>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full hover:bg-secondary/10 text-secondary flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
