import { body, param, query, validationResult } from 'express-validator';
import { ValidationError } from './errors.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    throw new ValidationError(messages.join(', '));
  }
  next();
};

// Auth validators
export const signupValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('role').isIn(['ASKER', 'EXPERT']).withMessage('Role must be ASKER or EXPERT'),
  validate
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

// Question validators
export const createQuestionValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  validate
];

export const createAnswerValidator = [
  body('content').trim().notEmpty().withMessage('Answer content is required'),
  validate
];

// Expert validators
export const createExpertProfileValidator = [
  body('bio').trim().notEmpty().withMessage('Bio is required'),
  body('skills').isArray({ min: 1 }).withMessage('At least one skill is required'),
  body('domain').trim().notEmpty().withMessage('Domain is required'),
  body('yearsOfExperience').isInt({ min: 0 }).withMessage('Years of experience must be a positive number'),
  validate
];

// Chat validators
export const createChatValidator = [
  body('expertId').notEmpty().withMessage('Expert ID is required'),
  validate
];

export const sendMessageValidator = [
  body('content').trim().notEmpty().withMessage('Message content is required'),
  validate
];

// Admin validators
export const updateVerificationValidator = [
  body('status').isIn(['VERIFIED', 'REJECTED', 'PENDING']).withMessage('Invalid status'),
  validate
];

// Param validators
export const idValidator = [
  param('id').isMongoId().withMessage('Invalid ID'),
  validate
];