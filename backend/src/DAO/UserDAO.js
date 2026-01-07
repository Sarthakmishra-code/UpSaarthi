import User from '../models/User.js';

class UserDAO {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id) {
    return await User.findById(id).lean();
  }

  async findByEmail(email) {
    return await User.findOne({ email }).lean();
  }

  async findByEmailWithPassword(email) {
    return await User.findOne({ email });
  }

  async findAll(filters = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const users = await User.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await User.countDocuments(filters);

    return { users, total, page, limit };
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    }).lean();
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

  async count(filters = {}) {
    return await User.countDocuments(filters);
  }

  async exists(filters) {
    return await User.exists(filters);
  }
}

export default new UserDAO();