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
