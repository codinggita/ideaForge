import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
});

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Please provide a title and description for the project');
  }

  const project = new Project({
    user: req.user._id,
    title,
    description,
    status: status || 'Planning',
    priority: priority || 'Medium',
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const { title, description, status, priority } = req.body;

  const project = await Project.findById(req.params.id);

  if (project) {
    // Check if the user owns this project
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this project');
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.status = status || project.status;
    project.priority = priority || project.priority;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    // Check if the user owns this project
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this project');
    }

    await project.deleteOne();
    res.json({ message: 'Project removed successfully' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export { getProjects, createProject, updateProject, deleteProject };
