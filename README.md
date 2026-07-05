# SAP API Integration

A custom API integration framework that connects a mock SAP S/4HANA ERP system with a financial analytics platform.

## Project Overview

This project provides a RESTful API that serves financial data from a mock SAP S/4HANA ERP system in an analytics-ready format. The application follows the MVC (Model-View-Controller) architecture pattern and includes a data transformation layer that converts SAP-specific data structures into standardized formats suitable for financial analytics platforms.

### Key Features

- **Data Transformation**: Converts SAP field names to analytics-friendly format
- **RESTful API**: Clean and intuitive endpoint design
- **Middleware Support**: Logging, error handling, and CORS support
- **Filtering Capabilities**: Filter data by company code or fiscal year
- **Health Monitoring**: Built-in health check endpoint

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SAP API Integration                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                 │
│  │   Client    │────▶│   Routes    │────▶│ Controllers │                 │
│  │  (Browser/  │     │             │     │             │                 │
│  │   API)      │     │ financial   │     │ financial   │                 │
│  │             │     │ Data Routes │     │ Data        │                 │
│  └─────────────┘     └─────────────┘     │ Controller  │                 │
│                                           └─────────────┘                 │
│                                                 │                          │
│                                                 ▼                          │
│                                           ┌─────────────┐                 │
│                                           │  Services   │                 │
│                                           │             │                 │
│                                           │ Financial   │                 │
│                                           │ Data        │                 │
│                                           │ Service     │                 │
│                                           └─────────────┘                 │
│                                                 │                          │
│                                                 ▼                          │
│                                           ┌─────────────┐                 │
│                                           │   Data      │                 │
│                                           │             │                 │
│                                           │ SAP         │                 │
│                                           │ Financial   │                 │
│                                           │ Data JSON   │                 │
│                                           └─────────────┘                 │
│                                                                             │
│  ┌─────────────┐     ┌─────────────┐                                        │
│  │ Middleware  │     │   Error     │                                        │
│  │             │     │   Handler   │                                        │
│  │ - Logger    │     │             │                                        │
│  │ - CORS      │     │ - Centralized│                                       │
│  │ - Morgan    │     │ - JSON      │                                       │
│  │ - JSON      │     │   Response  │                                       │
│  └─────────────┘     └─────────────┘                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
sap-api-integration/
├── server.js                 # Main entry point - Express server configuration
├── package.json              # Project dependencies and scripts
├── .env                      # Environment configuration
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
├── routes/
│   └── financialDataRoutes.js # API route definitions
├── controllers/
│   └── financialDataController.js # Business logic handlers
├── services/
│   └── financialDataService.js # Data transformation layer
├── middleware/
│   ├── logger.js             # Custom logging middleware
│   └── errorHandler.js       # Centralized error handling
├── data/
│   └── sapFinancialData.json # Mock SAP S/4HANA financial data
└── docs/
    └── api-documentation.md  # Detailed API documentation
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/financial-data` | Get all financial data | None |
| GET | `/financial-data/company/:companyCode` | Get data by company | companyCode (URL param) |
| GET | `/financial-data/year/:fiscalYear` | Get data by year | fiscalYear (URL param) |
| GET | `/health` | API health status | None |

### Data Models

#### SAP Data Model (Source)
```json
{
  "companyCode": "string",
  "fiscalYear": "number",
  "revenue": "number",
  "expenses": "number",
  "profit": "number"
}
```

#### Analytics Data Model (Transformed)
```json
{
  "company": "string",
  "year": "number",
  "revenue": "number",
  "expenses": "number",
  "netProfit": "number",
  "profitMargin": "number"
}
```

## Sample Request and Response

### Get All Financial Data

**Request:**
```bash
GET http://localhost:5000/api/financial-data
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "company": "US001",
      "year": 2024,
      "revenue": 15000000,
      "expenses": 9500000,
      "netProfit": 5500000,
      "profitMargin": 36.67
    },
    {
      "company": "DE001",
      "year": 2024,
      "revenue": 22000000,
      "expenses": 14500000,
      "netProfit": 7500000,
      "profitMargin": 34.09
    },
    {
      "company": "IN001",
      "year": 2024,
      "revenue": 8500000,
      "expenses": 5200000,
      "netProfit": 3300000,
      "profitMargin": 38.82
    }
  ]
}
```

### Get Financial Data by Company

**Request:**
```bash
GET http://localhost:5000/api/financial-data/company/US001
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "company": "US001",
      "year": 2024,
      "revenue": 15000000,
      "expenses": 9500000,
      "netProfit": 5500000,
      "profitMargin": 36.67
    },
    {
      "company": "US001",
      "year": 2023,
      "revenue": 13500000,
      "expenses": 8800000,
      "netProfit": 4700000,
      "profitMargin": 34.81
    }
  ]
}
```

### Get Financial Data by Year

**Request:**
```bash
GET http://localhost:5000/api/financial-data/year/2024
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "company": "US001",
      "year": 2024,
      "revenue": 15000000,
      "expenses": 9500000,
      "netProfit": 5500000,
      "profitMargin": 36.67
    },
    {
      "company": "DE001",
      "year": 2024,
      "revenue": 22000000,
      "expenses": 14500000,
      "netProfit": 7500000,
      "profitMargin": 34.09
    },
    {
      "company": "IN001",
      "year": 2024,
      "revenue": 8500000,
      "expenses": 5200000,
      "netProfit": 3300000,
      "profitMargin": 38.82
    }
  ]
}
```

### Health Check

**Request:**
```bash
GET http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "message": "SAP API Integration is running successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sap-api-integration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the .env file and update values if needed
   # The default configuration should work for most cases
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Test the API**
   ```bash
   # Using curl
   curl http://localhost:5000/api/financial-data
   
   # Or open in browser
   http://localhost:5000/api/financial-data
   ```

### Project Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the server in production mode |
| `npm run dev` | Start the server in development mode with nodemon |

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Architecture**: MVC (Model-View-Controller)
- **Middleware**: CORS, Morgan, Custom Logger, Error Handler

## Data Transformation Logic

The transformation layer converts SAP S/4HANA data to analytics-ready format:

| SAP Field | Analytics Field | Description |
|-----------|----------------|-------------|
| `companyCode` | `company` | Company identifier |
| `fiscalYear` | `year` | Fiscal year |
| `revenue` | `revenue` | Total revenue |
| `expenses` | `expenses` | Total expenses |
| `profit` | `netProfit` | Net profit |
| (calculated) | `profitMargin` | Profit as percentage of revenue |

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 404,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.