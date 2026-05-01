import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function AIBriefing() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch AI briefing stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-primary-container text-white rounded-xl p-6 relative overflow-hidden shadow-xl border-l-[6px] border-secondary">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container">AI Intelligence Briefing</span>
        </div>
        
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-white/70 py-4">
            <Loader2 className="w-4 h-4 animate-spin" /> Analyzing your workspace...
          </div>
        ) : stats ? (
          <p className="text-lg font-medium leading-snug">
            You have <span className="text-secondary-container font-bold underline underline-offset-4 decoration-2">{stats.meetingsToday} meetings today</span>, and {stats.tasksDueToday} tasks that require immediate action to maintain your {stats.healthScore}% health score.
          </p>
        ) : (
          <p className="text-lg font-medium leading-snug text-white/70">
            Briefing unavailable.
          </p>
        )}

        <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-[10px] text-on-primary-container font-medium">
            Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <Link to="/tasks" className="text-xs font-bold text-secondary-container flex items-center gap-1 group">
            Take Action <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
      {/* Abstract Background Texture */}
      <div className="absolute -right-4 -bottom-4 opacity-10">
        <span className="material-symbols-outlined text-[160px]" style={{ fontVariationSettings: "'wght' 700" }}>psychology</span>
      </div>
    </div>
  );
}
