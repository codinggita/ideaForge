import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Loader2, Users } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Modal from '../components/common/Modal';
import TeamCard from '../components/teams/TeamCard';
import TeamDetailPanel from '../components/teams/TeamDetailPanel';
import CreateTeamForm from '../components/teams/CreateTeamForm';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/teams');
      setTeams(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    fetchTeams();
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleTeamUpdated = (updatedTeam) => {
    setSelectedTeam(updatedTeam);
    setTeams(teams.map((t) => (t._id === updatedTeam._id ? updatedTeam : t)));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Team Management</h1>
            <p className="text-sm text-slate-500 mt-1">Create teams and collaborate with your colleagues</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-[0_8px_16px_rgba(53,82,125,0.15)] hover:bg-[#2c4567] transition-all"
          >
            <Plus className="w-4 h-4" />
            New Team
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center flex-1 min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>
        ) : teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] text-slate-500 space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-slate-300" />
            </div>
            <div className="text-center">
              <p className="font-medium text-primary">No teams yet</p>
              <p className="text-sm text-slate-400 mt-1">Create your first team to start collaborating</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-secondary rounded-xl shadow-[0_8px_16px_rgba(255,107,0,0.15)] hover:bg-[#e66000] transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Team
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teams.map((team) => (
              <TeamCard key={team._id} team={team} onClick={handleTeamClick} />
            ))}
          </div>
        )}
      </div>

      {/* Create Team Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Team">
        <CreateTeamForm onSuccess={handleCreateSuccess} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      {/* Team Detail Side Panel */}
      {selectedTeam && (
        <TeamDetailPanel
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onTeamUpdated={handleTeamUpdated}
        />
      )}
    </DashboardLayout>
  );
}
