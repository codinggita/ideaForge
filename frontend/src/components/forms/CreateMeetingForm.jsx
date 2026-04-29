import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function CreateMeetingForm({ onSuccess, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTimeStr, setStartTimeStr] = useState('');
  const [endTimeStr, setEndTimeStr] = useState('');
  const [type, setType] = useState('Internal Sync');
  const [meetingLink, setMeetingLink] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !date || !startTimeStr || !endTimeStr) return;

    setIsLoading(true);
    setError(null);

    try {
      // Construct Date objects from date + time strings
      const startDateTime = new Date(`${date}T${startTimeStr}`);
      const endDateTime = new Date(`${date}T${endTimeStr}`);

      if (endDateTime <= startDateTime) {
        throw new Error('End time must be after start time');
      }

      await axios.post('/api/meetings', {
        title,
        description,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        type,
        meetingLink: meetingLink || undefined
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to schedule meeting');
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
        <label className="block text-sm font-medium text-[#243041] mb-1">Meeting Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Client Sync: Fintech Corp"
          className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#243041] mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#243041] mb-1">Start Time</label>
          <input
            type="time"
            value={startTimeStr}
            onChange={(e) => setStartTimeStr(e.target.value)}
            className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#243041] mb-1">End Time</label>
          <input
            type="time"
            value={endTimeStr}
            onChange={(e) => setEndTimeStr(e.target.value)}
            className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#243041] mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 appearance-none"
          >
            <option value="Internal Sync">Internal Sync</option>
            <option value="Client Meeting">Client Meeting</option>
            <option value="Review">Review</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#243041] mb-1">Meeting Link (Optional)</label>
          <input
            type="url"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="e.g. https://zoom.us/j/..."
            className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#243041] mb-1">Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Agenda or notes..."
          rows={2}
          className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
        />
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
          disabled={isLoading || !title.trim() || !date || !startTimeStr || !endTimeStr}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-[0_8px_16px_rgba(37,99,235,0.15)] hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Schedule Meeting
        </button>
      </div>
    </form>
  );
}
