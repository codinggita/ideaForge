import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('/api/notifications');
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      // silent fail
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await axios.put('/api/notifications/read-all');
      setUnreadCount(0);
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      // silent fail
    }
  };

  const handleNotifClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await axios.put(`/api/notifications/${notif._id}/read`);
        setUnreadCount((c) => Math.max(0, c - 1));
        setNotifications(notifications.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n)));
      } catch (err) {}
    }
    setShowNotifs(false);
    if (notif.link) navigate(notif.link);
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'team_invite': return 'group_add';
      case 'task_assigned': return 'assignment_ind';
      case 'task_completed': return 'task_alt';
      default: return 'notifications';
    }
  };

  const getNotifColor = (type) => {
    switch (type) {
      case 'team_invite': return 'text-blue-500 bg-blue-50';
      case 'task_assigned': return 'text-orange-500 bg-orange-50';
      case 'task_completed': return 'text-green-500 bg-green-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-8 py-4 bg-[#F7F9FB] dark:bg-slate-900 border-b border-slate-100">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all" 
            placeholder="Search data, valuations, or team members..." 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6 font-['Plus_Jakarta_Sans'] text-sm font-medium tracking-tight">
          <Link to="/dashboard" className="text-[#0B61A1] font-semibold">Dashboard</Link>
          <Link to="/reports" className="text-slate-500 hover:text-[#1E3A5F] transition-all">Analytics</Link>
          <Link to="/teams" className="text-slate-500 hover:text-[#1E3A5F] transition-all">Teams</Link>
        </nav>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          {/* Notification Bell */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => { setShowNotifs(!showNotifs); if (!showNotifs) fetchNotifications(); }}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative"
            >
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showNotifs && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-primary">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-semibold text-secondary hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                      <span className="material-symbols-outlined text-3xl mb-2">notifications_off</span>
                      <p className="text-sm">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif._id}
                        onClick={() => handleNotifClick(notif)}
                        className={`flex items-start gap-3 px-5 py-3.5 cursor-pointer transition-colors border-b border-slate-50 ${
                          notif.isRead ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/40 hover:bg-blue-50/70'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${getNotifColor(notif.type)}`}>
                          <span className="material-symbols-outlined text-[16px]">{getNotifIcon(notif.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] leading-snug ${notif.isRead ? 'text-slate-600' : 'text-primary font-medium'}`}>
                            {notif.message}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">{timeAgo(notif.createdAt)}</p>
                        </div>
                        {!notif.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/settings" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-primary uppercase border-2 border-white shadow-sm">
              {userInfo?.name ? userInfo.name.charAt(0) : 'U'}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
