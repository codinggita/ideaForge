import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpcomingMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const { data } = await axios.get('/api/meetings');
        setMeetings(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white">
      <h4 className="text-sm font-bold text-primary tracking-tight mb-6">Upcoming Meetings</h4>
      
      {loading ? (
        <div className="text-center text-sm text-slate-500 py-4">Loading meetings...</div>
      ) : error ? (
        <div className="text-center text-sm text-red-500 py-4">{error}</div>
      ) : meetings.length === 0 ? (
        <div className="text-center text-sm text-slate-500 py-4">No upcoming meetings scheduled.</div>
      ) : (
        <div className="space-y-6">
          {meetings.slice(0, 3).map((meeting, index) => {
            const isFirst = index === 0;
            const isLast = index === meetings.slice(0, 3).length - 1;

            return (
              <div key={meeting._id} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${isFirst ? 'bg-secondary border-[2.5px] border-blue-100 ring-4 ring-blue-50/50' : 'bg-slate-200'}`}></div>
                  {!isLast && <div className="w-[2px] flex-1 bg-slate-100 my-1"></div>}
                </div>
                <div className={`flex-1 ${!isLast ? 'pb-4' : ''}`}>
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-bold text-primary">{meeting.title}</p>
                    <span className="text-[10px] font-bold text-on-surface-variant">{formatTime(meeting.startTime)}</span>
                  </div>
                  {meeting.meetingLink && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">
                        <a href={meeting.meetingLink} target="_blank" rel="noreferrer" className="text-secondary hover:underline">
                          Join Meeting
                        </a>
                      </span>
                    </div>
                  )}
                  {meeting.description && !meeting.meetingLink && (
                    <p className="text-[10px] text-slate-400 font-medium mt-1 truncate max-w-[200px]">{meeting.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
