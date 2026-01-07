import express from 'express';
import {
  createExpertProfile,
  updateExpertProfile,
  getAllExperts,
  getExpertById,
  getMyExpertProfile
} from '../controllers/expertController.js';
import { authenticate, requireRole } from '../middlewares/auth.js';
import { createExpertProfileValidator, idValidator } from '../utils/validator.js';

const router = express.Router();

router.post('/profile', authenticate, requireRole('EXPERT'), createExpertProfileValidator, createExpertProfile);
router.put('/profile', authenticate, requireRole('EXPERT'), updateExpertProfile);
router.get('/profile/me', authenticate, requireRole('EXPERT'), getMyExpertProfile);
router.get('/', authenticate, getAllExperts);
router.get('/:id', authenticate, idValidator, getExpertById);

export default router;