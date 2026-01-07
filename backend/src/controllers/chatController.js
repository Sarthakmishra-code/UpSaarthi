import ChatService from '../services/ChatService.js';
import { successResponse } from '../utils/responseHandler.js';

export const createOrGetChat = async (req, res, next) => {
  try {
    const { expertId } = req.body;
    const chat = await ChatService.createOrGetChat(req.user.id, expertId);
    successResponse(res, { chat }, 'Chat retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getMyChats = async (req, res, next) => {
  try {
    const chats = await ChatService.getMyChats(req.user.id);
    successResponse(res, { chats });
  } catch (error) {
    next(error);
  }
};

export const getChatMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 50
    };

    const result = await ChatService.getChatMessages(chatId, req.user.id, options);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    const message = await ChatService.sendMessage(chatId, content, req.user.id);
    successResponse(res, { data: message }, 'Message sent successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (req, res, next) => {
  try {
    const unreadCount = await ChatService.getUnreadCount(req.user.id);
    successResponse(res, { unreadCount });
  } catch (error) {
    next(error);
  }
};