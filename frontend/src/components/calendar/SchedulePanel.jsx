import React from 'react';

export default function SchedulePanel() {
  return (
    <aside className="w-full lg:w-[340px] flex flex-col bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(2,36,72,0.04)] overflow-hidden">
      <div className="p-6 border-b border-surface-container">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Schedule</h3>
        <h2 className="text-xl font-bold text-primary">Wednesday, 16 April</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 relative min-h-[400px]">
        {/* Current Time Indicator (Floating Line) */}
        <div className="absolute top-[32%] left-0 right-0 h-[1px] bg-secondary z-10 flex items-center">
          <div className="w-2 h-2 rounded-full bg-secondary -ml-1"></div>
          <span className="ml-2 bg-secondary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Live</span>
        </div>
        
        {/* Event 1 */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-surface-container"></div>
          <div className="absolute left-[-4px] top-0 w-[10px] h-[10px] rounded-full border-2 border-secondary bg-white"></div>
          <div className="text-[10px] font-bold text-secondary mb-1">09:00 - 10:00</div>
          <h4 className="font-bold text-on-surface mb-2">Team Standup</h4>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[16px] text-slate-400" data-icon="videocam">videocam</span>
            <span className="text-xs text-slate-500 font-medium">meet.google.com/xyz-abc</span>
          </div>
          <button className="w-full py-2 bg-secondary text-white text-xs font-bold rounded-lg active:scale-95 transition-all">Join Meeting</button>
        </div>
        
        {/* Event 2 */}
        <div className="relative pl-8 opacity-90">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-surface-container"></div>
          <div className="absolute left-[-4px] top-0 w-[10px] h-[10px] rounded-full border-2 border-green-500 bg-white"></div>
          <div className="text-[10px] font-bold text-green-600 mb-1">11:00 - 12:30</div>
          <h4 className="font-bold text-on-surface mb-2">Client Demo: Apex Corp</h4>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[16px] text-slate-400" data-icon="link">link</span>
            <span className="text-xs text-slate-500 font-medium">Internal Resources Doc</span>
          </div>
          <button className="w-full py-2 bg-surface-container-high text-primary text-xs font-bold rounded-lg active:scale-95 transition-all">Join Meeting</button>
        </div>
        
        {/* Event 3 */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-surface-container"></div>
          <div className="absolute left-[-4px] top-0 w-[10px] h-[10px] rounded-full border-2 border-slate-300 bg-white"></div>
          <div className="text-[10px] font-bold text-slate-400 mb-1">14:00 - 15:00</div>
          <h4 className="font-bold text-on-surface mb-2">Budget Review Q2</h4>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-slate-400" data-icon="room">room</span>
            <span className="text-xs text-slate-500 font-medium">Conference Room B</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-surface-container-low border-t border-surface-container space-y-3">
        <button className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-surface-container shadow-sm hover:bg-blue-50 transition-colors">
          <span className="text-xs font-medium text-slate-600">Reschedule All</span>
          <span className="material-symbols-outlined text-[16px] text-slate-400" data-icon="chevron_right">chevron_right</span>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-surface-container shadow-sm hover:bg-blue-50 transition-colors">
          <span className="text-xs font-medium text-slate-600">Export Agenda</span>
          <span className="material-symbols-outlined text-[16px] text-slate-400" data-icon="download">download</span>
        </button>
      </div>
    </aside>
  );
}
