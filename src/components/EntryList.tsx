import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Search, BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { DiaryEntry } from '../types/diary';

interface EntryListProps {
  entries: DiaryEntry[];
  onEntrySelect: (date: string) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onEntrySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(parseISO(entry.date), 'MMMM d, yyyy').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPreview = (content: string) => {
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  };

  const getWordCount = (content: string) => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-black text-white flex items-center gap-4 mb-2">
                <BookOpen className="w-10 h-10" />
                Memory Vault
              </h2>
              <p className="text-purple-100 text-lg font-medium">
                {entries.length} precious memories preserved
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-3xl font-black text-white">{entries.length}</div>
              <div className="text-purple-200 text-sm font-medium">Total Entries</div>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-200" />
            <input
              type="text"
              placeholder="Search through your memories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white placeholder-purple-200/70 border border-white/30 focus:border-white/50 focus:ring-4 focus:ring-white/20 text-lg font-medium transition-all duration-300"
            />
          </div>
        </div>

        <div className="p-8">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {searchTerm ? 'No matching memories found' : 'Your story begins here'}
              </h3>
              <p className="text-purple-300 text-lg max-w-md mx-auto">
                {searchTerm 
                  ? 'Try searching with different keywords or phrases from your entries' 
                  : 'Start writing your first entry to begin building your digital memory collection'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">
                  {searchTerm ? `Found ${filteredEntries.length} memories` : 'All Memories'}
                </h3>
                <div className="text-purple-300 font-medium">
                  Sorted by most recent
                </div>
              </div>

              <div className="grid gap-6">
                {filteredEntries
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entry, index) => (
                  <div
                    key={entry.id}
                    onClick={() => onEntrySelect(entry.date)}
                    className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 cursor-pointer hover:bg-white/15 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {format(parseISO(entry.date), 'EEEE, MMMM d, yyyy')}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-2 text-purple-300 text-sm">
                              <Clock className="w-4 h-4" />
                              {new Date(entry.updatedAt).toLocaleTimeString()}
                            </div>
                            <div className="text-purple-300 text-sm font-medium">
                              {getWordCount(entry.content)} words
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 mb-4">
                      <p className="text-slate-200 leading-relaxed text-lg">
                        {getPreview(entry.content)}
                      </p>
                    </div>
                    
                    {entry.content.length > 200 && (
                      <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                        <span>Continue reading</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryList;