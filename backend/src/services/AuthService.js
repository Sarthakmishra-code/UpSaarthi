import bcrypt from 'bcryptjs';
import UserDAO from '../DAO/UserDAO.js';
import ExpertProfileDAO from '../DAO/ExpertProfileDAO.js';
import { generateToken } from '../utils/jwtUtils.js';
import { ValidationError, AuthenticationError } from '../utils/errors.js';

class AuthService {
  async signup(userData) {
    const { email, password, name, role } = userData;

    // Validate role
    if (!['ASKER', 'EXPERT'].includes(role)) {
      throw new ValidationError('Invalid role. Must be ASKER or EXPERT');
    }

    // Check if user exists
    const existingUser = await UserDAO.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserDAO.create({
      email,
      password: hashedPassword,
      name,
      role
    });

    // Generate token
    const token = generateToken({ userId: user._id, role: user.role });

    // Remove password from response
    const userResponse = { ...user };
    delete userResponse.password;

    return { token, user: userResponse };
  }

  async login(email, password) {
    // Find user with password
    const user = await UserDAO.findByEmailWithPassword(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Get expert profile if expert
    let expertProfile = null;
    if (user.role === 'EXPERT') {
      expertProfile = await ExpertProfileDAO.findByUserId(user._id);
    }

    // Generate token
    const token = generateToken({ userId: user._id, role: user.role });

    // Prepare user response
    const userResponse = user.toJSON();
    if (expertProfile) {
      userResponse.expertProfile = expertProfile;
    }

    return { token, user: userResponse };
  }

  async getMe(userId) {
    const user = await UserDAO.findById(userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    // Get expert profile if expert
    if (user.role === 'EXPERT') {
      const expertProfile = await ExpertProfileDAO.findByUserId(userId);
      return { ...user, expertProfile };
    }

    return user;
  }
}

export default new AuthService();