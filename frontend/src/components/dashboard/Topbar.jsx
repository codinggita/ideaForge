import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-8 py-4 bg-[#F7F9FB] dark:bg-slate-900 border-b border-slate-100">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all" 
            placeholder="Search data, valuations, or team members..." 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6 font-['Plus_Jakarta_Sans'] text-sm font-medium tracking-tight">
          <Link to="/dashboard" className="text-[#0B61A1] font-semibold">Dashboard</Link>
          <Link to="#" className="text-slate-500 hover:text-[#1E3A5F] transition-all">Analytics</Link>
          <Link to="#" className="text-slate-500 hover:text-[#1E3A5F] transition-all">History</Link>
        </nav>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 group cursor-pointer">
            <img 
              alt="User Profile" 
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-rdQaZGpFhbdeBrcbYlWyu_7dMYpp1CmwwoJewrO7T5WmIcdwlKSm4a1fY2NjEC62dFSZT477r_CqgH-izPEhrkCHh11zWWUbXd9Xawj6ViNjsIxPCWDPgaW23LcTiCsp4SF4SIqrVC48oMwsB1p0I_oqTx1NsHY8RNtfcCTzSir68hIKNzJPD7Ld0CzgzzBtfTfW20s8Vt0_FQINX0jPFyKe5mHcTVbq3ae6y0nWVNbtfcCzP20j-vzQ1lm3oY_XJIOOkv9LFdc"
            />
            <span className="material-symbols-outlined text-slate-400" data-icon="account_circle">account_circle</span>
          </div>
        </div>
      </div>
    </header>
  );
}
