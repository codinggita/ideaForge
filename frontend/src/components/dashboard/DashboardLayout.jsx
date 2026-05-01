import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import QuickActionModal from '../common/QuickActionModal';

export default function DashboardLayout({ children }) {
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Sidebar onQuickAction={() => setIsQuickActionOpen(true)} />
      <main className="md:ml-[240px] min-h-screen pb-24 md:pb-12">
        <Topbar />
        <div className="px-8 py-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <MobileNav onQuickAction={() => setIsQuickActionOpen(true)} />
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
      />
    </div>
  );
}
