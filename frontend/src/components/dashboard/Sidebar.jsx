import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClasses = (path) => {
    const isActive = currentPath === path || currentPath.startsWith(`${path}/`);
    return isActive
      ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white border-l-4 border-[#0B61A1] transition-colors font-medium text-sm tracking-[-0.02em]"
      : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm tracking-[-0.02em] border-l-4 border-transparent";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#1E3A5F] flex flex-col py-6 px-4 z-50 hidden md:flex">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center text-white shadow-lg">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight leading-none">IdeaForge</h1>
          <p className="text-[10px] text-on-primary-container font-medium tracking-widest uppercase mt-1">The Financial Atelier</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <Link to="/dashboard" className={getLinkClasses('/dashboard')}>
          <span className="material-symbols-outlined text-[20px]" data-icon="dashboard">dashboard</span>
          <span>Overview</span>
        </Link>
        <Link to="/projects" className={getLinkClasses('/projects')}>
          <span className="material-symbols-outlined text-[20px]" data-icon="tactic">tactic</span>
          <span>Project Management</span>
        </Link>
        <Link to="/tasks" className={getLinkClasses('/tasks')}>
          <span className="material-symbols-outlined text-[20px]" data-icon="lightbulb">lightbulb</span>
          <span>Tasks & Ideas</span>
        </Link>
        <Link to="/calendar" className={getLinkClasses('/calendar')}>
          <span className="material-symbols-outlined text-[20px]" data-icon="calendar_today">calendar_today</span>
          <span>Calendar & Meetings</span>
        </Link>
        {/* Placeholder Links for future features */}
        <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm tracking-[-0.02em] border-l-4 border-transparent opacity-50 cursor-not-allowed">
          <span className="material-symbols-outlined text-[20px]" data-icon="account_balance">account_balance</span>
          <span>Portfolio Valuator</span>
        </Link>
        <Link to="/teams" className={getLinkClasses('/teams')}>
          <span className="material-symbols-outlined text-[20px]" data-icon="groups">groups</span>
          <span>Team Management</span>
        </Link>
        <Link to="/reports" className={getLinkClasses('/reports')}>
          <span className="material-symbols-outlined text-[20px]" data-icon="assessment">assessment</span>
          <span>Reports</span>
        </Link>
      </nav>

      <div className="mt-auto space-y-1 pt-6 border-t border-white/10">
        <button className="w-full mb-4 py-2.5 bg-secondary text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Valuation
        </button>
        <Link to="/settings" className={getLinkClasses('/settings')}>
          <span className="material-symbols-outlined text-[20px]" data-icon="settings">settings</span>
          <span>Settings</span>
        </Link>
        <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm tracking-[-0.02em] border-l-4 border-transparent opacity-50 cursor-not-allowed">
          <span className="material-symbols-outlined text-[20px]" data-icon="person">person</span>
          <span>My Account</span>
        </Link>
      </div>
    </aside>
  );
}
