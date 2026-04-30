import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import Team from '../models/teamModel.js';
import { createNotification } from './notificationController.js';

// @desc    Get all tasks for the logged-in user or a team
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const { team, isCompleted } = req.query;
  
  if (team) {
    const teamDoc = await Team.findById(team);
    if (!teamDoc) {
      res.status(404);
      throw new Error('Team not found');
    }
    const isMember = teamDoc.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!isMember) {
      res.status(403);
      throw new Error('Not authorized to view this team\'s tasks');
    }
    const query = { team };
    if (isCompleted) query.isCompleted = isCompleted === 'true';
    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('project', 'title')
      .sort({ createdAt: -1 });
    return res.json(tasks);
  }

  // Personal tasks
  const query = { user: req.user._id, team: null };
  if (isCompleted) query.isCompleted = isCompleted === 'true';

  const tasks = await Task.find(query)
    .populate('project', 'title')
    .sort({ createdAt: -1 });
  res.json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, project, dueDate, team, assignedTo } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please provide a task title');
  }

  if (team) {
    const teamDoc = await Team.findById(team);
    if (!teamDoc) {
      res.status(404);
      throw new Error('Team not found');
    }
    const isMember = teamDoc.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!isMember) {
      res.status(403);
      throw new Error('Not authorized to create tasks for this team');
    }
  }

  const task = new Task({
    user: req.user._id,
    title,
    project: project || undefined,
    dueDate: dueDate || undefined,
    team: team || null,
    assignedTo: assignedTo || null,
  });

  const createdTask = await task.save();

  // Notify the assigned user
  if (assignedTo && assignedTo !== req.user._id.toString()) {
    await createNotification(
      assignedTo,
      'task_assigned',
      `You were assigned a new task: "${title}"`,
      '/tasks'
    );
  }

  res.status(201).json(createdTask);
});

// @desc    Update a task (e.g., toggle isCompleted)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, isCompleted, dueDate } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    // Allow update if user owns it OR is a team member
    if (task.team) {
      const teamDoc = await Team.findById(task.team);
      const isMember = teamDoc?.members.find(
        (m) => m.user.toString() === req.user._id.toString()
      );
      if (!isMember) {
        res.status(401);
        throw new Error('Not authorized to update this task');
      }
    } else if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    task.title = title !== undefined ? title : task.title;
    task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    if (task.team) {
      const teamDoc = await Team.findById(task.team);
      const isMember = teamDoc?.members.find(
        (m) => m.user.toString() === req.user._id.toString()
      );
      if (!isMember) {
        res.status(401);
        throw new Error('Not authorized to delete this task');
      }
    } else if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this task');
    }

    await task.deleteOne();
    res.json({ message: 'Task removed successfully' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

export { getTasks, createTask, updateTask, deleteTask };
