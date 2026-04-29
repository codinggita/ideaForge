import express from 'express';
import { googleAuth, googleCallback } from '../controllers/googleAuthController.js';

const router = express.Router();

router.get('/', googleAuth);
router.get('/callback', googleCallback);

export default router;
