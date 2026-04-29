import React, { useContext } from 'react';
import { User, Shield, Bell, CreditCard, LogOut } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { AuthContext } from '../context/AuthContext';

export default function SettingsPage() {
  const { userInfo, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account and workspace preferences</p>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex overflow-hidden">
          {/* Settings Sidebar */}
          <div className="w-64 border-r border-slate-100 bg-[#f8fafc] p-6 hidden md:block">
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

          {/* Settings Content */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-2xl">
              <h2 className="text-lg font-bold text-primary mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
                  {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-primary hover:bg-slate-50 transition-colors shadow-sm">
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-slate-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={userInfo?.name || ''}
                      className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={userInfo?.email || ''}
                      disabled
                      className="w-full rounded-xl border border-[#d8e0e8] bg-[#f1f5f9] px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role / Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Product Manager"
                    className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button type="button" className="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                    Discard
                  </button>
                  <button type="button" className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-[0_8px_16px_rgba(53,82,125,0.15)] hover:bg-[#2c4567] transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
