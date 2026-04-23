import { Brain, Sparkles } from 'lucide-react';

export default function ModulesSection() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
      <div className="grid auto-rows-[240px] grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#dce4e8] p-8 lg:col-span-2">
          <div className="absolute inset-x-0 top-8 text-center">
            <p className="text-4xl font-semibold tracking-[-0.06em] text-white/60 md:text-5xl">OPS VIEW</p>
            <p className="text-xl font-semibold uppercase tracking-[0.24em] text-white/55">Preview</p>
          </div>
          <div className="relative mt-auto flex h-full flex-col justify-end">
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#243041]">Command Centre for Work</h3>
            <p className="mt-2 max-w-sm text-sm leading-7 text-[#667085]">
              See how execution, communication, finance, and idea health move together across your workspace.
            </p>
          </div>
          <div className="absolute bottom-6 left-6 h-16 w-40 rounded-full bg-white/45 blur-xl" />
        </div>

        <div className="flex flex-col justify-between rounded-[2rem] bg-[#4f6997] p-8 text-white shadow-[0_22px_48px_rgba(79,105,151,0.18)]">
          <Brain size={28} className="text-white/90" />
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.04em]">AI Role Routing</h3>
            <p className="mt-2 text-sm leading-7 text-white/76">
              Owners, managers, and members each get the right view, actions, and context.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#dfe9ec] p-8">
          <Sparkles size={20} className="text-[#4f6997]" />
          <div className="mt-16">
            <h3 className="text-xl font-semibold tracking-[-0.04em] text-[#243041]">Idea Evaluator</h3>
            <p className="mt-2 text-sm leading-7 text-[#667085]">
              Keep idea validation as one powerful module feeding the rest of the product.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8 rounded-[2rem] border border-[#243041]/6 bg-[#fbfaf7] p-8 lg:col-span-2">
          <div className="max-w-lg">
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#243041]">Operations Architecture</h3>
            <p className="mt-3 text-sm leading-7 text-[#667085]">
              Build a workspace where ideas become projects, teams get managers, and work stays visible from strategy to execution.
            </p>
          </div>
          <div className="hidden h-32 w-32 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(79,105,151,0.08),rgba(174,197,206,0.28))] md:block" />
        </div>
      </div>
    </section>
  );
}
