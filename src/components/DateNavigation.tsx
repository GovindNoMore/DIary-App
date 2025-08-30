import React, { useState } from 'react';
import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, Circle, TrendingUp, Star } from 'lucide-react';
import { DiaryEntry } from '../types/diary';

interface DateNavigationProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  entries: DiaryEntry[];
}

const DateNavigation: React.FC<DateNavigationProps> = ({ selectedDate, onDateChange, entries }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const selectedDateObj = parseISO(selectedDate);
  const today = new Date();
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasEntry = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return entries.some(entry => entry.date === dateStr);
  };

  const navigateToToday = () => {
    const todayStr = format(today, 'yyyy-MM-dd');
    onDateChange(todayStr);
    setCurrentMonth(today);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? subDays(selectedDateObj, 1)
      : addDays(selectedDateObj, 1);
    
    onDateChange(format(newDate, 'yyyy-MM-dd'));
    setCurrentMonth(newDate);
  };

  const thisMonthEntries = entries.filter(entry => {
    const entryDate = parseISO(entry.date);
    return entryDate.getMonth() === currentMonth.getMonth() && 
           entryDate.getFullYear() === currentMonth.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      {/* Quick Navigation */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-purple-400" />
          Time Travel
        </h3>
        
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigateDate('prev')}
            className="p-3 text-purple-200 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1 text-center bg-white/10 rounded-xl p-4">
            <div className="text-xl font-bold text-white">
              {format(selectedDateObj, 'MMM d, yyyy')}
            </div>
            <div className="text-purple-300 text-sm font-medium">
              {format(selectedDateObj, 'EEEE')}
            </div>
          </div>
          
          <button
            onClick={() => navigateDate('next')}
            className="p-3 text-purple-200 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={navigateToToday}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
        >
          Jump to Today
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentMonth(subDays(monthStart, 1))}
            className="p-3 text-purple-200 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl font-bold text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          
          <button
            onClick={() => setCurrentMonth(addDays(monthEnd, 1))}
            className="p-3 text-purple-200 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-purple-300 font-bold">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {daysInMonth.map(date => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const isSelected = isSameDay(date, selectedDateObj);
            const isCurrentDay = isSameDay(date, today);
            const hasEntryForDate = hasEntry(date);
            
            return (
              <button
                key={dateStr}
                onClick={() => onDateChange(dateStr)}
                className={`
                  relative p-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-110
                  ${isSelected 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                    : isCurrentDay
                    ? 'bg-white/20 text-white border-2 border-purple-400'
                    : 'text-purple-200 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {format(date, 'd')}
                {hasEntryForDate && (
                  <Circle 
                    className={`absolute -top-1 -right-1 w-3 h-3 ${
                      isSelected ? 'text-yellow-300' : 'text-emerald-400'
                    } fill-current animate-pulse`} 
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          Your Progress
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-purple-200 font-medium">Total Entries</span>
            </div>
            <span className="font-black text-2xl text-white">{entries.length}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 font-medium">This Month</span>
            </div>
            <span className="font-black text-2xl text-white">{thisMonthEntries}</span>
          </div>

          {entries.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30">
              <div className="text-center">
                <div className="text-emerald-300 font-bold text-lg mb-1">
                  {Math.round((thisMonthEntries / new Date().getDate()) * 100)}% consistency
                </div>
                <div className="text-emerald-200 text-sm">Keep up the amazing work!</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateNavigation; // ✅ CORRECT
