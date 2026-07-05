/**
 * Financial Data Routes Module
 * 
 * This module defines all API routes for the financial data endpoints.
 * It maps HTTP methods and URLs to their corresponding controller functions.
 * Routes are organized following RESTful conventions.
 */

const express = require('express');
const router = express.Router();

// Import the financial data controller
const financialDataController = require('../controllers/financialDataController');

/**
 * @route   GET /api/financial-data
 * @desc    Get all financial data in analytics-ready format
 * @access  Public
 */
router.get('/financial-data', financialDataController.getAllFinancialData);

/**
 * @route   GET /api/financial-data/company/:companyCode
 * @desc    Get financial data for a specific company
 * @access  Public
 * @param   companyCode - The company code to filter by (e.g., US001, DE001, IN001)
 */
router.get('/financial-data/company/:companyCode', financialDataController.getFinancialDataByCompany);

/**
 * @route   GET /api/financial-data/year/:fiscalYear
 * @desc    Get financial data for a specific fiscal year
 * @access  Public
 * @param   fiscalYear - The fiscal year to filter by (e.g., 2023, 2024)
 */
router.get('/financial-data/year/:fiscalYear', financialDataController.getFinancialDataByYear);

/**
 * @route   GET /api/health
 * @desc    Get API health status
 * @access  Public
 */
router.get('/health', financialDataController.getHealthStatus);

module.exports = router;