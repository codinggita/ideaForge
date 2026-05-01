import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { listenForDataChanged } from '../../appEvents';
import { fetchMergedMonthEvents } from '../../calendarEvents';

export default function CalendarGrid() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchMonthEvents = async () => {
    try {
      setLoading(true);
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);

      const data = await fetchMergedMonthEvents({
        timeMin: firstDay.toISOString(),
        timeMax: lastDay.toISOString(),
      });
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthEvents();
  }, [currentDate]);

  useEffect(() => {
    return listenForDataChanged((event) => {
      if (!event.detail?.type || event.detail.type === 'meeting') {
        fetchMonthEvents();
      }
    });
  }, [currentDate]);

  // Calendar Math
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Make Monday index 0
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Generate grid array
  const grid = [];
  
  // Previous month padding
  const prevMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    grid.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push({ day: i, isCurrentMonth: true, fullDate: new Date(year, month, i) });
  }
  
  // Next month padding to complete 35 cells (5 rows) or 42 cells (6 rows)
  const totalCells = grid.length > 35 ? 42 : 35;
  let nextMonthDay = 1;
  while (grid.length < totalCells) {
    grid.push({ day: nextMonthDay++, isCurrentMonth: false });
  }

  // Helper to check if event is on this date
  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(e => {
      if (!e.startTime) return false;
      const eventDate = new Date(e.startTime);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() && 
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const formatTime = (dateString) => {
    if (!dateString || dateString.length <= 10) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="flex-1 flex flex-col bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(2,36,72,0.04)] overflow-hidden">
      {/* Month Header - Simple controls */}
      <div className="flex items-center justify-between p-4 border-b border-surface-container bg-white">
        <h2 className="text-lg font-bold text-primary">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-600 transition-colors border border-slate-200"
          >
            Today
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 border-b border-surface-container bg-[#f8fafc]">
        <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Mon</div>
        <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Tue</div>
        <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Wed</div>
        <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Thu</div>
        <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Fri</div>
        <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Sat</div>
        <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Sun</div>
      </div>
      
      {/* Calendar Grid */}
      <div className={`flex-1 grid grid-cols-7 ${grid.length === 42 ? 'grid-rows-6' : 'grid-rows-5'} overflow-hidden relative`}>
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        {error && !loading && (
          <div className="absolute inset-x-4 top-4 z-20 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}
        
        {grid.map((cell, idx) => {
          const isCurrentToday = cell.isCurrentMonth && isToday(cell.fullDate);
          const cellEvents = cell.isCurrentMonth ? getEventsForDate(cell.fullDate) : [];

          return (
            <div 
              key={idx} 
              className={`p-1 sm:p-2 border-r border-b border-surface-container flex flex-col gap-1 overflow-hidden transition-colors
                ${!cell.isCurrentMonth ? 'bg-slate-50/50' : 'hover:bg-slate-50 cursor-pointer'}
                ${isCurrentToday ? 'bg-blue-50/30' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                <span className={`text-xs sm:text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                  ${!cell.isCurrentMonth ? 'text-slate-300' : 
                    isCurrentToday ? 'bg-primary text-white font-bold' : 'text-slate-600'}
                `}>
                  {cell.day}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                {cellEvents.map((evt, i) => (
                  <div 
                    key={i} 
                    className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-50 border border-blue-100 text-secondary text-[9px] sm:text-[10px] font-medium rounded truncate cursor-pointer hover:bg-blue-100 transition-colors"
                    title={evt.title}
                  >
                    {formatTime(evt.startTime) && <span className="font-bold mr-1 opacity-70">{formatTime(evt.startTime)}</span>}
                    {evt.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
