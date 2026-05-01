import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { CreditCard, Loader2 } from 'lucide-react';
import { pricingPlans } from '../../utils';

export default function BillingPanel() {
  const [usage, setUsage] = useState({
    projectsCount: 0,
    totalTasks: 0,
    teamCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBillingSnapshot = async () => {
      try {
        const [{ data: stats }, { data: teams }] = await Promise.all([
          axios.get('/api/dashboard/stats'),
          axios.get('/api/teams'),
        ]);

        setUsage({
          projectsCount: stats.projectsCount || 0,
          totalTasks: stats.totalTasks || 0,
          teamCount: teams.length || 0,
        });
      } catch (err) {
        setError('Could not load workspace usage.');
      } finally {
        setLoading(false);
      }
    };

    fetchBillingSnapshot();
  }, []);

  const recommendedPlan = useMemo(() => {
    if (usage.teamCount >= 8 || usage.projectsCount >= 20) return 'scale';
    if (usage.teamCount >= 3 || usage.projectsCount >= 8) return 'growth';
    return 'starter';
  }, [usage]);

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center justify-center text-primary shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">Billing & Plans</h2>
            <p className="text-sm text-slate-500 mt-1">
              This workspace is ready for the Stripe phase. For now, you can review live usage and the plan structure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {loading ? (
            <div className="md:col-span-3 rounded-2xl border border-slate-100 bg-white p-6 flex items-center gap-3 text-slate-500 shadow-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading workspace usage
            </div>
          ) : error ? (
            <div className="md:col-span-3 rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-red-600">
              {error}
            </div>
          ) : (
            <>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Projects</p>
                <p className="text-3xl font-bold text-primary mt-2">{usage.projectsCount}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Tasks</p>
                <p className="text-3xl font-bold text-primary mt-2">{usage.totalTasks}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Teams</p>
                <p className="text-3xl font-bold text-primary mt-2">{usage.teamCount}</p>
              </div>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 mb-6">
          <p className="text-sm font-semibold text-primary">Production recommendation</p>
          <p className="text-sm text-slate-500 mt-2">
            Based on current usage, the <span className="font-semibold text-primary capitalize">{recommendedPlan}</span>{' '}
            plan would be the cleanest starting point once checkout is connected.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {pricingPlans.map((plan) => {
            const isRecommended = plan.id === recommendedPlan;

            return (
              <div
                key={plan.id}
                className={`rounded-[1.75rem] border p-6 shadow-sm ${
                  isRecommended
                    ? 'border-primary bg-white shadow-[0_18px_36px_rgba(36,48,65,0.08)]'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                  </div>
                  {isRecommended && (
                    <span className="rounded-full bg-primary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-bold tracking-tight text-primary">{plan.priceMonthly}</p>
                  <p className="text-sm text-slate-500 mt-1">per month</p>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="text-sm text-slate-600">
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-8 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
                  disabled
                >
                  Stripe checkout next phase
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
