import ExpertProfileDAO from '../DAO/ExpertProfileDAO.js';
import AnswerDAO from '../DAO/AnswerDAO.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

class ExpertService {
  async createProfile(profileData, userId) {
    // Check if profile already exists
    const existing = await ExpertProfileDAO.findByUserId(userId);
    if (existing) {
      throw new ValidationError('Expert profile already exists');
    }

    const profile = await ExpertProfileDAO.create({
      ...profileData,
      userId
    });

    return await ExpertProfileDAO.findById(profile._id);
  }

  async updateProfile(profileData, userId) {
    const profile = await ExpertProfileDAO.findByUserId(userId);
    if (!profile) {
      throw new NotFoundError('Expert profile not found');
    }

    return await ExpertProfileDAO.updateByUserId(userId, profileData);
  }

  async getMyProfile(userId) {
    const profile = await ExpertProfileDAO.findByUserId(userId);
    if (!profile) {
      throw new NotFoundError('Expert profile not found');
    }

    return profile;
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

  async getExpertById(id) {
    const expert = await ExpertProfileDAO.findById(id);
    if (!expert) {
      throw new NotFoundError('Expert not found');
    }

    // Get answer statistics
    const totalAnswers = await AnswerDAO.count({ expertId: expert.userId });
    const acceptedAnswers = await AnswerDAO.countAcceptedByExpert(expert.userId);

    return {
      expert,
      stats: {
        totalAnswers,
        acceptedAnswers
      }
    };
  }
}

export default new ExpertService();