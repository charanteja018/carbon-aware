'use client'

import { useActionState } from 'react'
import { resetPassword } from '../login/actions'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await resetPassword(formData)
  }, null)

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] w-full overflow-hidden items-center justify-center p-6 bg-surface">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-8 md:p-10 shadow-[0_16px_40px_-12px_rgba(46,125,50,0.08)] border border-outline-variant/20">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-5xl text-primary mb-4">lock_reset</span>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface mb-2">Reset Password</h2>
          <p className="font-body-md text-on-surface-variant">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        <form action={formAction} className="space-y-6">
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

          {state?.error && <p className="text-error text-sm font-bold">{state.error}</p>}
          {state?.success && <p className="text-primary text-sm font-bold">{state.success}</p>}

          <div className="space-y-4 pt-2">
            <button 
              disabled={isPending || state?.success}
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl shadow-md hover:shadow-primary/20 transition-all flex justify-center items-center gap-2 group disabled:opacity-70"
            >
              <span>{isPending ? 'Sending...' : 'Send Reset Link'}</span>
              <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">send</span>
            </button>
            
            <Link 
              href="/login"
              className="w-full flex justify-center items-center bg-surface hover:bg-surface-container-high text-on-surface-variant border-2 border-outline-variant/30 font-bold py-3.5 rounded-xl transition-all"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
