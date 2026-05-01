import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

export default function CreateTeamForm({ onSuccess, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('/api/teams', { name, description });
      onSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Team Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Engineering Squad"
          required
          className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this team work on?"
          rows={3}
          className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition resize-none focus:border-primary focus:ring-1 focus:ring-primary/20"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 flex items-center gap-2 text-sm font-semibold text-white bg-primary rounded-xl shadow-[0_8px_16px_rgba(53,82,125,0.15)] hover:bg-[#2c4567] transition-colors disabled:opacity-60"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Create Team
        </button>
      </div>
    </form>
  );
}
