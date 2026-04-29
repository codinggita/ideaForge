import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Loader2, CheckCircle2, Users } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Modal from '../components/common/Modal';
import CreateTaskForm from '../components/forms/CreateTaskForm';
import TaskToolbar from '../components/tasks/TaskToolbar';
import TaskListItem from '../components/tasks/TaskListItem';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    axios.get('/api/teams').then(({ data }) => setTeams(data)).catch(() => {});
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedTeam]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const url = selectedTeam ? `/api/tasks?team=${selectedTeam}` : '/api/tasks';
      const { data } = await axios.get(url);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchTasks();
  };

  const toggleTaskStatus = async (task) => {
    try {
      // Optimistic UI update
      setTasks(tasks.map(t => 
        t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t
      ));
      
      await axios.put(`/api/tasks/${task._id}`, {
        isCompleted: !task.isCompleted
      });
    } catch (err) {
      console.error("Failed to update task", err);
      // Revert on failure
      fetchTasks(); 
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Tasks & Ideas</h1>
            <p className="text-sm text-slate-500 mt-1">Capture ideas and track your daily execution</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <Users className="w-4 h-4 text-slate-400" />
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="bg-transparent text-sm font-medium text-primary outline-none cursor-pointer"
              >
                <option value="">Personal</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-secondary rounded-xl shadow-[0_8px_16px_rgba(255,107,0,0.15)] hover:bg-[#e66000] transition-all"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
          <TaskToolbar />

          {/* Task List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-slate-300" />
                </div>
                <p>No tasks found. You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map(task => (
                  <TaskListItem key={task._id} task={task} toggleTaskStatus={toggleTaskStatus} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Task"
      >
        <CreateTaskForm 
          onSuccess={handleSuccess} 
          onCancel={() => setIsModalOpen(false)}
          defaultTeam={selectedTeam}
        />
      </Modal>
    </DashboardLayout>
  );
}
