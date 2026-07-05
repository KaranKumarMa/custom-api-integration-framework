/**
 * Financial Data Service Module
 * 
 * This module provides the data transformation layer that converts SAP S/4HANA ERP data
 * into analytics-ready format. It handles reading data from the mock SAP JSON file and
 * transforming it for the financial analytics platform.
 */

const fs = require('fs');
const path = require('path');

/**
 * Read SAP financial data from the JSON file
 * @returns {Array} Array of SAP financial records
 */
const readSAPData = () => {
  try {
    // Construct the path to the SAP data file
    const dataPath = path.join(__dirname, '..', 'data', 'sapFinancialData.json');
    
    // Read and parse the JSON file
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const sapData = JSON.parse(rawData);
    
    return sapData;
  } catch (error) {
    throw new Error(`Failed to read SAP data: ${error.message}`);
  }
};

/**
 * Transform SAP data into analytics-ready format
 * Converts SAP field names to analytics-friendly field names and calculates profit margin
 * 
 * @param {Object} sapRecord - Single SAP financial record
 * @returns {Object} Transformed record for analytics platform
 */
const transformSAPData = (sapRecord) => {
  // Calculate profit margin as percentage
  const profitMargin = sapRecord.revenue > 0 
    ? ((sapRecord.profit / sapRecord.revenue) * 100).toFixed(2) 
    : 0;
  
  // Transform SAP data structure to analytics format
  return {
    company: sapRecord.companyCode,
    year: sapRecord.fiscalYear,
    revenue: sapRecord.revenue,
    expenses: sapRecord.expenses,
    netProfit: sapRecord.profit,
    profitMargin: parseFloat(profitMargin)
  };
};

/**
 * Get all financial data in analytics-ready format
 * @returns {Array} Array of transformed financial records
 */
const getAllFinancialData = () => {
  // Read raw SAP data
  const sapData = readSAPData();
  
  // Transform each record to analytics format
  return sapData.map(transformSAPData);
};

/**
 * Get financial data filtered by company code
 * @param {string} companyCode - Company code to filter by
 * @returns {Array} Array of transformed financial records for the specified company
 */
const getFinancialDataByCompany = (companyCode) => {
  // Read raw SAP data
  const sapData = readSAPData();
  
  // Filter and transform data for the specified company
  return sapData
    .filter(record => record.companyCode === companyCode)
    .map(transformSAPData);
};

/**
 * Get financial data filtered by fiscal year
 * @param {number} fiscalYear - Fiscal year to filter by
 * @returns {Array} Array of transformed financial records for the specified year
 */
const getFinancialDataByYear = (fiscalYear) => {
  // Read raw SAP data
  const sapData = readSAPData();
  
  // Filter and transform data for the specified year
  return sapData
    .filter(record => record.fiscalYear === fiscalYear)
    .map(transformSAPData);
};

module.exports = {
  readSAPData,
  transformSAPData,
  getAllFinancialData,
  getFinancialDataByCompany,
  getFinancialDataByYear
};