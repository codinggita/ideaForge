import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function ProtectedRoute({ allowedRoles }) {
  const { userInfo, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-sm font-medium text-slate-500">
        Loading workspace...
      </div>
    );
  }

  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
