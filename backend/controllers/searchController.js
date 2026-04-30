import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';
import Task from '../models/taskModel.js';
import Team from '../models/teamModel.js';

// Helper to get team IDs
async function getUserTeamIds(userId) {
  const teams = await Team.find({ 'members.user': userId }).select('_id');
  return teams.map((t) => t._id);
}

// @desc    Global search across projects, tasks, teams
// @route   GET /api/search?q=<query>
// @access  Private
const globalSearch = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.json({ projects: [], tasks: [], teams: [] });
  }

  const regex = new RegExp(q.trim(), 'i');
  const userId = req.user._id;
  const teamIds = await getUserTeamIds(userId);

  const [projects, tasks, teams] = await Promise.all([
    Project.find({
      $or: [
        { user: userId, team: null },
        { team: { $in: teamIds } },
      ],
      $or: [
        { title: regex },
        { description: regex },
      ],
    })
      .select('title status priority team')
      .limit(8),

    Task.find({
      $or: [
        { user: userId, team: null },
        { team: { $in: teamIds } },
      ],
      title: regex,
    })
      .select('title isCompleted dueDate team')
      .limit(8),

    Team.find({
      'members.user': userId,
      name: regex,
    })
      .select('name members')
      .limit(5),
  ]);

  res.json({
    projects: projects.map((p) => ({
      _id: p._id,
      title: p.title,
      status: p.status,
      priority: p.priority,
      type: 'project',
    })),
    tasks: tasks.map((t) => ({
      _id: t._id,
      title: t.title,
      isCompleted: t.isCompleted,
      type: 'task',
    })),
    teams: teams.map((t) => ({
      _id: t._id,
      name: t.name,
      memberCount: t.members.length,
      type: 'team',
    })),
  });
});

export { globalSearch };
