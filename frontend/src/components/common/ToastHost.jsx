import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../../store/slices/uiSlice';

export default function ToastHost() {
  const toast = useSelector((state) => state.ui.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => dispatch(clearToast()), 3200);
    return () => clearTimeout(timeout);
  }, [dispatch, toast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80] max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-2xl">
      <p className={`text-sm font-semibold ${toast.type === 'error' ? 'text-red-600' : 'text-primary'}`}>
        {toast.title}
      </p>
      {toast.message && <p className="text-xs text-slate-500 mt-1">{toast.message}</p>}
    </div>
  );
}
