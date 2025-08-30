import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Heart, Sparkles, ArrowRight, Star, Zap, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">PixelDiary</h1>
              <p className="text-purple-300 text-sm font-medium">Your Digital Memory Vault</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-3 mb-8">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-purple-200 font-medium">New: AI-powered insights coming soon</span>
            </div>
            
            <h2 className="text-7xl md:text-8xl font-black text-white mb-8 leading-tight">
              Capture Every
              <span className="block text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text animate-pulse">
                Precious Moment
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              Transform your thoughts into lasting memories with our beautifully crafted digital diary. 
              <span className="text-purple-300 font-medium">Every word matters.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/diary')}
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Start Your Journey
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-purple-400/50 text-purple-200 font-semibold text-lg rounded-2xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            <div className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Smart Organization</h3>
              <p className="text-slate-300 leading-relaxed text-center text-lg">
                Automatically organize your entries by date with our intelligent calendar system. Never lose track of your memories again.
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-pink-400/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Beautiful Writing</h3>
              <p className="text-slate-300 leading-relaxed text-center text-lg">
                Experience the joy of writing with our carefully crafted interface that makes every word feel special and meaningful.
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Private & Secure</h3>
              <p className="text-slate-300 leading-relaxed text-center text-lg">
                Your thoughts remain completely private. All entries are stored securely on your device with no external access.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-white/10 p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-8">Join Thousands of Writers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-black text-purple-400 mb-2">10K+</div>
                <div className="text-slate-300 font-medium">Daily Entries</div>
              </div>
              <div>
                <div className="text-4xl font-black text-pink-400 mb-2">5K+</div>
                <div className="text-slate-300 font-medium">Active Writers</div>
              </div>
              <div>
                <div className="text-4xl font-black text-blue-400 mb-2">99%</div>
                <div className="text-slate-300 font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-slate-300">Made with</span>
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="text-slate-300">for preserving life's beautiful moments</span>
          </div>
          <p className="text-slate-400 text-sm">© 2025 PixelDiary. Your memories, beautifully preserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;