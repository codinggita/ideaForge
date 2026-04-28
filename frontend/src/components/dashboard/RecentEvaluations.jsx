import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RecentEvaluations() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects');
        setProjects(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-50 text-green-700';
      case 'Active': return 'bg-blue-50 text-blue-700';
      case 'Planning': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (priority) => {
    switch (priority) {
      case 'High': return { icon: 'warning', bg: 'bg-red-50', text: 'text-red-400' };
      case 'Medium': return { icon: 'inventory_2', bg: 'bg-blue-50', text: 'text-secondary' };
      case 'Low': return { icon: 'schedule', bg: 'bg-slate-100', text: 'text-slate-500' };
      default: return { icon: 'inventory_2', bg: 'bg-slate-100', text: 'text-slate-500' };
    }
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(2,36,72,0.03)]">
      <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
        <h4 className="text-sm font-bold text-primary tracking-tight">Recent Projects</h4>
        <button className="text-xs font-bold text-secondary uppercase tracking-widest">View All</button>
      </div>
      <div className="divide-y divide-slate-50">
        {loading ? (
          <div className="p-6 text-center text-sm text-slate-500">Loading projects...</div>
        ) : error ? (
          <div className="p-6 text-center text-sm text-red-500">{error}</div>
        ) : projects.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">No projects found. Create one to get started!</div>
        ) : (
          projects.slice(0, 5).map((project) => {
            const iconData = getIcon(project.priority);
            
            return (
              <div key={project._id} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconData.bg}`}>
                    <span className={`material-symbols-outlined text-xl ${iconData.text}`}>{iconData.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{project.title}</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`px-2 py-1 text-[11px] font-bold rounded-md ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <Link to={`/projects/${project._id}`} className="text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity">View</Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
