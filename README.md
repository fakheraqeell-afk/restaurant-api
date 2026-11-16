# Restaurant API

A RESTful API for managing restaurants, meals, and users. The API supports authentication, role-based access control, restaurant and meal management.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- TypeORM
- JWT (JSON Web Tokens)
- bcryptjs
- Joi
- Swagger
- Helmet
- CORS
- express-rate-limit

## Features

- User registration and login
- JWT authentication
- Role-based authorization (Admin, Restaurant Owner, Client)
- Restaurant management (CRUD)
- Meal management (CRUD)
- Restaurant owners can manage their own restaurants and meals
- Meal filtering by category, price, and dietary preferences
- Restaurant filtering by cuisine, city, and rating
- Search meals and restaurants
- Swagger API documentation
- Request validation and centralized error handling
- API rate limiting and security headers

## Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd restaurant-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory:

   ```env
   PORT=3000
   JWT_SECRET=your_secret_here
   JWT_EXPIRE=7d
   ```

5. Make sure MongoDB is running.

6. Start the server:

   ```bash
   npm run start
   ```

## API Documentation

After starting the server, visit:

http://localhost:3000/api/docs

Swagger UI provides documentation for all available endpoints.

## User Roles

| Role | Permissions |
|---|---|
| Admin | Full access |
| Restaurant Owner | Manage own restaurants and meals |
| Client | Browse restaurants and meals |

## License

This project was developed as a backend API project.