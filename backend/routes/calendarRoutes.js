import express from 'express';
import { getUpcomingEvents, getMonthEvents } from '../controllers/calendarController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/upcoming').get(protect, getUpcomingEvents);
router.route('/month').get(protect, getMonthEvents);

export default router;
