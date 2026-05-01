import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Greeting from '../components/dashboard/Greeting';
import StatsOverview from '../components/dashboard/StatsOverview';
import RecentProjects from '../components/dashboard/RecentProjects';
import TodaysTasks from '../components/dashboard/TodaysTasks';
import AIBriefing from '../components/dashboard/AIBriefing';
import UpcomingMeetings from '../components/dashboard/UpcomingMeetings';
import RecentEmails from '../components/dashboard/RecentEmails';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Greeting />
      <StatsOverview />
      
      {/* Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-8">
          <RecentProjects />
          <TodaysTasks />
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 space-y-8">
          <AIBriefing />
          <UpcomingMeetings />
          <RecentEmails />
        </div>
        
      </div>
    </DashboardLayout>
  );
}
