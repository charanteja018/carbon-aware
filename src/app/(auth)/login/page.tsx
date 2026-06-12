'use client'

import { useActionState } from 'react'
import { login, signup } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  const [loginState, loginAction, isLoginPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await login(formData)
  }, null)

  const [signupState, signupAction, isSignupPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await signup(formData)
  }, null)

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] w-full overflow-hidden">
      {/* Left Side: Illustration and Branding */}
      <section className="hidden md:flex flex-1 relative bg-surface-container-low items-center justify-center p-8 lg:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.8)_0%,_transparent_100%)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
          <div className="mb-12 transform hover:scale-105 transition-transform duration-700">
            <img 
              alt="EcoTrace Illustration" 
              className="w-full h-auto drop-shadow-2xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMKBjyOfEwJWbIpTgj8e6m848HhPcbSgDOHwqhC2Wu15WAKlg6RPmGVNDRaUGZHT7TykBMjMxgTkGT3FBmq_Rc307a_9tN7CIebximrr2ZRUQsplsEQ9k1UaAXQX1a1BXSlsm43KUiZClauo_dKn8SQh7wM0r-53JZEb3mannSjl8pHn2t3raOOzQ5x_UvH5efMXYFf-zJJL0m2OrWtydbWJUAC6yVqQxSNjtkI00fTQYpGxnR4R_0UFf1aYpqbsLgh1lXbYP1ZlY"
              crossOrigin="anonymous"
            />
          </div>
          <h1 className="font-headline-xl text-4xl lg:text-5xl font-bold text-primary mb-6">
            Start Your Sustainability Journey
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
            Join over 50,000 eco-conscious citizens in tracking and reducing their carbon footprint through intelligent data and community action.
          </p>
        </div>
        
        {/* Floating Accents */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary-fixed-dim/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary-container/5 rounded-full blur-3xl"></div>
      </section>

      {/* Right Side: Authentication Canvas */}
      <section className="flex-1 flex flex-col items-center justify-center md:justify-start md:pt-24 p-6 md:px-12 lg:px-16 bg-surface">
        
        <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-8 md:p-10 shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] relative z-10 border border-outline-variant/20 -mt-8 md:mt-0">
          
          <div className="text-center mb-8">
            <h2 className="font-headline-lg text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
            <p className="font-body-md text-on-surface-variant">Sign in to track your carbon impact</p>
          </div>

          <form className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block font-label-md text-sm font-bold text-on-surface-variant">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block font-label-md text-sm font-bold text-on-surface-variant">Password</label>
                <Link href="/forgot-password" className="font-label-sm text-xs font-bold text-primary hover:text-secondary transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-12 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-low cursor-pointer"
              />
              <label htmlFor="remember" className="font-body-md text-sm text-on-surface-variant cursor-pointer">Remember me for 30 days</label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-2">
              <button 
                formAction={loginAction}
                disabled={isLoginPending || isSignupPending}
                className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl shadow-md hover:shadow-primary/20 transition-all flex justify-center items-center gap-2 group"
              >
                <span>{isLoginPending ? 'Signing In...' : 'Sign In'}</span>
                <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              
              <button 
                formAction={signupAction}
                disabled={isLoginPending || isSignupPending}
                className="w-full bg-surface hover:bg-surface-container-high text-primary border-2 border-primary font-bold py-3.5 rounded-xl transition-all"
              >
                {isSignupPending ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

        </div>
      </section>
    </div>
  )
}
