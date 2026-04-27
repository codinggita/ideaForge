import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import MobileNav from '../components/dashboard/MobileNav';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import SchedulePanel from '../components/calendar/SchedulePanel';
import UpcomingMeetingsScroller from '../components/calendar/UpcomingMeetingsScroller';

export default function CalendarPage() {
  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen">
      {/* SideNavBar Integration */}
      <Sidebar />
      
      {/* Main Canvas */}
      <main className="md:ml-[240px] h-screen flex flex-col relative overflow-hidden pb-safe">
        {/* TopNavBar */}
        <CalendarHeader />
        
        {/* Main Content Area: Calendar Grid + Right Panel */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6">
          {/* Calendar Section */}
          <CalendarGrid />
          
          {/* Right Panel: Selected Day Timeline */}
          <SchedulePanel />
        </div>
        
        {/* Bottom: Upcoming Meetings Horizontal Scroll */}
        <div className="hidden md:block shrink-0 px-6">
          <UpcomingMeetingsScroller />
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
