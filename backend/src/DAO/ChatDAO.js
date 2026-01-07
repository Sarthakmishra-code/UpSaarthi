import Chat from '../models/Chat.js';
import ExpertProfile from '../models/ExpertProfile.js';

class ChatDAO {
  async create(chatData) {
    const chat = new Chat(chatData);
    return await chat.save();
  }

  async findById(id) {
    return await Chat.findById(id)
      .populate('askerId', 'name email')
      .populate('expertId', 'name email')
      .lean();
  }

  async findByParticipants(askerId, expertId) {
    return await Chat.findOne({ askerId, expertId })
      .populate('askerId', 'name email')
      .populate('expertId', 'name email')
      .lean();
  }

  async findByUserId(userId) {
    const chats = await Chat.find({
      $or: [{ askerId: userId }, { expertId: userId }]
    })
      .populate('askerId', 'name email')
      .populate('expertId', 'name email')
      .sort({ updatedAt: -1 })
      .lean();

    // Get expert profiles
    const expertIds = chats.map(c => c.expertId._id);
    const expertProfiles = await ExpertProfile.find({
      userId: { $in: expertIds }
    }).lean();

    const profileMap = {};
    expertProfiles.forEach(p => {
      profileMap[p.userId.toString()] = p;
    });

    return chats.map(chat => ({
      ...chat,
      expert: {
        ...chat.expertId,
        expertProfile: profileMap[chat.expertId._id?.toString()] || null
      }
    }));
  }

  async update(id, updateData) {
    return await Chat.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })
    .populate('askerId', 'name email')
    .populate('expertId', 'name email')
    .lean();
  }

  async updateTimestamp(id) {
    return await this.update(id, { updatedAt: new Date() });
  }

  async delete(id) {
    return await Chat.findByIdAndDelete(id);
  }

  async count(filters = {}) {
    return await Chat.countDocuments(filters);
  }
}

export default new ChatDAO();