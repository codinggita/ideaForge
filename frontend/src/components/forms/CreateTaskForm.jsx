import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function CreateTaskForm({ onSuccess, onCancel, defaultTeam }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [teamId, setTeamId] = useState(defaultTeam || '');
  const [assignedTo, setAssignedTo] = useState('');
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/teams').then(({ data }) => setTeams(data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (teamId) {
      const selectedTeam = teams.find((t) => t._id === teamId);
      setTeamMembers(selectedTeam?.members || []);
    } else {
      setTeamMembers([]);
      setAssignedTo('');
    }
  }, [teamId, teams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await axios.post('/api/tasks', {
        title,
        dueDate: dueDate || undefined,
        team: teamId || undefined,
        assignedTo: assignedTo || undefined,
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#243041] mb-1">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Review Financial Projections"
          className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#243041] mb-1">Due Date (Optional)</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#243041] mb-1">Team (optional)</label>
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 appearance-none"
          >
            <option value="">Personal</option>
            {teams.map((t) => (
              <option key={t._id} value={t._id}>{t.name}</option>
            ))}
          </select>
        </div>

        {teamId && teamMembers.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[#243041] mb-1">Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 appearance-none"
            >
              <option value="">Unassigned</option>
              {teamMembers.map((m) => (
                <option key={m.user?._id || m.user} value={m.user?._id || m.user}>
                  {m.user?.name || 'User'}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-medium text-[#64748b] hover:text-[#243041] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-secondary rounded-xl shadow-[0_8px_16px_rgba(255,107,0,0.15)] hover:bg-[#e66000] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Add Task
        </button>
      </div>
    </form>
  );
}
