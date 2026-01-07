import QuestionDAO from '../DAO/QuestionDAO.js';
import AnswerDAO from '../DAO/AnswerDAO.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

class QuestionService {
  async createQuestion(questionData, userId) {
    const question = await QuestionDAO.create({
      ...questionData,
      askerId: userId
    });

    return await QuestionDAO.findById(question._id);
  }

  async getAllQuestions(filters = {}, options = {}) {
    const result = await QuestionDAO.findAll(filters, options);

    // Get answer counts for each question
    const questionIds = result.questions.map(q => q.id || q._id);
    const answerCounts = await Promise.all(
      questionIds.map(id => AnswerDAO.count({ questionId: id }))
    );

    const questionsWithCounts = result.questions.map((q, index) => ({
      ...q,
      answerCount: answerCounts[index]
    }));

    return {
      questions: questionsWithCounts,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.ceil(result.total / result.limit)
    };
  }

  async getQuestionById(id) {
    const question = await QuestionDAO.findById(id);
    if (!question) {
      throw new NotFoundError('Question not found');
    }

    // Get answers with expert profiles
    const answers = await AnswerDAO.findByQuestionId(id);

    return { ...question, answers };
  }

  async getMyQuestions(userId, options = {}) {
    const result = await QuestionDAO.findByAskerId(userId, options);

    // Get answer counts
    const questionIds = result.questions.map(q => q.id || q._id);
    const answerCounts = await Promise.all(
      questionIds.map(id => AnswerDAO.count({ questionId: id }))
    );

    const questionsWithCounts = result.questions.map((q, index) => ({
      ...q,
      answerCount: answerCounts[index]
    }));

    return {
      questions: questionsWithCounts,
      total: result.total,
      page: result.page,
      limit: result.limit
    };
  }

  async createAnswer(questionId, content, expertId) {
    const question = await QuestionDAO.findById(questionId);
    if (!question) {
      throw new NotFoundError('Question not found');
    }

    const answer = await AnswerDAO.create({
      content,
      questionId,
      expertId
    });

    // Update question status to ANSWERED
    await QuestionDAO.update(questionId, { status: 'ANSWERED' });

    return await AnswerDAO.findById(answer._id);
  }

  async acceptAnswer(questionId, answerId, userId) {
    const question = await QuestionDAO.findById(questionId);
    if (!question) {
      throw new NotFoundError('Question not found');
    }

    if (question.askerId.toString() !== userId.toString()) {
      throw new ForbiddenError('Only question owner can accept answers');
    }

    const answer = await AnswerDAO.findById(answerId);
    if (!answer) {
      throw new NotFoundError('Answer not found');
    }

    if (answer.questionId.toString() !== questionId) {
      throw new ForbiddenError('Answer does not belong to this question');
    }

    return await AnswerDAO.update(answerId, { isAccepted: true });
  }
}

export default new QuestionService();