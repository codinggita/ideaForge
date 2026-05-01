import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';

const seoByRoute = {
  '/': {
    title: 'IdeaForge | MERN SaaS for Startup Operations',
    description: 'Plan projects, manage tasks, collaborate with teams, and track execution in a polished MERN SaaS platform.',
  },
  '/login': {
    title: 'Login | IdeaForge',
    description: 'Sign in to IdeaForge using email/password or Google OAuth.',
  },
  '/dashboard': {
    title: 'Dashboard | IdeaForge',
    description: 'View live project stats, tasks, meetings, emails, notifications, and AI-style daily briefing.',
  },
  '/projects': {
    title: 'Projects | IdeaForge',
    description: 'Manage personal and team projects through planning, active, and completed stages.',
  },
  '/tasks': {
    title: 'Tasks & Ideas | IdeaForge',
    description: 'Capture ideas, assign tasks, and track execution with optimistic updates.',
  },
  '/calendar': {
    title: 'Calendar & Meetings | IdeaForge',
    description: 'Review Google Calendar events and locally scheduled meetings from one workspace.',
  },
  '/teams': {
    title: 'Teams | IdeaForge',
    description: 'Create teams, invite members, assign roles, and collaborate securely.',
  },
  '/reports': {
    title: 'Reports | IdeaForge',
    description: 'Analyze project and task performance with custom canvas charts and workspace metrics.',
  },
  '/settings': {
    title: 'Settings | IdeaForge',
    description: 'Manage profile, security, notifications, billing readiness, and preferences.',
  },
};

export default function RouteSEO() {
  const location = useLocation();
  const routeKey = Object.keys(seoByRoute)
    .filter((path) => location.pathname === path || location.pathname.startsWith(`${path}/`))
    .sort((a, b) => b.length - a.length)[0];

  const config = seoByRoute[routeKey] || seoByRoute['/'];
  return <SEO {...config} path={location.pathname} />;
}
