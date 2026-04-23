import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Footer({ user }) {
  const launchHref = user ? '/dashboard' : '/login';

  return (
    <>
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center md:px-10">
        <div className="rounded-[2.5rem] border border-[#26466f]/10 bg-[linear-gradient(135deg,rgba(79,105,151,0.1),rgba(220,228,232,0.65))] p-10 shadow-[0_24px_60px_rgba(36,48,65,0.07)] md:p-14">
          <h3 className="text-3xl font-semibold tracking-[-0.05em] text-[#243041] md:text-4xl">
            Ready to run your team with more clarity?
          </h3>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-base leading-8 text-[#667085]">
            Join teams using IdeaForge to validate ideas, manage operations, and move from decision to execution without the chaos.
          </p>
          <Link
            to={launchHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#26466f] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_34px_rgba(38,70,111,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1f3b61]"
          >
            Get Started Free <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#243041]/6 bg-[#eef2f4]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-start md:justify-between md:px-10">
          <div className="max-w-xs">
            <p className="text-lg font-semibold tracking-[-0.04em] text-[#243041]">IdeaForge</p>
            <p className="mt-4 text-sm leading-7 text-[#667085]">
              The AI-first operations and management workspace for modern startup teams.
            </p>
            <p className="mt-8 text-xs text-[#98a2b3]">© 2026 IdeaForge Intelligence. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="font-semibold text-[#243041]">Product</p>
              <div className="mt-4 space-y-3 text-[#667085]">
                <a href="#how-it-works" className="block transition hover:text-[#243041]">Modules</a>
                <a href="#suite" className="block transition hover:text-[#243041]">Suite</a>
                {!user ? (
                  <a href="#pricing" className="block transition hover:text-[#243041]">Pricing</a>
                ) : (
                  <Link to="/dashboard" className="block transition hover:text-[#243041]">Dashboard</Link>
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#243041]">Company</p>
              <div className="mt-4 space-y-3 text-[#667085]">
                <a href="#features" className="block transition hover:text-[#243041]">About</a>
                <Link to="/privacy" className="block transition hover:text-[#243041]">Privacy</Link>
                <Link to="/terms" className="block transition hover:text-[#243041]">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
