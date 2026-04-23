import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lightbulb, Search, Bell, Settings, Menu, X } from 'lucide-react';

/**
 * scrollToSection - Smooth-scrolls to a DOM element by its ID.
 * Used instead of raw <a href="#id"> to avoid full-page reloads in React SPA.
 */
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Navbar({ user, loading }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const launchHref = user ? '/dashboard' : '/login';

  const goToRoleAwareRoute = (signedInHref) => {
    navigate(user ? signedInHref : '/login');
  };

  // Scroll + close mobile menu in one action
  const handleNavClick = useCallback((sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav className="relative z-50 border-b border-[#243041]/6 bg-[#f8f6f1]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#26466f] text-white shadow-[0_18px_35px_rgba(38,70,111,0.18)]">
                <Lightbulb size={18} />
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-[-0.04em] text-[#243041]">IdeaForge</h1>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#6b7280]">Operations Intelligence</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-5 md:flex">
              <button onClick={() => scrollToSection('top')} className="border-b-2 border-[#26466f] pb-1 text-sm font-semibold text-[#26466f]">
                Home
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-[#667085] transition hover:text-[#243041]">
                Modules
              </button>
              <button onClick={() => scrollToSection('suite')} className="text-sm text-[#667085] transition hover:text-[#243041]">
                Suite
              </button>
              {!user && (
                <button onClick={() => scrollToSection('pricing')} className="text-sm text-[#667085] transition hover:text-[#243041]">
                  Pricing
                </button>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => goToRoleAwareRoute('/management')}
              className="hidden items-center gap-2 rounded-full border border-[#243041]/6 bg-white/80 px-3 py-2 text-sm text-[#667085] shadow-[0_10px_24px_rgba(36,48,65,0.05)] transition hover:bg-white lg:flex"
            >
              <Search size={14} />
              <span>Search teams, ideas, or ops...</span>
            </button>
            <button
              onClick={() => goToRoleAwareRoute('/management/email')}
              className="rounded-full p-2 text-[#26466f] transition hover:bg-white/80"
            >
              <Bell size={16} />
            </button>
            <button
              onClick={() => goToRoleAwareRoute('/management/teams')}
              className="rounded-full p-2 text-[#26466f] transition hover:bg-white/80"
            >
              <Settings size={16} />
            </button>
            {loading ? (
              <div className="h-10 w-32 animate-pulse rounded-full bg-[#e3e7ee]" />
            ) : (
              <Link
                to={launchHref}
                className="inline-flex items-center justify-center rounded-full bg-[#26466f] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(38,70,111,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1f3b61]"
              >
                {user ? 'Launch Workspace' : 'Login'}
              </Link>
            )}
          </div>

          <button
            className="rounded-full p-2 text-[#667085] transition hover:bg-white/80 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="relative z-50 border-b border-[#243041]/6 bg-[#f8f6f1] px-6 py-4 md:hidden">
          <div className="space-y-3 rounded-[1.5rem] border border-[#243041]/6 bg-white/80 p-4 shadow-[0_18px_40px_rgba(36,48,65,0.06)]">
            <button onClick={() => handleNavClick('top')} className="block text-sm font-medium text-[#667085]">Home</button>
            <button onClick={() => handleNavClick('how-it-works')} className="block text-sm font-medium text-[#667085]">Modules</button>
            <button onClick={() => handleNavClick('suite')} className="block text-sm font-medium text-[#667085]">Suite</button>
            {!user && <button onClick={() => handleNavClick('pricing')} className="block text-sm font-medium text-[#667085]">Pricing</button>}
          </div>
          <Link
            to={launchHref}
            className="mt-4 block w-full rounded-full bg-[#26466f] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_32px_rgba(38,70,111,0.18)]"
          >
            {user ? 'Go to Dashboard' : 'Get Started Free'}
          </Link>
        </div>
      )}
    </>
  );
}
