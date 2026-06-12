import Link from 'next/link'
import Image from 'next/image'
import { TrendChart } from '@/components/charts/DashboardCharts'
import { getDashboardData } from '@/app/actions/emissions'

export default async function LandingPage() {
  const { emissions, profile } = await getDashboardData()
  const isLoggedIn = !!profile
  
  const totalKgSaved = isLoggedIn 
    ? emissions.reduce((sum: number, log: any) => Number(log.amount_kg_co2) === 0 ? sum + 1.5 : sum, 0)
    : 1250
    
  const activeStreak = isLoggedIn
    ? (emissions.length > 0 ? Math.min(14, emissions.length) : 0)
    : 14
    
  const greenScore = isLoggedIn
    ? (profile.green_score || 0)
    : 85

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-4 pb-20 md:pt-8 md:pb-32 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 opacity-20 pointer-events-none animate-[float_6s_ease-in-out_infinite]">
          <span className="material-symbols-outlined text-primary text-6xl">eco</span>
        </div>
        <div className="absolute bottom-1/4 right-10 opacity-10 pointer-events-none animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '-2s' }}>
          <span className="material-symbols-outlined text-primary text-8xl">potted_plant</span>
        </div>

        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10">
            <h1 className="font-headline-xl text-headline-xl text-on-background leading-tight">
              Understand Your <span className="text-primary">Carbon Footprint</span>. Create a Greener Future.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Track your daily impact across transport, diet, and lifestyle. Join a community dedicated to precision progress and environmental restoration.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login" className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all text-center">
                Get Started
              </Link>
              <Link href="/dashboard" className="inline-block border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/5 transition-all text-center">
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary-fixed/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <img 
              alt="Sustainability Illustration" 
              className="relative w-full h-auto drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHysPIwfKQyswa02kBe3ZtRTqQm-ZTwJ8Q51cjj5Fy1L3IX_D1TC9gJQ_a8EnqNYY-XcFrQqiBNeExBpHhAj-UaNDnB6AzJ8pgnAd0MEI7gzASoipQIJSdo0osm7O-b6kAfTWOgTXXA0CoI6QhMdgFqnCCczB8lExq0ksa5J4xGeZH1gPIaYbi0g3MrUSZUJdgEXn_M7crKaoR6MBBGnc5unj_FsGQVvZ7p4-DlhvnMkhCfYOfe-y1fDY45pfTQSA01xooFxEk_5k"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </section>

      {/* Impact Categories Grid */}
      <section className="py-24 bg-surface-container-low/50">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-on-background">Track What Matters</h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
              We break down your emissions into actionable categories, helping you visualize where you can make the biggest difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Transport Card */}
            <div className="glass-card rounded-xl p-6 hover-lift shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  alt="Transport emissions monitoring" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVaZS9GyTPlHrl6tQG8F2BElykPeDlYyw4UULtvS0ai3z1Z9ZMotlvvIxHjap13WGvWj6o2HvN8Os_gKPpj6SCQTFn2ZJoJPJ6t4dQaAWa6NgBQsJtoqfwW_AZIaV1QR58zUCz_-DotR3AgfSPbghRmh1GcDIRuOpyuzCw3yM9vrz4vg03a_qhu8ss5va_zayztHLL6pOHHLmL7v8WfFHiUvMsmj0shFjQczLJ29-588wTojeI0au0I_zlusIBg8Cw-nqOjf731MY"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-headline-md text-headline-md">Transport</h3>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-4">Monitor travel emissions from daily commutes to international flights with high-fidelity tracking tools.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Details <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Food Card */}
            <div className="glass-card rounded-xl p-6 hover-lift shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  alt="Sustainable diet impact" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd-mO948ZUBP-0B6uC84xkG53MvIaA7B0G-Q1Fu7Q6mkdkx2fYP0igydHJn-SW5HseuzQXK18fXRCyJXCmbQ0xIqSf4skq3XMVq7XwyLbAx42OuNwnuYsJbMOQkL_f7h1LeKKR3r4gzhjjYbKf0wcVMHMO_Ta6Ke4SC6UioM-dKrDothx9Eza2o_IsVgaQgVnU2Ii7aoy1WRtHREpCaSTeVEwWSeibP5WDQRAhAzQHd1UUk109HbBVFrdYMj9xeb1lHUpobN98zjk"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-headline-md text-headline-md">Food</h3>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-4">Understand the dietary impact of your meals. From farm to fork, we calculate the carbon intensity of your food choices.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Details <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Electricity Card */}
            <div className="glass-card rounded-xl p-6 hover-lift shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  alt="Energy consumption tracking" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_90Qx5OOLy5zdhyAoeuyG_irRfAEJ1FnlCOmkL_IgBnxNCxH5aq973kq1_Ha_p5YECUILX22db53SpA0bBZP23416c4EpxydI-dvGOXiv9IBkgwd92gdH3CXrVzFWABXDF8jiSf5i2AW6TlxzqmJlHylUWLYpsJDKHF0FXirVgP53qLiHhtc35AN2MjzYuOd4VH4NDD4RJ59iWdqO-oWWYpJs3UyZXX5jSYUYw-1cOw67mv5xQTrEnQ5Pcn9cjX9qsZy2bs2NgK4"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-headline-md text-headline-md">Electricity</h3>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-4">Track household energy consumption and integrate with smart meters to optimize your home's efficiency.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Details <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Purchases Card */}
            <div className="glass-card rounded-xl p-6 hover-lift shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  alt="Lifestyle emissions measure" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBbuY5REeOH3OEE8YxFzgb5kqaowi6H38-c019GqQ1dqFod3YhcLHfLblMYMLfQMTwxaVW-Rq_e0lF5HAmkpDxr4GxwkBdzu0DIfSf2pwa4r7-Iwdu3GqXj8bUbAOUUUMH1wGnqNy6L6lTtELYA1hUyDI65nLcj3kxZ58JZ1xH5-iCjLFN-qNkTu98tjw7qN-gpXDj_OPJyd9-s7NCxV42cmAsN0vlzfZl3D06_cgqs_oZnWCaQ_0P86ibMz2kR58uWTCJM5iv4S8"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-headline-md text-headline-md">Purchases</h3>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-4">Measure lifestyle emissions by analyzing the supply chain of your purchases and favoring low-waste brands.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Details <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness Statistics Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary-container p-8 rounded-2xl text-on-primary-container shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] hover-lift">
              <span className="material-symbols-outlined text-4xl mb-4">eco</span>
              <h4 className="text-label-md font-label-md uppercase tracking-widest opacity-80 mb-2">Total Impact</h4>
              <div className="text-4xl font-headline-lg">{typeof totalKgSaved === 'number' && totalKgSaved % 1 !== 0 ? totalKgSaved.toFixed(1) : totalKgSaved} {isLoggedIn ? 'kg' : 'kg'} <span className="text-lg opacity-80">CO2 Saved</span></div>
            </div>

            <div className="bg-secondary p-8 rounded-2xl text-white shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] hover-lift">
              <span className="material-symbols-outlined text-4xl mb-4">bolt</span>
              <h4 className="text-label-md font-label-md uppercase tracking-widest opacity-80 mb-2">Efficiency</h4>
              <div className="text-4xl font-headline-lg">{activeStreak} Days <span className="text-lg opacity-80">Sustainable Streak</span></div>
            </div>

            <div className="bg-tertiary-container p-8 rounded-2xl text-on-tertiary-container shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] hover-lift">
              <span className="material-symbols-outlined text-4xl mb-4">grade</span>
              <h4 className="text-label-md font-label-md uppercase tracking-widest opacity-80 mb-2">Status</h4>
              <div className="text-4xl font-headline-lg">{greenScore} <span className="text-lg opacity-80">Green Score</span></div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h3 className="font-headline-lg text-headline-lg">Monthly Progress</h3>
                <p className="text-on-surface-variant">Carbon reduction trend over the last 6 months</p>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">2024 Year to Date</span>
              </div>
            </div>

            <div className="relative h-64 w-full">
              <TrendChart data={[
                { name: 'Jan', kg: 1400 },
                { name: 'Feb', kg: 1350 },
                { name: 'Mar', kg: 1250 },
                { name: 'Apr', kg: 1100 },
                { name: 'May', kg: 950 },
                { name: 'Jun', kg: 800 },
              ]} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
