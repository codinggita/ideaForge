import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Loader2, MoreVertical } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Modal from '../components/common/Modal';
import CreateProjectForm from '../components/forms/CreateProjectForm';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchProjects();
  };

  const planningProjects = projects.filter(p => p.status === 'Planning');
  const activeProjects = projects.filter(p => p.status === 'Active');
  const completedProjects = projects.filter(p => p.status === 'Completed');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-600 border-red-100';
      case 'Medium': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Low': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const Column = ({ title, items, colorClass }) => (
    <div className="flex flex-col bg-[#f8fafc] rounded-2xl border border-[#eef2f4] p-4 h-full min-h-[500px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-[#243041] flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
          {title}
          <span className="ml-2 bg-white text-xs font-medium text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
            {items.length}
          </span>
        </h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
        {items.map(project => (
          <div key={project._id} className="bg-white p-4 rounded-xl border border-[#eef2f4] shadow-sm hover:shadow-md transition-shadow cursor-grab">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wider ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
              <button className="text-slate-400 hover:text-primary transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-semibold text-primary text-sm mb-1">{project.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{project.description}</p>
            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                  U
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">schedule</span>
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
            Drop projects here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Project Management</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and track your operational initiatives</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-[0_8px_16px_rgba(53,82,125,0.15)] hover:bg-[#2c4567] transition-all"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center flex-1 min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
            <Column title="Planning" items={planningProjects} colorClass="bg-slate-400" />
            <Column title="Active" items={activeProjects} colorClass="bg-blue-500" />
            <Column title="Completed" items={completedProjects} colorClass="bg-green-500" />
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Project"
      >
        <CreateProjectForm 
          onSuccess={handleSuccess} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </DashboardLayout>
  );
}
