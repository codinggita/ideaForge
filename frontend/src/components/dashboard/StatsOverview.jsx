import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function StatsOverview() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    tasksDueToday: 0,
    meetingsToday: 0,
    healthScore: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white h-[120px] flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {/* Stat 1 */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Active Projects</p>
          <span className="material-symbols-outlined text-secondary text-xl">tactic</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold text-primary leading-none">{stats.projectsCount < 10 ? `0${stats.projectsCount}` : stats.projectsCount}</h3>
            <p className="text-[10px] text-green-600 font-bold mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> Tracked properly
            </p>
          </div>
          <div className="h-10 w-20 bg-blue-50/50 rounded flex items-end gap-1 px-1 py-1">
            <div className="w-full bg-blue-200 h-[40%] rounded-t-sm"></div>
            <div className="w-full bg-blue-300 h-[60%] rounded-t-sm"></div>
            <div className="w-full bg-blue-400 h-[50%] rounded-t-sm"></div>
            <div className="w-full bg-secondary h-[80%] rounded-t-sm"></div>
            <div className="w-full bg-blue-300 h-[30%] rounded-t-sm"></div>
          </div>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tasks Due Today</p>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${stats.tasksDueToday > 0 ? 'bg-error' : 'bg-green-500'}`}>
            {stats.tasksDueToday}
          </span>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-primary leading-none">{stats.tasksDueToday < 10 ? `0${stats.tasksDueToday}` : stats.tasksDueToday}</h3>
          <div className={`p-2 rounded-lg ${stats.tasksDueToday > 0 ? 'bg-error-container/20' : 'bg-green-50'}`}>
            <span className={`material-symbols-outlined ${stats.tasksDueToday > 0 ? 'text-error' : 'text-green-500'}`} data-icon={stats.tasksDueToday > 0 ? 'assignment_late' : 'task_alt'}>
              {stats.tasksDueToday > 0 ? 'assignment_late' : 'task_alt'}
            </span>
          </div>
        </div>
        <p className="text-[10px] text-on-surface-variant font-medium mt-3 italic">
          {stats.tasksDueToday > 0 ? 'Requires immediate action' : 'All caught up!'}
        </p>
      </div>

      {/* Stat 3 */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Meetings Today</p>
          <span className="material-symbols-outlined text-on-surface-variant text-xl">event</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold text-primary leading-none">{stats.meetingsToday < 10 ? `0${stats.meetingsToday}` : stats.meetingsToday}</h3>
            <p className="text-[10px] text-secondary font-bold mt-2">Check calendar</p>
          </div>
          <div className="flex -space-x-2">
            <img className="w-7 h-7 rounded-full border-2 border-white" data-alt="avatar of a team member with a blue profile background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQdAwPNdgPUDcEr60tU7XLBqNo4zecNU57NyVfCxKWVgVxhQ_eldMZAPMmXvrP6IBLYZH1lybrKUOxSgn343TWdarDNTXuWnkHncrrVLWvgwrg56mCZwM6cXkWHr6WnFW29T4-cGATGlg6XXdGk5xx-Bb13vnkDUUnw1zfuw2ykc5RqrCUnWsx_f95a9B-bJzuQ3BSiNRajMhOz261cesdr64Q01034ZSLtFk1vMn9G2zWrMcJJz7shJvVrL6Z-V_JwzuE0u2jSf0"/>
            <img className="w-7 h-7 rounded-full border-2 border-white" data-alt="avatar of a team member with a purple profile background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoMuO7Dz1eYPPSLzNPlnMkPUFw1QJo3tDxux3TwHn3kJcI17PUnK-dOWwMlT5m3d57Bu-UMy5hPLixMk9s7n_-t0AT_Udx3SZwMVA2IFA81nqYSK6QnoxTFbGrsqm8-3NZcZyevHUTp1O2YB1isF9iSyjM8kPNPfc15E168Wg8CBplCyJJH93M-BhubkX1HMjlT0TwjsWTgoG5wnXaGkKp6Hmd_bhdSWyY4kjHdDiOwqt6MDj_c-UZUKUJjFvZEk5Mb7XoN8iw_2E"/>
          </div>
        </div>
      </div>

      {/* Stat 4 */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_20px_rgba(2,36,72,0.03)] border border-white">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Task Health</p>
          <span className="material-symbols-outlined text-green-600 text-xl">verified</span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-primary leading-none">{stats.healthScore}<span className="text-sm font-medium text-slate-400">%</span></h3>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="24" cy="24" fill="transparent" r="20" stroke="#f2f4f6" strokeWidth="4"></circle>
              <circle cx="24" cy="24" fill="transparent" r="20" stroke="#22c55e" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * stats.healthScore) / 100} strokeWidth="4" className="transition-all duration-1000"></circle>
            </svg>
            <span className="absolute text-[10px] font-bold text-green-700">OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
