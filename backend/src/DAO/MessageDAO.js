import Message from '../models/Message.js';

class MessageDAO {
  async create(messageData) {
    const message = new Message(messageData);
    return await message.save();
  }

  async findById(id) {
    return await Message.findById(id)
      .populate('senderId', 'name email role')
      .lean();
  }

  async findByChatId(chatId, options = {}) {
    const { page = 1, limit = 50, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ chatId })
      .populate('senderId', 'name email role')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Message.countDocuments({ chatId });

    return { messages: messages.reverse(), total, page, limit };
  }

  async markAsRead(chatId, excludeSenderId) {
    return await Message.updateMany(
      { chatId, senderId: { $ne: excludeSenderId }, isRead: false },
      { isRead: true }
    );
  }

  async countUnread(chatIds, excludeSenderId) {
    return await Message.countDocuments({
      chatId: { $in: chatIds },
      senderId: { $ne: excludeSenderId },
      isRead: false
    });
  }

  async delete(id) {
    return await Message.findByIdAndDelete(id);
  }

  async deleteByChatId(chatId) {
    return await Message.deleteMany({ chatId });
  }
}

export default new MessageDAO();