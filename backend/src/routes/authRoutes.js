import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { signupValidator, loginValidator } from '../utils/validator.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/me', authenticate, getMe);

export default router;