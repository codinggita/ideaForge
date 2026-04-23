import { productSuiteFeatures } from '../../utils';

export default function SuiteGrid() {
  return (
    <section id="suite" className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#98a2b3]">Product Suite</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#243041] md:text-4xl">
          The operating system for startup teams.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#667085]">
          Use IdeaForge to manage people, tasks, finance, communication, and decision-making from one AI-assisted workspace.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productSuiteFeatures.map((feature, i) => (
          <div
            key={i}
            className="group rounded-[1.75rem] border border-[#243041]/6 bg-white/82 p-7 shadow-[0_18px_40px_rgba(36,48,65,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(36,48,65,0.08)]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf2f7] text-[#35527d] transition group-hover:bg-[#35527d] group-hover:text-white">
              <feature.icon size={20} />
            </div>
            <h4 className="text-lg font-semibold tracking-[-0.03em] text-[#243041]">{feature.title}</h4>
            <p className="mt-2 text-sm leading-7 text-[#667085]">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
