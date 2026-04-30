import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, Plus, CheckCircle2, Circle, Clock } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      setProject(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Project not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`/api/tasks?project=${id}`);
      setTasks(data);
    } catch (err) {
      // silent
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setAddingTask(true);
    try {
      await axios.post('/api/tasks', {
        title: newTaskTitle,
        project: id,
        team: project?.team || undefined,
      });
      setNewTaskTitle('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setAddingTask(false);
    }
  };

  const toggleTask = async (task) => {
    try {
      setTasks(tasks.map((t) => (t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t)));
      await axios.put(`/api/tasks/${task._id}`, { isCompleted: !task.isCompleted });
    } catch (err) {
      fetchTasks();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'Active': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !project) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error || 'Project not found'}</div>
        </div>
      </DashboardLayout>
    );
  }

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        {/* Back + Header */}
        <div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary tracking-tight">{project.title}</h1>
              <p className="text-sm text-slate-500 mt-1">{project.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase px-3 py-1 rounded-lg border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className={`text-xs font-bold uppercase px-3 py-1 rounded-lg border ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-primary">Progress</span>
            <span className="text-sm font-bold text-primary">{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#0B61A1] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{completedCount} of {tasks.length} tasks completed</p>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]">
            <h3 className="text-sm font-bold text-primary">Tasks ({tasks.length})</h3>
          </div>

          {/* Quick Add Task */}
          <form onSubmit={handleAddTask} className="px-6 py-3 border-b border-slate-100 flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={addingTask || !newTaskTitle.trim()}
              className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-[#2c4567] transition-colors flex items-center gap-2 disabled:opacity-50 shrink-0"
            >
              {addingTask ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </form>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto p-6">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <CheckCircle2 className="w-10 h-10 mb-3 text-slate-200" />
                <p className="text-sm">No tasks yet. Add one above!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                      task.isCompleted
                        ? 'bg-slate-50 border-slate-100'
                        : 'bg-white border-slate-200 hover:border-secondary/30 hover:shadow-sm'
                    }`}
                  >
                    <button onClick={() => toggleTask(task)} className={`shrink-0 transition-colors ${task.isCompleted ? 'text-green-500' : 'text-slate-300 hover:text-secondary'}`}>
                      {task.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <p className={`text-sm flex-1 truncate ${task.isCompleted ? 'line-through text-slate-400' : 'text-primary font-medium'}`}>
                      {task.title}
                    </p>
                    {task.assignedTo && (
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-500 uppercase shrink-0" title={task.assignedTo.name}>
                        {task.assignedTo.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                        <Clock className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
