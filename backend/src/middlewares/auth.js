import { verifyToken } from '../utils/jwtUtils.js';
import UserDAO from '../DAO/UserDAO.js';
import ExpertProfileDAO from '../DAO/ExpertProfileDAO.js';
import { AuthenticationError, ForbiddenError } from '../utils/errors.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Authentication required');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      throw new AuthenticationError('Invalid or expired token');
    }

    // Fetch user from database
    const user = await UserDAO.findById(decoded.userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    // Get expert profile if expert
    if (user.role === 'EXPERT') {
      const expertProfile = await ExpertProfileDAO.findByUserId(user.id);
      user.expertProfile = expertProfile;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AuthenticationError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
};

export const requireExpert = async (req, res, next) => {
  if (req.user.role !== 'EXPERT') {
    return next(new ForbiddenError('Expert access required'));
  }

  if (!req.user.expertProfile) {
    return next(new ForbiddenError('Expert profile not found'));
  }

  next();
};

export const requireVerifiedExpert = async (req, res, next) => {
  if (req.user.role !== 'EXPERT') {
    return next(new ForbiddenError('Expert access required'));
  }

  if (!req.user.expertProfile || req.user.expertProfile.verificationStatus !== 'VERIFIED') {
    return next(new ForbiddenError('Verified expert status required'));
  }

  next();
};