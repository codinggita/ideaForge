import React from 'react';
import { User, Shield, Bell, CreditCard, LogOut } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile Info', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function SettingsSidebar({ activeTab, onTabChange, handleLogout }) {
  return (
    <div className="w-64 border-r border-slate-100 bg-[#f8fafc] p-6 hidden md:block shrink-0">
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                isActive
                  ? 'bg-white text-primary border border-slate-200 shadow-sm'
                  : 'text-slate-500 hover:text-primary hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-secondary' : ''}`} />
              {tab.label}
            </button>
          );
        })}
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
