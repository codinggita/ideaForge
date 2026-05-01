import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import CreateProjectForm from '../forms/CreateProjectForm';
import CreateTaskForm from '../forms/CreateTaskForm';
import CreateMeetingForm from '../forms/CreateMeetingForm';
import CreateTeamForm from '../teams/CreateTeamForm';
import { emitDataChanged } from '../../appEvents';

const actions = [
  {
    id: 'task',
    title: 'New Task',
    description: 'Capture an action item without leaving the page.',
  },
  {
    id: 'project',
    title: 'New Project',
    description: 'Start a new initiative for yourself or a team.',
  },
  {
    id: 'meeting',
    title: 'New Meeting',
    description: 'Schedule a local meeting for your calendar.',
  },
  {
    id: 'team',
    title: 'New Team',
    description: 'Create a collaboration space for a new group.',
  },
];

export default function QuickActionModal({ isOpen, onClose, initialAction = 'task' }) {
  const [activeAction, setActiveAction] = useState(initialAction);

  useEffect(() => {
    if (isOpen) {
      setActiveAction(initialAction);
    }
  }, [initialAction, isOpen]);

  const handleSuccess = (type) => {
    emitDataChanged({ type });
    onClose();
  };

  const renderForm = () => {
    switch (activeAction) {
      case 'project':
        return (
          <CreateProjectForm
            onSuccess={() => handleSuccess('project')}
            onCancel={onClose}
          />
        );
      case 'team':
        return (
          <CreateTeamForm
            onSuccess={() => handleSuccess('team')}
            onCancel={onClose}
          />
        );
      case 'meeting':
        return (
          <CreateMeetingForm
            onSuccess={() => handleSuccess('meeting')}
            onCancel={onClose}
          />
        );
      case 'task':
      default:
        return (
          <CreateTaskForm
            onSuccess={() => handleSuccess('task')}
            onCancel={onClose}
          />
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Action" maxWidthClass="max-w-3xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {actions.map((action) => {
            const isActive = action.id === activeAction;

            return (
              <button
                key={action.id}
                type="button"
                onClick={() => setActiveAction(action.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? 'border-primary bg-primary text-white shadow-[0_16px_32px_rgba(36,48,65,0.16)]'
                    : 'border-slate-200 bg-[#f8fafc] text-primary hover:border-slate-300'
                }`}
              >
                <p className="text-sm font-semibold">{action.title}</p>
                <p className={`text-sm mt-2 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-1">
          {renderForm()}
        </div>
      </div>
    </Modal>
  );
}
