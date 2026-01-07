import Answer from '../models/Answer.js';
import ExpertProfile from '../models/ExpertProfile.js';

class AnswerDAO {
  async create(answerData) {
    const answer = new Answer(answerData);
    return await answer.save();
  }

  async findById(id) {
    return await Answer.findById(id)
      .populate('expertId', 'name email')
      .populate('questionId')
      .lean();
  }

  async findByQuestionId(questionId, options = {}) {
    const { sort = { createdAt: -1 } } = options;

    const answers = await Answer.find({ questionId })
      .populate('expertId', 'name email')
      .sort(sort)
      .lean();

    // Populate expert profiles separately
    const answerIds = answers.map(a => a.expertId);
    const expertProfiles = await ExpertProfile.find({ 
      userId: { $in: answerIds } 
    }).lean();

    const profileMap = {};
    expertProfiles.forEach(p => {
      profileMap[p.userId.toString()] = p;
    });

    return answers.map(answer => ({
      ...answer,
      expert: {
        ...answer.expertId,
        expertProfile: profileMap[answer.expertId._id?.toString()] || null
      }
    }));
  }

  async findByExpertId(expertId, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const answers = await Answer.find({ expertId })
      .populate('questionId')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Answer.countDocuments({ expertId });

    return { answers, total, page, limit };
  }

  async update(id, updateData) {
    return await Answer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })
    .populate('expertId', 'name email')
    .lean();
  }

  async delete(id) {
    return await Answer.findByIdAndDelete(id);
  }

  async count(filters = {}) {
    return await Answer.countDocuments(filters);
  }

  async countAcceptedByExpert(expertId) {
    return await Answer.countDocuments({ expertId, isAccepted: true });
  }
}

export default new AnswerDAO();