import React from 'react';
import { BookOpen, Home, Edit3, Library, Sparkles } from 'lucide-react';

interface DiaryHeaderProps {
  onHomeClick: () => void;
  view: 'write' | 'browse';
  onViewChange: (view: 'write' | 'browse') => void;
}

const DiaryHeader: React.FC<DiaryHeaderProps> = ({ onHomeClick, view, onViewChange }) => {
  return (
    <header className="relative z-20 px-6 py-6 bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onHomeClick}
            className="group flex items-center gap-4 hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/25">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">PixelDiary</h1>
              <p className="text-purple-300 text-sm font-medium">Digital Memory Vault</p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 shadow-xl border border-white/20">
            <button
              onClick={() => onViewChange('write')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                view === 'write' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                  : 'text-purple-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Edit3 className="w-5 h-5" />
              <span>Write</span>
              {view === 'write' && <Sparkles className="w-4 h-4 animate-pulse" />}
            </button>
            <button
              onClick={() => onViewChange('browse')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                view === 'browse' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                  : 'text-purple-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Library className="w-5 h-5" />
              <span>Browse</span>
              {view === 'browse' && <Sparkles className="w-4 h-4 animate-pulse" />}
            </button>
          </div>

          <button
            onClick={onHomeClick}
            className="p-4 text-purple-200 hover:bg-white/10 hover:text-white rounded-2xl transition-all duration-300 hover:scale-110"
          >
            <Home className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DiaryHeader;