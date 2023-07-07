import express from 'express';
import { authMiddleware } from '../utils/authMiddleware';
import { sendHello } from '../controllers/dashController';

const router = express.Router();

router.get('/', authMiddleware, sendHello);

export default router;