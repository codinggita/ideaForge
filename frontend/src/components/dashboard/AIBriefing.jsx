import React from 'react';

export default function AIBriefing() {
  return (
    <div className="bg-primary-container text-white rounded-xl p-6 relative overflow-hidden shadow-xl border-l-[6px] border-secondary">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container">AI Intelligence Briefing</span>
        </div>
        <p className="text-lg font-medium leading-snug">
          You have <span className="text-secondary-container font-bold underline underline-offset-4 decoration-2">3 meetings today</span>, 2 urgent emails from partners, and 1 overdue task from yesterday.
        </p>
        <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-[10px] text-on-primary-container font-medium">Last updated: 09:12 AM</span>
          <button className="text-xs font-bold text-secondary-container flex items-center gap-1 group">
            Take Action <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
      {/* Abstract Background Texture */}
      <div className="absolute -right-4 -bottom-4 opacity-10">
        <span className="material-symbols-outlined text-[160px]" style={{ fontVariationSettings: "'wght' 700" }}>psychology</span>
      </div>
    </div>
  );
}
