import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Bell,
  Brain,
  Check,
  ChevronRight,
  Lightbulb,
  Menu,
  Search,
  Settings,
  Shield,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
// IMPORTING EXTRACTED DATA FROM ULIS.JS
import {
  pricingPlans,
  examplePrompts,
  promptCopy,
  kpiMetrics,
  productSuiteFeatures,
  coreFlowSteps,
  testimonialsData
} from '../ulis';

/**
 * LANDING PRICING SECTION
 * Modular component to display pricing options, supporting monthly and yearly toggles.
 */
function LandingPricingSection({ plans }) {
  const navigate = useNavigate();
  // State for toggling between "monthly" and "yearly" views
  const [billingCycle, setBillingCycle] = useState('yearly');
  // State for remembering the currently highlighted plan
  const [selectedPlanId, setSelectedPlanId] = useState(plans[1]?.id || plans[0]?.id || '');

  // Memoized plan selection for performance so it doesn't recalculate unless ID changes
  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) || plans[0],
    [plans, selectedPlanId],
  );

  // Fallback structure in case No plans are provided
  if (!plans.length || !selectedPlan) {
    return null;
  }

  // Redirect to Login component, carrying 'action intents' natively via param-state
  function continueToBilling() {
    navigate(`/login?message=Selected ${selectedPlan.name}. Sign in to continue billing setup.`);
  }

  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
      {/* Background Graphic Overlays for Glassmorphism Effects */}
      <div className="pointer-events-none absolute inset-x-10 top-10 -z-10 hidden h-[28rem] rounded-[3rem] border border-white/40 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.38),rgba(233,240,245,0.3))] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] md:block" />
      <div className="pointer-events-none absolute left-20 top-28 -z-10 hidden h-40 w-40 rounded-[2.5rem] border border-white/40 bg-white/25 shadow-[0_18px_40px_rgba(36,48,65,0.05)] backdrop-blur-sm lg:block" />
      <div className="pointer-events-none absolute right-16 top-36 -z-10 hidden h-52 w-52 rounded-[2.5rem] border border-white/40 bg-[linear-gradient(180deg,rgba(220,230,241,0.38),rgba(255,255,255,0.22))] shadow-[0_18px_40px_rgba(36,48,65,0.05)] backdrop-blur-sm lg:block" />

      <div className="relative">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl rounded-[2rem] border border-white/45 bg-white/45 px-6 py-6 shadow-[0_18px_50px_rgba(36,48,65,0.04)] backdrop-blur-sm md:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8ea0b3]">Pricing</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#243041] md:text-[2.7rem]">
              Pick a plan that grows with your workspace.
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-[#667085]">
              Start with a lean setup, upgrade when your team expands, and use one operating system for ideas, execution, and oversight.
            </p>
          </div>

          {/* Pricing Toggle Controls */}
          <div className="inline-flex items-center self-start rounded-full border border-white/55 bg-white/78 p-1 shadow-[0_14px_30px_rgba(36,48,65,0.06)] backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                billingCycle === 'monthly'
                  ? 'bg-[#35527d] text-white'
                  : 'text-[#718096] hover:text-[#243041]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                billingCycle === 'yearly'
                  ? 'bg-[#35527d] text-white'
                  : 'text-[#718096] hover:text-[#243041]'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Selection Body Grid */}
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-3">
            {/* Dynamic Rendering of Array from ulis.js */}
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const displayedPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

              return (
                <motion.button
                  key={plan.id}
                  layout
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`rounded-[1.5rem] border p-5 text-left backdrop-blur-sm transition ${
                    isSelected
                      ? 'border-[#35527d]/24 bg-white/92 shadow-[0_22px_44px_rgba(53,82,125,0.12)]'
                      : 'border-white/55 bg-white/62 shadow-[0_14px_34px_rgba(36,48,65,0.04)] hover:border-[#35527d]/18 hover:bg-white/82'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Tick Checkbox Representation for Activity Sync */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border transition ${
                          isSelected
                            ? 'border-[#35527d] bg-[#35527d] text-white'
                            : 'border-[#c9d4de] bg-white text-transparent'
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        {/* Name and Tag Display Component Blocks */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-lg font-semibold tracking-[-0.03em] text-[#243041]">{plan.name}</span>
                          {plan.badge ? (
                            <span className="rounded-full bg-[#e8eef7] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#35527d]">
                              {plan.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[#667085]">{plan.description}</p>
                      </div>
                    </div>

                    {/* Numeric Value Presentation Container */}
                    <div className="text-right">
                      <div className="text-[1.9rem] font-semibold tracking-[-0.05em] text-[#243041]">{displayedPrice}</div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#98a2b3]">
                        {billingCycle === 'yearly' ? 'billed yearly' : 'per workspace / month'}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Featured/Highlighted Active Right Pane */}
          <motion.div
            key={`${selectedPlan.id}-${billingCycle}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[1.8rem] border border-[#243041]/8 bg-[#243041] p-6 text-white shadow-[0_28px_64px_rgba(36,48,65,0.18)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/55">{selectedPlan.featuresLabel}</p>
                <h4 className="mt-2 text-[2.1rem] font-semibold tracking-[-0.05em]">{selectedPlan.name}</h4>
              </div>
              <div className="rounded-2xl bg-white/8 p-2.5">
                <Shield className="h-4.5 w-4.5 text-[#cfd8e4]" />
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/72">
              {selectedPlan.description}
            </p>

            <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
              <div className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/48">
                {billingCycle === 'yearly' ? 'Yearly billing' : 'Monthly billing'}
              </div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-[2.6rem] font-semibold tracking-[-0.06em]">
                  {billingCycle === 'monthly' ? selectedPlan.priceMonthly : selectedPlan.priceYearly}
                </span>
                <span className="pb-1 text-sm text-white/58">
                  {billingCycle === 'yearly' ? 'per workspace / year' : 'per workspace / month'}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Choose a plan now, then sign in and authorize the workspace plan instantly in demo mode.
              </p>
            </div>

            <div className="mt-5 space-y-2.5">
              {/* Mapping static feature constraints */}
              {selectedPlan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#dbe4f2] text-[#35527d]">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm leading-6 text-white/78">{feature}</span>
                </div>
              ))}
            </div>

            {/* Launch Application Logic tied to specific user intents */}
            <button
              onClick={continueToBilling}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#dce6f2] px-6 py-3 text-sm font-semibold text-[#243041] transition hover:-translate-y-0.5 hover:bg-white"
            >
              {selectedPlan.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-white/42">
              Billed per workspace. Upgrade when your team needs more control.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * MAIN LANDING COMPONENT (EXPORTED)
 * Holds Hero Headers, Nav Bars, Product Arrays Mapping, Testimonials Mapping.
 */
export default function LandingPage() {
  const navigate = useNavigate();
  // We keep mock user references. You would tie this to Auth Providers context (Supabase, Auth0, etc).
  const [user] = useState(null); 
  const [loading] = useState(false);
  
  // Toggles responsiveness
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handles the interactive Prompt demonstration in the Hero Section
  const [selectedPrompt, setSelectedPrompt] = useState(examplePrompts[0]);
  const launchHref = user ? '/dashboard' : '/login';

  // Helper routing function preventing unregistered traffic to core app
  const goToRoleAwareRoute = (signedInHref) => {
    navigate(user ? signedInHref : '/login');
  };

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#f6f3ee] text-[#243041]">
      {/* Background Graphic Visualizer - Kept absolute and ignored by dom flows via pointer-events-none */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,104,148,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(174,197,206,0.22),transparent_28%),linear-gradient(180deg,#fbfaf7_0%,#f3efe7_100%)]" />
        <div className="absolute right-[-6rem] top-[8rem] h-[22rem] w-[22rem] rounded-full bg-[#d7deec]/45 blur-3xl" />
        <div className="absolute left-[-8rem] top-[28rem] h-[24rem] w-[24rem] rounded-full bg-[#dbe6e8]/50 blur-3xl" />
      </div>

      {/* Primary Global Navigation Header Block */}
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

            {/* Desktop Desktop Links */}
            <div className="hidden items-center gap-5 md:flex">
              <a href="#top" className="border-b-2 border-[#26466f] pb-1 text-sm font-semibold text-[#26466f]">
                Home
              </a>
              <a href="#how-it-works" className="text-sm text-[#667085] transition hover:text-[#243041]">
                Modules
              </a>
              <a href="#suite" className="text-sm text-[#667085] transition hover:text-[#243041]">
                Suite
              </a>
              {!user && (
                <a href="#pricing" className="text-sm text-[#667085] transition hover:text-[#243041]">
                  Pricing
                </a>
              )}
            </div>
          </div>

          {/* Quick Action Commands (Search, Notifs, Settings, Launch) */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => goToRoleAwareRoute('/management')}
              className="hidden items-center gap-2 rounded-full border border-[#243041]/6 bg-white/80 px-3 py-2 text-sm text-[#667085] shadow-[0_10px_24px_rgba(36,48,65,0.05)] transition hover:bg-white lg:flex"
            >
              <Search size={14} />
              <span>Search teams, ideas, or ops...</span>
            </button>
            <button
              type="button"
              onClick={() => goToRoleAwareRoute('/management/email')}
              className="rounded-full p-2 text-[#26466f] transition hover:bg-white/80"
            >
              <Bell size={16} />
            </button>
            <button
              type="button"
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

      {/* Mobile Responsive Navigation Drawers */}
      {mobileMenuOpen && (
        <div className="relative z-50 border-b border-[#243041]/6 bg-[#f8f6f1] px-6 py-4 md:hidden">
          <div className="space-y-3 rounded-[1.5rem] border border-[#243041]/6 bg-white/80 p-4 shadow-[0_18px_40px_rgba(36,48,65,0.06)]">
            <a href="#top" className="block text-sm font-medium text-[#667085]">Home</a>
            <a href="#how-it-works" className="block text-sm font-medium text-[#667085]">Modules</a>
            <a href="#suite" className="block text-sm font-medium text-[#667085]">Suite</a>
            {!user && <a href="#pricing" className="block text-sm font-medium text-[#667085]">Pricing</a>}
          </div>
          {user ? (
            <Link
              to="/dashboard"
              className="mt-4 block w-full rounded-full bg-[#26466f] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_32px_rgba(38,70,111,0.18)]"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="mt-4 block w-full rounded-full bg-[#26466f] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_32px_rgba(38,70,111,0.18)]"
            >
              Get Started Free
            </Link>
          )}
        </div>
      )}

      {/* =========================================
          HERO OVERVIEW SECTION 
      ========================================= */}
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

          {/* Interactive AI Prompt Demonstration Box */}
          <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-[#243041]/6 bg-white/88 p-4 shadow-[0_30px_80px_rgba(36,48,65,0.08)] md:p-6">
            <div className="rounded-[1.5rem] bg-[#faf8f3] p-4 md:p-5">
              <div className="min-h-[140px] rounded-[1.25rem] bg-white px-4 py-4 text-left text-base leading-8 text-[#98a2b3] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] md:text-lg">
                {promptCopy[selectedPrompt]}
              </div>
              <div className="mt-4 flex flex-col gap-4 border-t border-[#243041]/6 pt-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {/* Maps prompts imported from ulis.js */}
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

          {/* Core Analytics Showcase Grid */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 text-left md:grid-cols-3">
            {/* Dynamic Rendering of Metric Displays from ulis.js */}
            {kpiMetrics.map((kpi, idx) => (
              <div key={idx} className={`space-y-1 text-center md:text-left ${idx === 1 ? 'md:border-x md:border-[#243041]/8 md:px-8' : ''}`}>
                <p className="text-3xl font-semibold tracking-[-0.05em] text-[#243041]">{kpi.count}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#98a2b3]">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          MODULES VISUALIZATION SECTION 
      ========================================= */}
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

      {/* =========================================
          SUITE FEATURES GRID SECTION 
      ========================================= */}
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

        {/* Dynamic Mapping from productSuiteFeatures directly referenced in ulis.js */}
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

      {/* =========================================
          CORE FLOW STEP-BY-STEP MAP 
      ========================================= */}
      <section id="how-it-works" className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#98a2b3]">Core Flow</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#243041] md:text-4xl">
            Three steps from strategy to execution.
          </h3>
        </div>

        <div className="space-y-8">
          {/* Renders instructions generated by marketing teams via ulis.js configurations */}
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

      {/* Renders Pricing Modals internally if the User has not validated tokens yet */}
      {!loading && !user && <LandingPricingSection plans={pricingPlans} />}

      {/* =========================================
          TESTIMONIAL GRID 
      ========================================= */}
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

      {/* =========================================
          FOOTER/FINAL CTA SECTION 
      ========================================= */}
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
    </div>
  );
}
