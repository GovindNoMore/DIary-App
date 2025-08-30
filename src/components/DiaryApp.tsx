import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { Calendar, Sparkles } from 'lucide-react';
import DiaryHeader from './DiaryHeader';
import DiaryEntry from './DiaryEntry';
import DateNavigation from './DateNavigation';
import EntryList from './EntryList';
import { DiaryEntry as DiaryEntryType } from '../types/diary';
import { saveDiaryEntry, getDiaryEntry, getAllDiaryEntries } from '../utils/storage';

const DiaryApp: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [currentEntry, setCurrentEntry] = useState<DiaryEntryType | null>(null);
  const [allEntries, setAllEntries] = useState<DiaryEntryType[]>([]);
  const [view, setView] = useState<'write' | 'browse'>('write');

  useEffect(() => {
    loadEntry(selectedDate);
    loadAllEntries();
  }, [selectedDate]);

  const loadEntry = (date: string) => {
    const entry = getDiaryEntry(date);
    setCurrentEntry(entry);
  };

  const loadAllEntries = () => {
    const entries = getAllDiaryEntries();
    setAllEntries(entries);
  };

  const handleSaveEntry = (content: string) => {
    const entry: DiaryEntryType = {
      id: selectedDate,
      date: selectedDate,
      content,
      createdAt: currentEntry?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    saveDiaryEntry(entry);
    setCurrentEntry(entry);
    loadAllEntries();
  };

  const getDateDisplayText = (date: string) => {
    const entryDate = parseISO(date);
    if (isToday(entryDate)) return 'Today';
    if (isYesterday(entryDate)) return 'Yesterday';
    return format(entryDate, 'MMMM d, yyyy');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <DiaryHeader 
        onHomeClick={() => navigate('/')}
        view={view}
        onViewChange={setView}
      />
      
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {view === 'write' ? (
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black text-white flex items-center gap-4">
                          <Calendar className="w-8 h-8" />
                          {getDateDisplayText(selectedDate)}
                        </h2>
                        <p className="text-purple-100 mt-3 text-lg font-medium">What's painting your world today?</p>
                      </div>
                      <div className="hidden md:flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                        <span className="text-purple-100 font-medium">Express yourself</span>
                      </div>
                    </div>
                  </div>
                  
                  <DiaryEntry
                    entry={currentEntry}
                    onSave={handleSaveEntry}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-4">
                <DateNavigation
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  entries={allEntries}
                />
              </div>
            </div>
          ) : (
            <EntryList
              entries={allEntries}
              onEntrySelect={(date) => {
                setSelectedDate(date);
                setView('write');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryApp;