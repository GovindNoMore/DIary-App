import React, { useState, useEffect } from 'react';
import { Save, FileText, Sparkles, Clock } from 'lucide-react';
import { DiaryEntry as DiaryEntryType } from '../types/diary';

interface DiaryEntryProps {
  entry: DiaryEntryType | null;
  onSave: (content: string) => void;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, onSave }) => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(entry?.content || '');
  }, [entry]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(content.trim() === '' ? 0 : words.length);
    setCharCount(content.length);
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    onSave(content);
    setIsSaving(false);
  };

  const getWritingTip = () => {
    if (wordCount === 0) return "Start with how you're feeling right now...";
    if (wordCount < 50) return "You're off to a great start! Keep going...";
    if (wordCount < 100) return "Beautiful thoughts! Add more details...";
    return "Wonderful entry! Your future self will love reading this.";
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Dear Diary...</h3>
              <p className="text-purple-300 text-sm">{getWritingTip()}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-white">{wordCount} words</div>
            <div className="text-sm text-purple-300">{charCount} characters</div>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Pour your heart out here... What made today special? What are you grateful for? What challenges did you face? Every thought and feeling matters."
            className="w-full h-96 p-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 resize-none text-white placeholder-purple-200/70 leading-relaxed text-lg transition-all duration-300"
            style={{
              fontFamily: '"Inter", "Georgia", serif',
              lineHeight: '1.8'
            }}
          />
          
          {/* Floating word count indicator */}
          {content && (
            <div className="absolute bottom-4 right-4 bg-purple-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium border border-purple-400/50">
              {wordCount} words
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {entry?.updatedAt && (
            <div className="flex items-center gap-2 text-purple-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Last saved: {new Date(entry.updatedAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving || !content.trim()}
          className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center gap-3">
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving your thoughts...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Entry
                <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;