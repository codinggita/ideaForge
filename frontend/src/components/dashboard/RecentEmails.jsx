import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function RecentEmails() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const { data } = await axios.get('/api/gmail/recent');
        setEmails(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm font-bold text-primary tracking-tight">Recent Emails</h4>
        <a href="https://mail.google.com" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1 hover:underline">
          Open Gmail <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </a>
      </div>
      
      <div className="flex-1 space-y-5 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 py-4">{error}</div>
        ) : emails.length === 0 ? (
          <div className="text-center text-sm text-slate-500 py-4">Inbox zero!</div>
        ) : (
          emails.map((email) => (
            <div key={email._id} className={`flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors ${!email.isRead ? 'bg-blue-50/30' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                {email.senderName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <p className={`text-xs truncate ${!email.isRead ? 'font-bold text-primary' : 'font-medium text-slate-700'}`}>
                    {email.senderName}
                  </p>
                  <span className={`text-[10px] shrink-0 ${!email.isRead ? 'font-bold text-secondary' : 'text-slate-400'}`}>
                    {formatTime(email.receivedAt)}
                  </span>
                </div>
                <p className={`text-[11px] truncate mt-0.5 ${!email.isRead ? 'font-bold text-primary' : 'font-medium text-slate-600'}`}>
                  {email.subject}
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5" dangerouslySetInnerHTML={{ __html: email.snippet }} />
              </div>
              {!email.isRead && (
                <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
