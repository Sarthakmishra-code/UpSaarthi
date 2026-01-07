import AdminService from '../services/AdminService.js';
import { successResponse } from '../utils/responseHandler.js';

export const getStatistics = async (req, res, next) => {
  try {
    const statistics = await AdminService.getStatistics();
    successResponse(res, { statistics });
  } catch (error) {
    next(error);
  }
};

export const getPendingExperts = async (req, res, next) => {
  try {
    const experts = await AdminService.getPendingExperts();
    successResponse(res, { experts });
  } catch (error) {
    next(error);
  }
};

export const getAllExpertsForAdmin = async (req, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const filters = {};
    if (status) filters.verificationStatus = status;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20
    };

    const result = await AdminService.getAllExperts(filters, options);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateExpertVerification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const profile = await AdminService.updateExpertVerification(id, status);
    successResponse(res, { profile }, 'Expert verification status updated successfully');
  } catch (error) {
    next(error);
  }
};