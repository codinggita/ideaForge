import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function TaskListItem({ task, toggleTaskStatus }) {
  return (
    <div 
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
        task.isCompleted 
          ? 'bg-slate-50 border-slate-100' 
          : 'bg-white border-slate-200 hover:border-secondary/30 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button 
          onClick={() => toggleTaskStatus(task)}
          className={`shrink-0 transition-colors ${task.isCompleted ? 'text-green-500' : 'text-slate-300 hover:text-secondary'}`}
        >
          {task.isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${task.isCompleted ? 'line-through text-slate-400' : 'text-primary'}`}>
            {task.title}
          </p>
          {task.project && (
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Project: {task.project.title}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-6 ml-4 shrink-0">
        {task.dueDate && (
          <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${
            task.isCompleted ? 'text-slate-400 bg-slate-100/50' : 'text-secondary bg-secondary/5'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  );
}
