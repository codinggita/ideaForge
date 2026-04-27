import React from 'react';

export default function UpcomingMeetingsScroller() {
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
        {/* CSS inside index.css will hide the scrollbar specifically for webkit: .hide-scrollbar::-webkit-scrollbar { display: none; } */}
        
        {/* Card 1 */}
        <div className="min-w-[280px] bg-white p-4 rounded-xl border-l-4 border-secondary shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Tomorrow, 09:30</span>
              <div className="flex -space-x-2">
                <img alt="Team member" className="w-6 h-6 rounded-full border border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYhFwHNJmUjVERqyQUNW08Av98af6tTVRetVohJJSx4ZkPBh6hLae38gPjoJhTNVBQ7c74YBBo8OfJ6eE5QwR8Aifcfl44yKJfw0uv80cRmg2Qo1_ecUqMVQCzHmSQLP5z48A2IIgDR8YfzPj5t321ghbiYDHRJeqHfTiBVwRgSlJ9Nb7mcVtQk6o2M-fTJo-pz5tPkKaaX08HCIWPKbxbHweBhEy6oVIjJkSJRmtPbxHZPvLQBMCdWlR8mZPpgwwod00c1DFRjy4" />
                <img alt="Team member" className="w-6 h-6 rounded-full border border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp2Mzr_U7GnUNqteWt5X9Gp3jUNZBdrJakpL21opd6K4KPfGLcKpeF9ltEmGhDhixLbKZY9NQDuAGT6IPncrnD0_APbBptOPMcpwd2_v2QW02kA6WDgJOi-byIVVcTF-MCb4jExthxQE3UDsfsgltAL1pCNkKhsv_Zwpk8GhMSPTslMQ_Yt3O6ML-HODupRt7W6b3sDDYVhCQtnz3V4KGowzyeCk4DPk-L-jf8tKujhvVmpwb2evFGd7lQ-jRwaQJ2ss1pgfK_jTs" />
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[8px] font-bold text-slate-400">+4</div>
              </div>
            </div>
            <h4 className="text-sm font-bold text-primary mb-3">Portfolio Performance Sync</h4>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-surface-container-low text-primary text-xs font-bold rounded-lg hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-[16px]" data-icon="calendar_today">calendar_today</span>
            View Details
          </button>
        </div>
        
        {/* Card 2 */}
        <div className="min-w-[280px] bg-white p-4 rounded-xl border-l-4 border-orange-400 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Friday, 11:00</span>
              <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded uppercase">High Priority</span>
            </div>
            <h4 className="text-sm font-bold text-primary mb-3">Global Markets Strategy</h4>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-surface-container-low text-primary text-xs font-bold rounded-lg hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-[16px]" data-icon="videocam">videocam</span>
            Pre-Join (Meet)
          </button>
        </div>
        
        {/* Card 3 */}
        <div className="min-w-[280px] bg-white p-4 rounded-xl border-l-4 border-green-400 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">22 April, 15:00</span>
              <span className="material-symbols-outlined text-green-500 text-[18px]" data-icon="verified">verified</span>
            </div>
            <h4 className="text-sm font-bold text-primary mb-3">Founders Weekly Sync</h4>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-surface-container-low text-primary text-xs font-bold rounded-lg hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-[16px]" data-icon="assignment_turned_in">assignment_turned_in</span>
            Review Agenda
          </button>
        </div>
        
        {/* Card 4 */}
        <div className="min-w-[280px] bg-white p-4 rounded-xl border-l-4 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">24 April, 10:00</span>
            </div>
            <h4 className="text-sm font-bold text-primary mb-3">Recruitment Kickoff</h4>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-surface-container-low text-primary text-xs font-bold rounded-lg hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-[16px]" data-icon="groups">groups</span>
            Participants
          </button>
        </div>
      </div>
    </footer>
  );
}
