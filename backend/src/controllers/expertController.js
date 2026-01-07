import ExpertService from '../services/ExpertService.js';
import { successResponse } from '../utils/responseHandler.js';

export const createExpertProfile = async (req, res, next) => {
  try {
    const profile = await ExpertService.createProfile(req.body, req.user.id);
    successResponse(res, { profile }, 'Expert profile created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateExpertProfile = async (req, res, next) => {
  try {
    const profile = await ExpertService.updateProfile(req.body, req.user.id);
    successResponse(res, { profile }, 'Expert profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getMyExpertProfile = async (req, res, next) => {
  try {
    const profile = await ExpertService.getMyProfile(req.user.id);
    successResponse(res, { profile });
  } catch (error) {
    next(error);
  }
};

export const getAllExperts = async (req, res, next) => {
  try {
    const { domain, verified, page, limit } = req.query;
    const filters = {};
    if (domain) filters.domain = domain;
    if (verified === 'true') filters.verificationStatus = 'VERIFIED';

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20
    };

    const result = await ExpertService.getAllExperts(filters, options);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const getExpertById = async (req, res, next) => {
  try {
    const result = await ExpertService.getExpertById(req.params.id);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};