import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { listenForDataChanged } from '../../appEvents';
import { fetchMergedUpcomingEvents } from '../../calendarEvents';

export default function UpcomingMeetingsScroller() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcoming = async () => {
    try {
      setLoading(true);
      const data = await fetchMergedUpcomingEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch upcoming events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcoming();
    return listenForDataChanged((event) => {
      if (!event.detail?.type || event.detail.type === 'meeting') {
        fetchUpcoming();
      }
    });
  }, []);

  const formatTimeRange = (startTime, endTime) => {
    if (!startTime) return '';
    const start = new Date(startTime);
    const startStr = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Check if it's tomorrow or later
    const today = new Date();
    const isToday = start.getDate() === today.getDate() && start.getMonth() === today.getMonth();
    
    const dayStr = isToday ? 'Today' : start.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    
    return `${dayStr}, ${startStr}`;
  };

  const getBorderColor = (index) => {
    const colors = [
      'border-secondary',
      'border-orange-400',
      'border-green-400',
      'border-purple-400'
    ];
    return colors[index % colors.length];
  };

  return (
    <footer className="p-6 pt-0 ml-0 bg-transparent h-fit w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Upcoming Meetings</h3>
        <div className="flex gap-2">
          <button className="p-1.5 rounded-full border border-surface-container text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="chevron_left">chevron_left</span>
          </button>
          <button className="p-1.5 rounded-full border border-surface-container text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {loading ? (
          <div className="min-w-[280px] bg-white p-4 rounded-xl shadow-sm flex items-center justify-center h-[120px]">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : events.length === 0 ? (
          <div className="min-w-[280px] bg-white p-4 rounded-xl shadow-sm flex items-center justify-center h-[120px]">
            <span className="text-sm text-slate-400 font-medium">No upcoming meetings.</span>
          </div>
        ) : (
          events.map((event, index) => {
            const borderClass = getBorderColor(index);
            
            return (
              <div key={event._id} className={`min-w-[280px] bg-white p-4 rounded-xl border-l-4 ${borderClass} shadow-sm flex flex-col justify-between h-[120px]`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {formatTimeRange(event.startTime, event.endTime)}
                    </span>
                    {event.meetingLink && (
                      <span className="material-symbols-outlined text-secondary text-[16px]">videocam</span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-primary mb-3 truncate" title={event.title}>{event.title}</h4>
                </div>
                
                {event.meetingLink ? (
                  <a 
                    href={event.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 bg-surface-container-low text-primary text-xs font-bold rounded-lg hover:bg-secondary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    Join Meeting
                  </a>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-surface-container-low text-slate-500 text-xs font-bold rounded-lg cursor-default">
                    <span className="material-symbols-outlined text-[16px]">event</span>
                    Scheduled
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </footer>
  );
}
