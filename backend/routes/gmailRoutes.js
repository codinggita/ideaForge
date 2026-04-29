import express from 'express';
import { getRecentEmails } from '../controllers/gmailController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/recent').get(protect, getRecentEmails);

export default router;
