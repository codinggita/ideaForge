import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';
import Team from '../models/teamModel.js';

// @desc    Get all projects for the logged-in user or a team
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const { team } = req.query;

  if (team) {
    // Verify user is a member of this team
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
      throw new Error('Not authorized to view this team\'s projects');
    }
    const projects = await Project.find({ team }).populate('user', 'name email');
    return res.json(projects);
  }

  // Personal projects (no team)
  const projects = await Project.find({ user: req.user._id, team: null });
  res.json(projects);
});

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, status, priority, team } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Please provide a title and description for the project');
  }

  // If team is provided, verify membership
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
      throw new Error('Not authorized to create projects for this team');
    }
  }

  const project = new Project({
    user: req.user._id,
    title,
    description,
    status: status || 'Planning',
    priority: priority || 'Medium',
    team: team || null,
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
    // Allow update if user owns it OR is a team member
    if (project.team) {
      const teamDoc = await Team.findById(project.team);
      const isMember = teamDoc?.members.find(
        (m) => m.user.toString() === req.user._id.toString()
      );
      if (!isMember) {
        res.status(401);
        throw new Error('Not authorized to update this project');
      }
    } else if (project.user.toString() !== req.user._id.toString()) {
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
    if (project.team) {
      const teamDoc = await Team.findById(project.team);
      const isMember = teamDoc?.members.find(
        (m) => m.user.toString() === req.user._id.toString()
      );
      if (!isMember) {
        res.status(401);
        throw new Error('Not authorized to delete this project');
      }
    } else if (project.user.toString() !== req.user._id.toString()) {
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

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('user', 'name email');

  if (project) {
    // Check authorization (owner or team member)
    if (project.team) {
      const teamDoc = await Team.findById(project.team);
      const isMember = teamDoc?.members.find(
        (m) => m.user.toString() === req.user._id.toString()
      );
      if (!isMember) {
        res.status(403);
        throw new Error('Not authorized to view this project');
      }
    } else if (project.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to view this project');
    }

    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export { getProjects, createProject, getProjectById, updateProject, deleteProject };
