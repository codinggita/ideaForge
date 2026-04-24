import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Sidebar />
      <main className="md:ml-[240px] min-h-screen pb-24 md:pb-12">
        <Topbar />
        <div className="px-8 py-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
