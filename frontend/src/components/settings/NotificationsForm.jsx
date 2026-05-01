import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BellRing, Loader2 } from 'lucide-react';

const STORAGE_KEY = 'ideaforge:notification-preferences';

const defaultPreferences = {
  realtimeAlerts: true,
  taskAssignments: true,
  teamInvites: true,
  quietHours: false,
};

export default function NotificationsForm() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
      }
    } catch (err) {
      console.error('Failed to load notification preferences', err);
    }
    setHasLoadedPreferences(true);

    const fetchNotificationSummary = async () => {
      try {
        const { data } = await axios.get('/api/notifications');
        setUnreadCount(data.unreadCount);
      } catch (err) {
        setMessage('Could not load notification summary right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSummary();
  }, []);

  useEffect(() => {
    if (hasLoadedPreferences) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [hasLoadedPreferences, preferences]);

  const togglePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setMessage('Preferences saved on this device.');
  };

  const handleMarkAllRead = async () => {
    setMarkingAllRead(true);
    try {
      await axios.put('/api/notifications/read-all');
      setUnreadCount(0);
      setMessage('All notifications marked as read.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to mark notifications as read.');
    } finally {
      setMarkingAllRead(false);
    }
  };

  const items = [
    {
      key: 'realtimeAlerts',
      title: 'Realtime workspace alerts',
      description: 'Keep the notification bell updated for task assignments and team activity.',
    },
    {
      key: 'taskAssignments',
      title: 'Task assignment updates',
      description: 'Prioritize alerts when a task is assigned or completed in your workspace.',
    },
    {
      key: 'teamInvites',
      title: 'Team invitation activity',
      description: 'Stay informed when teams add you or change your collaboration role.',
    },
    {
      key: 'quietHours',
      title: 'Quiet mode after hours',
      description: 'Reduce notification noise when you are reviewing the workspace later in the day.',
    },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-primary">Notifications</h2>
            <p className="text-sm text-slate-500 mt-1">
              Tune how IdeaForge surfaces team activity and task movement.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm min-w-[180px]">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading activity
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Unread</p>
                <p className="text-3xl font-bold text-primary mt-1">{unreadCount}</p>
              </>
            )}
          </div>
        </div>

        {message && (
          <div className="p-4 mb-6 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-600">
            {message}
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.key} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center justify-center text-primary shrink-0">
                  <BellRing className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePreference(item.key)}
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        preferences[item.key]
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {preferences[item.key] ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-[#f8fafc] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Notification inbox</p>
            <p className="text-sm text-slate-500 mt-1">
              Use this quick clean-up if you want a quieter dashboard before your review.
            </p>
          </div>
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={markingAllRead || unreadCount === 0}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-[0_8px_16px_rgba(53,82,125,0.15)] hover:bg-[#2c4567] transition-all disabled:opacity-60"
          >
            {markingAllRead && <Loader2 className="w-4 h-4 animate-spin" />}
            Mark All Read
          </button>
        </div>
      </div>
    </div>
  );
}
