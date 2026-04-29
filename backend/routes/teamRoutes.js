import express from 'express';
import {
  createTeam,
  getMyTeams,
  getTeamById,
  addMember,
  removeMember,
  updateMemberRole,
} from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All team routes require authentication
router.route('/').post(protect, createTeam).get(protect, getMyTeams);
router.route('/:id').get(protect, getTeamById);
router.route('/:id/members').post(protect, addMember);
router.route('/:id/members/:userId').delete(protect, removeMember).put(protect, updateMemberRole);

export default router;
