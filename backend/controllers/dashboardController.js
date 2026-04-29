import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';
import Task from '../models/taskModel.js';
import { google } from 'googleapis';
import User from '../models/userModel.js';

// @desc    Get aggregated dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // 1. Fetch Total Projects Count
  const totalProjects = await Project.countDocuments({ user: userId });

  // 2. Fetch Tasks (All, Completed, Due Today)
  const allTasks = await Task.find({ user: userId });
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(task => task.isCompleted).length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tasksDueToday = allTasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate < tomorrow && !task.isCompleted;
  }).length;

  // Calculate Health Score (simple ratio of completed tasks, or baseline 100 if no tasks)
  let healthScore = 100;
  if (totalTasks > 0) {
    healthScore = Math.round((completedTasks / totalTasks) * 100);
  }

  // 3. Fetch Google Calendar Meetings for Today
  let meetingsToday = 0;
  try {
    const user = await User.findById(userId);
    if (user && user.googleAccessToken) {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );

      oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken,
      });

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
      });

      meetingsToday = response.data.items ? response.data.items.length : 0;
    }
  } catch (error) {
    console.error('Failed to fetch calendar for stats:', error.message);
    // Continue without failing the whole stats endpoint
  }

  res.json({
    projectsCount: totalProjects,
    tasksDueToday,
    meetingsToday,
    healthScore,
    totalTasks,
    completedTasks
  });
});

export { getDashboardStats };
