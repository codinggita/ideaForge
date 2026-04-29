import express from 'express';
import { getUpcomingEvents } from '../controllers/calendarController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/upcoming').get(protect, getUpcomingEvents);

export default router;
