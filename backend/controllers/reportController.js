import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';
import Task from '../models/taskModel.js';
import Team from '../models/teamModel.js';

// @desc    Get aggregated report data
// @route   GET /api/reports
// @access  Private
const getReportData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Projects by status
  const [planningCount, activeCount, completedCount] = await Promise.all([
    Project.countDocuments({ $or: [{ user: userId, team: null }, { team: { $in: await getUserTeamIds(userId) } }], status: 'Planning' }),
    Project.countDocuments({ $or: [{ user: userId, team: null }, { team: { $in: await getUserTeamIds(userId) } }], status: 'Active' }),
    Project.countDocuments({ $or: [{ user: userId, team: null }, { team: { $in: await getUserTeamIds(userId) } }], status: 'Completed' }),
  ]);

  // Tasks stats
  const teamIds = await getUserTeamIds(userId);
  const taskFilter = { $or: [{ user: userId, team: null }, { team: { $in: teamIds } }] };
  
  const [totalTasks, completedTasks, overdueTasks] = await Promise.all([
    Task.countDocuments(taskFilter),
    Task.countDocuments({ ...taskFilter, isCompleted: true }),
    Task.countDocuments({
      ...taskFilter,
      isCompleted: false,
      dueDate: { $lt: new Date() },
    }),
  ]);

  // Tasks completed in the last 7 days (by day)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const weeklyTasks = await Task.aggregate([
    {
      $match: {
        $or: [
          { user: userId, team: null },
          { team: { $in: teamIds } },
        ],
        updatedAt: { $gte: sevenDaysAgo },
        isCompleted: true,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Team stats
  const teams = await Team.find({ 'members.user': userId });
  const teamStats = teams.map((t) => ({
    name: t.name,
    members: t.members.length,
  }));

  res.json({
    projects: { planning: planningCount, active: activeCount, completed: completedCount },
    tasks: {
      total: totalTasks,
      completed: completedTasks,
      overdue: overdueTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    },
    weeklyCompleted: weeklyTasks,
    teams: teamStats,
  });
});

// Helper to get team IDs user belongs to
async function getUserTeamIds(userId) {
  const teams = await Team.find({ 'members.user': userId }).select('_id');
  return teams.map((t) => t._id);
}

export { getReportData };
