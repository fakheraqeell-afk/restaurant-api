import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import mealRoutes from './routes/mealRoutes.js'
import clientRoutes from "./routes/clientRoutes.js";
import helmet from 'helmet';
import rateLimit from "express-rate-limit";
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

const app = express();

// json middleware
app.use(express.json());

// add cross-origin resource sharing headers to response
app.use(cors());


// protect backend from common attacks like: XSS, clickjacking, MIME-type sniffing
app.use(helmet());
 
app.use(rateLimit({windowMs: 15 * 60 * 1000, limit:100, message:{success:false ,message: "Too many requests. Please try again later."}}))

// Route for (auth)
app.use("/api/auth", authRoutes);

// Restaurant Route
app.use("/api/restaurants", restaurantRoutes);

//Meal route
app.use("/api/meals", mealRoutes);

// Client route
app.use("/api/client", clientRoutes);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))


app.use(notFound)

app.use(errorHandler)


export default app;