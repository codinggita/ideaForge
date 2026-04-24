import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentEvaluations() {
  return (
    <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(2,36,72,0.03)]">
      <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
        <h4 className="text-sm font-bold text-primary tracking-tight">Recent Evaluations</h4>
        <button className="text-xs font-bold text-secondary uppercase tracking-widest">View All</button>
      </div>
      <div className="divide-y divide-slate-50">
        {/* Item 1 */}
        <div className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-xl">rocket_launch</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Project Skyfall SaaS</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Oct 24, 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded-md">84/100</span>
            <Link to="#" className="text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity">View</Link>
          </div>
        </div>

        {/* Item 2 */}
        <div className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-500 text-xl">inventory_2</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">BioTech R&D Phase 2</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Oct 22, 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-md">62/100</span>
            <Link to="#" className="text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity">View</Link>
          </div>
        </div>

        {/* Item 3 */}
        <div className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-400 text-xl">warning</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Crypto Ledger Audit</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Oct 20, 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="px-2 py-1 bg-red-50 text-red-700 text-[11px] font-bold rounded-md">24/100</span>
            <Link to="#" className="text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity">View</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
