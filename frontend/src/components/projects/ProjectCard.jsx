import React from 'react';
import { MoreVertical } from 'lucide-react';

export default function ProjectCard({ project, getPriorityColor }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-[#eef2f4] shadow-sm hover:shadow-md transition-shadow cursor-grab">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wider ${getPriorityColor(project.priority)}`}>
          {project.priority}
        </span>
        <button className="text-slate-400 hover:text-primary transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <h4 className="font-semibold text-primary text-sm mb-1">{project.title}</h4>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{project.description}</p>
      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
            U
          </div>
        </div>
        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">schedule</span>
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
