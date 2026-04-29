import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  // Can filter by isCompleted if passed in query string (e.g. ?isCompleted=false)
  const query = { user: req.user._id };
  
  if (req.query.isCompleted) {
    query.isCompleted = req.query.isCompleted === 'true';
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, project, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please provide a task title');
  }

  const task = new Task({
    user: req.user._id,
    title,
    project: project || undefined,
    dueDate: dueDate || undefined,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Update a task (e.g., toggle isCompleted)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, isCompleted, dueDate } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    // Check if the user owns this task
    if (task.user.toString() !== req.user._id.toString()) {
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
    // Check if the user owns this task
    if (task.user.toString() !== req.user._id.toString()) {
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
