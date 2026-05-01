import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUserAvatar } from '../../avatar';

export default function CalendarHeader({ onNewMeeting }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center w-full px-8 py-4 bg-[#F7F9FB] sticky top-0 z-40 border-b border-slate-100">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-primary font-semibold text-lg tracking-tight">
          <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
          Calendar
        </div>
        
        <div className="flex items-center bg-surface-container-low rounded-full p-1 h-10 hidden sm:flex">
          <button className="px-4 py-1.5 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors">Day</button>
          <button className="px-4 py-1.5 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors">Week</button>
          <button className="px-4 py-1.5 text-xs font-semibold bg-white rounded-full shadow-sm text-primary">Month</button>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 text-slate-500">
          <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" data-icon="search">search</span>
          <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors relative" data-icon="notifications">
            notifications
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full translate-x-1/2 -translate-y-1/2"></span>
          </span>
        </div>
        
        <button
          type="button"
          onClick={onNewMeeting}
          className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]" data-icon="videocam">videocam</span>
          <span className="hidden sm:inline">+ New Meeting</span>
          <span className="sm:hidden">New</span>
        </button>
        
        <div className="flex items-center gap-2 group cursor-pointer border-l border-slate-200 pl-6">
          <img 
            alt={userInfo?.name || userInfo?.email || 'User avatar'}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover bg-slate-200"
            src={getUserAvatar(userInfo)}
          />
        </div>
      </div>
    </header>
  );
}
