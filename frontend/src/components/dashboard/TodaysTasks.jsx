import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Modal from '../common/Modal';
import CreateTaskForm from '../forms/CreateTaskForm';
import { listenForDataChanged } from '../../appEvents';

export default function TodaysTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchTasks() {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/tasks');
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
    return listenForDataChanged((event) => {
      if (!event.detail?.type || event.detail.type === 'task') {
        fetchTasks();
      }
    });
  }, []);

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

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchTasks();
  };

  return (
    <>
      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(2,36,72,0.03)]">
        <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
          <h4 className="text-sm font-bold text-primary tracking-tight">Today's Tasks</h4>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="p-1.5 bg-secondary/5 hover:bg-secondary/10 text-secondary rounded-lg transition-colors"
              title="Create New Task"
            >
              <Plus className="w-4 h-4" />
            </button>
            <Link to="/tasks" className="text-xs font-bold text-secondary uppercase tracking-widest">View All</Link>
          </div>
        </div>
        <div className="p-2 divide-y divide-slate-50 flex-1">
          {loading ? (
            <div className="p-4 text-center text-sm text-slate-500">Loading tasks...</div>
          ) : error ? (
            <div className="p-4 text-center text-sm text-red-500">{error}</div>
          ) : tasks.length === 0 ? (
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <p className="text-sm text-slate-500 mb-3">You have no tasks today! Relax or create one.</p>
              <button 
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-secondary bg-[#fff3ec] hover:bg-[#ffe4d1] px-4 py-2 rounded-lg transition-colors"
              >
                Add a new task
              </button>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task._id} 
                className={`flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-colors ${task.isCompleted ? 'opacity-60' : ''}`}
              >
                <input 
                  className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary/20 cursor-pointer" 
                  type="checkbox" 
                  checked={task.isCompleted}
                  onChange={() => toggleTaskStatus(task)}
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium text-primary ${task.isCompleted ? 'line-through text-slate-500' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    {task.isCompleted ? (
                      <span className="text-[10px] text-on-surface-variant font-medium">Done</span>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Task</span>
                        {task.dueDate && (
                          <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">schedule</span> 
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

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
    </>
  );
}
