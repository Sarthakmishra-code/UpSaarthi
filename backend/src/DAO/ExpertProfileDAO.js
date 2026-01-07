import ExpertProfile from '../models/ExpertProfile.js';

class ExpertProfileDAO {
  async create(profileData) {
    const profile = new ExpertProfile(profileData);
    return await profile.save();
  }

  async findById(id) {
    return await ExpertProfile.findById(id)
      .populate('userId', 'name email')
      .lean();
  }

  async findByUserId(userId) {
    return await ExpertProfile.findOne({ userId })
      .populate('userId', 'name email')
      .lean();
  }

  async findAll(filters = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const profiles = await ExpertProfile.find(filters)
      .populate('userId', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await ExpertProfile.countDocuments(filters);

    return { profiles, total, page, limit };
  }

  async findByVerificationStatus(status, options = {}) {
    return await this.findAll({ verificationStatus: status }, options);
  }

  async update(id, updateData) {
    return await ExpertProfile.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })
    .populate('userId', 'name email')
    .lean();
  }

  async updateByUserId(userId, updateData) {
    return await ExpertProfile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true, runValidators: true }
    )
    .populate('userId', 'name email')
    .lean();
  }

  async delete(id) {
    return await ExpertProfile.findByIdAndDelete(id);
  }

  async count(filters = {}) {
    return await ExpertProfile.countDocuments(filters);
  }

  async exists(filters) {
    return await ExpertProfile.exists(filters);
  }
}

export default new ExpertProfileDAO();