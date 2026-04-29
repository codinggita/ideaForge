import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function SchedulePanel() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const { data } = await axios.get('/api/calendar/upcoming');
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch upcoming events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  const formatTimeRange = (startTime, endTime) => {
    if (!startTime) return 'All Day';
    const start = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!endTime) return start;
    const end = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${start} - ${end}`;
  };

  const getEventColor = (index) => {
    const colors = [
      'border-secondary text-secondary',
      'border-green-500 text-green-600',
      'border-purple-500 text-purple-600',
      'border-orange-500 text-orange-600',
      'border-slate-400 text-slate-500'
    ];
    return colors[index % colors.length];
  };

  const getBgColor = (index) => {
    const colors = [
      'bg-secondary',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-slate-400'
    ];
    return colors[index % colors.length];
  };

  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <aside className="w-full lg:w-[340px] flex flex-col bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(2,36,72,0.04)] overflow-hidden">
      <div className="p-6 border-b border-surface-container">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Upcoming Agenda</h3>
        <h2 className="text-xl font-bold text-primary">{todayStr}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 relative min-h-[400px]">
        {/* Current Time Indicator (Floating Line) */}
        <div className="absolute top-[32%] left-0 right-0 h-[1px] bg-secondary z-10 flex items-center opacity-50">
          <div className="w-2 h-2 rounded-full bg-secondary -ml-1"></div>
          <span className="ml-2 bg-secondary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Live</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-sm text-slate-500 py-10">
            No upcoming events found.
          </div>
        ) : (
          events.map((event, index) => {
            const colorClass = getEventColor(index);
            const bgColorClass = getBgColor(index);
            
            return (
              <div key={event._id} className="relative pl-8 group">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-surface-container"></div>
                <div className={`absolute left-[-4px] top-0 w-[10px] h-[10px] rounded-full border-2 ${colorClass.split(' ')[0]} bg-white`}></div>
                
                <div className={`text-[10px] font-bold mb-1 ${colorClass.split(' ')[1]}`}>
                  {formatTimeRange(event.startTime, event.endTime)}
                </div>
                
                <h4 className="font-bold text-on-surface mb-2">{event.title}</h4>
                
                {event.meetingLink && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[16px] text-slate-400" data-icon="videocam">videocam</span>
                    <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">{event.meetingLink}</span>
                  </div>
                )}
                
                {event.meetingLink && (
                  <a 
                    href={event.meetingLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`w-full flex justify-center py-2 ${bgColorClass} text-white text-xs font-bold rounded-lg active:scale-95 transition-all`}
                  >
                    Join Meeting
                  </a>
                )}
              </div>
            );
          })
        )}
      </div>
      
      <div className="p-6 bg-surface-container-low border-t border-surface-container space-y-3">
        <a 
          href="https://calendar.google.com" 
          target="_blank" 
          rel="noreferrer"
          className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-surface-container shadow-sm hover:bg-blue-50 transition-colors"
        >
          <span className="text-xs font-medium text-slate-600">Open in Google Calendar</span>
          <span className="material-symbols-outlined text-[16px] text-slate-400" data-icon="open_in_new">open_in_new</span>
        </a>
      </div>
    </aside>
  );
}
