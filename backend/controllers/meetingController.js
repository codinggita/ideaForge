import asyncHandler from 'express-async-handler';
import Meeting from '../models/meetingModel.js';

// @desc    Get all meetings for the logged-in user
// @route   GET /api/meetings
// @access  Private
const getMeetings = asyncHandler(async (req, res) => {
  // Sort by startTime ascending (closest meetings first)
  const meetings = await Meeting.find({ user: req.user._id }).sort({ startTime: 1 });
  res.json(meetings);
});

// @desc    Create a new meeting
// @route   POST /api/meetings
// @access  Private
const createMeeting = asyncHandler(async (req, res) => {
  const { title, description, startTime, endTime, type, meetingLink, attendees } = req.body;

  if (!title || !startTime || !endTime) {
    res.status(400);
    throw new Error('Please provide title, startTime, and endTime');
  }

  const meeting = new Meeting({
    user: req.user._id,
    title,
    description,
    startTime,
    endTime,
    type: type || 'Internal Sync',
    meetingLink,
    attendees,
  });

  const createdMeeting = await meeting.save();
  res.status(201).json(createdMeeting);
});

// @desc    Update a meeting
// @route   PUT /api/meetings/:id
// @access  Private
const updateMeeting = asyncHandler(async (req, res) => {
  const { title, description, startTime, endTime, type, meetingLink, attendees } = req.body;

  const meeting = await Meeting.findById(req.params.id);

  if (meeting) {
    // Check if the user owns this meeting
    if (meeting.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this meeting');
    }

    meeting.title = title || meeting.title;
    meeting.description = description !== undefined ? description : meeting.description;
    meeting.startTime = startTime || meeting.startTime;
    meeting.endTime = endTime || meeting.endTime;
    meeting.type = type || meeting.type;
    meeting.meetingLink = meetingLink !== undefined ? meetingLink : meeting.meetingLink;
    meeting.attendees = attendees || meeting.attendees;

    const updatedMeeting = await meeting.save();
    res.json(updatedMeeting);
  } else {
    res.status(404);
    throw new Error('Meeting not found');
  }
});

// @desc    Delete a meeting
// @route   DELETE /api/meetings/:id
// @access  Private
const deleteMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);

  if (meeting) {
    // Check if the user owns this meeting
    if (meeting.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this meeting');
    }

    await meeting.deleteOne();
    res.json({ message: 'Meeting removed successfully' });
  } else {
    res.status(404);
    throw new Error('Meeting not found');
  }
});

export { getMeetings, createMeeting, updateMeeting, deleteMeeting };
