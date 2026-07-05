/**
 * SAP API Integration - Main Server File
 * 
 * This is the entry point of the SAP API Integration application.
 * It sets up the Express server, configures middleware, and defines routes.
 * The server connects a mock SAP S/4HANA ERP system with a financial analytics platform.
 */

// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Import custom middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const financialDataRoutes = require('./routes/financialDataRoutes');

// Initialize Express application
const app = express();

// Define the port from environment variable or default to 3000
const PORT = process.env.PORT || 5000;
console.log("PORT FROM ENV =", process.env.PORT);

// ========================================
// MIDDLEWARE CONFIGURATION
// ========================================

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Use Morgan for HTTP request logging (development mode)
app.use(morgan('dev'));

// Use custom logger middleware for additional request tracking
app.use(logger);

// Serve static files from the docs directory
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// ========================================
// ROUTES CONFIGURATION
// ========================================

// Mount API routes at /api prefix
app.use('/api', financialDataRoutes);

// Root route - API welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SAP API Integration',
    version: '1.0.0',
    endpoints: {
      'GET /api/financial-data': 'Get all financial data',
      'GET /api/financial-data/company/:companyCode': 'Get financial data by company',
      'GET /api/financial-data/year/:fiscalYear': 'Get financial data by year',
      'GET /api/health': 'Get API health status'
    }
  });
});

// ========================================
// ERROR HANDLING
// ========================================

// Handle 404 - Route not found
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Use centralized error handler middleware
app.use(errorHandler);

// ========================================
// SERVER STARTUP
// ========================================

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log('========================================');
  console.log('  SAP API Integration Server Started');
  console.log('========================================');
  console.log(`  Server running on port: ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  API URL: http://localhost:${PORT}/api`);
  console.log('========================================');
});

// Export the app for testing purposes
module.exports = app;