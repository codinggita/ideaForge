import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, Calendar as CalendarIcon, Loader2 } from 'lucide-react';

export default function UpcomingMeetings() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/calendar/upcoming');
      setEvents(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // If it's an all-day event, time might be 00:00, or we check if it's just a date
    if (dateString.length <= 10) return 'All Day'; 
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm font-bold text-primary tracking-tight">Google Calendar Events</h4>
        <a 
          href="https://calendar.google.com" 
          target="_blank" 
          rel="noreferrer"
          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest"
          title="Open Google Calendar"
        >
          <CalendarIcon className="w-3.5 h-3.5" /> Open
        </a>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 py-4">{error}</div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[150px]">
            <div className="text-center text-sm text-slate-500 mb-3">No upcoming events found.</div>
            <a 
              href="https://calendar.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              Check Calendar
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {events.slice(0, 4).map((event, index) => {
              const isFirst = index === 0;
              const isLast = index === events.slice(0, 4).length - 1;

              return (
                <div key={event._id} className="flex gap-4 group relative">
                  <div className="flex flex-col items-center absolute left-0 top-1 bottom-[-24px] z-0">
                    <div className={`w-2.5 h-2.5 rounded-full z-10 ${isFirst ? 'bg-secondary border-[2.5px] border-blue-100 ring-4 ring-blue-50/50' : 'bg-slate-300'}`}></div>
                    {!isLast && <div className="w-[2px] flex-1 bg-slate-100 my-1"></div>}
                  </div>
                  <div className={`flex-1 pl-6 ${!isLast ? 'pb-2' : ''}`}>
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-xs font-bold text-primary leading-tight">{event.title}</p>
                      <span className="text-[10px] font-bold text-secondary shrink-0 bg-secondary/5 px-2 py-0.5 rounded-md">
                        {formatTime(event.startTime)}
                      </span>
                    </div>
                    {event.meetingLink && (
                      <div className="mt-2">
                        <a 
                          href={event.meetingLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-md transition-colors"
                        >
                          Join Meeting <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                    {event.description && !event.meetingLink && (
                      <p className="text-[10px] text-slate-500 font-medium mt-1.5 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: event.description }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
