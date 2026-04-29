import React, { useContext } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { AuthContext } from '../context/AuthContext';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import ProfileForm from '../components/settings/ProfileForm';

export default function SettingsPage() {
  const { userInfo, logout, updateProfile } = useContext(AuthContext);

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
          <SettingsSidebar handleLogout={handleLogout} />
          <ProfileForm userInfo={userInfo} updateProfile={updateProfile} />
        </div>
      </div>
    </DashboardLayout>
  );
}
