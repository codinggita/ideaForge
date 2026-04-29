import React from 'react';
import { User, Shield, Bell, CreditCard, LogOut } from 'lucide-react';

export default function SettingsSidebar({ handleLogout }) {
  return (
    <div className="w-64 border-r border-slate-100 bg-[#f8fafc] p-6 hidden md:block shrink-0">
      <nav className="space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white text-primary border border-slate-200 font-medium text-sm shadow-sm">
          <User className="w-4 h-4 text-secondary" />
          Profile Info
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors font-medium text-sm">
          <Shield className="w-4 h-4" />
          Security
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors font-medium text-sm">
          <Bell className="w-4 h-4" />
          Notifications
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors font-medium text-sm">
          <CreditCard className="w-4 h-4" />
          Billing
        </button>
      </nav>
      
      <div className="mt-8 pt-8 border-t border-slate-200">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
