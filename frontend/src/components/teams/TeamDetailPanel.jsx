import React, { useState, useContext } from 'react';
import axios from 'axios';
import { X, UserPlus, Loader2, Crown, Shield, User, Trash2, ChevronDown } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function TeamDetailPanel({ team, onClose, onTeamUpdated }) {
  const { userInfo } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentUserMembership = team.members.find(
    (m) => String(m.user?._id || m.user) === String(userInfo?._id)
  );
  const isOwnerOrAdmin =
    currentUserMembership?.role === 'owner' || currentUserMembership?.role === 'admin';
  const isOwner = currentUserMembership?.role === 'owner';

  const handleAddMember = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.post(`/api/teams/${team._id}/members`, { email, role });
      setSuccess(`${email} added as ${role}!`);
      setEmail('');
      onTeamUpdated(data);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      const { data } = await axios.delete(`/api/teams/${team._id}/members/${userId}`);
      onTeamUpdated(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove member');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { data } = await axios.put(`/api/teams/${team._id}/members/${userId}`, { role: newRole });
      onTeamUpdated(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    }
  };

  const getRoleIcon = (r) => {
    switch (r) {
      case 'owner': return <Crown className="w-3.5 h-3.5 text-amber-500" />;
      case 'admin': return <Shield className="w-3.5 h-3.5 text-blue-500" />;
      default: return <User className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getRoleColor = (r) => {
    switch (r) {
      case 'owner': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'admin': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-5 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-primary">{team.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{team.description || 'No description'}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Member Form */}
        {isOwnerOrAdmin && (
          <div className="px-6 py-5 border-b border-slate-100 bg-[#f8fafc]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Add Member</h3>
            <form onSubmit={handleAddMember} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl border border-[#d8e0e8] bg-white px-3 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-xl border border-[#d8e0e8] bg-white px-3 py-2.5 text-sm text-[#243041] outline-none focus:border-primary cursor-pointer"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                disabled={adding}
                className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-[#2c4567] transition-colors flex items-center gap-2 disabled:opacity-60 shrink-0"
              >
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              </button>
            </form>

            {error && (
              <div className="mt-3 p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-3 p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-xs font-medium">
                {success}
              </div>
            )}
          </div>
        )}

        {/* Members List */}
        <div className="px-6 py-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Members ({team.members.length})
          </h3>
          <div className="space-y-2">
            {team.members.map((member) => {
              const memberId = member.user?._id || member.user;
              const memberName = member.user?.name || 'User';
              const memberEmail = member.user?.email || '';
              const memberJobTitle = member.user?.jobTitle || '';
              const isSelf = String(memberId) === String(userInfo?._id);

              return (
                <div
                  key={memberId}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 uppercase shrink-0">
                      {memberName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-primary truncate">
                        {memberName} {isSelf && <span className="text-xs text-slate-400">(You)</span>}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {memberJobTitle || memberEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {/* Role Badge / Dropdown */}
                    {isOwner && member.role !== 'owner' ? (
                      <div className="relative">
                        <select
                          value={member.role}
                          onChange={(e) => handleRoleChange(memberId, e.target.value)}
                          className={`appearance-none pl-2 pr-6 py-1 text-[11px] font-bold uppercase rounded-md border cursor-pointer ${getRoleColor(member.role)}`}
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                        <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>
                    ) : (
                      <span
                        className={`flex items-center gap-1 px-2 py-1 text-[11px] font-bold uppercase rounded-md border ${getRoleColor(member.role)}`}
                      >
                        {getRoleIcon(member.role)}
                        {member.role}
                      </span>
                    )}

                    {/* Remove button */}
                    {isOwnerOrAdmin && member.role !== 'owner' && !isSelf && (
                      <button
                        onClick={() => handleRemoveMember(memberId)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
