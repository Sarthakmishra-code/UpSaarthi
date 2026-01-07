import AuthService from '../services/authService.js';
import { successResponse } from '../utils/responseHandler.js';

export const signup = async (req, res, next) => {
  try {
    const result = await AuthService.signup(req.body);
    successResponse(res, result, 'User created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await AuthService.getMe(req.user.id);
    successResponse(res, { user });
  } catch (error) {
    next(error);
  }
};