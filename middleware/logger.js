/**
 * Logger Middleware Module
 * 
 * This module provides custom logging functionality for the SAP API Integration application.
 * It logs incoming requests with timestamps, HTTP methods, URLs, and response status codes.
 * This helps in debugging and monitoring API usage.
 */

// Custom logging middleware for request tracking
const logger = (req, res, next) => {
  // Get current timestamp in ISO format
  const timestamp = new Date().toISOString();
  
  // Log the incoming request details
  console.log(`[${timestamp}] ${req.method} ${req.url} - Request received`);
  
  // Capture the response finish event to log response status
  res.on('finish', () => {
    const responseTime = new Date().toISOString();
    console.log(`[${responseTime}] ${req.method} ${req.url} - Response: ${res.statusCode}`);
  });
  
  // Pass control to the next middleware
  next();
};

module.exports = logger;