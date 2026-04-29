import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function TaskToolbar() {
  return (
    <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center bg-[#f8fafc]">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm cursor-pointer">All Tasks</span>
        <span className="px-3 py-1.5 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors text-slate-500">Incomplete</span>
        <span className="px-3 py-1.5 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors text-slate-500">Completed</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
          <ArrowUpDown className="w-4 h-4" /> Sort
        </button>
      </div>
    </div>
  );
}
