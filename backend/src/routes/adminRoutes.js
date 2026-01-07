import express from 'express';
import {
  getPendingExperts,
  getAllExpertsForAdmin,
  updateExpertVerification,
  getStatistics
} from '../controllers/adminController.js';
import { authenticate, requireRole } from '../middlewares/auth.js';
import { updateVerificationValidator, idValidator } from '../utils/validator.js';

const router = express.Router();

// All admin routes require ADMIN role
router.use(authenticate, requireRole('ADMIN'));

router.get('/statistics', getStatistics);
router.get('/experts/pending', getPendingExperts);
router.get('/experts', getAllExpertsForAdmin);
router.patch('/experts/:id/verification', idValidator, updateVerificationValidator, updateExpertVerification);

export default router;