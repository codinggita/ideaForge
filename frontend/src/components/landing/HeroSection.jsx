import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { examplePrompts, promptCopy, kpiMetrics } from '../../utils';

export default function HeroSection({ user }) {
  const [selectedPrompt, setSelectedPrompt] = useState(examplePrompts[0]);
  const launchHref = user ? '/dashboard' : '/login';

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#26466f]/10 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#5d6e8b] shadow-[0_12px_28px_rgba(36,48,65,0.05)]">
          <Sparkles size={14} className="text-[#26466f]" />
          AI-first workspace for ideas, operations, and team execution
        </div>

        <h2 className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-[#243041] md:text-6xl lg:text-7xl">
          Run your startup.
          <br />
          <span className="text-[#35527d]">Validate ideas, manage teams, and execute faster.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#667085] md:text-lg">
          IdeaForge is an AI-first management and operations platform where idea evaluation is a flagship module,
          not the whole story. Turn strategy into team execution with roles, tasks, finance, notes, communication,
          and calendar planning in one place.
        </p>

        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-[#243041]/6 bg-white/88 p-4 shadow-[0_30px_80px_rgba(36,48,65,0.08)] md:p-6">
          <div className="rounded-[1.5rem] bg-[#faf8f3] p-4 md:p-5">
            <div className="min-h-[140px] rounded-[1.25rem] bg-white px-4 py-4 text-left text-base leading-8 text-[#98a2b3] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] md:text-lg">
              {promptCopy[selectedPrompt]}
            </div>
            <div className="mt-4 flex flex-col gap-4 border-t border-[#243041]/6 pt-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((idea) => (
                  <button
                    key={idea}
                    type="button"
                    onClick={() => setSelectedPrompt(idea)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      selectedPrompt === idea
                        ? 'bg-[#26466f] text-white shadow-[0_10px_20px_rgba(38,70,111,0.18)]'
                        : 'bg-[#eef2f4] text-[#667085] hover:bg-[#e2e8ee]'
                    }`}
                  >
                    {idea}
                  </button>
                ))}
              </div>
              <Link
                to={launchHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#26466f] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(38,70,111,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1f3b61]"
              >
                Launch Workspace
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 text-left md:grid-cols-3">
          {kpiMetrics.map((kpi, idx) => (
            <div key={idx} className={`space-y-1 text-center md:text-left ${idx === 1 ? 'md:border-x md:border-[#243041]/8 md:px-8' : ''}`}>
              <p className="text-3xl font-semibold tracking-[-0.05em] text-[#243041]">{kpi.count}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#98a2b3]">{kpi.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
