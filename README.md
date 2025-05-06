# Product-Peek-App

# Optimized Product Search API & Interface

## Project Overview

Optimized Product Search API & Interface is a full-stack application designed to simulate the powerful search capabilities of a modern e-commerce platform. The system provides users with the ability to search, filter, sort, and explore a wide catalog of products with speed and precision.
The backend, built with Node.js, Express, and MongoDB, prioritizes performance and scalability by implementing optimized indexes, full-text search, and pagination. On the frontend, a React-based interface offers users a clean, intuitive search experience complete with autocomplete suggestions and sorting controls.
This project demonstrates backend-first design thinking and focuses on optimizing system performance under the assumption of large datasets.

## Features

- Search by category, tenant, or keyword (in name/description)
- Autocomplete suggestions for product names
- Full-text search using MongoDB text indexes
- Sort by name or price
- Server-side pagination
- Cross-filtering (category affects tenant list)
- Optimized queries with compound + text indexes

## Tech Stack

**Backend**  
Node.js · Express.js · MongoDB · Mongoose · mongoose-paginate-v2

**Frontend**  
React.js · Axios · HTML/CSS

**Utilities**  
- MongoDB Compass (for data + index validation)
- dotenv for environment variable management

## Setup & Installation

### Prerequisites
- Node.js v18+
- **MongoDB** v8.0+  
  > Make sure MongoDB is installed and running locally at:  
  > `mongodb://localhost:27017`  
  > You can start it using the `mongod` command in your terminal (if installed locally).  
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/AradhanaRamamoorthy/Product-Peek-App.git
cd Product-Peek-App
```

### Install dependencies
**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend
npm install
```

### Seed the Database

To populate the database with sample product data (**1000+ entries**):

```bash
cd backend
node seed/seed.js
```
The seeded dataset may contain duplicate product names to simulate real-world e-commerce scenarios.
Products are categorized using:
- category (e.g., Electronics, Kitchen)
- tenant (i.e., brand or seller)
  
These fields are used to power the search and filtering functionality.

### Run the App
**Backend**
```bash
cd backend
node app.js
```
The backend server will start at: http://localhost:3000

**Frontend (in a seperate terminal)**
```bash
cd frontend
npm start
```
The frontend app will run at: http://localhost:3001

> **Make sure the backend is running before starting the frontend** to enable full functionality.

## API Documentation

### GET `/api/products/search`

Search products using filters and keyword.

#### Query Parameters

| Parameter   | Type     | Required | Description |
|-------------|----------|----------|-------------|
| `category`  | `string` | No       | Filter by category (e.g., "Electronics") |
| `tenant`    | `string` | No       | Filter by tenant/brand (e.g., "Sony") |
| `keyword`   | `string` | No       | Keyword to search in name or description |
| `sort`      | `string` | No       | Sort order: `price-asc`, `price-desc`, `name-asc`, `name-desc` |
| `page`      | `number` | No       | Page number (default: 1) |
| `limit`     | `number` | No       | Items per page (default: 10) |

#### Example Request

GET /api/products/search?category=Electronics&tenant=Apple&keyword=tablet&sort=price-asc&page=1&limit=5

#### Example Response
```json
{
    "docs": [
        {
            "_id": "6819ac26c51e0448da0e4840",
            "name": "Apple Tablet",
            "category": "Electronics",
            "tenant": "Apple",
            "description": "The Apple Tablet delivers top-tier functionality and cutting-edge design for tech enthusiasts.",
            "price": 301.22,
            "id": "6819ac26c51e0448da0e4840"
        },
        {
            "_id": "6819ac26c51e0448da0e486a",
            "name": "Apple Tablet",
            "category": "Electronics",
            "tenant": "Apple",
            "description": "The Apple Tablet delivers top-tier functionality and cutting-edge design for tech enthusiasts.",
            "price": 331.72,
            "id": "6819ac26c51e0448da0e486a"
        },
        {
            "_id": "6819ac26c51e0448da0e49e0",
            "name": "Apple Tablet",
            "category": "Electronics",
            "tenant": "Apple",
            "description": "The Apple Tablet delivers top-tier functionality and cutting-edge design for tech enthusiasts.",
            "price": 334.41,
            "id": "6819ac26c51e0448da0e49e0"
        },
        {
            "_id": "6819ac26c51e0448da0e4b10",
            "name": "Apple Tablet",
            "category": "Electronics",
            "tenant": "Apple",
            "description": "Compact, efficient, and powerful — the Apple Tablet is perfect for daily use.",
            "price": 1285.36,
            "id": "6819ac26c51e0448da0e4b10"
        }
    ],
    "totalDocs": 6,
    "limit": 4,
    "totalPages": 2,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
}
```
> Each product includes both _id (MongoDB ObjectId) and id (string version) due to Mongoose's lean query behavior.

### GET `/api/products/filters`

Fetch all available categories and tenants.

#### Example Response
```json
{
  "categories": ["Home & Kitchen", "Health & Personal Care", "Clothing"],
  "tenants": ["Philips", "Sony", "Nike", "Zara"]
}
```

### GET `/api/products/filtered-filters`

Fetch categories and tenants based on selected filters (cross-filtering).

### Query Parameters

| Parameter | Type     | Description                     |
|-----------|----------|---------------------------------|
| category  | `string` | (Optional) Selected category     |
| tenant    | `string` | (Optional) Selected tenant       |

#### Example Request

GET /api/products/filtered-filters?category=Electronics

#### Example Response
```json
{
    "categories": [
        "Electronics"
    ],
    "tenants": [
        "Apple",
        "Bose",
        "Dell",
        "HP",
        "LG",
        "Lenovo",
        "Samsung",
        "Sony"
    ]
}
```

### GET `/api/products/suggestions`

Autocomplete endpoint for product search.

### Query Parameters

| Parameter | Type     | Required | Description             |
|-----------|----------|----------|-------------------------|
| keyword   | `string` | Yes      | Partial search text     |

#### Example Request

GET /api/products/suggestions?keyword=tablet

#### Example Response
```json
[
    "Samsung Tablet",
    "HP Tablet",
    "Sony Tablet",
    "Apple Tablet",
    "Sony Tablet"
]









