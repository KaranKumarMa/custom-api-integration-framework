# SAP API Integration - API Documentation

## Overview

This document provides detailed information about the SAP API Integration endpoints, request/response formats, and error handling.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API is public and does not require authentication.

## Endpoints

### 1. Get All Financial Data

Retrieves all financial records from the mock SAP S/4HANA system in analytics-ready format.

**Endpoint:** `GET /financial-data`

**Request:**
```
GET /api/financial-data
Host: localhost:3000
```

**Response:**
- **Status Code:** 200 OK
- **Content-Type:** application/json

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
    }
  ]
}
```

---

### 2. Get Financial Data by Company

Retrieves financial records for a specific company.

**Endpoint:** `GET /financial-data/company/:companyCode`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| companyCode | string | Yes | Company code (e.g., US001, DE001, IN001) |

**Request:**
```
GET /api/financial-data/company/US001
Host: localhost:3000
```

**Response:**
- **Status Code:** 200 OK
- **Content-Type:** application/json

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
    }
  ]
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "No financial data found for company code: INVALID"
}
```

---

### 3. Get Financial Data by Year

Retrieves financial records for a specific fiscal year.

**Endpoint:** `GET /financial-data/year/:fiscalYear`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fiscalYear | number | Yes | Fiscal year (e.g., 2023, 2024) |

**Request:**
```
GET /api/financial-data/year/2024
Host: localhost:3000
```

**Response:**
- **Status Code:** 200 OK
- **Content-Type:** application/json

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
    }
  ]
}
```

**Error Response (400 - Invalid Year):**
```json
{
  "success": false,
  "message": "Invalid fiscal year parameter"
}
```

**Error Response (404 - No Data):**
```json
{
  "success": false,
  "message": "No financial data found for fiscal year: 2020"
}
```

---

### 4. Health Check

Returns the current health status of the API.

**Endpoint:** `GET /health`

**Request:**
```
GET /api/health
Host: localhost:3000
```

**Response:**
- **Status Code:** 200 OK
- **Content-Type:** application/json

```json
{
  "success": true,
  "status": "healthy",
  "message": "SAP API Integration is running successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Error Handling

All errors are returned in a consistent format:

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

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success - Request was successful |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error occurred |

---

## Rate Limiting

Currently, no rate limiting is implemented.

## Versioning

API Version: 1.0.0

## Support

For support, please contact the SAP API Integration team.