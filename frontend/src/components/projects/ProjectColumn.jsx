import React from 'react';
import { MoreVertical } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function ProjectColumn({ title, items, colorClass }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-600 border-red-100';
      case 'Medium': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Low': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col bg-[#f8fafc] rounded-2xl border border-[#eef2f4] p-4 h-full min-h-[500px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-[#243041] flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
          {title}
          <span className="ml-2 bg-white text-xs font-medium text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
            {items.length}
          </span>
        </h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
        {items.map(project => (
          <ProjectCard key={project._id} project={project} getPriorityColor={getPriorityColor} />
        ))}
        {items.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
            Drop projects here
          </div>
        )}
      </div>
    </div>
  );
}
