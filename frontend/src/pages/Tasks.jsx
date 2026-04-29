import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Loader2, CheckCircle2, Circle, Clock, Filter, ArrowUpDown } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Modal from '../components/common/Modal';
import CreateTaskForm from '../components/forms/CreateTaskForm';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/tasks');
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-secondary rounded-xl shadow-[0_8px_16px_rgba(255,107,0,0.15)] hover:bg-[#e66000] transition-all"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center bg-[#f8fafc]">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">All Tasks</span>
              <span className="px-3 py-1.5 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors text-slate-500">Incomplete</span>
              <span className="px-3 py-1.5 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors text-slate-500">Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                <ArrowUpDown className="w-4 h-4" /> Sort
              </button>
            </div>
          </div>

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
                  <div 
                    key={task._id} 
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                      task.isCompleted 
                        ? 'bg-slate-50 border-slate-100' 
                        : 'bg-white border-slate-200 hover:border-secondary/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <button 
                        onClick={() => toggleTaskStatus(task)}
                        className={`shrink-0 transition-colors ${task.isCompleted ? 'text-green-500' : 'text-slate-300 hover:text-secondary'}`}
                      >
                        {task.isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${task.isCompleted ? 'line-through text-slate-400' : 'text-primary'}`}>
                          {task.title}
                        </p>
                        {task.project && (
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">Project: {task.project.title}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 ml-4 shrink-0">
                      {task.dueDate && (
                        <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${
                          task.isCompleted ? 'text-slate-400 bg-slate-100/50' : 'text-secondary bg-secondary/5'
                        }`}>
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </div>
                      )}
                    </div>
                  </div>
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
        />
      </Modal>
    </DashboardLayout>
  );
}
