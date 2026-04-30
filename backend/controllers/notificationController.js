import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';

// Helper function — called from other controllers
const createNotification = async (userId, type, message, link = '') => {
  try {
    await Notification.create({ user: userId, type, message, link });
  } catch (err) {
    console.error('Failed to create notification:', err.message);
  }
};

// @desc    Get notifications for logged-in user
// @route   GET /api/notifications
// @access  Private
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(30);

  const unreadCount = await Notification.countDocuments({ user: req.user._id, isRead: false });

  res.json({ notifications, unreadCount });
});

// @desc    Mark a single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  if (notification.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  notification.isRead = true;
  await notification.save();
  res.json({ message: 'Marked as read' });
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id, isRead: false },
    { isRead: true }
  );
  res.json({ message: 'All marked as read' });
});

export { createNotification, getMyNotifications, markAsRead, markAllAsRead };
