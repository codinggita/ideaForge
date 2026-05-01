import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import RouteSEO from './components/common/RouteSEO';
import usePageTracking from './hooks/usePageTracking';

const LandingPage = lazy(() => import('./pages/Landing'));
const LoginPage = lazy(() => import('./pages/Login'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const CalendarPage = lazy(() => import('./pages/Calendar'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const TasksPage = lazy(() => import('./pages/Tasks'));
const SettingsPage = lazy(() => import('./pages/Settings'));
const TeamsPage = lazy(() => import('./pages/Teams'));
const ReportsPage = lazy(() => import('./pages/Reports'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetail'));

function AppRoutes() {
  usePageTracking();

  return (
    <>
      <RouteSEO />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-sm font-medium text-slate-500">
            Loading IdeaForge...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
