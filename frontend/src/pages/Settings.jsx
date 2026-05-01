import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { AuthContext } from '../context/AuthContext';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import ProfileForm from '../components/settings/ProfileForm';
import SecurityForm from '../components/settings/SecurityForm';
import NotificationsForm from '../components/settings/NotificationsForm';
import BillingPanel from '../components/settings/BillingPanel';

const mobileTabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing' },
];

export default function SettingsPage() {
  const { userInfo, logout, updateProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'security':
        return <SecurityForm userInfo={userInfo} updateProfile={updateProfile} />;
      case 'notifications':
        return <NotificationsForm />;
      case 'billing':
        return <BillingPanel />;
      case 'profile':
      default:
        return <ProfileForm userInfo={userInfo} updateProfile={updateProfile} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account and workspace preferences</p>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex overflow-hidden">
          <SettingsSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            handleLogout={handleLogout}
          />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="md:hidden px-4 pt-4">
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {mobileTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
