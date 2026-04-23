import { Star } from 'lucide-react';
import { testimonialsData } from '../../utils';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#98a2b3]">Testimonials</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#243041] md:text-4xl">
          Built for teams that need clarity
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonialsData.map((t, i) => (
          <div key={i} className="rounded-[1.75rem] border border-[#243041]/6 bg-white/82 p-6 shadow-[0_18px_40px_rgba(36,48,65,0.05)]">
            <div className="mb-4 flex items-center gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} className="fill-[#d8aa51] text-[#d8aa51]" />
              ))}
            </div>
            <p className="mb-4 text-sm leading-7 text-[#526071]">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#26466f] text-xs font-bold text-white">
                {t.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#243041]">{t.name}</p>
                <p className="text-xs text-[#98a2b3]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
