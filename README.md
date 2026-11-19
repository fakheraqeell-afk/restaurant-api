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