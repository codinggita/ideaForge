import React from 'react';

export default function CalendarGrid() {
  return (
    <section className="flex-1 flex flex-col bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(2,36,72,0.04)] overflow-hidden">
      {/* Days of week */}
      <div className="grid grid-cols-7 border-b border-surface-container">
        <div className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Mon</div>
        <div className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Tue</div>
        <div className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 text-secondary">Wed</div>
        <div className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Thu</div>
        <div className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Fri</div>
        <div className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Sat</div>
        <div className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Sun</div>
      </div>
      
      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {/* Previous Month */}
        <div className="p-3 border-r border-b border-surface-container text-slate-300 text-sm font-medium">31</div>
        
        {/* Current Month */}
        <div className="p-3 border-r border-b border-surface-container flex flex-col gap-1.5 group cursor-pointer hover:bg-surface-container-low transition-colors">
          <span className="text-sm font-medium text-slate-600">1</span>
          <div className="px-2 py-0.5 bg-blue-50 text-secondary text-[10px] font-medium rounded-md truncate">Team Sync</div>
        </div>
        <div className="p-3 border-r border-b border-surface-container flex flex-col gap-1.5 cursor-pointer hover:bg-surface-container-low">
          <span className="text-sm font-medium text-slate-600">2</span>
        </div>
        <div className="p-3 border-r border-b border-surface-container flex flex-col gap-1.5 cursor-pointer hover:bg-surface-container-low">
          <span className="text-sm font-medium text-slate-600">3</span>
          <div className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-medium rounded-md truncate">Board Prep</div>
        </div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">4</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">5</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">6</div>
        
        {/* Row 2 */}
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">7</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">8</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">9</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">10</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">11</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">12</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">13</div>
        
        {/* Row 3 */}
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">14</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">15</div>
        
        {/* TODAY Highlight */}
        <div className="p-3 border-r border-b border-surface-container flex flex-col gap-1.5 bg-blue-50/50 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-full bg-secondary"></div>
          <span className="text-sm font-bold text-secondary">16</span>
          <div className="px-2 py-0.5 bg-secondary text-white text-[10px] font-medium rounded-md truncate">09:00 Standup</div>
          <div className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-medium rounded-md truncate">11:00 Demo</div>
        </div>
        
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">17</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">18</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">19</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">20</div>
        
        {/* Row 4 */}
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">21</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">22</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">23</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">24</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">25</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">26</div>
        <div className="p-3 border-r border-b border-surface-container text-sm font-medium text-slate-600">27</div>
        
        {/* Row 5 */}
        <div className="p-3 border-r border-surface-container text-sm font-medium text-slate-600">28</div>
        <div className="p-3 border-r border-surface-container text-sm font-medium text-slate-600">29</div>
        <div className="p-3 border-r border-surface-container text-sm font-medium text-slate-600">30</div>
        <div className="p-3 border-r border-surface-container text-sm font-medium text-slate-300">1</div>
        <div className="p-3 border-r border-surface-container text-sm font-medium text-slate-300">2</div>
        <div className="p-3 border-r border-surface-container text-sm font-medium text-slate-300">3</div>
        <div className="p-3 text-sm font-medium text-slate-300">4</div>
      </div>
    </section>
  );
}
