import React, { useState } from 'react';
import { Mail, ArrowRight, Shield, Users, Zap, Check } from 'lucide-react';

export default function TuringMindsWaitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Replace with your actual email collection service
      // For now, this just shows success after 1 second
      setTimeout(() => {
        setSubmitted(true);
        setIsLoading(false);
        // You can also log to console to see the data
        console.log('Waitlist signup:', { name, email, role });
      }, 1000);
      
      // OPTION 1: Send to your own API endpoint
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, role })
      // });
      
      // OPTION 2: Send to a third-party service like Mailchimp, ConvertKit, etc.
      // await fetch('YOUR_SERVICE_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, role })
      // });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Ambient gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-stone-950 to-blue-950/30" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              TURING MINDS
            </h1>
            <p className="text-stone-400 text-lg tracking-wider uppercase text-sm">
              Wear the Future. Protect the Planet.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-light leading-tight mb-6">
              We're in business to save our home planet from existential risks of AI
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed">
              The first lifestyle brand for technologists who understand that innovation without responsibility is just acceleration toward collapse. 
              We're building apparel and gear for those shaping AI's future—ethically, intentionally, purposefully.
            </p>
          </div>

          {/* Waitlist Form */}
          {!submitted ? (
            <div className="max-w-xl mx-auto">
              <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-800 rounded-2xl p-8 lg:p-12 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">Join the Movement</h3>
                  <p className="text-stone-400">Be among the first to access our founding collection</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-stone-50"
                      placeholder="Alan Turing"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-stone-50"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-stone-300 mb-2">
                      Role (Optional)
                    </label>
                    <input
                      type="text"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-stone-50"
                      placeholder="AI Researcher, Engineer, etc."
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !email || !name}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {isLoading ? (
                      'Joining...'
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-stone-500 text-xs text-center mt-6">
                  By joining, you'll receive early access to launches, stories from the field, and updates on our mission.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto">
              <div className="bg-emerald-950/30 backdrop-blur-xl border border-emerald-800 rounded-2xl p-8 lg:p-12 shadow-2xl text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Welcome to Turing Minds</h3>
                <p className="text-stone-300 leading-relaxed mb-6">
                  You're in. Check your email for confirmation and be ready for something different. 
                  We're not here to sell you stuff—we're here to equip a movement.
                </p>
                <div className="inline-block px-6 py-2 bg-stone-900 rounded-full text-sm text-stone-400">
                  Position in line: <span className="text-emerald-400 font-semibold">{Math.floor(Math.random() * 500) + 1}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-stone-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16">Our Principles</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Safety First</h4>
              <p className="text-stone-400 leading-relaxed">
                Every product we create considers the long-term impact on humanity. Quality that lasts, responsibility that matters.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Community Driven</h4>
              <p className="text-stone-400 leading-relaxed">
                Built by technologists, for technologists. Your feedback shapes what we make and how we make it.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-950 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Purpose Over Profit</h4>
              <p className="text-stone-400 leading-relaxed">
                We donate 1% of revenue to AI safety research. Because what we wear should reflect what we believe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-stone-950 py-12 border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-stone-500 text-sm">
              © 2025 Turing Minds. Inspired by the OMSCS Turing Award Speaker Series.
            </div>
            <div className="flex gap-6 text-sm text-stone-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">Mission</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
