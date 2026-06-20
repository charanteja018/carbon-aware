/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { TrendChart } from '@/components/charts/DashboardCharts'

export default function LandingPage() {
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
              Understand Your <span className="text-primary">Carbon Footprint</span>. Experience the Impact.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Every choice has a consequence. Track your daily actions across transport, diet, and lifestyle to see exactly how you shape the planet&apos;s future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/activity" className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all text-center">
                Calculate Your Impact
              </Link>
              <Link href="/dashboard" className="inline-block border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/5 transition-all text-center">
                View Live Dashboard
              </Link>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-error/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
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
            <h2 className="font-headline-lg text-headline-lg text-on-background">The Hidden Cost of Daily Life</h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
              We break down the invisible emissions behind your everyday actions, exposing the reality of your carbon footprint.
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
              <p className="text-on-surface-variant font-body-md mb-4">Your daily commute and air travel are leading drivers of climate change, contributing directly to extreme weather events.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Insights <span className="material-symbols-outlined">arrow_forward</span>
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
                  <h3 className="font-headline-md text-headline-md">Diet & Agriculture</h3>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-4">High-impact diets demand vast land and water, accelerating deforestation and disrupting global food security.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Insights <span className="material-symbols-outlined">arrow_forward</span>
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
                  <h3 className="font-headline-md text-headline-md">Energy Grid</h3>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-4">Fossil-fuel heavy grids poison local air quality. Monitor your energy usage to lower your reliance on dirty energy.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Insights <span className="material-symbols-outlined">arrow_forward</span>
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
                  <h3 className="font-headline-md text-headline-md">Consumption</h3>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-4">From fast fashion to new electronics, overconsumption creates staggering manufacturing emissions and waste.</p>
              <Link href="/insights" className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer">
                View Insights <span className="material-symbols-outlined">arrow_forward</span>
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
              <span className="material-symbols-outlined text-4xl mb-4">public</span>
              <h4 className="text-label-md font-label-md uppercase tracking-widest opacity-80 mb-2">2026 Global Emergency</h4>
              <div className="text-4xl font-headline-lg text-error">1.5°C <span className="text-lg opacity-80 text-on-primary-container">Warming Limit Closing</span></div>
            </div>

            <div className="bg-secondary p-8 rounded-2xl text-white shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] hover-lift">
              <span className="material-symbols-outlined text-4xl mb-4">water_drop</span>
              <h4 className="text-label-md font-label-md uppercase tracking-widest opacity-80 mb-2">Resource Depletion</h4>
              <div className="text-4xl font-headline-lg">2.5 Billion <span className="text-lg opacity-80">Face Water Scarcity</span></div>
            </div>

            <div className="bg-tertiary-container p-8 rounded-2xl text-on-tertiary-container shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] hover-lift">
              <span className="material-symbols-outlined text-4xl mb-4">forest</span>
              <h4 className="text-label-md font-label-md uppercase tracking-widest opacity-80 mb-2">Biodiversity</h4>
              <div className="text-4xl font-headline-lg text-error">1.2 Million <span className="text-lg opacity-80 text-on-tertiary-container">Species at Risk</span></div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h3 className="font-headline-lg text-headline-lg">The Time to Act is Now</h3>
                <p className="text-on-surface-variant">Global carbon emissions trajectory must peak immediately to avoid irreversible damage.</p>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-1 bg-error/10 text-error rounded-full text-sm font-semibold">Critical State</span>
              </div>
            </div>

            <div className="relative h-64 w-full">
              {/* Global trend data including 2026 projections */}
              <TrendChart data={[
                { name: '2021', kg: 36.3 },
                { name: '2022', kg: 36.8 },
                { name: '2023', kg: 37.4 },
                { name: '2024', kg: 38.0 },
                { name: '2025', kg: 38.2 },
                { name: '2026*', kg: 38.5 },
              ]} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
