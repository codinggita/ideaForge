import { coreFlowSteps } from '../../utils';

export default function CoreFlow() {
  return (
    <section id="how-it-works" className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#98a2b3]">Core Flow</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#243041] md:text-4xl">
          Three steps from strategy to execution.
        </h3>
      </div>

      <div className="space-y-8">
        {coreFlowSteps.map((item, i) => (
          <div key={i} className="group flex items-start gap-6 rounded-[1.75rem] border border-[#243041]/6 bg-white/76 p-6 shadow-[0_16px_36px_rgba(36,48,65,0.04)]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf2f7] text-lg font-semibold text-[#35527d] transition group-hover:bg-[#35527d] group-hover:text-white">
              {item.step}
            </div>
            <div>
              <h4 className="text-xl font-semibold tracking-[-0.03em] text-[#243041]">{item.title}</h4>
              <p className="mt-2 leading-7 text-[#667085]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
