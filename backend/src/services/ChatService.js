import ChatDAO from '../DAO/ChatDAO.js';
import MessageDAO from '../DAO/MessageDAO.js';
import UserDAO from '../DAO/UserDAO.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

class ChatService {
  async createOrGetChat(askerId, expertId) {
    // Verify expert exists
    const expert = await UserDAO.findById(expertId);
    if (!expert || expert.role !== 'EXPERT') {
      throw new NotFoundError('Expert not found');
    }

    // Check if chat exists
    let chat = await ChatDAO.findByParticipants(askerId, expertId);

    if (!chat) {
      // Create new chat
      const newChat = await ChatDAO.create({ askerId, expertId });
      chat = await ChatDAO.findById(newChat._id);
    }

    return chat;
  }

  async getMyChats(userId) {
    return await ChatDAO.findByUserId(userId);
  }

  async getChatMessages(chatId, userId, options = {}) {
    // Verify user has access to this chat
    const chat = await ChatDAO.findById(chatId);
    if (!chat) {
      throw new NotFoundError('Chat not found');
    }

    if (chat.askerId._id.toString() !== userId && chat.expertId._id.toString() !== userId) {
      throw new ForbiddenError('Access denied');
    }

    // Get messages
    const result = await MessageDAO.findByChatId(chatId, options);

    // Mark messages as read
    await MessageDAO.markAsRead(chatId, userId);

    return result;
  }

  async sendMessage(chatId, content, senderId) {
    // Verify user has access to this chat
    const chat = await ChatDAO.findById(chatId);
    if (!chat) {
      throw new NotFoundError('Chat not found');
    }

    if (chat.askerId._id.toString() !== senderId && chat.expertId._id.toString() !== senderId) {
      throw new ForbiddenError('Access denied');
    }

    // Create message
    const message = await MessageDAO.create({
      content,
      chatId,
      senderId
    });

    // Update chat timestamp
    await ChatDAO.updateTimestamp(chatId);

    return await MessageDAO.findById(message._id);
  }

  async getUnreadCount(userId) {
    const chats = await ChatDAO.findByUserId(userId);
    const chatIds = chats.map(c => c.id || c._id);

    return await MessageDAO.countUnread(chatIds, userId);
  }
}

export default new ChatService();