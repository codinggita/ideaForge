import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileNav() {
  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white/80 backdrop-blur-xl z-50 rounded-t-2xl shadow-[0_-10px_40px_rgba(2,36,72,0.08)] border-t border-slate-100">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#0B61A1] bg-blue-50 rounded-xl px-3 py-1">
          <span className="material-symbols-outlined" data-icon="home">home</span>
          <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Home</span>
        </Link>
        <Link to="#" className="flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined" data-icon="query_stats">query_stats</span>
          <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Evaluate</span>
        </Link>
        <Link to="#" className="flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined" data-icon="assignment">assignment</span>
          <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Tasks</span>
        </Link>
        <Link to="/calendar" className="flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
          <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Events</span>
        </Link>
        <Link to="#" className="flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined" data-icon="person">person</span>
          <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Profile</span>
        </Link>
      </nav>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-gradient-premium text-white rounded-full shadow-xl flex items-center justify-center group active:scale-95 transition-transform z-40">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
      </button>
    </>
  );
}
