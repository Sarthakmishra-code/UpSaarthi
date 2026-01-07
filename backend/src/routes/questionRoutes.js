import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  getMyQuestions,
  createAnswer,
  acceptAnswer
} from '../controllers/questionController.js';
import { authenticate, requireExpert } from '../middlewares/auth.js';
import { 
  createQuestionValidator, 
  createAnswerValidator, 
  idValidator 
} from '../utils/validator.js';

const router = express.Router();

router.post('/', authenticate, createQuestionValidator, createQuestion);
router.get('/', authenticate, getAllQuestions);
router.get('/my-questions', authenticate, getMyQuestions);
router.get('/:id', authenticate, idValidator, getQuestionById);
router.post('/:id/answers', authenticate, requireExpert, idValidator, createAnswerValidator, createAnswer);
router.post('/:id/answers/:answerId/accept', authenticate, acceptAnswer);

export default router;