
import jwt from "jsonwebtoken";

import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";



export const authMiddleware = (roles = []) => {
    return catchAsync(async (req, res, next) => {

        // 1. Get token from Authorization header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)  throw new AppError("Access denied. Please login.", 401);

        // 2. Verify token
    
       let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new AppError("Invalid or expired token", 401);
        }

        req.user = decoded;

         // 3. Check user role
        if (roles.length && !roles.includes(decoded.role)) {
            throw new AppError("You don't have permission", 403);
        }

        next();

        
    });
};
