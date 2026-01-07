import Question from '../models/Question.js';

class QuestionDAO {
  async create(questionData) {
    const question = new Question(questionData);
    return await question.save();
  }

  async findById(id) {
    return await Question.findById(id)
      .populate('askerId', 'name email')
      .lean();
  }

  async findAll(filters = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const questions = await Question.find(filters)
      .populate('askerId', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Question.countDocuments(filters);

    return { questions, total, page, limit };
  }

  async findByAskerId(askerId, options = {}) {
    return await this.findAll({ askerId }, options);
  }

  async findByStatus(status, options = {}) {
    return await this.findAll({ status }, options);
  }

  async findByCategory(category, options = {}) {
    return await this.findAll({ category }, options);
  }

  async update(id, updateData) {
    return await Question.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })
    .populate('askerId', 'name email')
    .lean();
  }

  async delete(id) {
    return await Question.findByIdAndDelete(id);
  }

  async count(filters = {}) {
    return await Question.countDocuments(filters);
  }

  async exists(filters) {
    return await Question.exists(filters);
  }
}

export default new QuestionDAO();