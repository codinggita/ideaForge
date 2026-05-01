import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('IdeaForge UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
          <div className="max-w-md rounded-2xl bg-white border border-slate-200 p-8 shadow-sm text-center">
            <h1 className="text-xl font-bold text-primary">Something went wrong</h1>
            <p className="text-sm text-slate-500 mt-2">
              Refresh the page or return to the dashboard to continue working.
            </p>
            <button
              type="button"
              onClick={() => window.location.assign('/dashboard')}
              className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
