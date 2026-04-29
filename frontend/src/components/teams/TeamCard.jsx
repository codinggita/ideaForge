import React from 'react';
import { Users, Crown, Shield, User } from 'lucide-react';

export default function TeamCard({ team, onClick }) {
  const ownerMember = team.members.find((m) => m.role === 'owner');
  const ownerName = ownerMember?.user?.name || 'Unknown';

  const getRoleBadge = (role) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-3 h-3 text-amber-500" />;
      case 'admin':
        return <Shield className="w-3 h-3 text-blue-500" />;
      default:
        return <User className="w-3 h-3 text-slate-400" />;
    }
  };

  const memberCount = team.members.length;

  return (
    <div
      onClick={() => onClick(team)}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#0B61A1] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
          <Users className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md">
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </span>
      </div>

      <h3 className="font-bold text-primary text-base mb-1 truncate">{team.name}</h3>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{team.description || 'No description'}</p>

      <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.members.slice(0, 4).map((member, index) => (
            <div
              key={member.user?._id || index}
              className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase"
              title={member.user?.name || 'User'}
            >
              {member.user?.name ? member.user.name.charAt(0) : 'U'}
            </div>
          ))}
          {memberCount > 4 && (
            <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-400">
              +{memberCount - 4}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          {getRoleBadge('owner')}
          {ownerName}
        </div>
      </div>
    </div>
  );
}
