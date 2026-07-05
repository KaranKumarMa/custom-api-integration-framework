/**
 * Error Handler Middleware Module
 * 
 * This module provides centralized error handling for the SAP API Integration application.
 * It catches all errors thrown in the application and returns appropriate error responses.
 * This ensures consistent error response format across all API endpoints.
 */

// Error handling middleware - must be the last middleware in the chain
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);
  console.error(err.stack);
  
  // Set default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Send error response in JSON format
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      statusCode: statusCode,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = errorHandler;