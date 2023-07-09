import express from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../utils/authMiddleware';
const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);
export default router;
