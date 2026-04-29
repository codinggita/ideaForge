import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Loader2 } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Modal from '../components/common/Modal';
import CreateProjectForm from '../components/forms/CreateProjectForm';
import ProjectColumn from '../components/projects/ProjectColumn';

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
            <ProjectColumn title="Planning" items={planningProjects} colorClass="bg-slate-400" />
            <ProjectColumn title="Active" items={activeProjects} colorClass="bg-blue-500" />
            <ProjectColumn title="Completed" items={completedProjects} colorClass="bg-green-500" />
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
