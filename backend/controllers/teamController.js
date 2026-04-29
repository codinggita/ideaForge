import asyncHandler from 'express-async-handler';
import Team from '../models/teamModel.js';
import User from '../models/userModel.js';

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private
const createTeam = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const team = await Team.create({
    name,
    description,
    members: [{ user: req.user._id, role: 'owner' }],
    createdBy: req.user._id,
  });

  res.status(201).json(team);
});

// @desc    Get logged in user's teams
// @route   GET /api/teams
// @access  Private
const getMyTeams = asyncHandler(async (req, res) => {
  // Find teams where the user is in the members array
  const teams = await Team.find({ 'members.user': req.user._id })
    .populate('members.user', 'name email jobTitle')
    .sort({ createdAt: -1 });

  res.json(teams);
});

// @desc    Get team by ID
// @route   GET /api/teams/:id
// @access  Private
const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members.user', 'name email jobTitle');

  if (!team) {
    res.status(404);
    throw new Error('Team not found');
  }

  // Check if user is part of the team
  const isMember = team.members.find((member) => member.user._id.toString() === req.user._id.toString());

  if (isMember) {
    res.json(team);
  } else {
    res.status(403);
    throw new Error('Not authorized to view this team');
  }
});

// @desc    Add member to team
// @route   POST /api/teams/:id/members
// @access  Private
const addMember = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  const teamId = req.params.id;

  const team = await Team.findById(teamId);

  if (!team) {
    res.status(404);
    throw new Error('Team not found');
  }

  // Check if requester has admin/owner privileges
  const requester = team.members.find((member) => member.user.toString() === req.user._id.toString());
  
  if (!requester || (requester.role !== 'owner' && requester.role !== 'admin')) {
    res.status(403);
    throw new Error('Not authorized to add members');
  }

  const userToAdd = await User.findOne({ email });

  if (!userToAdd) {
    res.status(404);
    throw new Error('User with this email not found');
  }

  // Check if user is already a member
  const alreadyMember = team.members.find((member) => member.user.toString() === userToAdd._id.toString());

  if (alreadyMember) {
    res.status(400);
    throw new Error('User is already a member of this team');
  }

  team.members.push({ user: userToAdd._id, role: role || 'member' });
  await team.save();

  const updatedTeam = await Team.findById(teamId).populate('members.user', 'name email jobTitle');
  res.json(updatedTeam);
});

// @desc    Remove member from team
// @route   DELETE /api/teams/:id/members/:userId
// @access  Private
const removeMember = asyncHandler(async (req, res) => {
  const teamId = req.params.id;
  const userIdToRemove = req.params.userId;

  const team = await Team.findById(teamId);

  if (!team) {
    res.status(404);
    throw new Error('Team not found');
  }

  const requester = team.members.find((member) => member.user.toString() === req.user._id.toString());
  
  if (!requester || (requester.role !== 'owner' && requester.role !== 'admin')) {
    res.status(403);
    throw new Error('Not authorized to remove members');
  }

  // Cannot remove the owner unless it's the owner removing themselves? Actually owner shouldn't be removed like this
  const targetMember = team.members.find((member) => member.user.toString() === userIdToRemove);

  if (!targetMember) {
    res.status(404);
    throw new Error('User is not a member of this team');
  }

  if (targetMember.role === 'owner' && requester.role !== 'owner') {
     res.status(403);
     throw new Error('Admins cannot remove the owner');
  }

  team.members = team.members.filter((member) => member.user.toString() !== userIdToRemove);
  await team.save();

  const updatedTeam = await Team.findById(teamId).populate('members.user', 'name email jobTitle');
  res.json(updatedTeam);
});

// @desc    Update member role
// @route   PUT /api/teams/:id/members/:userId
// @access  Private
const updateMemberRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const teamId = req.params.id;
  const userIdToUpdate = req.params.userId;

  const team = await Team.findById(teamId);

  if (!team) {
    res.status(404);
    throw new Error('Team not found');
  }

  const requester = team.members.find((member) => member.user.toString() === req.user._id.toString());
  
  if (!requester || requester.role !== 'owner') {
    res.status(403);
    throw new Error('Only the owner can update roles');
  }

  const memberIndex = team.members.findIndex((member) => member.user.toString() === userIdToUpdate);

  if (memberIndex === -1) {
    res.status(404);
    throw new Error('User is not a member of this team');
  }

  team.members[memberIndex].role = role;
  await team.save();

  const updatedTeam = await Team.findById(teamId).populate('members.user', 'name email jobTitle');
  res.json(updatedTeam);
});

export { createTeam, getMyTeams, getTeamById, addMember, removeMember, updateMemberRole };
