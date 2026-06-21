'use client';

import { useState, useRef, useEffect } from 'react';
import { useEmissionsStore } from '../lib/store';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your Context-Aware Carbon Coach. How can I help you reduce your footprint today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Store connection for context
  const emissions = useEmissionsStore(state => state.emissions);
  const points = useEmissionsStore(state => state.profile?.green_score || 0);
  
  const uniqueDates = Array.from(new Set(emissions.map(e => e.logged_date))).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  let currentStreak = 0;
  if (uniqueDates.length > 0) {
    const firstDate = new Date(uniqueDates[0]);
    const today = new Date();
    const diff = Math.floor((today.getTime() - firstDate.getTime()) / (1000 * 3600 * 24));
    if (diff <= 1) {
      currentStreak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const prev = new Date(uniqueDates[i-1]);
        const curr = new Date(uniqueDates[i]);
        if (Math.floor((prev.getTime() - curr.getTime()) / (1000 * 3600 * 24)) === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  const totalCo2 = emissions.reduce((acc, curr) => acc + curr.amount_kg_co2, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!mounted) return null;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Build the dynamic system context based on live user data
    const systemContext = `You are a highly personalized, encouraging Carbon Reduction AI Assistant. 
The user currently has ${points} points, a ${currentStreak}-day streak, and has logged a total of ${totalCo2.toFixed(2)} kg of CO2 emissions. 
Keep your answers brief, encouraging, and highly specific to their carbon footprint journey. Do not use markdown if possible, keep it plain and conversational.`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userMsg,
          systemContext: systemContext
        })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch from AI');
      }

      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops, I'm having trouble connecting to my AI brain (Groq API). Make sure the API key is valid!" }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-surface-container-lowest/90 backdrop-blur-xl border border-outline-variant/30 rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] w-[340px] h-[500px] mb-4 flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]">
          
          {/* Header */}
          <div className="bg-primary text-on-primary p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">robot_2</span>
              <div>
                <h3 className="font-bold text-lg leading-tight">Carbon Coach</h3>
                <p className="text-xs opacity-80 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Groq Llama 3
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-primary-container/20 p-2 rounded-full transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-on-primary rounded-tr-none' 
                    : 'bg-surface-container border border-outline-variant/30 text-on-surface rounded-tl-none'
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-container border border-outline-variant/30 text-on-surface p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-surface-container-low border-t border-outline-variant/30">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about your footprint..."
                className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
                disabled={isTyping}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-primary text-on-primary shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-16 h-16 rounded-full flex items-center justify-center relative ${isOpen ? 'scale-0 opacity-0 pointer-events-none absolute' : 'scale-100 opacity-100'}`}
      >
        <span className="material-symbols-outlined text-3xl">smart_toy</span>
        {/* Unread badge or pulsing effect could go here */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-error rounded-full border-2 border-surface flex items-center justify-center"></span>
      </button>

    </div>
  );
}
