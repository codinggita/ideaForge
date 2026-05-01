import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/projects', label: 'Projects', icon: 'query_stats' },
  { to: '/tasks', label: 'Tasks', icon: 'assignment' },
  { to: '/calendar', label: 'Events', icon: 'calendar_today' },
  { to: '/settings', label: 'Profile', icon: 'person' },
];

export default function MobileNav({ onQuickAction }) {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);
    return isActive
      ? 'flex flex-col items-center justify-center text-[#0B61A1] bg-blue-50 rounded-xl px-3 py-1'
      : 'flex flex-col items-center justify-center text-slate-400';
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white/80 backdrop-blur-xl z-50 rounded-t-2xl shadow-[0_-10px_40px_rgba(2,36,72,0.08)] border-t border-slate-100">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className={getLinkClasses(item.to)}>
            <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={onQuickAction}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-gradient-premium text-white rounded-full shadow-xl flex items-center justify-center group active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
      </button>
    </>
  );
}
