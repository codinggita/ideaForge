import { Users, BarChart3, Brain, Shield, Zap, Globe } from 'lucide-react';

// ==========================================
// LANDING PAGE STATIC DATA
// ==========================================

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Essential operations for early teams.",
    priceMonthly: "$29",
    priceYearly: "$24",
    ctaLabel: "Start with Starter",
    featuresLabel: "Starter Features",
    features: ["2 members", "4 AI evaluations/mo", "Basic finance & tasks"],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Shared collaboration and team execution.",
    priceMonthly: "$79",
    priceYearly: "$64",
    badge: "Popular",
    ctaLabel: "Upgrade to Growth",
    featuresLabel: "Growth Features",
    features: ["5 members", "12 AI evaluations/mo", "2 Gmail accounts"],
  },
  {
    id: "scale",
    name: "Scale",
    description: "Full command centre capability.",
    priceMonthly: "$199",
    priceYearly: "$164",
    ctaLabel: "Scale your team",
    featuresLabel: "Scale Features",
    features: ["15 members", "60 AI evaluations/mo", "Full AI Command Centre"],
  }
];

export const examplePrompts = [
  'Assign launch sprint',
  'Validate hostel SaaS',
  'Create ops dashboard',
];

export const promptCopy = {
  'Assign launch sprint': 'Launch a design team, assign a sprint owner, validate the pricing model, and draft kickoff tasks for our new product idea...',
  'Validate hostel SaaS': 'Evaluate a hostel SaaS concept, compare the pricing strategy, and build the first-week execution checklist for the launch team...',
  'Create ops dashboard': 'Build an operations dashboard, connect team execution signals, and surface the next blockers for managers and founders...',
};

export const kpiMetrics = [
  { count: "4,200+", label: "Ideas Evaluated" },
  { count: "15+", label: "Operations Signals" },
  { count: "Role-Based", label: "Team Workflows" }
];

export const productSuiteFeatures = [
  { icon: Users, title: 'Role-Based Dashboards', desc: 'Owners, managers, and members each get a dashboard aligned to their responsibilities.' },
  { icon: BarChart3, title: 'Operations Analytics', desc: 'Track execution, team signals, and workspace momentum through calmer dashboards.' },
  { icon: Brain, title: 'Idea Evaluation', desc: 'Validate business ideas with AI before pushing resources into the wrong direction.' },
  { icon: Shield, title: 'Finance Tracking', desc: 'Keep budgets, expenses, and operating visibility tied to real team activity.' },
  { icon: Zap, title: 'AI Command Centre', desc: 'Turn prompts into tasks, notes, meetings, and follow-up actions across the workspace.' },
  { icon: Globe, title: 'Research and Context', desc: 'Bring market signals and internal notes together so decisions stay grounded.' },
];

export const coreFlowSteps = [
  { step: '01', title: 'Create Your Workspace', desc: 'Set up your company context, define teams, and invite the people who will actually move the work.' },
  { step: '02', title: 'Validate and Plan', desc: 'Use idea evaluation, market context, and AI support to decide what deserves execution attention.' },
  { step: '03', title: 'Manage the Operation', desc: 'Run tasks, finance, notes, communication, and calendars through one role-aware operating layer.' },
];

export const testimonialsData = [
  { name: 'Arjun Mehta', role: 'Founder', quote: 'We stopped juggling five separate tools. IdeaForge gave us one place to validate decisions and run execution.' },
  { name: 'Priya Sharma', role: 'Operations Lead', quote: 'The role-based view is what made it click. Managers see what they need and members stay focused.' },
  { name: 'Rahul Gupta', role: 'Startup Advisor', quote: 'Idea evaluation is strong, but the real value is how it turns those insights into managed action.' },
];

