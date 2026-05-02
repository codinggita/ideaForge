import express from 'express';
import { googleAuth, googleCallback, googleDebug } from '../controllers/googleAuthController.js';

const router = express.Router();

router.get('/', googleAuth);
router.get('/debug', googleDebug);
router.get('/callback', googleCallback);

export default router;
