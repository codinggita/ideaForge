import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Shield, ArrowRight } from 'lucide-react';

export default function PricingSection({ plans }) {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [selectedPlanId, setSelectedPlanId] = useState(plans[1]?.id || plans[0]?.id || '');

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) || plans[0],
    [plans, selectedPlanId],
  );

  if (!plans.length || !selectedPlan) {
    return null;
  }

  function continueToBilling() {
    navigate(`/login?message=Selected ${selectedPlan.name}. Sign in to continue billing setup.`);
  }

  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
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

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-3">
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
              {selectedPlan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#dbe4f2] text-[#35527d]">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm leading-6 text-white/78">{feature}</span>
                </div>
              ))}
            </div>

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
