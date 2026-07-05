/**
 * Financial Data Controller Module
 * 
 * This module handles the business logic for financial data endpoints.
 * It acts as an intermediary between the routes and the service layer,
 * processing incoming requests and returning appropriate responses.
 */

const financialDataService = require('../services/financialDataService');

/**
 * Get all financial data
 * Handles GET /api/financial-data endpoint
 * Returns all financial records in analytics-ready format
 */
const getAllFinancialData = (req, res, next) => {
  try {
    // Fetch all financial data from the service layer
    const financialData = financialDataService.getAllFinancialData();
    
    // Return successful response with data
    res.status(200).json({
      success: true,
      count: financialData.length,
      data: financialData
    });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};

/**
 * Get financial data by company code
 * Handles GET /api/financial-data/company/:companyCode endpoint
 * Returns financial records for a specific company
 */
const getFinancialDataByCompany = (req, res, next) => {
  try {
    const { companyCode } = req.params;
    
    // Fetch data filtered by company code
    const financialData = financialDataService.getFinancialDataByCompany(companyCode);
    
    // Check if data exists for the company
    if (financialData.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No financial data found for company code: ${companyCode}`
      });
    }
    
    // Return successful response with data
    res.status(200).json({
      success: true,
      count: financialData.length,
      data: financialData
    });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};

/**
 * Get financial data by fiscal year
 * Handles GET /api/financial-data/year/:fiscalYear endpoint
 * Returns financial records for a specific fiscal year
 */
const getFinancialDataByYear = (req, res, next) => {
  try {
    const { fiscalYear } = req.params;
    
    // Validate fiscal year parameter
    const year = parseInt(fiscalYear);
    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid fiscal year parameter'
      });
    }
    
    // Fetch data filtered by fiscal year
    const financialData = financialDataService.getFinancialDataByYear(year);
    
    // Check if data exists for the year
    if (financialData.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No financial data found for fiscal year: ${year}`
      });
    }
    
    // Return successful response with data
    res.status(200).json({
      success: true,
      count: financialData.length,
      data: financialData
    });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};

/**
 * Get API health status
 * Handles GET /api/health endpoint
 * Returns the current status of the API
 */
const getHealthStatus = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      status: 'healthy',
      message: 'SAP API Integration is running successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFinancialData,
  getFinancialDataByCompany,
  getFinancialDataByYear,
  getHealthStatus
};