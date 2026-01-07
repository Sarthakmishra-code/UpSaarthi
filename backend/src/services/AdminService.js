import ExpertProfileDAO from '../DAO/ExpertProfileDAO.js';
import UserDAO from '../DAO/UserDAO.js';
import QuestionDAO from '../DAO/QuestionDAO.js';
import AnswerDAO from '../DAO/AnswerDAO.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

class AdminService {
  async getStatistics() {
    const [
      totalUsers,
      totalExperts,
      verifiedExperts,
      pendingExperts,
      totalQuestions,
      totalAnswers
    ] = await Promise.all([
      UserDAO.count(),
      ExpertProfileDAO.count(),
      ExpertProfileDAO.count({ verificationStatus: 'VERIFIED' }),
      ExpertProfileDAO.count({ verificationStatus: 'PENDING' }),
      QuestionDAO.count(),
      AnswerDAO.count()
    ]);

    return {
      users: {
        total: totalUsers,
        experts: totalExperts,
        verified: verifiedExperts,
        pending: pendingExperts
      },
      questions: totalQuestions,
      answers: totalAnswers
    };
  }

  async getPendingExperts() {
    const result = await ExpertProfileDAO.findByVerificationStatus('PENDING');
    return result.profiles;
  }

  async getAllExperts(filters = {}, options = {}) {
    const result = await ExpertProfileDAO.findAll(filters, options);

    return {
      experts: result.profiles,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.ceil(result.total / result.limit)
    };
  }

  async updateExpertVerification(expertId, status) {
    if (!['VERIFIED', 'REJECTED', 'PENDING'].includes(status)) {
      throw new ValidationError('Invalid status. Must be VERIFIED, REJECTED, or PENDING');
    }

    const profile = await ExpertProfileDAO.findById(expertId);
    if (!profile) {
      throw new NotFoundError('Expert profile not found');
    }

    const updateData = {
      verificationStatus: status,
      verifiedAt: status === 'VERIFIED' ? new Date() : null
    };

    return await ExpertProfileDAO.update(expertId, updateData);
  }
}

export default new AdminService();