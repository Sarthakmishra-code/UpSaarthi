import QuestionService from '../services/QuestionService.js';
import { successResponse } from '../utils/responseHandler.js';

export const createQuestion = async (req, res, next) => {
  try {
    const question = await QuestionService.createQuestion(req.body, req.user.id);
    successResponse(res, { question }, 'Question created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getAllQuestions = async (req, res, next) => {
  try {
    const { status, category, page, limit } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (category) filters.category = category;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20
    };

    const result = await QuestionService.getAllQuestions(filters, options);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const getQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionService.getQuestionById(req.params.id);
    successResponse(res, { question });
  } catch (error) {
    next(error);
  }
};

export const getMyQuestions = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20
    };

    const result = await QuestionService.getMyQuestions(req.user.id, options);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const createAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const answer = await QuestionService.createAnswer(id, content, req.user.id);
    successResponse(res, { answer }, 'Answer created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const acceptAnswer = async (req, res, next) => {
  try {
    const { id, answerId } = req.params;

    await QuestionService.acceptAnswer(id, answerId, req.user.id);
    successResponse(res, null, 'Answer accepted successfully');
  } catch (error) {
    next(error);
  }
};